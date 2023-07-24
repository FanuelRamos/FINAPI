import Id from '../../../../@shared/domain/value-object/id-value-object'

export interface AddTransactionUseCaseInputDTO {
  senderAccount: string
  senderName: string
  recipientAccount: string
  recipientName: string
  amount: number
}

export interface AddTransactionUseCaseOutputDTO {
  id: string
  senderAccount: string
  senderName: string
  recipientAccount: string
  recipientName: string
  amount: number
  createdAt: Date
  updatedAt: Date
}
