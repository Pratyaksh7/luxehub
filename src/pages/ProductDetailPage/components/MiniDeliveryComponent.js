const MiniDeliveryComponent = ({image, heading, para}) => {
  return (
    <div className="info flex items-center gap-4">
      <div className="icon">
        <img src={image} alt="" />
      </div>
      <div>
        <h3 className="text-lg font-medium">{heading}</h3>
        <p className="font-medium">
          {para}
        </p>
      </div>
    </div>
  );
};

export default MiniDeliveryComponent;
