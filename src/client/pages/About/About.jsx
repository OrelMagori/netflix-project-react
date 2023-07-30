import React from "react";

import "./About.css";
import Footer from "../../components/Footer/Footer";
import Navigator from "../../components/Navigator/Navigator";

export const About = () => {
  return (
    <div>
      <Navigator />
      <div className="about-container">
        <main className="content">
          <h1 style={{ textAlign: "center", marginTop: '5vh' }}>About Us</h1>
          <div className="about-section">
            <p>
              Welcome to our website! We are two students studying software
              engineering at Ariel University, currently in our second year. As
              passionate developers, we embarked on a project to create a
              website that simulates the popular streaming platform Netflix.
            </p>
            <p>
              Our goal was to challenge ourselves and apply the skills we have
              acquired in our studies. We chose to build the website using
              React, a powerful JavaScript library for building user interfaces.
              React allowed us to create a dynamic and interactive user
              experience, just like the real Netflix.
            </p>
            <p>
              To store and retrieve data, we utilized MongoDB, a flexible and
              scalable NoSQL database. This allowed us to manage user profiles,
              movie information, and more in an efficient manner.
            </p>
            <p>
              One of the key features of our website is the integration of the
              TMDb API. By leveraging this API, we were able to fetch a vast
              collection of movie data, including titles, descriptions, ratings,
              and more. This integration allowed us to provide users with an
              authentic Netflix-like experience, complete with a rich catalog of
              movies to explore.
            </p>
            <p>
              Throughout the development process, we dedicated countless hours
              to designing, coding, and testing every aspect of the website.
              From the frontend user interface to the backend functionality, we
              ensured that every detail was meticulously crafted to deliver a
              seamless and enjoyable experience for our users.
            </p>
            <p>
              We are proud to say that this website is the result of our hard
              work, determination, and the skills we have acquired during our
              software engineering studies. We hope that you find our project
              entertaining and that it brings a touch of Netflix to your
              browsing experience.
            </p>
            <p>Thank you for visiting our website!</p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};
