import SectionNameAndHeading from "../../../components/SectionNameAndHeading";
import PlayStation from "../../../assets/images/homepage/ps5-slim-goedkope-playstation_large 1.png";
import Woman from "../../../assets/images/homepage/attractive-woman-wearing-hat-posing-black-background 1.png";
import Echo from "../../../assets/images/homepage/69-694768_amazon-echo-png-clipart-transparent-amazon-echo-png 1.png";
import Perfume from "../../../assets/images/homepage/652e82cd70aa6522dd785109a455904c.png";
import Service from "../../../assets/images/homepage/Services.png"
import Service1 from "../../../assets/images/homepage/Services (1).png"
import Service2 from "../../../assets/images/homepage/Services (2).png"
import ServiceCard from "../../../components/ServiceCard";

const NewArrival = () => {
  return (
    <div className="container px-10 mx-auto">
      <div className="flex justify-between items-end my-10">
        <div className="left w-1/2 flex-col gap-1">
          <SectionNameAndHeading name="Featured" heading="New Arrival" />
        </div>
        <div className="right w-1/2"></div>
      </div>
      <div className="newArrivals flex gap-10 my-10 mb-20">
        <div className="left-section w-1/2 bg-black/95 text-white">
          <div className="image-container relative flex justify-center items-end pt-10">
            <img src={PlayStation} alt="" />
            <div className="image-container-text absolute bottom-4 left-14 flex flex-col gap-3">
              <h3 className="text-3xl font-medium">PlayStation 5</h3>
              <p className="max-w-[250px] leading-snug font-light">
                Black and White version of the PS5 coming out on sale.
              </p>
              <span className="border-b-2 w-fit  font-medium text-xl border-transparent hover:border-b-2 hover:border-slate-400">
                Shop Now{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="right-section w-1/2 flex flex-col gap-5">
          <div className="r-upper relative bg-black/95 text-white">
            <div className="image-container  float-right">
              <img src={Woman} className="bg-transparent/80" alt="" />
            </div>
            <div className="image-container-text text-red absolute bottom-10 left-14 flex flex-col gap-3">
              <h3 className="text-3xl font-medium">Women’s Collections</h3>
              <p className="max-w-[250px] leading-snug font-light">
                Featured woman collections that give you another vibe.
              </p>
              <span className="border-b-2 w-fit font-medium text-xl border-transparent hover:border-b-2 hover:border-slate-400">
                Shop Now{" "}
              </span>
            </div>
          </div>
          <div className="r-bottom flex gap-5">
            <div className="bottom-left w-1/2 relative bg-black/95 text-white">
              <div className="image-container  flex justify-center items-end pt-10">
                <img src={Echo} alt="" />
              </div>
              <div className="image-container-text absolute bottom-4 left-10 flex flex-col gap-1">
                <h3 className="text-3xl font-medium">Speakers</h3>
                <p className="max-w-[250px] leading-snug font-light">
                  Amazon wireless speakers
                </p>
                <span className="border-b-2 w-fit border-transparent hover:border-b-2 hover:border-slate-400">
                  Shop Now{" "}
                </span>
              </div>
            </div>
            <div className="bottom-right w-1/2 relative bg-black/95 text-white">
              <div className="image-container  flex justify-center items-end pt-10">
                <img src={Perfume} alt="" />
              </div>
              <div className="image-container-text absolute bottom-4 left-10 flex flex-col gap-1">
                <h3 className="text-3xl font-medium">Perfume</h3>
                <p className="max-w-[250px] leading-snug font-light">
                  GUCCI INTENSE OUD EDP
                </p>
                <span className="border-b-2 w-fit border-transparent hover:border-b-2 hover:border-slate-400">
                  Shop Now{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-evenly mb-24">
        <ServiceCard image={Service} heading="FREE AND FAST DELIVERY" text="Free delivery for all orders over $140" />
        <ServiceCard image={Service1} heading="24/7 CUSTOMER SERVICE" text="Friendly 24/7 customer support" />
        <ServiceCard image={Service2} heading="MONEY BACK GUARANTEE" text="We reurn money within 30 days" />
      </div>
    </div>
  );
};

export default NewArrival;
