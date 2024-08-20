import express, { Request, Response } from 'express'
import routes from './routes'

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!')
})

app.use('/api', routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// Exporting app to use it in the unit testing
export default app
