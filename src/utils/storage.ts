interface IStorage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

abstract class Storage implements IStorage {
  protected abstract readonly storage: IStorage

  getItem(key: string): string | null {
    return this.storage.getItem(key)
  }
  setItem(key: string, value: string): void {
    return this.storage.setItem(key, value)
  }
  removeItem(key: string): void {
    return this.removeItem(key)
  }
}

export class MemoryStorage implements IStorage {
  private readonly store = new Map<string, string>()

  getItem(key: string): string | null {
    const value = this.store.get(key)

    return value == null ? null : value
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value)
  }

  removeItem(key: string): void {
    this.store.delete(key)
  }
}

export class SessionStorage extends Storage {
  protected readonly storage = 'sessionStorage' in globalThis ? sessionStorage : new MemoryStorage()
}

export class LocalStorage extends Storage {
  protected readonly storage = 'localStorage' in globalThis ? localStorage : new SessionStorage()
}
