import { Divider } from "antd";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import BestSellingProducts from "./components/BestSellingProducts";
import BrowseByCategory from "./components/BrowseByCategory";
import ExploreOurProducts from "./components/ExploreOurProducts";
import HomePageFlashSale from "./components/HomePageFlashSale";
import HomePageHero from "./components/HomePageHero";
import NewArrival from "./components/NewArrival";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Divider />

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
