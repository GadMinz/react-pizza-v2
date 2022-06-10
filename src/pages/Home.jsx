import React from "react";
import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import LoadingBlock from "../components/PizzaBlock/LoadingBlock";
import PizzaBlock from "../components/PizzaBlock";
import qs from "qs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

const Home = () => {
  const navigate = useNavigate();
  const { categoryId, sort, searchValue, currentPage } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  const sortType = sort.sortProperty;

  const fetchPizzas = () => {
    setIsLoading(true);
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    (async () => {
      try {
        const { data } = await axios.get(
          `https://62a0689f202ceef7086cfb43.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        );
        setItems(data);
        setIsLoading(false);
      } catch (e) {
        alert("Ошибка при получении пицц");
        console.error(e);
      }
    })();
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      const state = { ...params, sort };
      dispatch(setFilters(state));
      if (Number(params.categoryId) === 0) {
        fetchPizzas();
      }
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    console.log(isSearch.current);
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, currentPage, sortType, searchValue]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, currentPage, sortType, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
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
