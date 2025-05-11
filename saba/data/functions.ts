import type { tableRelationConfig } from './types'

export function parseTableRelationConfig(
  config: string,
): tableRelationConfig {
  const defaultConfig: tableRelationConfig = {
    type: 'Implemented',
  }

  try {
    const parsedConfig = JSON.parse(config) as tableRelationConfig
    return Object.assign({}, defaultConfig, parsedConfig)
  }
  catch {
    return defaultConfig
  }
}
