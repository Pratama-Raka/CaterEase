import { useEffect, useState } from 'react';
import {
    Plus,
    MoreVertical,
    Pencil,
    Trash2,
    X,
    Image as ImageIcon
} from 'lucide-react';
import './MenuKatering.css';
import menuJsonUrl from '../data/menu-katering.json?url';

function MenuKatering() {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [activeMenu, setActiveMenu] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const [toast, setToast] = useState('');

    const [formData, setFormData] = useState({
        day: '',
        mealId: '',
        name: '',
        image: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [imagePreview, setImagePreview] = useState('');

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

    useEffect(() => {
        if (!toast) return;

        const timer = setTimeout(() => {
            setToast('');
        }, 3000);

        return () => clearTimeout(timer);
    }, [toast]);

    const selectedDay = menu.find(
        (day) => String(day.id) === String(formData.day)
    );

    const resetForm = () => {
        setFormData({
            day: '',
            mealId: '',
            name: '',
            image: ''
        });

        setFormErrors({});
        setImagePreview('');
        setEditingItem(null);
        setShowForm(false);
    };

    const handleAdd = () => {
        setEditingItem(null);
        setFormData({
            day: menu.length > 0 ? String(menu[0].id) : '',
            mealId: menu[0]?.meals?.[0]
                ? String(menu[0].meals[0].id)
                : '',
            name: '',
            image: ''
        });

        setFormErrors({});
        setImagePreview('');
        setShowForm(true);
    };

    const handleEdit = (day, meal, item) => {
        setEditingItem({
            dayId: day.id,
            mealId: meal.id,
            itemId: item.id
        });

        setFormData({
            day: String(day.id),
            mealId: String(meal.id),
            name: item.name,
            image: item.image || ''
        });

        const imageName = item.image
            ?.split('/')
            .pop()
            .toLowerCase();

        setImagePreview(
            item.image?.startsWith('data:')
                ? item.image
                : menuImages[imageName] || ''
        );

        setFormErrors({});
        setActiveMenu(null);
        setShowForm(true);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setFormErrors((prev) => ({
                ...prev,
                image: 'File harus berupa gambar.'
            }));
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            setFormData((prev) => ({
                ...prev,
                image: reader.result
            }));

            setImagePreview(reader.result);

            setFormErrors((prev) => ({
                ...prev,
                image: ''
            }));
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = {};

        if (!formData.day) {
            errors.day = 'Hari harus dipilih.';
        }

        if (!formData.mealId) {
            errors.mealId = 'Waktu makan harus dipilih.';
        }

        if (!formData.name.trim()) {
            errors.name = 'Nama menu harus diisi.';
        }

        if (!formData.image) {
            errors.image = 'Foto menu harus dipilih.';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        if (editingItem) {
            setMenu((prev) =>
                prev.map((day) => {
                    if (String(day.id) !== String(editingItem.dayId)) {
                        return day;
                    }

                    return {
                        ...day,
                        meals: day.meals.map((meal) => {
                            if (
                                String(meal.id) !==
                                String(editingItem.mealId)
                            ) {
                                return meal;
                            }

                            return {
                                ...meal,
                                items: meal.items.map((item) =>
                                    String(item.id) ===
                                        String(editingItem.itemId)
                                        ? {
                                            ...item,
                                            name: formData.name.trim(),
                                            image: formData.image
                                        }
                                        : item
                                )
                            };
                        })
                    };
                })
            );

            setToast('Menu berhasil diperbarui.');
        } else {
            const newItem = {
                id: `menu-${Date.now()}`,
                name: formData.name.trim(),
                image: formData.image
            };

            setMenu((prev) =>
                prev.map((day) => {
                    if (String(day.id) !== String(formData.day)) {
                        return day;
                    }

                    return {
                        ...day,
                        meals: day.meals.map((meal) =>
                            String(meal.id) === String(formData.mealId)
                                ? {
                                    ...meal,
                                    items: [...meal.items, newItem]
                                }
                                : meal
                        )
                    };
                })
            );

            setToast('Menu berhasil ditambahkan.');
        }

        resetForm();
    };

    const handleDeleteClick = (day, meal, item) => {
        setDeleteTarget({
            dayId: day.id,
            mealId: meal.id,
            itemId: item.id,
            itemName: item.name
        });

        setActiveMenu(null);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (!deleteTarget) return;

        setMenu((prev) =>
            prev.map((day) => {
                if (String(day.id) !== String(deleteTarget.dayId)) {
                    return day;
                }

                return {
                    ...day,
                    meals: day.meals.map((meal) => {
                        if (
                            String(meal.id) !==
                            String(deleteTarget.mealId)
                        ) {
                            return meal;
                        }

                        return {
                            ...meal,
                            items: meal.items.filter(
                                (item) =>
                                    String(item.id) !==
                                    String(deleteTarget.itemId)
                            )
                        };
                    })
                };
            })
        );

        setShowDeleteModal(false);
        setDeleteTarget(null);
        setToast('Menu berhasil dihapus.');
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
            {toast && (
                <div className="menu-toast">
                    <span>{toast}</span>
                    <button onClick={() => setToast('')}>
                        <X size={18} />
                    </button>
                </div>
            )}

            <div className="menu-content">
                <div className="menu-title">
                    <div>
                        <h1>Menu Katering Mingguan</h1>
                        <p>Kelola menu katering untuk makan pagi dan malam</p>
                    </div>

                    <button
                        className="manage-menu-button"
                        onClick={handleAdd}
                    >
                        <Plus size={18} />
                        Tambah Menu
                    </button>
                </div>

                {menu.map((day) => (
                    <section className="menu-day" key={day.id}>
                        <div className="menu-day-header">
                            <h2>{day.day}</h2>
                        </div>

                        {day.meals.map((meal) => (
                            <div className="menu-meal" key={meal.id}>
                                <h3>{meal.mealTime}</h3>

                                <div className="menu-grid">
                                    {meal.items.map((item) => {
                                        const imageName = item.image
                                            ?.split('/')
                                            .pop()
                                            .toLowerCase();

                                        const imageUrl = item.image?.startsWith('data:')
                                            ? item.image
                                            : menuImages[imageName];

                                        return (
                                            <div
                                                className={`menu-card ${activeMenu === item.id ? 'menu-card-active' : ''
                                                    }`}
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

                                                    <div className="menu-action">
                                                        <button
                                                            className="menu-more-button"
                                                            onClick={() =>
                                                                setActiveMenu(
                                                                    activeMenu === item.id
                                                                        ? null
                                                                        : item.id
                                                                )
                                                            }
                                                        >
                                                            <MoreVertical size={20} />
                                                        </button>

                                                        {activeMenu === item.id && (
                                                            <div className="menu-dropdown">
                                                                <button
                                                                    onClick={() =>
                                                                        handleEdit(
                                                                            day,
                                                                            meal,
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    <Pencil size={16} />
                                                                    Edit
                                                                </button>

                                                                <button
                                                                    className="delete-action"
                                                                    onClick={() =>
                                                                        handleDeleteClick(
                                                                            day,
                                                                            meal,
                                                                            item
                                                                        )
                                                                    }
                                                                >
                                                                    <Trash2 size={16} />
                                                                    Hapus
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
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

            {showForm && (
                <div className="menu-modal-overlay">
                    <div className="menu-modal">
                        <div className="menu-modal-header">
                            <h2>
                                {editingItem ? 'Edit Menu' : 'Tambah Menu'}
                            </h2>

                            <button
                                className="menu-close-button"
                                onClick={resetForm}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="menu-form-group">
                                <label>Hari</label>
                                <select
                                    value={formData.day}
                                    disabled={!!editingItem}
                                    onChange={(event) => {
                                        const dayId = event.target.value;
                                        const day = menu.find(
                                            (item) =>
                                                String(item.id) === dayId
                                        );

                                        setFormData((prev) => ({
                                            ...prev,
                                            day: dayId,
                                            mealId: day?.meals?.[0]
                                                ? String(day.meals[0].id)
                                                : ''
                                        }));
                                    }}
                                >
                                    <option value="">Pilih Hari</option>
                                    {menu.map((day) => (
                                        <option
                                            key={day.id}
                                            value={day.id}
                                        >
                                            {day.day}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.day && (
                                    <span className="menu-form-error">
                                        {formErrors.day}
                                    </span>
                                )}
                            </div>

                            <div className="menu-form-group">
                                <label>Waktu Makan</label>
                                <select
                                    value={formData.mealId}
                                    disabled={!!editingItem}
                                    onChange={(event) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            mealId: event.target.value
                                        }))
                                    }
                                >
                                    <option value="">Pilih Waktu Makan</option>
                                    {selectedDay?.meals?.map((meal) => (
                                        <option
                                            key={meal.id}
                                            value={meal.id}
                                        >
                                            {meal.mealTime}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.mealId && (
                                    <span className="menu-form-error">
                                        {formErrors.mealId}
                                    </span>
                                )}
                            </div>

                            <div className="menu-form-group">
                                <label>Nama Menu</label>
                                <input
                                    type="text"
                                    placeholder="Masukkan nama menu"
                                    value={formData.name}
                                    onChange={(event) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            name: event.target.value
                                        }))
                                    }
                                />
                                {formErrors.name && (
                                    <span className="menu-form-error">
                                        {formErrors.name}
                                    </span>
                                )}
                            </div>

                            <div className="menu-form-group">
                                <label>Foto Menu</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {formErrors.image && (
                                    <span className="menu-form-error">
                                        {formErrors.image}
                                    </span>
                                )}

                                {imagePreview && (
                                    <div className="menu-image-preview">
                                        <img
                                            src={imagePreview}
                                            alt="Preview menu"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="menu-form-actions">
                                <button
                                    type="button"
                                    className="menu-cancel-button"
                                    onClick={resetForm}
                                >
                                    Batal
                                </button>

                                <button
                                    type="submit"
                                    className="menu-submit-button"
                                >
                                    Simpan Menu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="menu-modal-overlay">
                    <div className="menu-confirm-modal">
                        <div className="menu-confirm-icon">
                            <Trash2 size={26} />
                        </div>

                        <h2>Hapus Menu?</h2>
                        <p>
                            Apakah kamu yakin ingin menghapus menu
                            <strong> {deleteTarget?.itemName}</strong>?
                        </p>

                        <div className="menu-form-actions">
                            <button
                                className="menu-cancel-button"
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDeleteTarget(null);
                                }}
                            >
                                Batal
                            </button>

                            <button
                                className="menu-delete-button"
                                onClick={handleDeleteConfirm}
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MenuKatering;