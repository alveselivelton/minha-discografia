import { useAuthValue } from "../../hooks/useAuthValue";
import { useGetDocuments } from "../../hooks/useGetDocuments";

import { Link } from "react-router-dom";

import Loading from "../../components/Loading";
import PostDetail from "../../components/PostDetail";

import styles from "./styles.module.scss";

const Dashboard = () => {
  const { user, loading } = useAuthValue();
  const uid = user.uid;

  const { documents: posts } = useGetDocuments("posts", null, uid);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.dashboard}>
      <h2>
        Essa é a sua <span>Dashboard</span>
      </h2>
      {posts && posts.length === 0 && (
        <div className={styles.no_posts}>
          <p>Você ainda não postou nada</p>
          <Link to="/posts/create" className="btn btn-small">
            Criar primeiro post
          </Link>
        </div>
      )}
      {posts && posts.length !== 0 && (
        <div className={styles.posts_container}>
          <p>Visualize, edite ou exclua seus posts</p>
          {posts.map((post) => (
            <PostDetail key={post.id} post={post} showButton={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
