import { useEffect, useState } from 'react';
import { Plus, Check, Image as ImageIcon } from 'lucide-react';
import './MenuKatering.css';

function MenuKatering() {
  const [menu, setMenu] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('/data/menu-katering.json');

        if (!response.ok) {
          throw new Error('Gagal mengambil data menu.');
        }

        const data = await response.json();
        setMenu(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleSelectMenu = (id) => {
    setSelectedMenu((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="menu-page">
        <div className="menu-status">
          <div className="menu-loader"></div>
          <p>Memuat menu katering...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-page">
        <div className="menu-status menu-error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <div className="menu-content">
        <div className="menu-title">
          <h1>Menu Mingguan</h1>
          <p>Pilih menu favoritmu setiap hari</p>
        </div>

        {menu.map((day) => (
          <section className="menu-day" key={day.id}>
            <h2>{day.day}</h2>

            <div className="menu-grid">
              {day.items.map((item) => {
                const isSelected = selectedMenu.includes(item.id);

                return (
                  <div className="menu-card" key={item.id}>
                    <div className="menu-image">
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <div className="menu-image-placeholder">
                          <ImageIcon size={32} />
                          <span>Foto Menu</span>
                        </div>
                      )}
                    </div>

                    <div className="menu-card-info">
                      <h3>{item.name}</h3>

                      <button
                        className={`menu-select-button ${
                          isSelected ? 'selected' : ''
                        }`}
                        onClick={() => handleSelectMenu(item.id)}
                        aria-label={
                          isSelected
                            ? `Batalkan pilihan ${item.name}`
                            : `Pilih ${item.name}`
                        }
                      >
                        {isSelected ? (
                          <Check size={20} />
                        ) : (
                          <Plus size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default MenuKatering;