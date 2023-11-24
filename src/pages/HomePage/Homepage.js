import BestSellingProducts from "./components/BestSellingProducts";
import BrowseByCategory from "./components/BrowseByCategory";
import ExploreOurProducts from "./components/ExploreOurProducts";
import HomePageFlashSale from "./components/HomePageFlashSale";
import HomePageHero from "./components/HomePageHero";
import NewArrival from "./components/NewArrival";

const HomePage = () => {
  return <div>
    <HomePageHero />
    <HomePageFlashSale />
    <BrowseByCategory />
    <BestSellingProducts />
    <ExploreOurProducts />
    <NewArrival />
  </div>;
};

export default HomePage;
