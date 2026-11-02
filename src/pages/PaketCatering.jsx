import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import paketJsonUrl from '../data/paket-katering.json?url';
import './PaketCatering.css';

const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID').format(Number(value) || 0);
};

const getNumber = (value) => {
    return String(value ?? '').replace(/\D/g, '');
};

const normalizePackage = (item) => ({
    ...item,
    price: getNumber(item.price),
    portions: getNumber(item.portions),
    features: Array.isArray(item.features) ? item.features : []
});

function PaketCatering() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [showForm, setShowForm] = useState(false);
    const [editingPackage, setEditingPackage] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const [toast, setToast] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        portions: '',
        features: ''
    });

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch(paketJsonUrl);

                if (!response.ok) {
                    throw new Error('Gagal mengambil data paket katering.');
                }

                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error('Format data paket tidak sesuai.');
                }

                setPackages(data.map(normalizePackage));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    const showToast = (message) => {
        setToast(message);

        setTimeout(() => {
            setToast('');
        }, 3000);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            portions: '',
            features: ''
        });

        setFormErrors({});
        setEditingPackage(null);
    };

    const handleAdd = () => {
        resetForm();
        setShowForm(true);
    };

    const handleEdit = (item) => {
        setEditingPackage(item);

        setFormData({
            name: item.name || '',
            description: item.description || '',
            price: String(item.price ?? ''),
            portions: String(item.portions ?? ''),
            features: (item.features || []).join('\n')
        });

        setFormErrors({});
        setShowForm(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setFormErrors((prev) => ({
            ...prev,
            [name]: ''
        }));
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Nama paket wajib diisi.';
        }

        if (!formData.description.trim()) {
            errors.description = 'Deskripsi wajib diisi.';
        }

        if (!formData.price || Number(formData.price) <= 0) {
            errors.price = 'Harga harus lebih dari 0.';
        }

        if (!formData.portions || Number(formData.portions) <= 0) {
            errors.portions = 'Jumlah porsi harus lebih dari 0.';
        }

        if (!formData.features.trim()) {
            errors.features = 'Fitur paket wajib diisi.';
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const packageData = {
            name: formData.name.trim(),
            description: formData.description.trim(),
            price: Number(formData.price),
            portions: Number(formData.portions),
            features: formData.features
                .split('\n')
                .map((feature) => feature.trim())
                .filter(Boolean)
        };

        if (editingPackage) {
            setPackages((prev) =>
                prev.map((item) =>
                    item.id === editingPackage.id
                        ? { ...item, ...packageData }
                        : item
                )
            );

            showToast('Paket berhasil diperbarui.');
        } else {
            const newPackage = {
                id: `package-${Date.now()}`,
                ...packageData
            };

            setPackages((prev) => [...prev, newPackage]);

            showToast('Paket berhasil ditambahkan.');
        }

        setShowForm(false);
        resetForm();
    };

    const handleDeleteClick = (item) => {
        setDeleteTarget(item);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (!deleteTarget) {
            return;
        }

        setPackages((prev) =>
            prev.filter((item) => item.id !== deleteTarget.id)
        );

        setShowDeleteModal(false);
        setDeleteTarget(null);

        showToast('Paket berhasil dihapus.');
    };

    const handleCloseForm = () => {
        setShowForm(false);
        resetForm();
    };

    return (
        <div className="package-page">
            <div className="package-header">
                <div>
                    <h1>Kelola Paket Katering</h1>
                    <p>Kelola informasi dan daftar paket katering.</p>
                </div>

                <button
                    className="package-add-button"
                    onClick={handleAdd}
                >
                    <Plus size={18} />
                    Tambah Paket
                </button>
            </div>

            {loading && (
                <div className="package-message">
                    Memuat data paket katering...
                </div>
            )}

            {!loading && error && (
                <div className="package-error-message">
                    {error}
                </div>
            )}

            {!loading && !error && packages.length === 0 && (
                <div className="package-empty">
                    <p>Belum ada paket katering.</p>
                    <span>Silakan tambahkan paket baru.</span>
                </div>
            )}

            {!loading && !error && packages.length > 0 && (
                <div className="package-list">
                    {packages.map((item) => (
                        <div className="package-card" key={item.id}>
                            <div className="package-card-content">
                                <h3>{item.name}</h3>

                                <p className="package-description">
                                    {item.description}
                                </p>

                                <div className="package-price">
                                    Rp{formatRupiah(item.price)}
                                </div>

                                <div className="package-portions">
                                    {item.portions} porsi
                                </div>

                                <div className="package-features">
                                    <h4>Fasilitas Paket</h4>

                                    <ul>
                                        {item.features.map((feature, index) => (
                                            <li key={index}>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="package-card-actions">
                                <button
                                    className="package-edit-button"
                                    onClick={() => handleEdit(item)}
                                >
                                    <Pencil size={16} />
                                    Edit
                                </button>

                                <button
                                    className="package-delete-button"
                                    onClick={() => handleDeleteClick(item)}
                                >
                                    <Trash2 size={16} />
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showForm && (
                <div className="package-modal-overlay">
                    <div className="package-modal">
                        <div className="package-modal-header">
                            <h2>
                                {editingPackage
                                    ? 'Edit Paket Katering'
                                    : 'Tambah Paket Katering'}
                            </h2>

                            <button
                                className="package-close-button"
                                onClick={handleCloseForm}
                                type="button"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="package-form-group">
                                <label>Nama Paket</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Contoh: Paket Mingguan"
                                />

                                {formErrors.name && (
                                    <small className="package-form-error">
                                        {formErrors.name}
                                    </small>
                                )}
                            </div>

                            <div className="package-form-group">
                                <label>Deskripsi</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Masukkan deskripsi paket"
                                    rows="3"
                                />

                                {formErrors.description && (
                                    <small className="package-form-error">
                                        {formErrors.description}
                                    </small>
                                )}
                            </div>

                            <div className="package-form-group">
                                <label>Harga</label>

                                <div className="package-price-input">
                                    <span>Rp</span>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="Contoh: 192000"
                                        min="1"
                                        step="1"
                                    />
                                </div>

                                {formErrors.price && (
                                    <small className="package-form-error">
                                        {formErrors.price}
                                    </small>
                                )}
                            </div>

                            <div className="package-form-group">
                                <label>Jumlah Porsi</label>
                                <input
                                    type="number"
                                    name="portions"
                                    value={formData.portions}
                                    onChange={handleChange}
                                    placeholder="Contoh: 12"
                                    min="1"
                                    step="1"
                                />

                                {formErrors.portions && (
                                    <small className="package-form-error">
                                        {formErrors.portions}
                                    </small>
                                )}
                            </div>

                            <div className="package-form-group">
                                <label>Fitur Paket</label>
                                <textarea
                                    name="features"
                                    value={formData.features}
                                    onChange={handleChange}
                                    placeholder={'Masukkan fitur paket, satu fitur per baris'}
                                    rows="5"
                                />

                                {formErrors.features && (
                                    <small className="package-form-error">
                                        {formErrors.features}
                                    </small>
                                )}
                            </div>

                            <div className="package-modal-actions">
                                <button
                                    type="button"
                                    className="package-cancel-button"
                                    onClick={handleCloseForm}
                                >
                                    Batal
                                </button>

                                <button
                                    type="submit"
                                    className="package-save-button"
                                >
                                    {editingPackage
                                        ? 'Simpan Perubahan'
                                        : 'Tambah Paket'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="package-modal-overlay">
                    <div className="package-confirm-modal">
                        <h2>Hapus Paket?</h2>

                        <p>
                            Apakah kamu yakin ingin menghapus paket{' '}
                            <strong>{deleteTarget?.name}</strong>?
                        </p>

                        <div className="package-modal-actions">
                            <button
                                className="package-cancel-button"
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDeleteTarget(null);
                                }}
                            >
                                Batal
                            </button>

                            <button
                                className="package-confirm-delete-button"
                                onClick={handleDeleteConfirm}
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {toast && (
                <div className="package-toast">
                    {toast}
                </div>
            )}
        </div>
    );
}

export default PaketCatering;
