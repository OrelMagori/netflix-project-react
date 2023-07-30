import React from "react";
import { FiLinkedin, FiGithub, FiMail } from "react-icons/fi";
import "./Footer.css";

const Footer = () => {
  const orelEmail = "orelmagori@gmail.com";
  const idanEmail = "idanyaron05@gmail.com";

  const handleEmailClick = (location) => {
    let email;

    if (location === "footer-left") {
      email = idanEmail;
    } else if (location === "footer-right") {
      email = orelEmail;
    }

    if (email) {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <footer className="footer">
      <span className="footer-top">Follow us for more projects</span>
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-name">
            <span>Idan Yaron</span>
            <div className="footer-social">
              <a
                href="https://www.linkedin.com/in/idanyaron/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiLinkedin className="footer-icon" />
              </a>
              <a
                href="https://github.com/IdanYaron"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub className="footer-icon" />
              </a>
              <span onClick={() => handleEmailClick("footer-left")}>
                <FiMail className="footer-icon" />
              </span>
            </div>
          </div>
        </div>
        <div className="footer-right">
          <div className="footer-name">
            <span>Orel Magori</span>
            <div className="footer-social">
              <a
                href="https://www.linkedin.com/in/orel-magori/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiLinkedin className="footer-icon" />
              </a>
              <a
                href="https://github.com/OrelMagori"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub className="footer-icon" />
              </a>
              <span onClick={() => handleEmailClick("footer-right")}>
                <FiMail className="footer-icon" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© Created by Orel Magori & Idan Yaron - 2023</span>
      </div>
    </footer>
  );
};

export default Footer;
