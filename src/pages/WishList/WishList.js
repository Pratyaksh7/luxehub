import GamePad from "../../assets/images/gamepad.png";
import Keyboard from "../../assets/images/ak-900-01-500x500 1.png";
import LCD from "../../assets/images/g27cq4-500x500 1.png";
import Chair from "../../assets/images/sam-moghadam-khamseh-kvmdsTrGOBM-unsplash 1.png";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Divider } from "antd";
import { useSelector } from "react-redux";
const WishList = () => {
  const { wishlistData } = useSelector((state) => state.carts);
  console.log({ wishlistData });
  return (
    <div>
      <div className="p-5 pt-0 w-[80%] mx-auto">
        <div className="py-5 flex justify-between items-center mx-auto">
          <p>Wishlist (4)</p>
          <button className=" py-3 px-8 rounded-sm border border-black/20">
            Move All To Bag
          </button>
        </div>
        <div className="product-list flex justify-start gap-5 flex-wrap">
          {wishlistData?.length > 0 &&
            wishlistData?.map((product) => (
              <ProductCard
              product={product}
                id={product?._id}
                // image={GamePad}
                image={product?.images[0]}
                discount="-40%"
                name={product?.name}
                discount_price={product?.price}
                actual_price={product?.price}
                rating={product.rating}
                section="Wishlist"
              />
            ))}
        </div>

        {wishlistData?.length < 1 && (
          <div className="flex justify-center items-center text-slate-400 ">
            No Items found in the Wishlist
          </div>
        )}

        <div className="py-5 flex justify-between items-center">
          <div className="flex gap-5 items-center py-5">
            <div className="highlighter h-8 w-4 rounded bg-red-500" />
            <p className="text-md font-normal">Just For You</p>
          </div>
          <button className=" py-3 px-8 rounded-sm border border-black/20">
            See All
          </button>
        </div>

        <div className="product-list flex justify-start gap-5 flex-wrap">
          <ProductCard
            image={Chair}
            discount="-25%"
            name="S-Series Comfort Chair "
            discount_price="375"
            actual_price="400"
            section="JustForYou"
          />
          <ProductCard
            image={LCD}
            discount="-30%"
            name="IPS LCD Gaming Monitor"
            discount_price="370"
            actual_price="400"
            section="JustForYou"
          />
          <ProductCard
            image={Keyboard}
            discount="-35%"
            name="AK-900 Wired Keyboard"
            discount_price="960"
            actual_price="1160"
            section="JustForYou"
          />
          <ProductCard
            image={GamePad}
            discount="-40%"
            name="HAVIT HV-G92 Gamepad"
            discount_price="120"
            actual_price="160"
            section="JustForYou"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WishList;
