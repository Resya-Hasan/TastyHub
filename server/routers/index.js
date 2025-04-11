const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/controllProduct')
const controllUser = require('../controllers/controllUser')
const ControllWishlist = require('../controllers/controllWishlist')
const authentication = require('../middleware/authentication')
const ControllOrder = require('../controllers/controllOrder')
const adminOnly = require('../middleware/adminOnly')

router.post('/register', controllUser.register)
router.post('/login', controllUser.login)
router.post('/login/google', controllUser.googleLogin)

router.use(authentication)

router.get('/products', ProductController.getProducts)
router.get('/products/:id', ProductController.getProductById)
router.post('/order', ControllOrder.createOrder)
router.post('/wishlist/:productId', ControllWishlist.addWishlist)
router.delete('/wishlist/:productId', ControllWishlist.deleteWishlist)
router.get('/ai/recommend', ProductController.recommendProduct)

router.use(adminOnly)

router.post('/products', ProductController.addProduct)
router.put('/products/:id', ProductController.editProduct)
router.delete('/products/:id', ProductController.deleteProduct)
router.get('/orders', ControllOrder.getOrders)
router.put('/orders/:id/status', ControllOrder.updateOrderStatus)
router.get('/images', ProductController.getImages)

module.exports = router