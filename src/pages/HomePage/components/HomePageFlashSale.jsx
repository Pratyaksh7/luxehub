import Button from "../../../components/Button";
import ProductCard from "../../../components/ProductCard";
import SectionNameAndHeading from "../../../components/SectionNameAndHeading";

const HomePageFlashSale = () => {
  return (
    <div className="container px-10 mx-auto">
      <div className="flex justify-between items-end my-10">
        <div className="left w-1/2 flex gap-2">
          <div className="l-left flex-col  w-1/2">
            <SectionNameAndHeading name="Today's" heading="Flash Sales" />
          </div>

          <div className="l-right time flex justify-around items-end w-1/2">
            <div className="days flex flex-col items-center justify-center">
              <small className="text-sm font-normal">Days</small>
              <h4 className="text-5xl font-medium">03</h4>
            </div>
            <div className="font-normal text-5xl pt-2 text-red-500">:</div>
            <div className="hours flex flex-col items-center justify-center">
              <small className="text-sm font-normal">Hours</small>
              <h4 className="text-5xl font-medium">23</h4>
            </div>
            <div className="font-normal text-5xl pt-2 text-red-500">:</div>
            <div className="minutes flex flex-col items-center justify-center">
              <small className="text-sm font-normal">Minutes</small>
              <h4 className="text-5xl font-medium">19</h4>
            </div>
            <div className="font-normal text-5xl pt-2 text-red-500">:</div>
            <div className="seconds flex flex-col items-center justify-center">
              <small className="text-sm font-normal">Seconds</small>
              <h4 className="text-5xl font-medium">56</h4>
            </div>
          </div>
        </div>
        <div className="right w-1/2"></div>
      </div>
      <div className="product-list px-10 flex justify-start gap-5 flex-wrap">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <div className="flex justify-center items-center my-10">
        <Button />
      </div>
    </div>
  );
};

export default HomePageFlashSale;
