const Staff = require('../models/staff')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const sharp = require('sharp')
const Joi = require('joi')

const upload = multer({
  limits: {
    files: 1, // allow only 1 file per request
    fileSize: 200 * 200, // 1 MB (max file size)
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please Upload a jpg,jpeg or png file'))
    }
    cb(undefined, true)
  },
})

router.post('/', upload.single('picture'), async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    title: Joi.string().allow(''),
    firstName: Joi.string().required().label('FirstName'),
    lastName: Joi.string().required().label('lastName'),
    otherName: Joi.string().allow(''),
    gender: Joi.string().required().label('Gender'),
    nationality: Joi.string().allow(''),
    staffCode: Joi.string().required().label('StaffCode'),
    position: Joi.string().allow(''),
    marritalStatus: Joi.string().allow(''),
    picture: Joi.any(),
    dob: Joi.date().allow(''),
    phone: Joi.string().required().label('Phone'),
    nationalId: Joi.string().required().label('National ID'),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const buff = await sharp(req.file.buffer)
    .resize({ width: 130, height: 160 })
    .png()
    .toBuffer()
  const result = await Staff.insertStaff(
    req.body.title,
    req.body.firstName,
    req.body.lastName,
    req.body.otherName,
    req.body.gender,
    req.body.nationality,
    req.body.staffCode,
    req.body.position,
    req.body.marritalStatus,
    buff,
    req.body.dob,
    req.body.phone,
    req.body.nationalId,
  )
  res.json(result[0])
})

router.get('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')

  const results = await Staff.getAllStaff()
  //res.send(results[0])
  res.json(results[0])
})

module.exports = router
