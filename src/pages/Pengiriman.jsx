import { useState } from "react";
import { pesanan } from "./dataPengiriman";
import DaftarPesanan from "../components/daftarPesanan";
import DetailPesanan from "../components/DetailPesanan";
import "./Pengiriman.css";

function Pengiriman({ cari, setCari }) {
  const [dipilih, setDipilih] = useState(pesanan[1]);
  const [besar, setBesar] = useState(false);

  return (
    <div className="kirim-page">
      <div className="kirim-heading">
        <h1>Pengiriman</h1>
        <p>Kelola dan pantau pengiriman pesanan katering.</p>
      </div>

      <div className={`kirim-layout ${besar ? "besar" : ""}`}>
        <DaftarPesanan
          pesanan={pesanan}
          dipilih={dipilih}
          setDipilih={setDipilih}
          cari={cari}
          setCari={setCari}
        />

        <DetailPesanan dipilih={dipilih} besar={besar} setBesar={setBesar} />
      </div>
    </div>
  );
}

export default Pengiriman;
