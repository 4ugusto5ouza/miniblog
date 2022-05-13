import { Link } from "react-router-dom";
import styles from "./PostDetails.module.css";

const PostDetails = ({ post }) => {
  return (
    <div className={styles.post_details}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <h4 className={styles.createdBy}>
        <span>Autor: </span>
        {post.createdBy}
      </h4>
      <div className={styles.tags}>
        {post.tags.map((tag, index) => (
          <p key={index}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/post/${post.id}`} className="btn btn-outline">
        Mais...
      </Link>
    </div>
  );
};

export default PostDetails;
