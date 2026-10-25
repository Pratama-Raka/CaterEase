import { useState } from "react";
import {
  ChefHat,
  Mail,
  PencilLine,
  Phone,
  Save,
  CookingPot,
  UserRound,
} from "lucide-react";
import cateringBuffet from "../assets/catering-buffet.jpg";
import "./SettingsPage.css";

const PROFILE_KEY = "caterease.profile";
const DEFAULT_PROFILE = {
  fullName: "Admin CaterEase",
  email: "admin@caterease.id",
  phone: "",
};

function loadProfile() {
  try {
    const storedProfile = JSON.parse(
      window.localStorage.getItem(PROFILE_KEY) || "{}",
    );

    return Object.fromEntries(
      Object.entries(DEFAULT_PROFILE).map(([key, fallback]) => [
        key,
        typeof storedProfile[key] === "string" ? storedProfile[key] : fallback,
      ]),
    );
  } catch {
    return DEFAULT_PROFILE;
  }
}

function SettingsPage() {
  const [profile, setProfile] = useState(loadProfile);
  const [status, setStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const initials =
    profile.fullName
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "CE";

  function handleChange(event) {
    const { name, value } = event.target;
    setProfile((currentProfile) => ({ ...currentProfile, [name]: value }));
    setStatus("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    try {
      window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      setStatus("Perubahan profil berhasil disimpan.");
      setIsEditing(false);
    } catch {
      setStatus("Profil tidak dapat disimpan di browser ini.");
    }
  }

  function handleCancel() {
    setProfile(loadProfile());
    setStatus("Perubahan dibatalkan.");
    setIsEditing(false);
  }

  return (
    <div className="settings-page">
      <header className="settings-heading">
        <h1>Pengaturan</h1>
        <p>Kelola informasi profil akun.</p>
      </header>

      <div className="settings-layout">
        <section className="profile-summary" aria-label="Profil pengelola">
          <div className="profile-avatar" aria-hidden="true">
            {initials}
          </div>
          <h2>{profile.fullName || "Nama belum diisi"}</h2>
          <p>{profile.email || "Email belum diisi"}</p>
          <div className="profile-role">
            <ChefHat size={15} aria-hidden="true" />
            <span>Pengelola katering</span>
          </div>
        </section>

        <section className="profile-editor" aria-labelledby="profile-title">
          <div className="profile-editor-heading">
            <div>
              <h2 id="profile-title">Profil pengelola</h2>
              <p>Informasi kontak untuk operasional harian.</p>
            </div>
            {!isEditing && (
              <button
                className="profile-edit"
                type="button"
                onClick={() => {
                  setStatus("");
                  setIsEditing(true);
                }}
              >
                <span className="profile-edit-icon" aria-hidden="true">
                  <PencilLine size={15} />
                </span>
                Edit profil
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="profile-fields">
                <label className="profile-field" htmlFor="profile-name">
                  Nama lengkap
                  <input
                    id="profile-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={profile.fullName}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="profile-field" htmlFor="profile-email">
                  Email
                  <input
                    id="profile-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={profile.email}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="profile-field" htmlFor="profile-phone">
                  Nomor telepon
                  <input
                    id="profile-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Tambahkan nomor telepon"
                    value={profile.phone}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="profile-form-footer">
                <p className="profile-status" role="status" aria-live="polite">
                  {status}
                </p>
                <div className="profile-actions">
                  <button
                    className="profile-cancel"
                    type="button"
                    onClick={handleCancel}
                  >
                    Batalkan
                  </button>
                  <button className="profile-save" type="submit">
                    <Save size={16} aria-hidden="true" />
                    Simpan perubahan
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <div className="profile-detail">
                <UserRound size={17} aria-hidden="true" />
                <div>
                  <span>Nama lengkap</span>
                  <strong>{profile.fullName || "Belum diisi"}</strong>
                </div>
              </div>
              <div className="profile-detail">
                <Mail size={17} aria-hidden="true" />
                <div>
                  <span>Email</span>
                  <strong>{profile.email || "Belum diisi"}</strong>
                </div>
              </div>
              <div className="profile-detail">
                <Phone size={17} aria-hidden="true" />
                <div>
                  <span>Nomor telepon</span>
                  <strong>{profile.phone || "Belum ditambahkan"}</strong>
                </div>
              </div>
              <p className="profile-status" role="status" aria-live="polite">
                {status}
              </p>
            </div>
          )}
        </section>
      </div>

      <section className="kitchen-note" aria-labelledby="kitchen-note-title">
        <div className="kitchen-note-copy">
          <CookingPot size={21} aria-hidden="true" />
          <h2 id="kitchen-note-title">Dari dapur, untuk setiap meja.</h2>
          <p>
            Perhatian pada detail adalah bumbu terbaik dalam setiap sajian.
          </p>
        </div>
        <img
          src={cateringBuffet}
          alt="Rangkaian hidangan katering yang siap disajikan"
        />
      </section>
    </div>
  );
}

export default SettingsPage;
