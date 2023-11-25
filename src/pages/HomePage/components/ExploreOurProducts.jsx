import ProductCard from "../../../components/ProductCard";
import SectionNameAndHeading from "../../../components/SectionNameAndHeading";
import GamePad from "../../../assets/images/gamepad.png";
import Keyboard from "../../../assets/images/ak-900-01-500x500 1.png";
import LCD from "../../../assets/images/g27cq4-500x500 1.png";
import Chair from "../../../assets/images/sam-moghadam-khamseh-kvmdsTrGOBM-unsplash 1.png";

const ExploreOurProducts = () => {
  return (
    <div className="container px-10 mx-auto">
      <div className="flex justify-between items-end my-10">
        <div className="left w-1/2 flex-col gap-1">
          <SectionNameAndHeading
            name="Our Products"
            heading="Explore Our Products"
          />
        </div>
        <div className="right w-1/2"></div>
      </div>
      <div className="product-list px-10 flex justify-start gap-5 flex-wrap">
        <ProductCard
          image={GamePad}
          discount="-40%"
          name="HAVIT HV-G92 Gamepad"
          discount_price="120"
          actual_price="160"
        />
        <ProductCard
          image={Keyboard}
          discount="-35%"
          name="AK-900 Wired Keyboard"
          discount_price="960"
          actual_price="1160"
        />
        <ProductCard
          image={LCD}
          discount="-30%"
          name="IPS LCD Gaming Monitor"
          discount_price="370"
          actual_price="400"
        />
        <ProductCard
          image={Chair}
          discount="-25%"
          name="S-Series Comfort Chair "
          discount_price="375"
          actual_price="400"
        />
        <ProductCard
          image={Chair}
          discount="-25%"
          name="S-Series Comfort Chair "
          discount_price="375"
          actual_price="400"
        />
        <ProductCard
          image={LCD}
          discount="-30%"
          name="IPS LCD Gaming Monitor"
          discount_price="370"
          actual_price="400"
        />
        <ProductCard
          image={Keyboard}
          discount="-35%"
          name="AK-900 Wired Keyboard"
          discount_price="960"
          actual_price="1160"
        />
        <ProductCard
          image={GamePad}
          discount="-40%"
          name="HAVIT HV-G92 Gamepad"
          discount_price="120"
          actual_price="160"
        />
      </div>
      <div className="flex justify-center items-center my-10">
        <button className="bg-red-500 py-3 px-8 rounded-md text-white">
          View All Products
        </button>
      </div>
    </div>
  );
};

export default ExploreOurProducts;
