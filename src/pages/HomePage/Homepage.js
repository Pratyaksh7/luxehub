import { Divider } from "antd";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import BestSellingProducts from "./components/BestSellingProducts";
import BrowseByCategory from "./components/BrowseByCategory";
import ExploreOurProducts from "./components/ExploreOurProducts";
import HomePageFlashSale from "./components/HomePageFlashSale";
import HomePageHero from "./components/HomePageHero";
import NewArrival from "./components/NewArrival";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts } from "../../features/products/productsSlice";
import { useEffect } from "react";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
  },[])
  return (
    <div>
      <HomePageHero />
      <HomePageFlashSale />
      <BrowseByCategory />
      <BestSellingProducts />
      <ExploreOurProducts />
      <NewArrival />
      <Footer />
    </div>
  );
};

export default HomePage;
