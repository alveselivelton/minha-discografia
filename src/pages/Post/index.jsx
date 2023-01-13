import { useParams } from "react-router-dom";
import { useGetDocument } from "../../hooks/useGetDocument";
import { useAuthValue } from "../../hooks/useAuthValue";

import Loading from "../../components/Loading";

import styles from "./styles.module.scss";

const Post = () => {
  const { id } = useParams();
  const { document: post } = useGetDocument("posts", id);
  const { loading } = useAuthValue();

  return (
    <div className={styles.post_container}>
      {loading && <Loading />}
      {post && (
        <>
          <h2>Confira mais alguns detalhes</h2>
          <img src={post.image} alt={post.album} />
          <p>
            <span>Álbum - </span>
            {post.album}
          </p>
          <p>
            <span>Artista - </span>
            {post.artist}
          </p>
          <p>
            <span>Gênero - </span>
            {post.genre}
          </p>
          <p className={styles.review}>
            <span>Review - </span>"{post.review}"
          </p>
          <p>
            <span>Postado por - </span>
            {post.createdBy}
          </p>
          <div className={styles.tags}>
            <span>Tags: </span>
            {post.tags.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
