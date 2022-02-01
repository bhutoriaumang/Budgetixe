import Lottie from "lottie-react";
import loadingAnim from "../assets/loading-anim.json";

const Loading = () => {
  return (
    <div className="loading-anim">
      <div>
        <Lottie
          animationData={loadingAnim}
          loop={true}
          style={{ width: "25vw" }}
        />
        <h2 className="loading-tag">Loading</h2>
      </div>
    </div>
  );
};

export default Loading;
