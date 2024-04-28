// import { humanize } from '../../../lib/utils'
// import {
//     type BaseListTypeInfo,
//     type CommonFieldConfig,
//     type FieldTypeFunc,
//     fieldType,
//     orderDirectionEnum,
// } from '../../../types'
// import { graphql } from '../../..'
// import {
//     assertReadIsNonNullAllowed,
//     getResolvedIsNullable,
//     resolveHasValidation,
// } from '../../non-null-graphql'
// import { filters } from '../../filters'

import { graphql } from "@keystone-6/core"
import { BaseListTypeInfo, CommonFieldConfig, FieldData, FieldTypeFunc, fieldType, orderDirectionEnum } from "@keystone-6/core/types"

type CommonFilter<T> = {
    equals?: T | null
    in?: readonly T[] | null
    notIn?: readonly T[] | null
    lt?: T | null
    lte?: T | null
    gt?: T | null
    gte?: T | null
    contains?: T | null
    startsWith?: T | null
    endsWith?: T | null
    not?: CommonFilter<T> | null
}

function internalResolveFilter(
    entries: EntriesAssumingNoExtraProps<CommonFilter<any>>,
    mode: 'default' | 'insensitive' | undefined
): object {

    const entry = entries.shift()
    if (entry === undefined) return {}
    const [key, val] = entry
    if (val == null) {
        return {
            AND: [{ [key]: val }, internalResolveFilter(entries, mode)],
        }
    }
    switch (key) {
        case 'equals':
        case 'lt':
        case 'lte':
        case 'gt':
        case 'gte':
        case 'in':
        case 'contains':
        case 'startsWith':
        case 'endsWith': {

            return {
                AND: [{ [key]: val, mode }, { not: null }, internalResolveFilter(entries, mode)],
            }
        }

        case 'notIn': {
            return {
                AND: [
                    {
                        NOT: [
                            internalResolveFilter(objectEntriesButAssumeNoExtraProperties({ in: val }), mode),
                        ],
                    },
                    internalResolveFilter(entries, mode),
                ],
            }
        }
        case 'not': {
            return {
                AND: [
                    {
                        NOT: [internalResolveFilter(objectEntriesButAssumeNoExtraProperties(val), mode)],
                    },
                    internalResolveFilter(entries, mode),
                ],
            }
        }
    }
}

type EntriesAssumingNoExtraProps<T> = {
    [Key in keyof T]-?: [Key, T[Key]];
}[keyof T][]

const objectEntriesButAssumeNoExtraProperties: <T>(obj: T) => EntriesAssumingNoExtraProps<T> =
    Object.entries as any

function resolveCommon(val: CommonFilter<any> | null) {
    if (val === null) return null
    console.log(objectEntriesButAssumeNoExtraProperties(val))
    return internalResolveFilter(objectEntriesButAssumeNoExtraProperties(val), undefined)
}


function humanize(str: string) {
    return str
        .replace(/([a-z])([A-Z]+)/g, '$1 $2')
        .split(/\s|_|\-/)
        .filter(i => i)
        .map(x => x.charAt(0).toUpperCase() + x.slice(1))
        .join(' ')
}

function getResolvedIsNullable(
    validation: undefined | { isRequired?: boolean },
    db: undefined | { isNullable?: boolean }
): boolean {
    if (db?.isNullable === false) {
        return false
    }
    if (db?.isNullable === undefined && validation?.isRequired) {
        return false
    }
    return true
}

function resolveHasValidation({
    db,
    validation
}: {
    db?: { isNullable?: boolean },
    validation?: unknown,
}) {
    if (db?.isNullable === false) return true
    if (validation !== undefined) return true
    return false
}

export function assertReadIsNonNullAllowed<ListTypeInfo extends BaseListTypeInfo>(
    meta: FieldData,
    config: CommonFieldConfig<ListTypeInfo>,
    resolvedIsNullable: boolean
) {
    if (!resolvedIsNullable) return
    if (!config.graphql?.isNonNull?.read) return

    throw new Error(
        `The field at ${meta.listKey}.${meta.fieldKey} sets graphql.isNonNull.read: true, but not validation.isRequired: true, or db.isNullable: false\n` +
        `Set validation.isRequired: true, or db.isNullable: false, or graphql.isNonNull.read: false`
    )
}

export type BigIntFieldConfig<ListTypeInfo extends BaseListTypeInfo> =
    CommonFieldConfig<ListTypeInfo> & {
        isIndexed?: boolean | 'unique'
        defaultValue?: bigint | { kind: 'autoincrement' }
        validation?: {
            isRequired?: boolean
            min?: bigint
            max?: bigint
        }
        db?: {
            isNullable?: boolean
            map?: string
            extendPrismaSchema?: (field: string) => string
        }
    }

// These are the max and min values available to a 64 bit signed integer
const MAX_INT = 9223372036854775807n
const MIN_INT = -9223372036854775808n

