import { useParams } from "react-router-dom";
import { useFetchDocumentById } from "../../hooks/useFetchDocumentById";
import styles from "./Post.module.css";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading, error } = useFetchDocumentById("posts", id);

  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando post...</p>}
      {post && (
        <div>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <div  className={styles.tags}>
              Tags:
              {post.tags.map((tag, index) => (
                <p key={index}>
                  <span>#</span>
                  {tag}
                </p>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
