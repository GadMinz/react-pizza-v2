import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import LoadingBlock from "../components/PizzaBlock/LoadingBlock";
import PizzaBlock from "../components/PizzaBlock";
import axios from "axios";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

const Home = () => {
  const { categoryId, sort, searchValue, currentPage } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const sortType = sort.sortProperty;
  const sortBy = sortType.replace("-", "");
  const order = sortType.includes("-") ? "asc" : "desc";
  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://62a0689f202ceef7086cfb43.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        );
        setItems(data);
        setIsLoading(false);
        window.scrollTo(0, 0);
      } catch (e) {
        alert("Ошибка при получении пицц");
        console.error(e);
      }
    })();
  }, [categoryId, currentPage, sortType, searchValue]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <LoadingBlock key={i} />)
          : items.map((obj, i) => <PizzaBlock key={obj + i} {...obj} />)}
      </div>
      <Pagination onChangePage={(number) => onChangePage(number)} />
    </div>
  );
};

export default Home;
