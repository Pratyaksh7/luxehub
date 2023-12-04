import Category from "../../../components/Category";
import SectionNameAndHeading from "../../../components/SectionNameAndHeading";
import Phones from "../../../assets/images/categories/Category-CellPhone.svg";
import Camera from "../../../assets/images/categories/Category-Camera.svg";
import Computers from "../../../assets/images/categories/Category-Computer.svg";
import Gamepad from "../../../assets/images/categories/Category-Gamepad.svg";
import Headphone from "../../../assets/images/categories/Category-Headphone.svg";
import SmartWatch from "../../../assets/images/categories/Category-SmartWatch.svg";
import PhonesWhite from "../../../assets/images/categories/Category-CellPhone-White.svg";
import CameraWhite from "../../../assets/images/categories/Category-Camera-White.svg";
import ComputersWhite from "../../../assets/images/categories/Category-Computer-White.svg";
import GamepadWhite from "../../../assets/images/categories/Category-Gamepad-White.svg";
import HeadphoneWhite from "../../../assets/images/categories/Category-Headphone-White.svg";
import SmartWatchWhite from "../../../assets/images/categories/Category-SmartWatch-White.svg";

const BrowseByCategory = () => {
  return (
    <div className="md:w-[90%] px-2 mx-auto">
      <div className="flex flex-col p-5 md:justify-between md:items-end md:my-10">
        <div className="left flex-1 flex w-full flex-row gap-2  p-2">
          <div className="l-left flex-col flex-2  mr-10 md:mr-20">
            <SectionNameAndHeading name="Categories" heading="Browse By Category" />
          </div>
        </div>
        <div className="right flex-1"></div>
      </div>
      
      <div className="category-list p-4 gap-3 md:px-10 flex justify-evenly md:gap-5 flex-wrap">
        <Category image={Phones} image2={PhonesWhite} name="Phones" active="false" />
        <Category image={Computers} image2={ComputersWhite} name="Computers" active="false" />
        <Category image={SmartWatch} image2={SmartWatchWhite} name="SmartWatch" active="false" />
        <Category image={Camera} image2={CameraWhite} name="Camera" active="true" />
        <Category image={Headphone} image2={HeadphoneWhite} name="HeadPhones" active="false" />
        <Category image={Gamepad} image2={GamepadWhite} name="Gaming" active="false" />
      </div>
    </div>
  );
};

export default BrowseByCategory;
