import { Request, Response } from 'express'

import * as personService from './people.service'
import { getErrorMessage } from '../../../utils/errors.util'

export const getAllPeople = async (req: Request, res: Response) => {
  try {
    const people = await personService.getAllPeople()
    res.json({ data: { people } })
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) })
  }
}

export const createPerson = async (req: Request, res: Response) => {
  try {
    const person = await personService.createPerson(req.body)
    res.status(201).json({ data: { person } })
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) })
  }
}

export const getPersonById = async (req: Request, res: Response) => {
  try {
    const person = await personService.getPersonById(req.params.id)
    res.json({ data: { person } })
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) })
  }
}

export const updatePerson = async (req: Request, res: Response) => {
  try {
    await personService.updatePerson(req.params.id, req.body)
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) })
  }
}

export const deletePerson = async (req: Request, res: Response) => {
  try {
    await personService.deletePerson(req.params.id)
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ error: getErrorMessage(err) })
  }
}
