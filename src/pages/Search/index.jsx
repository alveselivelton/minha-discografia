import { useSearchParams, Link } from "react-router-dom";
import { useGetDocuments } from "../../hooks/useGetDocuments";
import PostDetail from "../../components/PostDetail";

import styles from "./styles.module.scss";

const Search = () => {
  const [params] = useSearchParams();
  const search = params.get("q");

  const { documents: posts } = useGetDocuments("posts", search);
  return (
    <div className={styles.search_container}>
      <h2>Resultados para: {search}</h2>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts a partir da sua busca...</p>
            <Link to="/" className="btn btn-small">
              Voltar
            </Link>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
