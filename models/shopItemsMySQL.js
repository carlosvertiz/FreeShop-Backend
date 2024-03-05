import mysql from 'mysql2/promise'
import { DB_HOST, DB_NAME, DB_USER, DB_PORT, DB_PASSWORD } from '../config.js'

export const DEFAULT_CONFIG = {
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_NAME,
  typeCast: function (field, next) {
    if (field.type === 'NEWDECIMAL') {
      return Number(field.string());
    }
    return next();
  }
}

const connection = await mysql.createConnection(DEFAULT_CONFIG)

export class ShopModel{

  static async getItems({sortColumn, minPrice, maxPrice, sort = "DESC"}){
    let query = 'SELECT * FROM items WHERE price >= ?';
    if (maxPrice){
      query += "and price <= ?";
    }
    if (sortColumn) {
      if (sort == "ASC"){
        query += ` ORDER BY \`${sortColumn}\` ASC`;
      } else{
        query += ` ORDER BY \`${sortColumn}\` DESC`;
      }
     }

  const [items] = await connection.query(query,[minPrice, maxPrice]);
  return items;
  }

  static async getItem({ids}){
  const [items] = await connection.query(`SELECT * FROM items WHERE id IN (?)`,[ids]);
  return items;
  }

  static async getCategories(){
    const [categories] = await connection.query(
      'SELECT distinct(category) FROM items'
    )
    const categoryNames = categories.map(categoryObject => categoryObject.category);
    return categoryNames
  }

  static async getItemsByCategory({category, sortColumn, minPrice, maxPrice, sort ="DESC"}){
    let query = `SELECT * FROM items WHERE category = ? and price >= ?` ;
    if (maxPrice){
      query += "and price <= ?";
    }
    if (sortColumn) {
      if (sort == "ASC"){
        query += ` ORDER BY \`${sortColumn}\` ASC`;
      } else{
        query += ` ORDER BY \`${sortColumn}\` DESC`;
      }
     }
     const [items] = await connection.query(query, [category, minPrice, maxPrice]);
     return items;
  }


  static async searchItem({search}){
    const [titles] = await connection.query(
      "SELECT * FROM items WHERE title LIKE ? ORDER BY rating_rate DESC",
      [`%${search}%`]
    );

    return {titles}
  }


}
