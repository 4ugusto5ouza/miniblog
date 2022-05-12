import styles from "./Register.module.css";

import { useState, useEffect } from "react";
import { useAuthetication } from "../../hooks/useAuthentication";

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthetication();

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (senha !== confirmSenha) {
      setError("A confirmação de senha não corresponde a senha informada!");
      return;
    }

    const user = {
      nome,
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
    <div className={styles.register}>
      <h1>Cadastre-se</h1>
      <p>Crie seu usuário e compartilhe suas histórias!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="nome"
            placeholder="Nome de usuário"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
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
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="password"
            placeholder="Confirme sua senha"
            required
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
          />
        </label>
        {error && <p className="error">{error}</p>}
        {!loading && <button className="btn">Cadastrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
      </form>
    </div>
  );
};

export default Register;
