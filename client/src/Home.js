import React from "react";
import NavBar from "./components/HomePage/NavBar";
import Banner from "./components/HomePage/Banner";
import Footer from "./components/HomePage/Footer";

function Home() {
  return (
    <div>
      {/* <div classname="particles">
        <Particles
          id="tsparticles"
          options={{
            background: {
              color: {
                value: "#ffffff"
              }
            },
            fpsLimit: 60,
            interactivity: {
              detectsOn: "canvas",
              events: {
                onClick: {
                  enable: true,
                  mode: "push"
                },
                onHover: {
                  enable: true,
                  mode: "repulse"
                },
                resize: true
              },
              modes: {
                bubble: {
                  distance: 400,
                  duration: 2,
                  opacity: 0.8,
                  size: 40
                },
                push: {
                  quantity: 4
                },
                repulse: {
                  distance: 200,
                  duration: 0.4
                }
              }
            },
            particles: {
              color: {
                value: "#ff0800"
              },
              links: {
                color: "#ff0800",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1
              },
              collisions: {
                enable: true
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 6,
                straight: false
              },
              number: {
                density: {
                  enable: true,
                  value_area: 800
                },
                value: 80
              },
              opacity: {
                value: 0.5
              },
              shape: {
                type: "circle"
              },
              size: {
                random: true,
                value: 5
              }
            },
            detectRetina: true
          }}
        />
      </div> */}
      <NavBar />
      <Banner />
      <Footer />
    </div>
  );
}

export default Home;
