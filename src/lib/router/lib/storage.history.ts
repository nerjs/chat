import { Bus } from '../../bus'
import { RouterLifecycle } from '../interfaces'
import { MemoryHistory, MemoryHistoryItem } from './memory.history'

export class StorageHistory extends MemoryHistory {
  #storageValue?: string

  constructor(
    routerBus: Bus<RouterLifecycle>,
    private readonly storage: Storage,
    private readonly key: string,
    startUrl?: string,
    startState?: any,
  ) {
    super(routerBus, startUrl || '/', startState)

    const savedList = StorageHistory.read(storage, key)
    if (savedList.length) {
      this.list = savedList
      this.currentIndex = savedList.length - 1
    }

    this.save()

    const routerUnsub = this.routerBus.subscribe(event => {
      switch (event) {
        case 'destroy':
          routerUnsub()
          break
        case 'update':
          this.save()
          break
      }
    })
  }

  private save() {
    const list = [...this.list]
    list.splice(this.currentIndex + 1)
    const newStrValue = JSON.stringify(list)
    if (this.#storageValue === newStrValue) return
    this.#storageValue = newStrValue
    this.storage.setItem(this.key, newStrValue)
  }

  static read(storage: Storage, key: string): MemoryHistoryItem[] {
    const str = storage.getItem(key)
    if (str == null) return []

    try {
      const arr = JSON.parse(str)
      if (!arr || !Array.isArray(arr) || arr.some(item => !item || typeof item !== 'object' || !('url' in item)))
        throw new Error(
          `The value of the ${key} key is incorrect. The value may have been changed incorrectly. The ${key} key will be deleted from the repository.`,
        )

      return arr
    } catch (err) {
      console.error(err)
      storage.removeItem(key)
      return []
    }
  }
}
