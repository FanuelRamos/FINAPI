import Id from '../../../@shared/domain/value-object/id-value-object'

export interface AddTransactionUseCaseInputDTO {
  senderAccount: string
  senderName: string
  recipientAccount: string
  recepientName: string
  amount: number
}

export interface AddTransactionUseCaseOutputDTO {
  id?: Id
  senderAccount: string
  senderName: string
  recipientAccount: string
  recepientName: string
  amount: number
  createdAt?: Date
  updatedAt?: Date
}
