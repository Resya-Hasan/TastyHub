import { useEffect, useState } from "react";
import http from "../api/http";
import handleApiError from "../api/handleError";

const OrderPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await http({
                method: "get",
                url: `/orders`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            setOrders(response.data);
        } catch (error) {
            handleApiError(error)
        }
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await http.put(`/orders/${orderId}/status`,
                { status: newStatus },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                }
            );
            alert("Status pesanan berhasil diperbarui!");
            fetchOrders();
        } catch (error) {
            handleApiError(error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Daftar Order</h2>

            {orders.length === 0 ? (
                <p>Belum ada orderan.</p>
            ) : (
                orders.map((order) => (
                    <div className="card mb-4" key={order.id}>
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <div>
                                <strong>Order ID: {order.id}</strong> |
                                <span className={`badge ms-2 ${order.status === "dikirim" ? "bg-warning" : order.status === "selesai" ? "bg-success" : "bg-info"}`}>
                                    {order.status}
                                </span>
                            </div>
                            <div>
                                <select
                                    className="form-select"
                                    value={order.status}
                                    onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                >
                                    <option value="diproses">Diproses</option>
                                    <option value="dikirim">Dikirim</option>
                                    <option value="selesai">Selesai</option>
                                </select>
                            </div>
                        </div>
                        <div className="card-body">
                            <h5>Pemesan: {order.User.username} ({order.User.email})</h5>
                            <p>Total Harga: <strong>Rp {order.totalPrice.toLocaleString()}</strong></p>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Gambar</th>
                                        <th>Nama Produk</th>
                                        <th>Harga</th>
                                        <th>Jumlah</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.OrderDetails.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <img src={item.Product.imageUrl} alt={item.Product.name} width="70" />
                                            </td>
                                            <td>{item.Product.name}</td>
                                            <td>Rp {item.Product.price.toLocaleString()}</td>
                                            <td>{item.quantity}</td>
                                            <td>Rp {item.subtotal.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderPage;
