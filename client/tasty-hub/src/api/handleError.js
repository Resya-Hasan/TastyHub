import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const handleApiError = (error) => {
    console.log(error, "<<< error dari api");

    if (error.response) {
        const { status, data } = error.response;
        console.log(error.response, "<<< error.response");

        if (status === 403) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Akses ditolak! Anda bukan admin.",
            });
        } else if (status === 400) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Data tidak valid!",
            });
        } else if (status === 404) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Data tidak ditemukan.",
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Terjadi kesalahan",
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Gagal terhubung ke server. Periksa koneksi internet Anda.",
        });
    }
};

export default handleApiError;