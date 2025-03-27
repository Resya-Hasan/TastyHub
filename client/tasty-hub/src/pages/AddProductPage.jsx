import { useState, useEffect } from "react";
import http from "../api/http";
import handleApiError from "../api/handleError";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageQuery, setImageQuery] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [loadingImage, setLoadingImage] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const categories = [
            {
                id: 1,
                name: "Main Cource",
            },
            {
                id: 2,
                name: "Dessert",
            },
            {
                id: 3,
                name: "Drinks",
            }
        ]
        setCategories(categories);
    }, []);

    const handleGetImage = async () => {
        if (!imageQuery) {
            Swal.fire("Masukkan kata kunci gambar terlebih dahulu!");
            return;
        }

        setLoadingImage(true);
        try {
            const response = await http.get(`/images?query=${imageQuery}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
            });
            setImageUrl(response.data.imageUrl);
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoadingImage(false);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!name || !price || !stock || !imageUrl || !description || !categoryId) {
            Swal.fire("Harap isi semua kolom.");
            return;
        }

        try {
            await http.post("/products",
                {
                    name,
                    price: parseInt(price),
                    stock: parseInt(stock),
                    description,
                    imageUrl,
                    CategoryId: parseInt(categoryId)
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
            );
            Swal.fire({
                title: "Produk berhasil ditambahkan!",
                icon: "success",
                draggable: true
            });
            setName("");
            setPrice("");
            setStock("");
            setDescription("");
            setImageUrl("");
            setImageQuery("");
            setCategoryId("");

            navigate("/products");
        } catch (error) {
            handleApiError(error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Tambah Produk</h2>
            <form onSubmit={handleAddProduct}>
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
                    <label className="form-label">Deskripsi</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Kategori</label>
                    <select
                        className="form-control"
                        value={categoryId}
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
                    <div className="d-flex align-items-center">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Masukkan kata kunci gambar"
                            value={imageQuery}
                            onChange={(e) => setImageQuery(e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-info"
                            onClick={handleGetImage}
                            disabled={loadingImage}
                        >
                            {loadingImage ? "Mengambil..." : "Cari Gambar"}
                        </button>
                    </div>
                    {imageUrl && <img src={imageUrl} alt="Product" width="100" className="border rounded mt-2" />}
                </div>

                <button type="submit" className="btn btn-primary">Tambah Produk</button>
            </form>
        </div>
    );
};

export default AddProductPage;
