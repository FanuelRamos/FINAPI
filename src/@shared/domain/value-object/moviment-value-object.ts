import Id from './id-value-object'
import ValueObjectInterface from './value-object-interface'

type MovimentProps = {
  id: Id
  amount: number
  type: string
}

export default class Moviment implements ValueObjectInterface {
  private _id: Id
  private _amount: number
  private _type: string

  constructor (id: Id, amount: number, type: string) {
    this._id = id
    this._amount = amount
    this._type = type
  }

  get id (): Id { return this._id }
  get amount (): number { return this._amount }
  get type (): string { return this._type }
}
