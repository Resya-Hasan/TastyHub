const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/controllProduct')
const controllUser = require('../controllers/controllUser')
const authentication = require('../middleware/authentication')

router.post('/register', controllUser.register)
router.post('/login', controllUser.login)

router.use(authentication)

router.get('/menus', ProductController.getProducts)
router.get('/menus/:id', ProductController.getProductById)
// router.post('/order', ProductController.addOrder)

// ├── GET /menus → Lihat semua menu makanan
// ├── GET /menus/:id → Lihat detail menu makanan
// ├── GET /menus?search=burger → Cari menu berdasarkan keyword
// ├── GET /menus?category=drinks → Filter menu berdasarkan kategori
// ├── POST /wishlist/:menuId → Tambah menu ke wishlist
// ├── DELETE /wishlist/:menuId → Hapus menu dari wishlist
// ├── POST /order → Buat order baru
// └── GET /order/history → Lihat riwayat order

module.exports = router