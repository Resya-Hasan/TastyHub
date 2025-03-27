import { useNavigate } from "react-router-dom"


const Card = (props) => {
    const navigate = useNavigate()
    const { product } = props
    return (
        <>
            <div className="card" style={{ width: "18rem" }}>
                <img src={`${product.imageUrl}`} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                        {product.description}
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/products/${product.id}`)}
                    >
                        Lihat
                    </button>
                </div>
            </div>
        </>
    )

}
export default Card