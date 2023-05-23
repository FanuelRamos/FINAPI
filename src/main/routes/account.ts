import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import AccountFacadeFactory from '../../modules/account/factory/account-facade-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(AccountFacadeFactory, 'add'))
}
