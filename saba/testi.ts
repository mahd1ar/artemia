/* eslint-disable no-console */
type State = Record<string, any>
interface Getters<T extends State> {
  [key: string]: (state: T) => any
}
interface Actions<T extends State> {
  [key: string]: (this: Store<T>, ...args: any[]) => any
}

class Store<T extends State> {
  private _state: T
  private _getters: Getters<T> = {}
  private _actions: Actions<T> = {}
  private _watchers: Map<keyof T, Set<(newValue: any, oldValue: any) => void>> = new Map()

  constructor(initialState: T) {
    this._state = reactive(initialState, this._watchers)
  }

  // Define getters
  setGetters(getters: Getters<T>) {
    this._getters = getters
  }

  // Define actions
  setActions(actions: Actions<T>) {
    this._actions = actions
    Object.keys(actions).forEach((key) => {
      this._actions[key] = actions[key].bind(this)
    })
  }

  // Access state
  get state(): T {
    return this._state
  }

  // Access getters
  get getters() {
    const computedGetters: Record<string, any> = {}
    for (const key in this._getters) {
      computedGetters[key] = this._getters[key](this._state)
    }
    return computedGetters
  }

  // Access actions
  get actions() {
    return this._actions
  }

  // Watch a property for changes
  watch<K extends keyof T>(property: K, callback: (newValue: T[K], oldValue: T[K]) => void) {
    if (!this._watchers.has(property)) {
      this._watchers.set(property, new Set())
    }
    this._watchers.get(property)?.add(callback)
  }

  // Unwatch a property
  unwatch<K extends keyof T>(property: K, callback: (newValue: T[K], oldValue: T[K]) => void) {
    this._watchers.get(property)?.delete(callback)
  }
}

// Utility function to make objects reactive
function reactive<T extends object>(
  obj: T,
  watchers: Map<keyof T, Set<(newValue: any, oldValue: any) => void>>,
): T {
  const proxy = new Proxy(obj, {
    get(target, prop) {
      return Reflect.get(target, prop)
    },
    set(target, prop, value) {
      const oldValue = Reflect.get(target, prop)
      const result = Reflect.set(target, prop, value)

      // Notify watchers if the property is being watched
      if (watchers.has(prop as keyof T)) {
        watchers.get(prop as keyof T)?.forEach((callback) => {
          callback(value, oldValue)
        })
      }

      console.log(`State updated: ${String(prop)} =`, value) // Simple reactivity logging
      return result
    },
  })

  return proxy
}

// Example Usage
const counterStore = new Store({
  count: 0,
})

counterStore.setGetters({
  doubleCount: state => state.count * 2,
})

counterStore.setActions({
  increment(this: Store<{ count: number }>) {
    this.state.count++
  },
  decrement(this: Store<{ count: number }>) {
    this.state.count--
  },
})

// Watch the 'count' property
counterStore.watch('count', (newValue, oldValue) => {
  console.log(`"count" changed from ${oldValue} to ${newValue}`)
})

// console.log('Initial State:', counterStore.state)
// console.log('Getters:', counterStore.getters)

counterStore.actions.increment()
// console.log('After Increment:', counterStore.state)
// console.log('Getters:', counterStore.getters)

// counterStore.actions.decrement()
// console.log('After Decrement:', counterStore.state)
// console.log('Getters:', counterStore.getters)
