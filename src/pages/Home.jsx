import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import LoadingBlock from "../components/PizzaBlock/LoadingBlock";
import PizzaBlock from "../components/PizzaBlock";
import axios from "axios";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://62a0689f202ceef7086cfb43.mockapi.io/items"
        );
        setItems(data);
        setIsLoading(false);
      } catch (e) {
        alert("Ошибка при получении пицц");
        console.error(e);
      }
    })();
  }, []);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <LoadingBlock key={i} />)
          : items.map((obj, i) => <PizzaBlock key={obj.id + i} {...obj} />)}
      </div>
    </>
  );
};

export default Home;
