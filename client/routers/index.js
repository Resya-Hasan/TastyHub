const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/controllProduct')
const controllUser = require('../controllers/controllUser')
const authentication = require('../middleware/authentication')
const ControllOrder = require('../controllers/controllOrder')
const adminOnly = require('../middleware/adminOnly')

router.post('/register', controllUser.register)
router.post('/login', controllUser.login)

router.use(authentication)

router.get('/menus', ProductController.getProducts)
router.get('/menus/:id', ProductController.getProductById)
router.post('/order', ControllOrder.createOrder)

router.use(adminOnly)

router.post('/menus', ProductController.addProduct)
router.put('/menus/:id', ProductController.editProduct)

// ├── GET /menus → Lihat semua menu makanan (admin view)
// ├── POST /menus → Tambah menu baru
// ├── GET /menus/:id → Lihat detail menu
// ├── PUT /menus/:id → Edit menu
// ├── DELETE /menus/:id → Hapus menu
// ├── GET /orders → Lihat semua order yang masuk
// ├── PUT /orders/:id/status → Update status pesanan (diproses/dikirim/selesai)
// └── GET /dashboard → Statistik penjualan (opsional kalau sempat)

module.exports = router