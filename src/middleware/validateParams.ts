import { Request, Response, NextFunction } from 'express'
import fs from 'fs'

const validateParams = (req: Request, res: Response, next: NextFunction) => {
  const widthQuery = req.query.width
  const heightQuery = req.query.height
  const filename = req.query.filename

  if (!widthQuery) {
    return res.status(400).json({ error: 'Missing required parameter: width' })
  }

  if (!heightQuery) {
    return res.status(400).json({ error: 'Missing required parameter: height' })
  }

  if (!Number.isFinite(Number(widthQuery))) {
    return res
      .status(400)
      .json({ error: 'Invalid parameter: width must be a number' })
  }

  if (!Number.isFinite(Number(heightQuery))) {
    return res
      .status(400)
      .json({ error: 'Invalid parameter: height must be a number' })
  }

  if (!filename) {
    return res
      .status(400)
      .json({ error: 'Missing required parameter: filename' })
  }

  const assetsDir = `${process.cwd()}/assets/full`
  if (!fs.existsSync(`${assetsDir}/${filename}`)) {
    return res
      .status(400)
      .json({ error: 'Invalid parameter: filename does not exist' })
  }

  // If the validation passes, call next() to proceed to the next middleware or route handler
  next()
}

export default validateParams
