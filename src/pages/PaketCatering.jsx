import { useEffect, useState } from 'react';
import './PaketCatering.css';
import paketJsonUrl from '../data/paket-katering.json?url';

function PaketCatering() {
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                setLoading(true);
                setError('');

                const response = await fetch(paketJsonUrl);

                if (!response.ok) {
                    throw new Error('Gagal mengambil data paket katering.');
                }

                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error('Format data paket tidak sesuai.');
                }

                setPackages(data);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    const handleSave = () => {
        if (!selectedPackage) {
            alert('Silakan pilih paket Katering terlebih dahulu!');
            return;
        }

        const chosenPackage = packages.find(
            (item) => item.id === selectedPackage
        );

        alert(`Kamu memilih ${chosenPackage.name}!`);
    };

    if (loading) {
        return (
            <div className="package-page">
                <p>Memuat paket katering...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="package-page">
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>
                    Coba Lagi
                </button>
            </div>
        );
    }

    return (
        <div className="package-page">
            <header className="package-header">
                <h1>Paket Katering</h1>
                <p>
                    Pilih paket katering yang sesuai dengan kebutuhanmu.
                    Praktis, lezat, dan hemat!
                </p>
            </header>

            <section className="package-list">
                {packages.map((item) => (
                    <article
                        className={`package-card ${
                            selectedPackage === item.id ? 'selected' : ''
                        }`}
                        key={item.id}
                    >
                        <h2>{item.name}</h2>

                        <p className="package-description">
                            {item.description}
                        </p>

                        <div className="package-price">
                            {item.price}
                        </div>

                        <div className="package-portions">
                            {item.portions}
                        </div>

                        <ul className="package-features">
                            {item.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>

                        <button
                            className="package-button"
                            onClick={() => setSelectedPackage(item.id)}
                        >
                            {selectedPackage === item.id
                                ? 'Paket Dipilih ✓'
                                : 'Pilih Paket'}
                        </button>
                    </article>
                ))}
            </section>

            <button className="package-save" onClick={handleSave}>
                Simpan
            </button>
        </div>
    );
}

export default PaketCatering;
