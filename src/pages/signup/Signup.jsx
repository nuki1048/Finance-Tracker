import styles from "./Signup.module.css";
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup.js";
import AnimatedComponent from "../../components/animatedComponent/AnimatedComponent.jsx";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { error, isPending, signup } = useSignup();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setPasswordMatch(true);
      return signup(email, password, name).then(resetForm);
    }
    setPasswordMatch(false);
  };

  return (
    <AnimatedComponent>
      <form onSubmit={handleSubmit} className={styles["signup-form"]}>
        <h2>Signup</h2>
        <label>
          <span>name:</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
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
        <label>
          <span>confirm password:</span>
          <input
            type="password"
            name="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        {!isPending && <button className="btn">Signup</button>}
        {isPending && (
          <button className="btn" disabled>
            Loading
          </button>
        )}
        {error && <p>{error}</p>}
        {!passwordMatch && password && <p>Password isnt match</p>}
      </form>
    </AnimatedComponent>
  );
};

export default Signup;
