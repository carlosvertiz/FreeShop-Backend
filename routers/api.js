import {Router} from 'express'
import cors from 'cors'
import {ShopControllers} from '../controllers/shopControllers.js'

export function createShopRouter({shopModel}){
  const shopRouter = Router()
  const shopControllers = new ShopControllers({shopModel})


  shopRouter.use(cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:5173',
        "https://freeshoptribute.netlify.app"
      ]
      if (ACCEPTED_ORIGINS.includes(origin)){
        return callback(null, true)
      }
      if (!origin){
        return callback(null, true)
      }
      return callback(new Error("Not Allowed by CORS"))
    }
  }))

  shopRouter.get('/category', shopControllers.getItemsByCategory)
  shopRouter.get('/categories', shopControllers.getCategories)
  shopRouter.get('/:id', shopControllers.getItem)
  shopRouter.get('/search/:search', shopControllers.searchItem)
  shopRouter.get('/', shopControllers.getItems)



  return shopRouter

} 
