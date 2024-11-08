const Users = require('../models/users')
const express = require('express')
const router = express.Router()
const Joi = require('joi')
const config = require('config')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    staff: Joi.number().required(),
    branch: Joi.number().required(),
    userRole: Joi.string().allow(''),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await Users.insertUser(
    req.body.username,
    req.body.password,
    req.body.staff,
    req.body.branch,
    req.body.userRole,
  )
  let token = jwt.sign(req.body, 'myshhhh', { expiresIn: '3h' })
  res.json(token)
})

router.put('/:id/:password', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    id: Joi.string().required(),
    password: Joi.string().required(),
  })
  const { error } = schema.validate(req.params)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await Users.changePassword(req.params.id, req.params.password)
  let token = jwt.sign(req.body, 'myshhhh', { expiresIn: '3h' })
  res.json(token)
})

router.get('/allusers', (request, response) => {
  users.getAllUsers().then((result) => {
    console.log(result[0])
    response.json(result[0])
  })
})

router.get('/userbynamepass/:UserName/:Password', (request, response) => {
  users
    .getUserByUserPassword(request.params.UserName, request.params.Password)
    .then((result) => {
      // console.log(result[0])
      response.json(result[0])
    })
})

module.exports = router
