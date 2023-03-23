export interface AddStatementUseCaseInputDTO {
  account: string
  transaction: string
  amount: number
  type: string
}

export interface AddStatementUseCaseOutputDTO {
  transaction: string
  amount: number
  type: string
}
