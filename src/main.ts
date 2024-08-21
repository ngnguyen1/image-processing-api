import express, { Request, Response } from 'express'
import routes from './routes'

const app = express()
const port = 3000

app.get('/_healthcheck', (req: Request, res: Response) => {
  res.status(200).send({
    product: 'image-processing-api',
    env: 'dev',
  })
})

app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// Exporting app to use it in the unit testing
export default app
