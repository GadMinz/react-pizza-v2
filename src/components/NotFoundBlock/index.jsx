import React from "react";
import sad from "../../assets/img/not-found.svg";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <img src={sad} alt="sad" />
      <br />
      <h1>
        <font color="#fe5f1e">Упс!</font> Что-то пошло не так :(
      </h1>
      <span className={styles.description}>
        Страница которую вы ищите не найдена. Возможно адрес страницы введен
        неправильно или страница была удалена!
      </span>
    </div>
  );
};

export default NotFoundBlock;
