import "./background.css";

const AnimatedBackground = () => {
  return (
    <div className="video-background-wrapper">
      <video autoPlay muted loop className="background-video">
        <source src="/Vid1.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default AnimatedBackground;
