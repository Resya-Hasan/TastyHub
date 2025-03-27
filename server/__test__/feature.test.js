const request = require('supertest')
const { test, expect, beforeAll, afterAll, describe } = require('@jest/globals')
const app = require('../app')
const { User, Product, Order, Wishlist, Category } = require('../models')
const { signToken } = require('../helpers/jwt')

let accessToken, adminToken, productId

beforeAll(async () => {
    await User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    await Product.destroy({ truncate: true, cascade: true, restartIdentity: true })
    await Order.destroy({ truncate: true, cascade: true, restartIdentity: true })
    await Wishlist.destroy({ truncate: true, cascade: true, restartIdentity: true })
    await Category.destroy({ truncate: true, cascade: true, restartIdentity: true })

    await Category.create({ name: 'Makanan' })

    const user = await User.create({
        "username": "hasan",
        "email": "hasan@gmail.com",
        "password": "hasan123456",
        "role": "user"
    })

    const adminUser = await User.create({
        "username": "admin",
        "email": "admin@gmail.com", 
        "password": "admin123456",
        "role": "admin"
    })

    accessToken = signToken({ id: user.id })
    adminToken = signToken({ id: adminUser.id })

    const product = await Product.create({
        "name": "Nasi Goreng",
        "description": "Nasi goreng spesial",
        "price": 25000,
        "stock": 50,
        "imageUrl": "https://example.com/nasigoreng.jpg",
        "CategoryId": 1
    })
    productId = product.id
})

afterAll(async () => {
    await User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    await Product.destroy({ truncate: true, cascade: true, restartIdentity: true })
    await Order.destroy({ truncate: true, cascade: true, restartIdentity: true })
    await Wishlist.destroy({ truncate: true, cascade: true, restartIdentity: true })
    await Category.destroy({ truncate: true, cascade: true, restartIdentity: true })
})

describe("POST /register", () => {
    test("Registrasi berhasil", async () => {
        const newUser = {
            "username": "newuser",
            "email": "newuser@gmail.com",
            "password": "newuser123456",
        }

        const response = await request(app)
        .post("/register")
        .send(newUser)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id", expect.any(Number))
        expect(response.body).toHaveProperty("username", newUser.username)
        expect(response.body).toHaveProperty("email", newUser.email)
    })

    test("Registrasi gagal - email sudah terdaftar", async () => {
        const existingUser = {
            "username": "hasan",
            "email": "hasan@gmail.com",
            "password": "hasan123456",
        }

        const response = await request(app)
        .post("/register")
        .send(existingUser)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })
})

describe("POST /login", () => {
    test("Login berhasil", async () => {
        const account = {
            "email": "hasan@gmail.com",
            "password": "hasan123456"
        }

        const response = await request(app)
        .post("/login")
        .send(account)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("access_token", expect.any(String))
    })

    test("Login gagal - email tidak diisi", async () => {
        const account = {
            "email": "",
            "password": "hasan123456"
        }

        const response = await request(app)
        .post("/login")
        .send(account)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })

    test("Login gagal - password tidak diisi", async () => {
        const account = {
            "email": "hasan@gmail.com",
            "password": ""
        }

        const response = await request(app)
        .post("/login")
        .send(account)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })

    test("Login gagal - email tidak terdaftar", async () => {
        const account = {
            "email": "tidakterdaftar@gmail.com",
            "password": "hasan123456"
        }

        const response = await request(app)
        .post("/login")
        .send(account)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })

    test("Login gagal - password salah", async () => {
        const account = {
            "email": "hasan@gmail.com",
            "password": "salahpassword"
        }

        const response = await request(app)
        .post("/login")
        .send(account)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })
})

describe("GET /products", () => {
    test("Mendapatkan semua produk", async () => {
        const response = await request(app).get("/products")

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body[0]).toHaveProperty("id", expect.any(Number))
        expect(response.body[0]).toHaveProperty("name", expect.any(String))
        expect(response.body[0]).toHaveProperty("description", expect.any(String))
        expect(response.body[0]).toHaveProperty("price", expect.any(Number))
        expect(response.body[0]).toHaveProperty("stock", expect.any(Number))
        expect(response.body[0]).toHaveProperty("imageUrl", expect.any(String))
        expect(response.body[0]).toHaveProperty("CategoryId", expect.any(Number))
    })

    test("Mendapatkan produk berdasarkan ID", async () => {
        const response = await request(app).get(`/products/${productId}`)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id", productId)
        expect(response.body).toHaveProperty("name", expect.any(String))
        expect(response.body).toHaveProperty("description", expect.any(String))
        expect(response.body).toHaveProperty("price", expect.any(Number))
        expect(response.body).toHaveProperty("stock", expect.any(Number))
        expect(response.body).toHaveProperty("imageUrl", expect.any(String))
        expect(response.body).toHaveProperty("CategoryId", expect.any(Number))
    })

    test("Mendapatkan produk dengan ID tidak valid", async () => {
        const response = await request(app).get("/products/9999")

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })
})

