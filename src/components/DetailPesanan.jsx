import { UserRound, Phone, Mail } from "lucide-react";
import { MapPin } from "lucide-react";
import { alamat } from "../pages/dataPengiriman";
import PetaPengiriman from "./PetaPengiriman";
import { Maximize2, Minimize2 } from "lucide-react";
import { menu } from "../pages/dataPengiriman";
import buktiPengiriman from "../assets/catering-buffet.jpg";

function DetailPesanan({ dipilih, besar, setBesar }) {
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

        <button
          type="button"
          aria-label={besar ? "Perkecil detail" : "Perbesar detail"}
          onClick={() => setBesar(!besar)}
        >
          {besar ? <Minimize2 size={19} /> : <Maximize2 size={19} />}
        </button>
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

          {/* Status pengiriman */}
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

          {/* Detail tambahan saat diperbesar */}
          {besar && (
            <div className="kirim-extra">
              <div className="kirim-soft kirim-center">
                <h3>Waktu kedatangan</h3>
                <p>21:40</p>
              </div>

              <div className="kirim-soft">
                <h3>Catatan Khusus</h3>
                <p>Diterima dengan saudara Firna</p>
              </div>

              <div className="kirim-soft">
                <h3>Bukti Pengiriman</h3>
                <div className="kirim-bukti">
                  <img
                    src={buktiPengiriman}
                    alt="Bukti pengiriman"
                    className="bukti-img"
                  />
                </div>
              </div>

              <div className="kirim-soft">
                <h3>Package Choosen</h3>
                <p>Menu:</p>
                <ul>
                  {menu.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Peta dan alamat pengiriman */}
        <div className="kirim-map-column">
          {/* Peta besar muncul saat diperbesar */}
          {besar && (
            <div className="kirim-soft kirim-big-map">
              <PetaPengiriman />
            </div>
          )}

          {/* Alamat pengiriman */}
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
