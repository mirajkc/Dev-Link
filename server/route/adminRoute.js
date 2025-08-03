import express from 'express'
import { adminAuth } from '../middleware/adminAuthMiddleware.js'
import { adminLogin, autoLogin, logout } from '../controller/adminController.js'
const adminRoute = express.Router()


//api/admin/login
adminRoute.post('/login', adminLogin)

//api/admin/autologin
adminRoute.get('/authenticate', adminAuth, autoLogin )

//api/admin/logout 
adminRoute.get('/logout', adminAuth , logout)
export default adminRoute