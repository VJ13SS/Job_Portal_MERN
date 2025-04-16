import { assets } from "../../assets/assets";
import "./footer.css";

export default function Footer() {
  return (
    <footer>
      <img src={assets.logo} alt="" />
      <p>Copyright @VJ13SS.dev | All rights reserved</p>
      <div className="icons">
        <img src={assets.facebook_icon} alt="" />
        <img src={assets.twitter_icon} alt="" />
        <img src={assets.instagram_icon} alt="" />
      </div>
    </footer>
  );
}
