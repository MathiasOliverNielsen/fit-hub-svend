import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useForm } from "../../hooks";
import { InputField, Button, FlexContainer, Box } from "../../components";
import "./Navigation.scss";

export function Navigation({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout, isLoading, error } = useAuthContext();
  const form = useForm({ email: "", password: "" });
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleNavClick = (path) => {
    navigate(path);
    onClose();
  };

  const handleLogin = form.handleSubmit(async (values) => {
    const result = await login(values.email, values.password);
    if (result.success) {
      setShowLoginForm(false);
      form.resetForm();
      onClose();
    }
  });

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/");
  };

  return (
    <>
      {isOpen && <div className="nav-overlay" onClick={onClose} />}
      <nav className={`navigation ${isOpen ? "open" : ""}`}>
        <button className="nav-close" onClick={onClose} aria-label="Close menu">
          ✕
        </button>

        <FlexContainer direction="column" gap={2} className="nav-content">
          <ul className="nav-links">
            <li>
              <button onClick={() => handleNavClick("/home")} className="nav-item">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick("/search")} className="nav-item">
                Search
              </button>
            </li>
            {!isAuthenticated && (
              <li className="nav-login-item">
                <button onClick={() => setShowLoginForm(!showLoginForm)} className="nav-item">
                  Log in
                </button>
                {showLoginForm && (
                  <Box className="login-form-expanded">
                    <InputField name="email" type="email" placeholder="Email" value={form.values.email} onChange={form.handleChange} onBlur={form.handleBlur} error={form.touched.email && form.errors.email} />
                    <InputField name="password" type="password" placeholder="Password" value={form.values.password} onChange={form.handleChange} onBlur={form.handleBlur} error={form.touched.password && form.errors.password} />
                    {error && <p className="error-message">{error}</p>}
                    <Button onClick={handleLogin} fullWidth loading={isLoading}>
                      Log in
                    </Button>
                  </Box>
                )}
              </li>
            )}
            {isAuthenticated && (
              <>
                <li>
                  <button onClick={() => handleNavClick("/my-schedule")} className="nav-item">
                    My Schedule
                  </button>
                </li>
                <li>
                  <Button onClick={handleLogout} fullWidth variant="secondary">
                    Log out
                  </Button>
                </li>
              </>
            )}
          </ul>
        </FlexContainer>
      </nav>
    </>
  );
}
