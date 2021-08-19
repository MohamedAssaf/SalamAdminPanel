import "./AboutUs.css";
import ReactPlayer from "react-player";
import { useMediaQuery } from "react-responsive";

function renderTitleWithIcon(title, icon) {
  if (icon) {
    return (
      <div className="row">
        <div className="col-md-8">
          <h1> {title} </h1>
        </div>
        <div className="col-md-2">
          <img src={icon} width={40} alt="Icon"/>
        </div>
      </div>
    );
  } else {
    return <h1> {title} </h1>;
  }
}

function AboutUs({ title, description, dual, video, icon }) {
  const isTabletOrMobile = useMediaQuery({ query: "(min-width: 768px)" });
  if (video) {
    return (
      <div
        className={`about-us ${dual ? "col-md-2 centered-dual-about-us" : ""}`}
      >
        <h1> {title} </h1>
        <p className="about-us-desc"> {description} </p>
        <div className="story-video">
          {isTabletOrMobile ? (
            <ReactPlayer url={video} />
          ) : (
            <ReactPlayer url={video} width="100%" height="100%" />
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`about-us ${dual ? "col-md-2 centered-dual-about-us" : ""}`}
      >
        {renderTitleWithIcon(title, icon)}
        <p className="about-us-desc"> {description} </p>
      </div>
    );
  }
}

export default AboutUs;
