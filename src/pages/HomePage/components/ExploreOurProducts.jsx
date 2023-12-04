import ProductCard from "../../../components/ProductCard";
import SectionNameAndHeading from "../../../components/SectionNameAndHeading";
import GamePad from "../../../assets/images/gamepad.png";
import Keyboard from "../../../assets/images/ak-900-01-500x500 1.png";
import LCD from "../../../assets/images/g27cq4-500x500 1.png";
import Chair from "../../../assets/images/sam-moghadam-khamseh-kvmdsTrGOBM-unsplash 1.png";

const ExploreOurProducts = () => {
  return (
    <div className="md:w-[90%] px-2 mx-auto">
      <div className="flex flex-col p-5 md:justify-between md:items-end md:my-10">
        <div className="left flex-1 flex w-full flex-row gap-2  p-2">
          <div className="l-left flex-col flex-2  mr-10 md:mr-20">
            <SectionNameAndHeading
              name="Our Products"
              heading="Explore Our Products"
            />
          </div>
        </div>
        <div className="right flex-1"></div>
      </div>
      <div className="product-list p-4 gap-3 md:px-10 flex justify-evenly md:gap-5 flex-wrap">
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
      <div className="flex justify-center items-center my-4 md:my-10">
        <button className="bg-red-500 py-3 px-8 rounded-md text-white">
          View All Products
        </button>
      </div>
    </div>
  );
};

export default ExploreOurProducts;
