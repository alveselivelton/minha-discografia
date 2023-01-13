import styles from "./styles.module.scss";

const Loading = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loading}></div>
    </div>
  );
};

export default Loading;
