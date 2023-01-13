import { useState, useEffect } from "react";
import { useAuthValue } from "../../hooks/useAuthValue";
import { useLogin } from "../../hooks/useLogin";
import styles from "./styles.module.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { error: authError, loading } = useAuthValue();
  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // check values
    if (!email || !password) {
      setError("Por favor, preencha todos os campos!");
      return;
    }

    const user = {
      email,
      password,
    };

    await login(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sistema</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {!loading && <button className="btn">Entrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
