import { assets } from "../../assets/assets";
import "./appDownload.css";

export default function AppDownload() {
  return (
    <div className="app-download-container">
      <div className="app-download">
        <div className="app-download-left">
          <h1>Download Mobile App For Better experience</h1>
          <div className="app-download-links">
            <a href="#">
              <img src={assets.play_store} alt="" />
            </a>
            <a href="#">
              <img src={assets.app_store} alt="" />
            </a>
          </div>
        </div>
        <img src={assets.app_main_img} alt="" />
      </div>
    </div>
  );
}
