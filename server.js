import 'dotenv/config'
import express from 'express'
import mysql from 'mysql2/promise'

const app = express()
const port = Number(process.env.PORT || 3001)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
})

app.get('/api/products', async (_request, response) => {
  try {
    const [products] = await pool.query(
      'SELECT idProducts AS id, product_name AS name, price, Stock AS stock FROM Products ORDER BY idProducts DESC',
    )
    response.json(products)
  } catch (error) {
    console.error('MySQL error:', error.message)
    response.status(500).json({ error: 'No se pudo consultar la tabla products.' })
  }
})

app.listen(port, () => console.log(`API escuchando en http://localhost:${port}`))