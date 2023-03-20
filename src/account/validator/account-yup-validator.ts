import ValidatorInterface from '../../@shared/validators/validator-interface'
import Account from '../entity/account-entity'
import * as yup from 'yup'

export default class AccoutYupValidator implements ValidatorInterface<Account> {
  validate (entity: Account): void {
    try {
      yup
        .object()
        .shape({
          name: yup.string().required('Name is required'),
          burth: yup.date().required('burth is required'),
          country: yup.string().required('Country is required'),
          city: yup.string().required('City is required'),
          address: yup.string().required('Address is required'),
          postalCode: yup.string().required('Postal Code is required'),
          phone: yup.string().required('Phone is required'),
          email: yup.string().email().required('Email is required'),
          password: yup.string().required('Password is required')
        })
        .validateSync(
          {
            name: entity.name,
            burth: entity.burth,
            country: entity.country,
            city: entity.city,
            address: entity.address,
            postalCode: entity.postalCode,
            phone: entity.phone,
            email: entity.email,
            password: entity.password
          },
          {
            abortEarly: false
          }
        )
    } catch (errors) {
      const e = errors as yup.ValidationError
      e.errors.forEach((error) => {
        console.log(error)
      })
    }
  }
}
