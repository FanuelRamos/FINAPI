import BaseEntity from '../../../@shared/domain/entity/base-entity'
import Id from '../../../@shared/domain/value-object/id-value-object'
import TransactionValidatorFactory from '../factory/transaction-validator-factory'

interface TransactionProps {
  id?: Id
  senderAccount: string
  senderName: string
  recipientAccount: string
  recipientName: string
  amount: number
  createdAt?: Date
  updatedAt?: Date
}

export default class TransactionEntity extends BaseEntity {
  private _senderAccount: string
  private _senderName: string
  private _recipientAccount: string
  private _recipientName: string
  private _amount: number

  constructor (props: TransactionProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._senderAccount = props.senderAccount
    this._senderName = props.senderName
    this._recipientAccount = props.recipientAccount
    this._recipientName = props.recipientName
    this._amount = props.amount

    this.validate()
  }

  validate (): void {
    TransactionValidatorFactory.create().validate(this)
  }

  get senderAccount (): string { return this._senderAccount }
  get senderName (): string { return this._senderName }
  get recipientAccount (): string { return this._recipientAccount }
  get recipientName (): string { return this._recipientName }
  get amount (): number { return this._amount }
}
