import { FilterQuery } from 'mongoose'

export interface FindTransactionUseCaseInputDTO {
  filter: FilterQuery<unknown>
}

export interface FindTransactionUseCaseOutputDTO {
  id: string
  senderAccount: string
  senderName: string
  recipientAccount: string
  recipientName: string
  amount: number
  createdAt: Date
}
