import { FilterQuery } from 'mongoose'

export interface AddTransactionFacadeInputDTO {
  senderAccount: string
  senderName: string
  recipientAccount: string
  recipientName: string
  amount: number
}

export interface AddTransactionFacadeOutputDTO {
  id: string
  senderAccount: string
  senderName: string
  recipientAccount: string
  recipientName: string
  amount: number
  createdAt: Date
  updatedAt: Date
}

export interface FindTransactionFacadeInputDTO {
  filter: FilterQuery<unknown>
}

export interface FindTransactionFacadeOutputDTO {
  id: string
  senderAccount: string
  senderName: string
  recipientAccount: string
  recipientName: string
  amount: number
  createdAt: Date
}

export interface TransactionFacadeInterface {
  add (input: AddTransactionFacadeInputDTO): Promise<AddTransactionFacadeOutputDTO>
  find (input: FindTransactionFacadeInputDTO): Promise<FindTransactionFacadeOutputDTO>
}
