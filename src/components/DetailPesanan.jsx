import { UserRound, Phone, Mail } from "lucide-react";
import { MapPin } from "lucide-react";
import { alamat } from "../pages/dataPengiriman";
import PetaPengiriman from "./PetaPengiriman";

function DetailPesanan({ dipilih }) {
  const informasi = [
    [
      "Informasi pelanggan",
      [
        [UserRound, dipilih.nama],
        [Phone, dipilih.hp],
        [Mail, dipilih.email],
      ],
    ],
    [
      "Informasi pengiriman",
      [
        [UserRound, dipilih.penerima],
        [Phone, dipilih.kurir],
      ],
    ],
  ];

  return (
    <section className="kirim-card kirim-detail">
      <div className="kirim-detail-head">
        <h2>Detail Pesanan</h2>
      </div>

      <div className="kirim-detail-grid">
        <div className="kirim-main">
          <div className="kirim-info-grid">
            {informasi.map(([judul, items]) => (
              <div key={judul}>
                <h3>{judul}</h3>

                {items.map(([Icon, teks], i) => (
                  <div className="kirim-info" key={i}>
                    <span className="kirim-icon">
                      <Icon size={18} />
                    </span>
                    <span>{teks}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="kirim-soft kirim-status">
            <h3>Status</h3>
            <div className="kirim-steps">
              <span>Pesanan Dikonfirmasi</span>
              <span>→</span>
              <span>Konfirmasi Pengiriman</span>
              <span>→</span>
              <span>Dalam Pengiriman</span>
              <span>→</span>
              <span className="kuning">Pesanan Tiba</span>
            </div>
          </div>
        </div>
        <div className="kirim-map-column">
          <div className="kirim-soft kirim-address">
            <h3>Alamat</h3>

            <div className="kirim-address-grid">
              <PetaPengiriman />

              <div>
                <MapPin size={16} />
                <p>{alamat}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailPesanan;
