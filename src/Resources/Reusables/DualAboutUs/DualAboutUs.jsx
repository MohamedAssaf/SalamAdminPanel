import "./DualAboutUs.css";
import { AboutUs } from '..';

function DualAboutUs({theAbouts}) {
  return (
    <div className="row">
      {
        theAbouts.map((theAbout, i) => {
           return <AboutUs title={theAbout.title} description={theAbout.description} dual={true} className="dual-about-us" icon={theAbout.icon} key={i}/>
        })
      }
    </div>
  );
}

export default DualAboutUs;
