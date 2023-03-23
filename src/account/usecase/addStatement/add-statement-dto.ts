export interface AddStatementUseCaseInputDTO {
  account: string
  trasaction: string
  amount: number
  type: string
}

export interface AddStatementUseCaseOutputDTO {
  trasaction: string
  amount: number
  type: string
}
