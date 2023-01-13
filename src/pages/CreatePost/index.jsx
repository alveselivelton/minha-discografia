import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../hooks/useAuthValue";
import { useInsertDocument } from "../../hooks/useInsertDocument";

import styles from "./styles.module.scss";

const CreatePost = () => {
  const [album, setAlbum] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [review, setReview] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const { user, loading, error } = useAuthValue();
  const { insertDocument } = useInsertDocument("posts");

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

    insertDocument({
      album,
      artist,
      genre,
      image,
      review,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page
    navigate("/");
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre os seus álbuns preferidos</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Álbum:</span>
          <input
            type="text"
            name="album"
            placeholder="Digite o nome do álbum"
            onChange={(e) => setAlbum(e.target.value)}
            value={album}
          />
        </label>
        <label>
          <span>Artista:</span>
          <input
            type="text"
            name="artist"
            placeholder="De quem é esse álbum?"
            onChange={(e) => setArtist(e.target.value)}
            value={artist}
          />
        </label>
        <label>
          <span>Gênero:</span>
          <input
            type="text"
            name="genre"
            placeholder="Gênero"
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            placeholder="Insira uma URL válida"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          <span>Análise:</span>
          <textarea
            name="review"
            placeholder="Escreva um breve resumo sobre o que achou do álbum"
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
        {!loading && <button className="btn">Postar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde.. .
          </button>
        )}
        {error && <p className="error">{error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
