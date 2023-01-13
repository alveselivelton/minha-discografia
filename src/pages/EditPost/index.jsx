import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../hooks/useAuthValue";
import { useGetDocument } from "../../hooks/useGetDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

import styles from "./styles.module.scss";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useGetDocument("posts", id);

  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [review, setReview] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setAlbum(post.album);
      setArtist(post.artist);
      setGenre(post.genre);
      setReview(post.review);
      setImage(post.image);

      const textTags = post.tags.join(", ");

      setTags(textTags);
    }
  }, [post]);

  const { user, loading } = useAuthValue();

  const { updateDocument } = useUpdateDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // check values
    if (!album || !artist || !genre || !image || !review || !tags) {
      setFormError("Por favor, preencha todos os campos!");
      return;
    }

    // validate image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError("URL inválida.");
      return;
    }

    // creation tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (formError) return;

    const data = {
      album,
      artist,
      genre,
      image,
      review,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    // redirect to home page
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando álbum: {post.album}</h2>
          <p>Altere os dados do post como desejar</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Álbum:</span>
              <input
                type="text"
                name="album"
                placeholder="Pense num bom título..."
                onChange={(e) => setAlbum(e.target.value)}
                value={album}
              />
            </label>
            <label>
              <span>Artista:</span>
              <input
                type="text"
                name="artist"
                placeholder="Pense num bom título..."
                onChange={(e) => setArtist(e.target.value)}
                value={artist}
              />
            </label>
            <label>
              <span>Gênero:</span>
              <input
                type="text"
                name="genre"
                placeholder="Pense num bom título..."
                onChange={(e) => setGenre(e.target.value)}
                value={genre}
              />
            </label>
            <label>
              <span>URL da imagem:</span>
              <input
                type="text"
                name="image"
                placeholder="Insira uma imagem que representa o seu post"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.album}
            />
            <label>
              <span>Análise:</span>
              <textarea
                name="review"
                placeholder="Insira o contúdo do post"
                rows={3}
                maxLength={150}
                onChange={(e) => setReview(e.target.value)}
                value={review}
              />
            </label>
            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                placeholder="Insira as tags separadas por vírgula"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!loading && <button className="btn">Editar</button>}
            {loading && (
              <button className="btn" disabled>
                Aguarde.. .
              </button>
            )}
            {/* {response.error && <p className="error">{response.error}</p>} */}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
