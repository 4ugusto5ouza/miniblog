import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const CreatePost = () => {
  const [titulo, setTitulo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Compartilhe conosco sua história.</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="titulo"
            placeholder="Informe um título"
            required
            onChange={(e) => setTitulo(e.target.value)}
            value={titulo}
          />
        </label>
        <label>
          <span>Url image:</span>
          <input
            type="text"
            name="imageUrl"
            placeholder="Informe o path da imagem"
            required
            onChange={(e) => setImageUrl(e.target.value)}
            value={imageUrl}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea
            type="text"
            name="conteudo"
            placeholder="Escreva sua história"
            required
            onChange={(e) => setConteudo(e.target.value)}
            value={conteudo}
          />
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            placeholder="Tags separadas por vírgula"
            required
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn">Cadastrar</button>
        {/* {!loading && <button className="btn">Cadastrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )} */}
      </form>
    </div>
  );
};

export default CreatePost;
