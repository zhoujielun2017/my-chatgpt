import express from 'express'
import type { User } from '../dal/usersDAL'
import { UsersDAL } from '../dal/usersDAL'

const router = express.Router()
const usersDAL = new UsersDAL()

router.post('/login', async (req, res) => {
  // res.send('成功创建一个新用户')
  const { email, password } = req.body
  console.log(`email1:${email}`)
  const user1 = await usersDAL.getUserByEmail(email)
  console.log(`email2:${email}`)
  if (user1 && user1.password === password) {
    res.cookie('m', email, { maxAge: 7 * 24 * 60 * 60 * 1000 })
    res.json({
      status: 'success',
      data: {

      },
    })
  }
  else {
    res.json({
      status: 'fail',
      message: 'login error',
    })
  }
})

router.post('/reg', (req, res) => {
  const { email, password } = req.body
  const user: User = {
    email,
    password,
  }
  usersDAL.createUser(user)
  res.cookie('m', email, { maxAge: 7 * 24 * 60 * 60 * 1000 })
  res.json({
    status: 'success',
    data: {

    },
  })
})

router.post('/hadLogin', (req, res) => {
  const cmail = req.cookies.m
  if (cmail) {
    res.cookie('m', cmail, { maxAge: 7 * 24 * 60 * 60 * 1000 })
    res.json({
      status: 'success',
      data: {
        email: cmail,
      },
    })
  }
  else {
    res.json({
      status: 'fail',
      message: 'User not logged in!',
    })
  }
})

export default router
