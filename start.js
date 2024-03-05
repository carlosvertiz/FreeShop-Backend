import express, {json} from 'express'
import {PORT} from './config.js'
import {createShopRouter} from './routers/api.js'

export const createApp = ({shopModel}) => {
  const app = express()
  app.use(json())


  app.disable("x-powered-by")
  app.use('/products', createShopRouter({shopModel}))

  const server = app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${server.address().port}`)
  })
}