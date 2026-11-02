const mapUrl =
  "https://www.openstreetmap.org/export/embed.html?bbox=107.60%2C-6.99%2C107.67%2C-6.94&layer=mapnik";

function PetaPengiriman() {
  return <iframe title="Peta pengiriman Bandung" src={mapUrl} loading="lazy" />;
}

export default PetaPengiriman;
