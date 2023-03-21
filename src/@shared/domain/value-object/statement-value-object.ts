import Id from './id-value-object'
import ValueObjectInterface from './value-object-interface'

type StatementProps = {
  id: Id
  amount: number
  type: string
}

export default class Statement implements ValueObjectInterface {
  private _id: Id
  private _amount: number
  private _type: string

  constructor (props: StatementProps) {
    this._id = props.id
    this._amount = props.amount
    this._type = props.type
  }

  get id (): Id { return this._id }
  get amount (): number { return this._amount }
  get type (): string { return this._type }
}
