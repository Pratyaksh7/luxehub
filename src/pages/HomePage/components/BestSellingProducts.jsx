import ProductCard from "../../../components/ProductCard";
import SectionNameAndHeading from "../../../components/SectionNameAndHeading";
import JBL from "../../../assets/images/homepage/JBL.png";
import GamePad from "../../../assets/images/gamepad.png";
import Keyboard from "../../../assets/images/ak-900-01-500x500 1.png";
import LCD from "../../../assets/images/g27cq4-500x500 1.png";
import Chair from "../../../assets/images/sam-moghadam-khamseh-kvmdsTrGOBM-unsplash 1.png";

const BestSellingProducts = () => {
  return (
    <div className="container px-10 mx-auto">
      <div className="flex justify-between items-end my-10">
        <div className="left w-1/2 flex-col gap-1">
          <SectionNameAndHeading
            name="This Month"
            heading="Best Selling Products"
          />
        </div>
        <div className="right w-1/2">
          <div className="flex justify-end items-center mx-20">
            <button className="bg-red-500 py-3 px-8 rounded-md text-white">
              View All
            </button>
          </div>
        </div>
      </div>
      <div className="product-list px-10 flex justify-start gap-5 flex-wrap">
      <ProductCard image={GamePad} discount="-40%" name="HAVIT HV-G92 Gamepad" discount_price="120" actual_price="160" />
        <ProductCard image={Keyboard} discount="-35%" name="AK-900 Wired Keyboard" discount_price="960" actual_price="1160" />
        <ProductCard image={LCD} discount="-30%" name="IPS LCD Gaming Monitor" discount_price="370" actual_price="400" />
        <ProductCard image={Chair} discount="-25%" name="S-Series Comfort Chair " discount_price="375" actual_price="400" />
      </div>
      <div className="max-w-screen-xl mx-auto p-10 my-20">
        <div className="flex justify-between items-center bg-black text-white p-10">
          <div className="left  w-1/2 p-4 flex flex-col gap-10 justify-evenly align-center">
            <h4 className="text-green-500 font-semibold">Categories</h4>
            <h1 className="text-6xl">Enhance Your Music Experience</h1>
            <div className="time flex justify-start items-center gap-4">
              <div className="days flex flex-col p-2 w-[80px] h-[80px] bg-white text-black rounded-full items-center justify-center">
                <h4 className="text-xl font-medium">03</h4>
                <small className="text-sm font-normal">Days</small>
              </div>
              <div className="hours flex flex-col p-2 w-[80px] h-[80px] bg-white text-black rounded-full items-center justify-center">
                <h4 className="text-xl font-medium">23</h4>
                <small className="text-sm font-normal">Hours</small>
              </div>
              <div className="minutes flex flex-col p-2 w-[80px] h-[80px] bg-white text-black rounded-full items-center justify-center">
                <h4 className="text-xl font-medium">19</h4>
                <small className="text-sm font-normal">Minutes</small>
              </div>
              <div className="seconds flex flex-col p-2 w-[80px] h-[80px] bg-white text-black rounded-full items-center justify-center">
                <h4 className="text-xl font-medium">56</h4>
                <small className="text-sm font-normal">Seconds</small>
              </div>
            </div>
            <button className="bg-green-500 py-3 px-8 rounded-md text-white w-fit">
              Buy Now!
            </button>
          </div>
          <div className="right w-1/2">
            <img src={JBL} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;
