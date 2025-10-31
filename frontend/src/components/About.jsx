
import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const About = () => {
  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <div className="banner">
            <div className="top">
              <h1 className="heading">ABOUT US</h1>
              <p>The only thing we're serious about is food.</p>
            </div>
            <p className="mid">
              Our restaurant brings together flavors from around the world,
               offering an unforgettable multicuisine dining experience.
                From aromatic Indian curries to classic Italian pastas, vibrant Asian stir-fries,
                 and rich continental delicacies, every dish is crafted with passion. We focus on fresh ingredients, 
                 authentic recipes, warm hospitality,
                  and an inviting atmosphere where every guest enjoys exceptional taste, comfort, and satisfaction.
            </p>
            <Link to={"/"}>
              Explore Menu{" "}
              <span>
                <HiOutlineArrowRight />
              </span>
            </Link>
          </div>
          <div className="banner">
            <img src="about.png" alt="about" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
