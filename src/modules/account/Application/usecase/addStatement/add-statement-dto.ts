import Id from '../../../../@shared/domain/value-object/id-value-object'

export interface AddStatementUseCaseOutputDTO {
  transaction: string
  amount: number
  type: string
  createdAt: Date
}

export { AddStatementUseCaseInputDTO } from '../../gateway/account-gateway'
