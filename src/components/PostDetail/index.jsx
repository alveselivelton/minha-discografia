import { useDeleteDocument } from "../../hooks/useDeleteDocument";

import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

const PostDetail = ({ post, showButton }) => {
  const { deleteDocument } = useDeleteDocument("posts");

  return (
    <div className={styles.post_detail}>
      <img src={post.image} alt={post.album} />
      <h2>
        {post.artist} - {post.album}
      </h2>
      <div className={styles.tags}>
        <span>Tags: </span>
        {post.tags.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      {!showButton && (
        <Link to={`/posts/${post.id}`} className="btn btn-small">
          Visualizar
        </Link>
      )}
      {showButton && (
        <div className={styles.options}>
          <Link to={`/posts/${post.id}`} className="btn btn-small">
            Visualizar
          </Link>
          <Link to={`/posts/edit/${post.id}`} className="btn btn-small">
            Editar
          </Link>
          <button
            className="btn btn-small btn-danger"
            onClick={() => deleteDocument(post.id)}
          >
            Deletar
          </button>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
