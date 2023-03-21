import BaseEntity from '../../@shared/domain/entity/base-entity'
import Id from '../../@shared/domain/value-object/id-value-object'
import Statement from '../../@shared/domain/value-object/statement-value-object'
import AccountValidatorFactory from '../factory/account-validator-factory'

interface AccountProps {
  id?: Id
  name: string
  burth: Date
  country: string
  city: string
  address: string
  postalCode: string
  phone: string
  email: string
  statement?: Statement[]
  createdAt?: Date
  updatedAt?: Date
}

export default class AccountEntity extends BaseEntity {
  private _name: string
  private _burth: Date
  private _country: string
  private _city: string
  private _address: string
  private _postalCode: string
  private _phone: string
  private _email: string
  private _statement: Statement[]

  constructor (props: AccountProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._name = props.name
    this._burth = props.burth
    this._country = props.country
    this._city = props.city
    this._address = props.address
    this._postalCode = props.postalCode
    this._phone = props.phone
    this._email = props.email

    this.validate()
  }

  validate (): void {
    AccountValidatorFactory.create().validate(this)
  }

  get name (): string { return this._name }
  get burth (): Date { return this._burth }
  get country (): string { return this._country }
  get city (): string { return this._city }
  get address (): string { return this._address }
  get postalCode (): string { return this._postalCode }
  get phone (): string { return this._phone }
  get email (): string { return this._email }

  set name (value: string) { this._name = value }
  set burth (value: Date) { this._burth = value }
  set country (value: string) { this._country = value }
  set city (value: string) { this._city = value }
  set address (value: string) { this._address = value }
  set postalCode (value: string) { this._postalCode = value }
  set phone (value: string) { this._phone = value }
  set email (value: string) { this._email = value }
}
