import { FilterQuery } from 'mongoose'

export interface FindAccountUseCaseInputDTO {
  filter: FilterQuery<unknown>
}

export interface FindAccountUseCaseOutputDTO {
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
