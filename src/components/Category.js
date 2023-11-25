const Category = ({ image, image2, name, active }) => {
  return (
    <div className={`py-4 px-auto w-[200px] ${active === "true" ? 'bg-red-500 text-white': '' } h-[200px] border-2 border-gray-300 rounded-md flex justify-center items-center`}>
      <center className="">
        <img src={`${active === "true" ? image2: image}`} alt="" />
        <p className="pt-4">{name}</p>
      </center>
    </div>
  );
};

export default Category;
