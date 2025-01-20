import "./AppLoading.scss";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LoadingAnimation } from "@/app/assets";

interface IProps {
  isLoading?: boolean;
}

const AppLoading: React.FC<IProps> = ({ isLoading = false }) => {
  if (!isLoading) return <div />;
  return (
    <div className={`app-loading-overlay ${!isLoading ? "hidden" : null}`}>
      <div className="app-loading-wrapper">
        <div className="loading">
          <DotLottieReact
            data={LoadingAnimation}
            loop
            autoplay
            style={{ width: 200, height: 200 }}
          />
        </div>
      </div>
    </div>
  );
};

export default AppLoading;
