import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../api/http";
import handleApiError from "../api/handleError";
import Swal from "sweetalert2";

const UNSPLASH_ACCESS_KEY = "lkhiuTWrcJ1K8SReK6M1Q7pqHnN2wRorsA6ysCekcgg";

const EditProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [CategoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);

    const fetchProduct = async () => {
        try {
            const { data } = await http.get(`/products/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
            });

            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
            setStock(data.stock);
            setImageUrl(data.imageUrl);
            setCategoryId(data.CategoryId);
        } catch (error) {
            handleApiError(error);
        }
    };

    const fetchUnsplashImage = async () => {
        if (!name.trim()) {
            Swal.fire({
                title: "The Internet?",
                text: "Masukkan nama produk terlebih dahulu!",
                icon: "question"
              });
            return;
        }

        try {
            const response = await fetch(
                `https://api.unsplash.com/photos/random?query=${encodeURIComponent(name)}&client_id=${UNSPLASH_ACCESS_KEY}`
            );
            const data = await response.json();

            if (data && data.urls && data.urls.regular) {
                setImageUrl(data.urls.regular);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Gambar tidak ditemukan, coba kata kunci lain.",
                  });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Gagal menampilkan gambar, coba lagi nanti.",
              });
        }
    };

    useEffect(() => {
        const categories = [
            { id: 1, name: "Main Course" },
            { id: 2, name: "Dessert" },
            { id: 3, name: "Drinks" }
        ];
        setCategories(categories);

        fetchProduct();
    }, [id]);

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        if (!name || !description || !price || !stock || !imageUrl || !CategoryId) {
            Swal.fire("Harap isi semua kolom sebelum mengupdate produk.");
            return;
        }

        try {
            await http.put(`/products/${id}`,
                { name, description, price: parseInt(price), stock: parseInt(stock), imageUrl, CategoryId },
                { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
            );

            Swal.fire({
                title: "Produk berhasil diperbarui!",
                icon: "success",
                draggable: true
              });
            navigate("/products");
        } catch (error) {
            handleApiError(error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Edit Produk</h2>
            <form onSubmit={handleUpdateProduct}>
                <div className="mb-3">
                    <label className="form-label">Nama Produk</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Harga</label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Stok</label>
                    <input
                        type="number"
                        className="form-control"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Kategori</label>
                    <select
                        className="form-select"
                        value={CategoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="">Pilih Kategori</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Gambar Produk</label>
                    <input
                        type="text"
                        className="form-control"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    {imageUrl && <img src={imageUrl} alt="Product" width="100" className="border rounded mt-2" />}
                    <button type="button" className="btn btn-info mt-2" onClick={fetchUnsplashImage}>
                        Ambil Gambar dari Unsplash
                    </button>
                </div>

                <button type="submit" className="btn btn-success">Update Produk</button>
            </form>
        </div>
    );
};

export default EditProductPage;
