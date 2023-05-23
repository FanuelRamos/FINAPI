import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import TransactionFacadeFactory from '../../modules/transaction/factory/transaction-facade-factory'

export default (router: Router): void => {
  router.post('/transaction', adaptRoute(TransactionFacadeFactory, 'add'))
  router.get('/transaction', adaptRoute(TransactionFacadeFactory, 'find'))
}
