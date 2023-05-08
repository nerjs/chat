export * from './lib/location'
export * from './lib/abstract.router'
export * from './lib/browser.history'
export * from './lib/memory.history'
export * from './lib/storage.history'
export * from './lib/browser.router'
export * from './lib/hash.router'
export * from './lib/memory.router'
export * from './lib/session.router'
export * from './lib/storage.router'

// @ts-expect-error
window.pathToRegexp = pathToRegexp
