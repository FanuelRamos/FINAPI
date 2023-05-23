import { Request, Response } from 'express'

export const adaptRoute = (moduleFactory: any, method: string): any => {
  const factory = moduleFactory.create()
  return async (request: Request, response: Response) => {
    try {
      const resultReturned = await factory[method](request.body)
      response.status(200).json(resultReturned)
    } catch (error) {
      response.status(400).json(error)
    }
  }
}