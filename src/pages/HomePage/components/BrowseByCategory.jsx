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
    <div className="container px-10 mx-auto">
      <div className="flex justify-between items-end my-10">
        <div className="left w-1/2 flex-col gap-1">
          <SectionNameAndHeading
            name="Categories"
            heading="Browse By Category"
          />
        </div>
        <div className="right w-1/2"></div>
      </div>
      <div className="category-list px-10 flex justify-evenly gap-5 flex-wrap">
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
