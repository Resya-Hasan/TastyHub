import { useEffect, useState } from "react";
import http from "../api/http";
import Card from "../components/Card";
import handleApiError from "../api/handleError";
import Swal from 'sweetalert2'

const Products = () => {
    const [products, setProducts] = useState([]);

    async function fetchPosts() {
        try {
            const response = await http({
                method: "get",
                url: "/products",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            const result = response.data
            setProducts(result)
        } catch (error) {
            handleApiError(error);
        }
    }

    useEffect(() => {
        fetchPosts()
    }, []);

    console.log(products)

    return (
        <div>
            <div className="container mt-4">
            <h1>Menu</h1>
                <div className="row row-cols-1 row-cols-md-4 g-5">
                    {products.map(product => (
                        <div key={product.id} className="col">
                            <Card product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;


