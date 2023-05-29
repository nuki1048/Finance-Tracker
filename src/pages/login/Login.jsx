import styles from "./Login.module.css";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin.js";
import AnimatedComponent from "../../components/animatedComponent/AnimatedComponent.jsx";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isPending, error, login } = useLogin();

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return login(email, password).then(resetForm);
  };

  return (
    <AnimatedComponent>
      <form onSubmit={handleSubmit} className={styles["login-form"]}>
        <h2>Login</h2>
        <label>
          <span>email:</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>password:</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {!isPending && <button className="btn">Login</button>}
        {isPending && (
          <button className="btn" disabled>
            Loading...
          </button>
        )}
        {error && <p>{error}</p>}
      </form>
    </AnimatedComponent>
  );
};

export default Login;
