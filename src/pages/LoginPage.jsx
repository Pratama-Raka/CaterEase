import { useNavigate } from "react-router-dom";
import stockPhoto from "../assets/login-stock.png";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
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
              <input id="email" type="email" required />
            </label>

            <label className="field-label" htmlFor="password">
              <span>Password</span>
              <input id="password" type="password" required />
            </label>

            <label className="remember-row" htmlFor="remember-me">
              <input id="remember-me" type="checkbox" />
              <span>Remember me</span>
            </label>

            <button type="submit" className="primary-button">
              Login
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
