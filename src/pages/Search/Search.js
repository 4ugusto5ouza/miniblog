import { Link } from "react-router-dom";
import PostDetails from "../../components/PostDetails/PostDetails";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import styles from "./Search.module.css";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div>
      <h2>Search</h2>
      <div className={styles.search_container}>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Sua consulta não retornou nenhum resultado...</p>
            <Link to={"/"} className={"btn btn-dark"}>
              Voltar
            </Link>
          </div>
        )}
        {posts &&
          posts.map((post) => <PostDetails key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
