import express from 'express'
import {getHome, getAbout, getContactForm, movieInput}  from '../controllers/apiController.js'
const router = express.Router()

router.get("/", getHome)
router.get("/about", getAbout)
router.get("/contact", getContactForm)
router.get("/movie", movieInput)


export default router