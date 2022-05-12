import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const [consulta, setConsulta] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.home}>
      <h1>Posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <label>
          <span>Pesquisar post:</span>
          <input
            type="text"
            placeholder="Tag"
            onChange={(e) => setConsulta(e.target.value)}
          />
        </label>
        <button className="btn btn-dark">Buscar</button>
      </form>
      <div>
        <h1>Posts...</h1>
        {posts && posts.length === 0 && (
          <div className={styles.nopost}>
            <p>Não foram encontrados nenhum post.</p>
            <Link to={"/post/create"} className={"btn"}>
              Criar post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
