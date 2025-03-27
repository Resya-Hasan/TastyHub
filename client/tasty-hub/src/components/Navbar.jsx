import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Tasty Hub</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-products">Add Product</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">Lihat Orderan</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recommendations">Rekomendasi AI</Link>
            </li>
          </ul>
        </div>
        <button className="nav-link" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
