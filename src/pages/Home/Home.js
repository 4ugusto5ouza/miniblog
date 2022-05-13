import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PostDetails from "../../components/PostDetails/PostDetails";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import styles from "./Home.module.css";

const Home = () => {
  const [consulta, setConsulta] = useState("");
  
  const {
    documents: posts,
    error: queryError,
    loading,
  } = useFetchDocuments("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (consulta) return navigate(`search?q=${consulta}`);
  };
  return (
    <div className={styles.home}>
      <h1>Posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <label>
          <span>Pesquisar post: </span>
          <input
            type="text"
            placeholder="Tag"
            onChange={(e) => setConsulta(e.target.value)}
          />
        </label>
        <button className="btn btn-dark">Buscar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts &&
          posts.map((post) => {
            return <PostDetails post={post} key={post.id} />;
          })}
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