export function bigInt<ListTypeInfo extends BaseListTypeInfo>(
    config: BigIntFieldConfig<ListTypeInfo> = {}
): FieldTypeFunc<ListTypeInfo> {
    const {
        isIndexed,
        defaultValue: _defaultValue,
        validation: _validation,
    } = config

    return (meta) => {
        const defaultValue = _defaultValue ?? null
        const hasAutoIncDefault =
            typeof defaultValue == 'object' &&
            defaultValue !== null &&
            defaultValue.kind === 'autoincrement'

        const isNullable = getResolvedIsNullable(_validation, config.db)

        if (hasAutoIncDefault) {
            if (meta.provider === 'sqlite' || meta.provider === 'mysql') {
                throw new Error(`The bigInt field at ${meta.listKey}.${meta.fieldKey} specifies defaultValue: { kind: 'autoincrement' }, this is not supported on ${meta.provider}`)
            }
            if (isNullable !== false) {
                throw new Error(
                    `The bigInt field at ${meta.listKey}.${meta.fieldKey} specifies defaultValue: { kind: 'autoincrement' } but doesn't specify db.isNullable: false.\n` +
                    `Having nullable autoincrements on Prisma currently incorrectly creates a non-nullable column so it is not allowed.\n` +
                    `https://github.com/prisma/prisma/issues/8663`
                )
            }
        }

        const validation = {
            isRequired: _validation?.isRequired ?? false,
            min: _validation?.min ?? MIN_INT,
            max: _validation?.max ?? MAX_INT,
        }

        for (const type of ['min', 'max'] as const) {
            if (validation[type] > MAX_INT || validation[type] < MIN_INT) {
                throw new Error(`The bigInt field at ${meta.listKey}.${meta.fieldKey} specifies validation.${type}: ${validation[type]} which is outside of the range of a 64bit signed integer(${MIN_INT}n - ${MAX_INT}n) which is not allowed`)
            }
        }
        if (validation.min > validation.max) {
            throw new Error(`The bigInt field at ${meta.listKey}.${meta.fieldKey} specifies a validation.max that is less than the validation.min, and therefore has no valid options`)
        }

        assertReadIsNonNullAllowed(meta, config, isNullable)

        const mode = isNullable === false ? 'required' : 'optional'
        const fieldLabel = config.label ?? humanize(meta.fieldKey)
        const hasValidation = resolveHasValidation(config)

        return fieldType({
            kind: 'scalar',
            mode,
            scalar: 'BigInt',
            // This will resolve to 'index' if the boolean is true, otherwise other values - false will be converted to undefined
            index: isIndexed === true ? 'index' : isIndexed || undefined,
            default:
                typeof defaultValue === 'bigint'
                    ? { kind: 'literal', value: defaultValue }
                    : defaultValue?.kind === 'autoincrement'
                        ? { kind: 'autoincrement' }
                        : undefined,
            map: config.db?.map,
            extendPrismaSchema: config.db?.extendPrismaSchema,
        })({
            ...config,
            hooks: {
                ...config.hooks,
                validateInput: hasValidation ? async (args) => {
                    const value = args.resolvedData[meta.fieldKey]

                    if (
                        (validation?.isRequired || isNullable === false) &&
                        (value === null ||
                            (args.operation === 'create' && value === undefined && !hasAutoIncDefault))
                    ) {
                        args.addValidationError(`${fieldLabel} is required`)
                    }
                    if (typeof value === 'number') {
                        if (validation?.min !== undefined && value < validation.min) {
                            args.addValidationError(
                                `${fieldLabel} must be greater than or equal to ${validation.min}`
                            )
                        }

                        if (validation?.max !== undefined && value > validation.max) {
                            args.addValidationError(
                                `${fieldLabel} must be less than or equal to ${validation.max}`
                            )
                        }
                    }
                    console.log(mode, "args")
                    await config.hooks?.validateInput?.(args)
                } : config.hooks?.validateInput
            },
            input: {
                uniqueWhere:
                    isIndexed === 'unique' ? { arg: graphql.arg({ type: graphql.BigInt }) } : undefined,
                // TODO
                where: {
                    arg: graphql.arg({ type: graphql.BigInt }),
                    resolve: mode === 'optional' ? resolveCommon : undefined,
                    // resolve: resolveCommon,
                },
                create: {
                    arg: graphql.arg({
                        type: graphql.BigInt,
                        defaultValue: typeof defaultValue === 'bigint' ? defaultValue : undefined,
                    }),
                    resolve(value) {
                        if (value === undefined && typeof defaultValue === 'bigint') {
                            return defaultValue
                        }
                        return value
                    },
                },
                update: { arg: graphql.arg({ type: graphql.BigInt }) },
                orderBy: { arg: graphql.arg({ type: orderDirectionEnum }) },
            },
            output: graphql.field({
                type: graphql.BigInt,
            }),
            views: './src/custom-fields/custom-big-int/views',
            getAdminMeta() {
                return {
                    validation: {
                        min: validation.min.toString(),
                        max: validation.max.toString(),
                        isRequired: validation.isRequired,
                    },
                    defaultValue: typeof defaultValue === 'bigint' ? defaultValue.toString() : defaultValue,
                }
            },
        })
    }
}