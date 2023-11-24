import { ArrowRight } from "lucide-react";
import AppleIcon from "../../../assets/images/homepage/apple.png";
import HeroImage from "../../../assets/images/homepage/heroImage.png";

const HomePageHero = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center bg-black text-white p-10">
        <div className="left">
          <div className="flex gap-5 items-center mb-4">
            <img src={AppleIcon} />
            <p>iPhone 14 Series</p>
          </div>
          <div className="text-2xl max-w-[300px] leading-snug mb-4 md:text-5xl">
            <h2>Up to 10% off Voucher</h2>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="border-b-2 border-transparent hover:border-b-2 hover:border-slate-400">
            Shop Now{" "}
            </span>
            <span>
              <ArrowRight size={"20"} />
            </span>
          </div>
        </div>
        <div className="right ">
          <img src={HeroImage} className="bg-cyan-200" />
        </div>
      </div>
    </div>
  );
};

export default HomePageHero;
