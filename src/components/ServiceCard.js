const ServiceCard = ({ image, heading, text }) => {
  return (
    <div className="flex flex-col items-center gap-4 md:gap-5">
      <img src={image} alt="" />
      <center>
        <h2 className="font-medium text-md md:text-lg">{heading}</h2>
        <p><small>{text}</small></p>
      </center>
    </div>
  );
};

export default ServiceCard;
