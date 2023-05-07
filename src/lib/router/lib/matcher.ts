import { isObject } from 'lodash'
import { ILocation, IMatcher, IState } from '../interfaces'

export class Matcher<Params = any> implements IMatcher<Params> {
  readonly rgx: RegExp
  readonly template?: string
  private readonly urlBuilder?: (params: Params) => string | ILocation

  constructor(pattern: string | RegExp)
  constructor(pattern: string | RegExp, template: string)
  constructor(pattern: string | RegExp, urlBuilder: (params: Params) => string | ILocation)
  constructor(pattern: string | RegExp, urlBuilderOrTemplate?: string | ((params: Params) => string | ILocation)) {
    const { rgx, template } = Matcher.createRegexp(pattern)

    this.rgx = rgx
    this.template = urlBuilderOrTemplate && typeof urlBuilderOrTemplate === 'string' ? urlBuilderOrTemplate : template
    if (urlBuilderOrTemplate && typeof urlBuilderOrTemplate === 'function') this.urlBuilder = urlBuilderOrTemplate
  }

  test(location: string | ILocation<IState>): boolean {
    if (isObject(location)) return this.test(location.pathname)
    return this.rgx.test(location)
  }
  match(location: string | ILocation<IState>): Params | null {
    const matched = `${location}`.match(this.rgx)
    if (!matched) return null
    return (matched.groups || {}) as Params
  }

  create(_params: Params): ILocation<IState> {
    throw new Error('Method not implemented.')
  }

  static createRegexp(_pattern: string | RegExp): { rgx: RegExp; template?: string; tail?: string } {
    return { rgx: /a/ }
  }

  toLocation(): ILocation<IState> {
    throw new Error('Method not implemented.')
  }
  toString(): string {
    throw new Error('Method not implemented.')
  }
}

// @ts-expect-error
window.Matcher = Matcher
