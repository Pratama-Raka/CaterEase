import { useEffect, useState } from "react";
import {
  Pencil,
  UserRound,
  Phone,
  Mail,
  MapPin,
  Maximize2,
  Minimize2,
} from "lucide-react";

import { alamat, menu } from "../api/dataPengiriman";

import PetaPengiriman from "./PetaPengiriman";
import buktiPengiriman from "../assets/catering-buffet.jpg";

function DetailPesanan({
  dipilih,
  besar,
  setBesar,
  informasiPengiriman,
  onSimpanPengiriman,
}) {
  const [modalTerbuka, setModalTerbuka] = useState(false);

  const [form, setForm] = useState({
    status: informasiPengiriman.status,
    waktuKedatangan:
      informasiPengiriman.waktuKedatangan === "Belum ditentukan"
        ? ""
        : informasiPengiriman.waktuKedatangan,
    catatan: informasiPengiriman.catatan,
    bukti: informasiPengiriman.bukti,
  });

  // Memperbarui form ketika pesanan yang dipilih berubah
  useEffect(() => {
    setForm({
      status: informasiPengiriman.status,
      waktuKedatangan:
        informasiPengiriman.waktuKedatangan === "Belum ditentukan"
          ? ""
          : informasiPengiriman.waktuKedatangan,
      catatan: informasiPengiriman.catatan,
      bukti: informasiPengiriman.bukti,
    });

    setModalTerbuka(false);
  }, [dipilih.id, informasiPengiriman]);

  // Data informasi pelanggan dan pengiriman
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

  // Menampilkan data terbaru ketika modal dibuka
  const handleEdit = () => {
    setForm({
      status: informasiPengiriman.status,
      waktuKedatangan:
        informasiPengiriman.waktuKedatangan === "Belum ditentukan"
          ? ""
          : informasiPengiriman.waktuKedatangan,
      catatan: informasiPengiriman.catatan,
      bukti: informasiPengiriman.bukti,
    });

    setModalTerbuka(true);
  };

  // Menyimpan perubahan informasi pengiriman
  const handleSimpan = (e) => {
    e.preventDefault();

    onSimpanPengiriman(dipilih.id, form);

    setModalTerbuka(false);
  };

  return (
    <section className="kirim-card kirim-detail">
      <div className="kirim-detail-head">
        <h2>Detail Pesanan</h2>

        <div className="kirim-detail-actions">
          <button
            type="button"
            className="btn-edit-pengiriman"
            onClick={handleEdit}
          >
            <Pencil size={19} />
          </button>

          <button
            type="button"
            aria-label={besar ? "Perkecil detail" : "Perbesar detail"}
            onClick={() => setBesar(!besar)}
          >
            {besar ? <Minimize2 size={19} /> : <Maximize2 size={19} />}
          </button>
        </div>
      </div>

      <div className="kirim-detail-grid">
        <div className="kirim-main">
          {/* Informasi pelanggan dan pengiriman */}
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
                <h3>Waktu Kedatangan</h3>

                <p>
                  {informasiPengiriman.waktuKedatangan === "Belum ditentukan"
                    ? "Belum ditentukan"
                    : informasiPengiriman.waktuKedatangan || "Belum ditentukan"}
                </p>
              </div>

              <div className="kirim-soft">
                <h3>Catatan Khusus</h3>

                <p>{informasiPengiriman.catatan || "Tidak ada catatan"}</p>
              </div>

              <div className="kirim-soft">
                <h3>Bukti Pengiriman</h3>

                <div className="kirim-bukti">
                  <img
                    src={informasiPengiriman.bukti || buktiPengiriman}
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
          {besar && (
            <div className="kirim-soft kirim-big-map">
              <PetaPengiriman />
            </div>
          )}

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

      {/* Modal Edit Pengiriman */}
      {modalTerbuka && (
        <div className="kirim-modal-overlay">
          <div className="kirim-modal">
            <div className="kirim-modal-header">
              <h2>Edit Informasi Pengiriman</h2>

              <button type="button" onClick={() => setModalTerbuka(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleSimpan}>
              {/* Status */}
              <div className="kirim-form-group">
                <label>Status Pengiriman</label>

                <select
                  required
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="">Pilih status</option>
                  <option value="Pesanan Dikonfirmasi">
                    Pesanan Dikonfirmasi
                  </option>
                  <option value="Konfirmasi Pengiriman">
                    Konfirmasi Pengiriman
                  </option>
                  <option value="Dalam Pengiriman">Dalam Pengiriman</option>
                  <option value="Pesanan Tiba">Pesanan Tiba</option>
                </select>
              </div>

              {/* Waktu kedatangan */}
              <div className="kirim-form-group">
                <label>Waktu Kedatangan</label>

                <input
                  type="time"
                  required
                  value={form.waktuKedatangan}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      waktuKedatangan: e.target.value,
                    })
                  }
                />
              </div>

              {/* Catatan */}
              <div className="kirim-form-group">
                <label>Catatan Khusus (Opsional)</label>

                <textarea
                  value={form.catatan}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      catatan: e.target.value,
                    })
                  }
                  placeholder="Masukkan catatan pengiriman..."
                />
              </div>

              {/* Bukti pengiriman */}
              <div className="kirim-form-group">
                <label>Bukti Pengiriman (Opsional)</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (file) {
                      setForm((prev) => ({
                        ...prev,
                        bukti: URL.createObjectURL(file),
                      }));
                    }
                  }}
                />

                {form.bukti && (
                  <img
                    src={form.bukti}
                    alt="Preview bukti pengiriman"
                    className="kirim-preview-bukti"
                  />
                )}
              </div>

              {/* Tombol modal */}
              <div className="kirim-modal-actions">
                <button type="button" onClick={() => setModalTerbuka(false)}>
                  Batal
                </button>

                <button type="submit">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default DetailPesanan;
