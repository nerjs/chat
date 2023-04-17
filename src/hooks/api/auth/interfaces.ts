import { IUser } from '../../../interfaces/user.interface'

export interface ApiAuthEmailInput {
  email: string
  password: string
}

export interface ApiAuthTokenInput {
  accessToken: string
}

export interface ApiAuthOutput {
  accessToken: string
  user: IUser
}

export interface ApiAuthEmailOutput extends ApiAuthOutput {}
export interface ApiAuthTokenOutput extends ApiAuthOutput {}
