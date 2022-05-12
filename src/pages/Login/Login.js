import styles from "./Login.module.css";
import { useState, useEffect } from "react";

import { useAuthetication } from "../../hooks/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthetication();

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      senha,
    };

    const response = createUser(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça seu login e compartilhe seus melhores momentos!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            placeholder="Insira uma senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>
        {error && <p className="error">{error}</p>}
        {!loading && <button className="btn">Entrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
