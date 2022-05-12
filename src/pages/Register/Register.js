import styles from "./Register.module.css";

import { useState, useEffect } from "react";

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (senha !== confirmSenha) {
      setError("Confirmação de senha não corresponde a senha cadastrada!");
      return;
    }

    const user = {
      nome,
      email,
      senha,
    };

    console.log(user);
  };
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
        <button className="btn">Cadastrar</button>
      </form>
    </div>
  );
};

export default Register;
