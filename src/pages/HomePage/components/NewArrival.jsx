import SectionNameAndHeading from "../../../components/SectionNameAndHeading";

const NewArrival = () => {
  return (
    <div className="container px-10 mx-auto">
      <div className="flex justify-between items-end my-10">
        <div className="left w-1/2 flex-col gap-1">
          <SectionNameAndHeading name="Featured" heading="New Arrival" />
        </div>
        <div className="right w-1/2"></div>
      </div>
    </div>
  );
};

export default NewArrival;
