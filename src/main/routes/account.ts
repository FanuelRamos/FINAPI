import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import AccountFacadeFactory from '../../modules/account/factory/account-facade-factory'

export default (router: Router): void => {
  router.post('/account', adaptRoute(AccountFacadeFactory, 'add'))
  router.get('/account', adaptRoute(AccountFacadeFactory, 'find'))
  router.put('/account', adaptRoute(AccountFacadeFactory, 'update'))
  router.post('/account/statement', adaptRoute(AccountFacadeFactory, 'addStatement'))
  router.get('/account/statement', adaptRoute(AccountFacadeFactory, 'findStatement'))
}
