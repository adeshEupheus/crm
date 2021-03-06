import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import GoogleMap from "../Components/GoogleMap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "../Components/Loader";
import Hamburger from "../Components/Hamburger";

const Home = () => {
  const [status, setStatus] = useState("Start Day");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const show = null;
  const temp = [];
  const Co_ordinates = JSON.parse(localStorage.getItem("co_ordinates"));

  useLayoutEffect(() => {
    navigator.geolocation.watchPosition(function (position) {
      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });

      handleCoordinates(position);
    });
  }, []);

  const handleCoordinates = (position) => {
    temp.push({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });

    localStorage.setItem("co_ordinates", JSON.stringify(temp));
  };

  const navInfo = {
    title: "",
    details: ["", ""],
  };

  const handleLocation = async () => {
    if (status === "Start Day") {
      setLoading(true);
      const res = await axios.post(
        "https://nodecrmv2.herokuapp.com/api/user/start_day",
        {
          category: "start",
          coordinates: [[currentLocation.lng, currentLocation.lat]],
        },
        {
          headers: {
            authorization: Cookies.get("accessToken"),
          },
        }
      );
      console.log(res);
      setStatus("End Day");
      setLoading(false);
    } else {
      setLoading(true);
      const running = await axios.post(
        "https://nodecrmv2.herokuapp.com/api/user/start_day",
        {
          category: "running",
          coordinates: Co_ordinates,
        },
        {
          headers: {
            authorization: Cookies.get("accessToken"),
          },
        }
      );

      console.log(running);

      const res = await axios.post(
        "https://nodecrmv2.herokuapp.com/api/user/start_day",
        {
          category: "end",
          coordinates: [[currentLocation.lng, currentLocation.lat]],
        },
        {
          headers: {
            authorization: Cookies.get("accessToken"),
          },
        }
      );

      console.log(res);
      setStatus("Start Day");
      localStorage.clear();
      setLoading(false);
    }
  };

  const handleSidebarCollapsed = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  useEffect(() => {
    const handleWidth = () => {
      if (window.innerWidth > 1024) {
        setSidebarCollapsed(false);
      } else {
        setSidebarCollapsed(true);
      }
    };
    window.addEventListener("resize", handleWidth);
    handleWidth();
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);
  return (
    <div className="flex max-w-[100vw] overflow-hidden">
      {loading ? <Loader /> : null}

      <Sidebar sidebarCollapsed={sidebarCollapsed} show={show} />
      <div
        className={`flex flex-col w-[100vw] relative transition-all ease-linear duration-300 lg:w-[83vw] lg:ml-[18vw] ${
          sidebarCollapsed ? null : "md:ml-[30vw] ml-[60vw]"
        } `}
      >
        <Navbar
          handleSidebarCollapsed={handleSidebarCollapsed}
          info={navInfo}
        />

        {showMap ? (
          <div className="h-[90vh] bg-gray-300">
            <GoogleMap
              sidebarCollapsed={sidebarCollapsed}
              currentLocation={currentLocation}
            />
          </div>
        ) : (
          <div className="h-[90vh] bg-gray-300">
            {/* <GoogleMap sidebarCollapsed={sidebarCollapsed} /> */}
            {/* <button className="px-4 py-1 bg-blue-400" onClick={handleLocation}>
            Start Day
          </button> */}
            <div className="w-full flex justify-end">
              <div className="flex pl-6 gap-[4rem] items-center bg-gray-600 w-fit rounded-md mt-[2rem] mr-[2rem]">
                <span className="text-gray-400 my-3 text-xs">
                  School Check In
                </span>
                <span
                  onClick={() => navigate("/school/punch_in")}
                  className="text-gray-300 rounded-r-md font-bold hover:shadow-lg bg-slate-500 py-2 px-4 hover:text-gray-100 transition-all duration-200 ease-linear cursor-pointer"
                >
                  Check In
                </span>
                {/* <Hamburger /> */}
              </div>
            </div>
            <button
              onClick={() => setShowMap(true)}
              className={`w-[7rem] absolute top-[60vh] font-semibold right-[2rem] col-span-2 focus:outline-0 mt-8 text-gray-300 hover:shadow-md h-10  transition-all duration-200 ease-linear active:bg-slate-700 active:scale-95 rounded-md ${
                status === "End Day" ? "bg-red-800" : "bg-slate-500"
              }`}
            >
              Map
            </button>
            <button
              onClick={handleLocation}
              className={`w-[7rem] absolute top-[80vh] font-semibold right-[2rem] col-span-2 focus:outline-0 mt-8 text-gray-300 hover:shadow-md h-10  transition-all duration-200 ease-linear active:bg-slate-700 active:scale-95 rounded-md ${
                status === "End Day" ? "bg-red-800" : "bg-slate-500"
              }`}
            >
              {status}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
