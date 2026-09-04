import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks";
import { InputField, Button } from "../../components";
import "./Login.scss";

export function Login() {
  const navigate = useNavigate();
  const form = useForm({ email: "", password: "" });

  const handleSubmit = form.handleSubmit(async (values) => {
    // TODO: Call API to login
    navigate("/classes");
  });

  return (
    <div className="login-page">
      <h1>Login Page MBY?</h1>
    </div>
  );
}
