import React from "react";
import { FiLinkedin, FiGithub } from "react-icons/fi";
import "./Footer.css";

const Footer = () => {
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
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">
          &#169; 2023 Netflix Simulator. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
