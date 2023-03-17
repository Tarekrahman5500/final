import React from 'react';
import {Link} from "react-router-dom";
import playStore from "../../../assets/playstore.png";
import appStore from "../../../assets/Appstore.png";
import "./Footer.css";
const Footer = () => {
    return (
        <footer id="footer">
          <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy; @trk</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <Link to="http://instagram.com/meabhisingh">Instagram</Link>
        <Link to="http://youtube.com/6packprogramemr">Youtube</Link>
        <Link to="http://instagram.com/meabhisingh">Facebook</Link>
      </div>
        </footer>
    );
};

export default Footer;