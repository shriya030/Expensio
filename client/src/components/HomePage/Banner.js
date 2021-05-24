import React from "react";
import "./Banner.css";
import Typed from "react-typed";

function Banner() {
  return (
    <div className="bg">
      <div class="context">
        <h1>Welcome to Expensio</h1>
        <p style={{ color: "white" }}>
          {" "}
          <Typed
            strings={[
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
            ]}
            typeSpeed={40}
          ></Typed>{" "}
        </p>
      </div>

      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default Banner;
