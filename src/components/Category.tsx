import React from "react";

interface CategoryProps {
  image: string;
  image2: string;
  name: string;
  active: string;
}

const Category: React.FC<CategoryProps> = ({ image, image2, name, active }: CategoryProps) => {
  return (
    <div className={`py-2 md:py-4 px-auto w-[150px] md:w-[200px] ${active === "true" ? 'bg-red-500 text-white' : ''} h-[150px] md:h-[200px] border-2 border-gray-300 rounded-md flex justify-center items-center`}>
      <center className="">
        <img src={`${active === "true" ? image2 : image}`} alt="" />
        <p className="pt-2 md:pt-4">{name}</p>
      </center>
    </div>
  );
};

export default Category;
