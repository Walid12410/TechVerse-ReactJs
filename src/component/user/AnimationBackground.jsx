import './background.css';

const AnimatedBackground = () => {
  return (
    <div className="wrapper">
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i}></span>
      ))}
    </div>
  );
};

export default AnimatedBackground;
