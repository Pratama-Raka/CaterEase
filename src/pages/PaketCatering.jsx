import { useState } from 'react';
import './PaketCatering.css';

const packages = [
  {
    id: 1,
    name: 'Weekly Package',
    description: 'Paket catering untuk kebutuhan satu minggu.',
    price: 'Rp192.000',
    portions: '12 porsi',
    features: [
      'Nasi dan lauk pilihan',
      'Sayuran segar',
      'Menu bervariasi',
      'Gratis ongkir',
      'Tanpa MSG',
    ],
  },
  {
    id: 2,
    name: 'Monthly Package',
    description: 'Pilihan praktis untuk kebutuhan satu bulan.',
    price: 'Rp720.000',
    portions: '48 porsi',
    features: [
      'Nasi dan lauk pilihan',
      'Sayuran segar',
      'Menu bervariasi',
      'Gratis ongkir',
      'Tanpa MSG',
    ],
  },
  {
    id: 3,
    name: 'Semester Package',
    description: 'Paket hemat untuk kebutuhan jangka panjang.',
    price: 'Rp4.464.000',
    portions: '288 porsi',
    features: [
      'Nasi dan lauk pilihan',
      'Sayuran segar',
      'Menu bervariasi',
      'Gratis ongkir',
      'Tanpa MSG',
    ],
  },
];

function PaketCatering() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleSave = () => {
    if (!selectedPackage) {
      alert('Silakan pilih paket catering terlebih dahulu!');
      return;
    }

    const chosenPackage = packages.find(
      (item) => item.id === selectedPackage
    );

    alert(`Kamu memilih ${chosenPackage.name}!`);
  };

  return (
    <div className="package-page">
      <header className="package-header">
        <h1>Paket Catering</h1>
        <p>
          Pilih paket catering yang sesuai dengan kebutuhanmu.
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
                : 'Select Package'}
            </button>
          </article>
        ))}
      </section>

      <button className="package-save" onClick={handleSave}>
        Save Options
      </button>
    </div>
  );
}

export default PaketCatering;