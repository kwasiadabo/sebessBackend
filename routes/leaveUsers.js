const LeaveUsers = require('../models/leaveUsers')
const express = require('express')
const router = express.Router()
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    staffId: Joi.string().required(),
    controllerId: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  try {
    const result = await LeaveUsers.insertUser(
      req.body.staffId,
      req.body.controllerId,
      req.body.email,
      req.body.password,
    )
    console.log(req.body)
    let token = jwt.sign(req.body, 'myshhhh', { expiresIn: '3h' })
    res.json(token)
  } catch (err) {
    return res.send(err)
  }
})

router.put('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await LeaveUsers.changePassword(
    req.body.email,
    req.body.password,
  )
  //let token = jwt.sign(req.body, 'myshhhh', { expiresIn: '3h' })
  res.json(result)
})

router.get('/', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  LeaveUsers.getUsers().then((result) => {
    response.json(result)
  })
})

router.get('/userbynamepass/:email/:Password', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  LeaveUsers.getUserByUserPassword(
    request.params.email,
    request.params.Password,
  ).then((result) => {
    console.log(result[0])
    response.json(result[0])
  })
})

module.exports = router
