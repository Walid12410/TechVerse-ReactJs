
const ServiceNameSection = ({ serviceName, icon }) => {

    if(serviceName.length === 0) return null;

  const repeatedServices = [...serviceName, ...serviceName, ...serviceName, ...serviceName,...serviceName];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {repeatedServices.map((service, index) => (
          <div className="marquee-item" key={index}>
            <img src={icon} alt="icon" className="service-icon" />
            <span>{service.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceNameSection;
