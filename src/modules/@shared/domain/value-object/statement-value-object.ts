import Id from './id-value-object'
import ValueObjectInterface from './value-object-interface'

type StatementProps = {
  transaction: string
  amount: number
  type: string
}

export default class Statement implements ValueObjectInterface {
  private _transaction: Id
  private _amount: number
  private _type: string
  private _createdAt: Date

  constructor (props: StatementProps) {
    this._transaction = new Id(props.transaction)
    this._amount = props.amount
    this._type = props.type
    this._createdAt = new Date()
  }

  get transaction (): Id { return this._transaction }
  get amount (): number { return this._amount }
  get type (): string { return this._type }
  get createdAt (): Date { return this._createdAt }
}
