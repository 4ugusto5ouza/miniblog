import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useFetchDocumentById } from "../../hooks/useFetchDocumentById";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocumentById("posts", id);

  const [titulo, setTitulo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (post) {
      setTitulo(post.title);
      setConteudo(post.body);
      setImageUrl(post.image);

      const textTags = post.tags.join(", ");
      setTags(textTags);
    }
  }, [post]);

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
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editar post</h2>
          <p>Altere o post como desejar.</p>
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
        </>
      )}
    </div>
  );
};

export default EditPost;