describe("POST /products", () => {
    test("Tambah produk baru (Admin)", async () => {
        const newProduct = {
            "name": "Bakso Spesial",
            "description": "Bakso dengan bumbu rahasia",
            "price": 20000,
            "stock": 30,
            "imageUrl": "https://example.com/bakso.jpg",
            "CategoryId": 1
        }

        const response = await request(app)
        .post("/products")
        .send(newProduct)
        .set("Authorization", `Bearer ${adminToken}`)

        expect(response.status).toBe(201)
        expect(response.body.message).toBe("Product added successfully")
    })

    test("Tambah produk gagal - belum login", async () => {
        const newProduct = {
            "name": "Bakso Spesial",
            "description": "Bakso dengan bumbu rahasia",
            "price": 20000,
            "stock": 30,
            "imageUrl": "https://example.com/bakso.jpg",
            "CategoryId": 1
        }

        const response = await request(app)
        .post("/products")
        .send(newProduct)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })

    test("Tambah produk gagal - bukan admin", async () => {
        const newProduct = {
            "name": "Bakso Spesial",
            "description": "Bakso dengan bumbu rahasia",
            "price": 20000,
            "stock": 30,
            "imageUrl": "https://example.com/bakso.jpg",
            "CategoryId": 1
        }

        const response = await request(app)
        .post("/products")
        .send(newProduct)
        .set("Authorization", `Bearer ${accessToken}`)

        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })
})

describe("POST /order", () => {
    test("Membuat pesanan baru", async () => {
        const newOrder = {
            "items": [
                {
                    "ProductId": productId,
                    "quantity": 2
                }
            ]
        }

        const response = await request(app)
        .post("/order")
        .send(newOrder)
        .set("Authorization", `Bearer ${accessToken}`)

        expect(response.status).toBe(201)
        expect(response.body.message).toBe("Order created successfully")
        expect(response.body.order).toHaveProperty("id", expect.any(Number))
        expect(response.body.order).toHaveProperty("totalPrice", expect.any(Number))
        expect(response.body.order).toHaveProperty("status", expect.any(String))
    })

    test("Membuat pesanan gagal - belum login", async () => {
        const newOrder = {
            "items": [
                {
                    "ProductId": productId,
                    "quantity": 2
                }
            ]
        }

        const response = await request(app)
        .post("/order")
        .send(newOrder)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })
})

describe("POST /wishlist/:productId", () => {
    test("Menambahkan produk ke wishlist", async () => {
        const response = await request(app)
        .post(`/wishlist/${productId}`)
        .set("Authorization", `Bearer ${accessToken}`)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("UserId", expect.any(Number))
        expect(response.body).toHaveProperty("ProductId", productId)
    })

    test("Menambahkan produk ke wishlist gagal - belum login", async () => {
        const response = await request(app)
        .post(`/wishlist/${productId}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })
})

describe("DELETE /wishlist/:productId", () => {
    test("Menghapus produk dari wishlist", async () => {
        await request(app)
        .post(`/wishlist/${productId}`)
        .set("Authorization", `Bearer ${accessToken}`)

        const response = await request(app)
        .delete(`/wishlist/${productId}`)
        .set("Authorization", `Bearer ${accessToken}`)

        expect(response.status).toBe(200)
        expect(response.body.message).toBe("Wishlist deleted successfully")
    })

    test("Menghapus produk dari wishlist gagal - belum login", async () => {
        const response = await request(app)
        .delete(`/wishlist/${productId}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })
})

describe("GET /ai/recommend", () => {
    test("Mendapatkan rekomendasi produk dari AI", async () => {
        const response = await request(app).get("/ai/recommend")

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
        if (response.body.length > 0) {
            expect(response.body[0]).toHaveProperty("name", expect.any(String))
            expect(response.body[0]).toHaveProperty("description", expect.any(String))
            expect(response.body[0]).toHaveProperty("price", expect.any(Number))
            expect(response.body[0]).toHaveProperty("stock", expect.any(Number))
            expect(response.body[0]).toHaveProperty("imageUrl", expect.any(String))
            expect(response.body[0]).toHaveProperty("CategoryId", expect.any(Number))
        }
    })
})

describe("GET /image", () => {
    test("Mendapatkan gambar dari Unsplash", async () => {
        const response = await request(app)
        .get("/images")
        .query({ query: "food" })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("imageUrl", expect.any(String))
    })

    test("Mendapatkan gambar gagal - query kosong", async () => {
        const response = await request(app)
        .get("/images")
        .query({ query: "" })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message", expect.any(String))
    })
})