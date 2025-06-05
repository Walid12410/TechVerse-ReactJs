import "./loading.css";

const LoadingAnimation = () => {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black-wash">
        <div className="relative textWrapper"
        style={{fontFamily: "CelabRegular, sans-serif"}}>
          TECH VERSE AGENCY
          <div className="invertbox"></div>
        </div>
      </div>
    );
  };
  
  export default LoadingAnimation;
  