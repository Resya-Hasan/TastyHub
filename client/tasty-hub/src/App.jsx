import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import MainLayout from "./Layout/MainLayout";
import Orders from "./pages/Orders";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import RecommendationPage from "./pages/RecomendationPage";
import RegisterPage from "./pages/register";

function App() {
  return (
    <Router>
      <Routes >
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-products" element={<AddProductPage />} />
          <Route path="/edit-product/:id" element={<EditProductPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/recommendations" element={<RecommendationPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
