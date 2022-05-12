import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [titulo, setTitulo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    try {
      new URL(imageUrl);
    } catch (error) {
      setError("URL inválida!");
    }

    if (error) return;

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim().toLocaleLowerCase());

    if (!titulo || !imageUrl || !conteudo || !tags)
      setError("Todos os campos são obrigatórios.");

    insertDocument({
      title: titulo,
      image: imageUrl,
      body: conteudo,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/");
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
        {(response.error || error) && (
          <p className="error">{response.error || error}</p>
        )}
        {!response.loading && <button className="btn">Publicar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
