import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../api/auth";
import stockPhoto from "../assets/login-stock.png";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token, user } = await loginRequest(form.email);

      const storage = form.remember ? localStorage : sessionStorage;
      storage.setItem("token", token);
      storage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-visual">
        <div className="brand-mark">CaterEase</div>
        <div
          className="login-graphic"
          style={{ backgroundImage: `url(${stockPhoto})` }}
          role="img"
          aria-label="3D illustration of chef hat and cooking tools"
        />
      </section>

      <section className="login-form-panel">
        <div className="login-form-content">
          <h1>Account Login</h1>
          <p>Please login with your email address and password.</p>

          <form onSubmit={handleLogin}>
            <label className="field-label" htmlFor="email">
              <span>Email address</span>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="field-label" htmlFor="password">
              <span>Password</span>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>

            <label className="remember-row" htmlFor="remember-me">
              <input
                id="remember-me"
                name="remember"
                type="checkbox"
                checked={form.remember}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
