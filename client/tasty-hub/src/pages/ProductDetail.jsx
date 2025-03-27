import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../api/http";
import handleApiError from "../api/handleError";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    const fetchProductById = async () => {
        try {
            const response = await http({
                method: "get",
                url: `/products/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            setProduct(response.data);
        } catch (error) {
            handleApiError(error);
        }
    }

    const handleOrder = async () => {
        try {
            const response = await http.post("/order", {
                items: [
                    {
                        ProductId: product.id,
                        quantity: 1
                    }
                ]
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });

            alert("Order berhasil!");
        } catch (error) {
            handleApiError(error);
        }
    };

    const handleUpdate =  () => {
        navigate(`/edit-product/${id}`)
    }

    useEffect(() => {
        fetchProductById()
    }, []);

    if (!product) return <h2 className="text-center my-5">Loading...</h2>;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <img src={product.imageUrl} className="img-fluid" alt={product.name} />
                </div>
                <div className="col-md-6">
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <h3>Rp {product.price}</h3>
                    <button className="btn btn-primary" onClick={handleOrder}>Order</button>
                    <button className="btn btn-warning" onClick={handleUpdate}>update</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
