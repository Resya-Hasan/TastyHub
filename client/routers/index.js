const express = require('express')
const router = express.Router()

const ProductController = require('../controllers/controllProduct')

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get('/menus', ProductController.getProducts)
router.get('/menus/:id', ProductController.getProductById)

// ├── GET /menus → Lihat semua menu makanan
// ├── GET /menus/:id → Lihat detail menu makanan
// ├── GET /menus?search=burger → Cari menu berdasarkan keyword
// ├── GET /menus?category=drinks → Filter menu berdasarkan kategori
// ├── POST /wishlist/:menuId → Tambah menu ke wishlist
// ├── DELETE /wishlist/:menuId → Hapus menu dari wishlist
// ├── POST /order → Buat order baru
// └── GET /order/history → Lihat riwayat order

module.exports = router