import { useParams } from "react-router-dom";
import { useFetchDocumentById } from "../../hooks/useFetchDocumentById";
import styles from "./Post.module.css";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading, error } = useFetchDocumentById("posts", id);

  return (
    <div>
      {loading && <p>Carregando post...</p>}
      {post && <div>{post.title}</div>}
    </div>
  );
};

export default Post;
