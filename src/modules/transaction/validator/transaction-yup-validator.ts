import ValidatorInterface from '../../@shared/validators/validator-interface'
import Transaction from '../entity/transaction-entity'
import * as yup from 'yup'

export default class TransactionYupValidator implements ValidatorInterface<Transaction> {
  validate (entity: Transaction): void {
    try {
      yup
        .object()
        .shape({
          senderAccount: yup.string().required('Sender Account is required'),
          senderName: yup.string().required('Sender Name is required'),
          recipientAccount: yup.string().required('Recipient Account is required'),
          recepientName: yup.string().required('Recipient Name is required'),
          amount: yup.number()
            .min(100, 'A minimum of 100 is required to make a transaction')
            .max(250000, 'A maximum of 250.000 is allowed to make a transaction')
            .required('Amount is required')
        })
        .validateSync(
          {
            senderAccount: entity.senderAccount,
            senderName: entity.senderName,
            recipientAccount: entity.recipientAccount,
            recepientName: entity.recipientName,
            amount: entity.amount
          },
          {
            abortEarly: false
          }
        )
    } catch (errors) {
      const e = errors as yup.ValidationError
      e.errors.forEach((error) => {
        throw new Error(error)
      })
    }
  }
}
