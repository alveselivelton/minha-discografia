// hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuthValue } from "../../hooks/useAuthValue";
import { useGetDocuments } from "../../hooks/useGetDocuments";

// components
import PostDetail from "../../components/PostDetail";
import Loading from "../../components/Loading";

import styles from "./styles.module.scss";

const Home = () => {
  const [query, setQuery] = useState("");
  const { loading } = useAuthValue();
  const { documents: posts } = useGetDocuments("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };
  return (
    <div className={styles.home}>
      {posts && posts.length !== 0 && (
        <>
          <h1>Veja os nossos posts mais recentes</h1>
          <form onSubmit={handleSubmit} className={styles.search_form}>
            <input
              type="text"
              placeholder="Ou busque por tags..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-small">Pesquisar</button>
          </form>
        </>
      )}
      <div>
        {loading && <Loading />}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <h2>Ainda não há posts...</h2>
            <Link to="/posts/create" className="btn btn-small">
              Criar post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
