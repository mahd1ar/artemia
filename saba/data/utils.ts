import type { Session } from './types'
import { BaseItem, BaseKeystoneTypeInfo, BaseListTypeInfo, KeystoneContext, MaybeItemFunction, MaybeSessionFunction } from '@keystone-6/core/types'
import { createTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { Roles } from './types'

export namespace NumUtils {
  export function format(number: number | bigint) {
    if (typeof number === 'number') {
      return Intl.NumberFormat('en-US').format(number)
    }
    else
      if (typeof number === 'bigint') {
        return Intl.NumberFormat('en-US').format(number)
      }
  }

  export function deformat(number: string) {
    return BigInt(number.replace(/,/g, ''))
  }
}

export function setPermitions(
  args: object & {
    session?: Session
  },

  permittions: {
    role: Roles
    fieldMode: 'read' | 'edit' | 'hidden'
  }[],
  defaultValue: 'read' | 'edit' | 'hidden',

): 'read' | 'edit' | 'hidden' {
  for (const per of permittions) {
    if (per.role === args.session?.data.role) {
      return per.fieldMode
    }
  }

  return defaultValue
}

export function editIfAdmin(args: object & {
  session?: Session
}, defaultValue?: 'read' | 'edit' | 'hidden') {
  return setPermitions(args, [{ role: Roles.admin, fieldMode: 'edit' }], defaultValue || 'read')
}

export type ExcludesFalse = <T>(x: T | false | undefined | null) => x is T

class TreeNode<T> {
  key: string
  value: T
  #parent: TreeNode<T> | null
  children: TreeNode<T>[]

  constructor(key: string, value: T, parent: TreeNode<T> | null = null) {
    this.key = key
    this.value = value
    this.#parent = parent
    this.children = []
  }

  get isLeaf() {
    return this.children.length === 0
  }

  get hasChildren() {
    return !this.isLeaf
  }
}

export class Tree<T> {
  private root: TreeNode<T>
  constructor(key: string, value: T) {
    this.root = new TreeNode(key, value)
  }

  *preOrderTraversal(node = this.root): Generator<TreeNode<T>> {
    yield node
    if (node.children.length) {
      for (const child of node.children) {
        yield * this.preOrderTraversal(child)
      }
    }
  }

  *postOrderTraversal(node = this.root): Generator<TreeNode<T>> {
    if (node.children.length) {
      for (const child of node.children) {
        yield * this.postOrderTraversal(child)
      }
    }
    yield node
  }

  insert(parentNodeKey: string, key: string, value: T) {
    for (const node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        node.children.push(new TreeNode(key, value, node))
        return true
      }
    }
    return false
  }

  remove(key: string) {
    for (const node of this.preOrderTraversal()) {
      const filtered = node.children.filter(c => c.key !== key)
      if (filtered.length !== node.children.length) {
        node.children = filtered
        return true
      }
    }
    return false
  }

  find(key: string) {
    for (const node of this.preOrderTraversal()) {
      if (node.key === key)
        return node
    }
    return undefined
  }

  getRoot() {
    return this.root
  }
}

export const theme = createTheme({
  typography: {
    fontFamily:
      'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif',
  },
  palette: {
    primary: {
      main: '#1d4ed8', // Change this to your desired primary color
    },
  },
})

export function useDebouncedValue<T>(inputValue: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(inputValue)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [inputValue, delay])

  return debouncedValue
}

export function timeout(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export async function saveCurrentTab(ms: number = 500) {
  await timeout(ms)

  document.querySelectorAll('button').forEach((i) => {
    if (i.textContent === 'Save changes') {
      if (getComputedStyle(i).cursor === 'pointer')
        i.click()
    }
  })

  return true
}
