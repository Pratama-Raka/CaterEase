import { useEffect, useState } from 'react';
import { Plus, Check, Image as ImageIcon } from 'lucide-react';
import './MenuKatering.css';
import menuJsonUrl from '../data/menu-katering.json?url';

function MenuKatering() {
    const [menu, setMenu] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const menuImages = Object.fromEntries(
        Object.entries(
            import.meta.glob('../assets/*', {
                eager: true,
                query: '?url',
                import: 'default'
            })
        ).map(([path, url]) => [
            path.split('/').pop().toLowerCase(),
            url
        ])
    );

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);
                setError('');

                const response = await fetch(menuJsonUrl);

                if (!response.ok) {
                    throw new Error('Gagal mengambil data menu.');
                }

                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error('Format data menu tidak sesuai.');
                }

                setMenu(data);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    const handleSelectMenu = (mealId, itemId) => {
        setSelectedMenu((prev) => ({
            ...prev,
            [mealId]: prev[mealId] === itemId ? null : itemId
        }));
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
                    <div>
                        <h1>Menu Katering Mingguan</h1>
                        <p>Pilih menu favoritmu untuk makan pagi dan malam</p>
                    </div>
                </div>

                {menu.map((day, index) => (
                    <section className="menu-day" key={day.id}>
                        <div className="menu-day-header">
                            <h2>{day.day}</h2>

                            {index === 0 && (
                                <button className="manage-menu-button">
                                    <Plus size={18} />
                                    Kelola Menu
                                </button>
                            )}
                        </div>

                        {day.meals.map((meal) => (
                            <div className="menu-meal" key={meal.id}>
                                <h3>{meal.mealTime}</h3>

                                <div className="menu-grid">
                                    {meal.items.map((item) => {
                                        const isSelected =
                                            selectedMenu[meal.id] === item.id;

                                        const imageName = item.image
                                            ?.split('/')
                                            .pop()
                                            .toLowerCase();

                                        const imageUrl = menuImages[imageName];

                                        return (
                                            <div
                                                className={`menu-card ${isSelected ? 'menu-card-selected' : ''}`}
                                                key={item.id}
                                            >
                                                <div className="menu-image">
                                                    {imageUrl ? (
                                                        <img
                                                            src={imageUrl}
                                                            alt={item.name}
                                                        />
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
                                                        className={`menu-select-button ${isSelected ? 'selected' : ''}`}
                                                        onClick={() =>
                                                            handleSelectMenu(
                                                                meal.id,
                                                                item.id
                                                            )
                                                        }
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
                            </div>
                        ))}
                    </section>
                ))}
            </div>
        </div>
    );
}

export default MenuKatering;
