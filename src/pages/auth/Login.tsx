import { useState } from "react";

import "./Login.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <div className="login-logo-icon">
                <svg
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 3v4l6 2v11h6V9l6-2V3h-6v4l-6 2V3z" />
                </svg>
              </div>
            </div>
            <h2 className="login-title">
              {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </h2>
            <p className="login-subtitle">
              {isLogin
                ? "Accede a tu cuenta para gestionar tus reservas"
                : "Únete a LuxYacht y comienza tu aventura"}
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form-content">
              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">Nombre Completo</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="form-input"
                    placeholder="Tu nombre completo"
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Correo Electrónico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="form-input"
                  placeholder="tu@email.com"
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">Teléfono</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required={!isLogin}
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="form-input"
                    placeholder="+52 (999) 123-4567"
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="form-input"
                  placeholder="••••••••"
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">Confirmar Contraseña</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required={!isLogin}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="form-input"
                    placeholder="••••••••"
                  />
                </div>
              )}

              {isLogin && (
                <div className="login-options">
                  <div className="remember-me">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="checkbox"
                    />
                    <label htmlFor="remember-me" className="checkbox-label">
                      Recordarme
                    </label>
                  </div>

                  <div className="forgot-password">
                    <a href="#" className="forgot-password-link">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-full">
                {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
              </button>

              <div className="form-toggle">
                <span className="form-toggle-text">
                  {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
                </span>
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="form-toggle-button"
                >
                  {isLogin ? "Regístrate" : "Inicia sesión"}
                </button>
              </div>

              <div className="social-divider">
                <div className="social-divider-line"></div>
                <span className="social-divider-text">O continúa con</span>
                <div className="social-divider-line"></div>
              </div>

              <div className="social-buttons">
                <button type="button" className="social-button">
                  <svg className="social-icon" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google</span>
                </button>

                <button type="button" className="social-button">
                  <svg
                    className="social-icon"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </button>
              </div>
            </div>
          </form>

          <div className="login-footer">
            Al continuar, aceptas nuestros{" "}
            <a href="#" className="login-footer-link">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a href="#" className="login-footer-link">
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
