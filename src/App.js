import React from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock/";
import axios from "axios";
import LoadingBlock from "./components/PizzaBlock/LoadingBlock";

function App() {
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
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
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
        </div>
      </div>
    </div>
  );
}

export default App;
