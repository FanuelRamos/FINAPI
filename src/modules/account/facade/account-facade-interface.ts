import { FilterQuery } from 'mongoose'
import Statement from '../../@shared/domain/value-object/statement-value-object'

export interface AddAccountFacadeInputDTO {
  name: string
  burth: Date
  country: string
  city: string
  address: string
  postalCode: string
  phone: string
  email: string
}

export interface AddAccountFacadeOutputDTO {
  id: string
  name: string
  burth: Date
  country: string
  city: string
  address: string
  postalCode: string
  phone: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface FindAccountFacadeInputDTO {
  filter: FilterQuery<unknown>
}

export interface FindAccountFacadeOutputDTO {
  id: string
  name: string
  burth: Date
  country: string
  city: string
  address: string
  postalCode: string
  phone: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface UpdateAccountFacadeInputDTO {
  id: string
  name?: string
  burth?: Date
  country?: string
  city?: string
  address?: string
  postalCode?: string
  phone?: string
  email?: string
}

export interface UpdateAccountFacadeOutputDTO {
  id: string
  name: string
  burth: Date
  country: string
  city: string
  address: string
  postalCode: string
  phone: string
  email: string
  updatedAt: Date
}

export interface AddStatementFacadeOutputDTO {
  transaction: string
  amount: number
  type: string
}

export interface AddStatementFacadeInputDTO {
  account: string
  transaction: string
  amount: number
  type: string
}

export interface FindStatementFacadeInputDTO {
  id: string
}

export interface AccountFacadeInterface {
  add(input: AddAccountFacadeInputDTO): Promise<AddAccountFacadeOutputDTO>
  find(input: FindAccountFacadeInputDTO): Promise<FindAccountFacadeOutputDTO>
  update(input: UpdateAccountFacadeInputDTO): Promise<UpdateAccountFacadeOutputDTO>
  addStatement(input: AddStatementFacadeInputDTO): Promise<AddStatementFacadeOutputDTO>
  findStatement(input: FindStatementFacadeInputDTO): Promise<Statement[]>
}
