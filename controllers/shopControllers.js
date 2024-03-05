export class ShopControllers {
  constructor({shopModel}){
    this.shopModel = shopModel
  }

  getItems = async(req, res) => {
    const minPrice = req.query.minPrice?? ""
    const maxPrice = req.query.maxPrice ?? ""
    const sortColumn = req.query.sortColumn?? ""
    const sort = req.query.sort?? "" 
    const items = await this.shopModel.getItems({sortColumn, sort, minPrice, maxPrice})
    return res.json(items)
  }


  getCategories = async(req, res) => {
    const categories = await this.shopModel.getCategories()
    return res.json(categories)
  }
  


  getItemsByCategory = async(req, res) => {
    const minPrice = req.query.minPrice 
    const maxPrice = req.query.maxPrice 
    const category = req.query.category
    const sortColumn = req.query.sortColumn
    const sort = req.query.sort
    const items = await this.shopModel.getItemsByCategory({category, sortColumn, sort, minPrice, maxPrice})
    return res.json(items)
  }

  getItem = async(req, res) => {
    const id = req.params.id
    const ids = id.split('-');
    const items = await this.shopModel.getItem({ids})
    return res.json(items)
  }

  searchItem = async(req, res) => {
    const search  = req.params.search
    const {titles} = await this.shopModel.searchItem({search})
    return res.json(titles)
  }

}