import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const {
    documents: posts,
    errorDocs: error,
    loading,
  } = useFetchDocuments("posts", null, uid);

  const { deleteDocument } = useDeleteDocument("posts");

  const handleDeletePost = (id) => {
    deleteDocument(id);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Você ainda não publicou nenhum post.</p>
          <Link to={"/post/create"} className={"btn"}>
            Criar post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.post_row}>
                <p>{post.title}</p>
                <div className={styles.actions}>
                  <Link to={`/post/${post.id}`} className={"btn btn-outline"}>
                    Mais...
                  </Link>
                  <Link
                    to={`/post/edit/${post.id}`}
                    className={"btn btn-outline"}
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className={"btn btn-outline btn-danger"}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
