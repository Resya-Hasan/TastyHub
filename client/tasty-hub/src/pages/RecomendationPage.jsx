import { useEffect, useState } from "react";
import http from "../api/http";
import Swal from 'sweetalert2'

const RecommendationPage = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [preference, setPreference] = useState("makanan enak dan populer");
    const [error, setError] = useState(null);

    const fetchRecommendations = async () => {
        try {
            const { data } = await http({
                method: "get",
                url: "/ai/recommend",
                params: { preference },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            setRecommendations(data);
        } catch (err) {
            setError("Gagal mengambil rekomendasi. Coba lagi nanti.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Rekomendasi Makanan AI</h2>
            <div className="mb-3">
                <label className="form-label">Preferensi Anda</label>
                <input
                    type="text"
                    className="form-control"
                    value={preference}
                    onChange={(e) => setPreference(e.target.value)}
                />
                <button className="btn btn-primary mt-2" onClick={fetchRecommendations}>
                    Dapatkan Rekomendasi
                </button>
            </div>

            <div className="row">
                {recommendations.map((product, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="card mb-3">
                            <img src={product.imageUrl} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text"><strong>Harga:</strong> {product.price} IDR</p>
                                <p className="card-text"><strong>Stok:</strong> {product.stock}</p>
                                <p className="card-text"><strong>Kategori:</strong> {product.CategoryId}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendationPage;
