import { useEffect, useState } from "react";
import http from "../api/http";
import Card from "../components/Card";
import handleApiError from "../api/handleError";
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchProductsSuccess } from "../store/productSlice";

const Products = () => {
    // const [products, setProducts] = useState([]);
    const dispatch = useDispatch()
    const reduxState = useSelector((state) => {
        return state.products
    })
    console.log(reduxState, '<<< redux state')

    const products = useSelector((state) => {
        return state.products.data
    })

    useEffect(() => {
        dispatch(fetchProducts())
    }, []);


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


