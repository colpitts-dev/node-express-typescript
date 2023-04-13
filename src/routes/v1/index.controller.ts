import { Request, Response } from 'express'

export function getIndex(req: Request, res: Response) {
  return res.json({
    title: 'hyper[local]',
    content: 'community engagement platform',
  })
}
