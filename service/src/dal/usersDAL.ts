import mysql from 'mysql2/promise'
import { v4 as uuidv4 } from 'uuid'

export interface User {
  id?: string
  password: string
  email: string
}

export class UsersDAL {
  pool: mysql.Pool

  constructor() {
    this.pool = mysql.createPool({
      host: 'localhost',
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      connectionLimit: 10,
    })
  }

  // private pool = mysql.createPool({
  //   host: 'localhost',
  //   user: process.env.MYSQL_USER,
  //   password: process.env.MYSQL_PASSWORD,
  //   database: process.env.MYSQL_DATABASE,
  //   waitForConnections: true,
  //   connectionLimit: 10,
  //   queueLimit: 0,
  // })

  public async getUsers() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users'
      this.pool.query(query, (error, results) => {
        if (error)
          reject(error)
        else
          resolve(results)
      })
    })
  }

  async getAllUsers(): Promise<any[]> {
    const connection = await this.pool.getConnection()
    const [rows, fields] = await connection.query('SELECT * FROM users')
    connection.release()
    return rows
  }

  async getUserById(id: number): Promise<any> {
    const connection = await this.pool.getConnection()
    const [rows, fields] = await connection.query('SELECT * FROM users WHERE id = ?', [id])
    connection.release()
    return rows[0]
  }

  async createUser(user: User): Promise<number> {
    const uuid = uuidv4()
    user.id = uuid
    const connection = await this.pool.getConnection()
    const [result] = await connection.query('INSERT INTO users SET ?', [user])
    connection.release()
    return result.insertId
  }

  public async getUserByEmail(email: string): Promise<any> {
    const connection = await this.pool.getConnection()
    const [rows, fields] = await connection.query('SELECT * FROM users WHERE email = ?', [email])
    connection.release()
    console.log(`getUserByEmail:${rows}`)
    return rows[0]
  }

  async updateUser(id: number, name: string, email: string): Promise<void> {
    const connection = await this.pool.getConnection()
    await connection.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id])
    connection.release()
  }

  async deleteUser(id: number): Promise<void> {
    const connection = await this.pool.getConnection()
    await connection.query('DELETE FROM users WHERE id = ?', [id])
    connection.release()
  }
}

export default UsersDAL
