import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import GoogleMap from "../Components/GoogleMap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "../Components/Loader";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";
// import { Map } from "@mui/icons-material";
// import GMap from "../assets/map.png";
import BasicButton from "../Components/Material/Button";
import CustomizedSteppers from "../Components/Material/Stepper";
import SearchDropDown from "../Components/SearchDropDown";
import BasicTextFields from "../Components/Material/TextField";
import DatePicker from "../Components/Material/Date";

const AOF = () => {
  const [status, setStatus] = useState("Start Day");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [suppliers, setSuppliers] = useState(1);
  const [cheque, setCheque] = useState(1);
  const [steps, setSteps] = useState({
    step1: true,
    step2: false,
    step3: false,
  });
  const sidebarRef = useRef();

  const show = null;
  const temp = [];
  const Co_ordinates = JSON.parse(localStorage.getItem("co_ordinates"));

  const calActiceStep = () => {
    if (steps.step1) {
      return 0;
    }
    if (steps.step2) {
      return 1;
    }
    if (steps.step3) {
      return 2;
    }
  };

  const handleForm = () => {
    let content = [];
    for (let i = 0; i < suppliers; i++) {
      content.push(
        <li className="flex gap-4 items-center">
          <span className="mt-4 text-gray-100">{i + 1}.</span>
          <BasicTextFields
            lable={"Name"}
            variant={"standard"}
            multiline={false}
          />
          <BasicTextFields
            lable={"Annual Business"}
            variant={"standard"}
            multiline={false}
          />
        </li>
      );
    }
    return content;
  };

  const handleCheques = () => {
    let content = [];
    for (let i = 0; i < cheque; i++) {
      content.push(
        <li className="flex gap-4 items-center">
          <span className="mt-4 text-gray-100">{i + 1}.</span>
          <BasicTextFields
            lable={"Cheque No"}
            variant={"standard"}
            multiline={false}
          />
          <BasicTextFields
            lable={"Bank"}
            variant={"standard"}
            multiline={false}
          />
          <BasicTextFields
            lable={"Branch/IFSC"}
            variant={"standard"}
            multiline={false}
          />
        </li>
      );
    }
    return content;
  };

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
    title: "AOF",
    details: ["Home", "/AOF"],
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
    // setSidebarCollapsed(!sidebarCollapsed);
    sidebarRef.current.openSidebar();
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
    window.scroll(0, 0);

    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);
  return (
    <>
      <div className="flex w-[100%] min-h-[100vh]">
        {loading ? <Loader /> : null}

        <Sidebar
          highLight={""}
          sidebarCollapsed={sidebarCollapsed}
          show={show}
        />

        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={""}
          />
        </div>
        <div
          className={`flex flex-col w-[100vw] relative transition-all ease-linear duration-300 lg:w-[83vw] lg:ml-[18vw] ${
            window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[85vw]"
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
            <div className="min-h-[90vh] relative flex w-full justify-center items-start gap-4 bg-[#141728]">
              <h1 className="text-gray-100 text-2xl font-semibold absolute top-[2rem] left-[2rem]">
                Account Opening Form
              </h1>
              <div className="w-full flex flex-col gap-4 items-center mt-[7rem]">
                <CustomizedSteppers
                  activeStep={calActiceStep()}
                  steps={["", "", ""]}
                />
                {/* step 1 */}
                {steps.step1 ? (
                  <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                    <div className="grid sm:grid-rows-5 sm:grid-cols-3 grid-rows-[15] grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                      <BasicTextFields
                        lable={"Name Of Party/School"}
                        variant={"standard"}
                        multiline={false}
                      />

                      <SearchDropDown
                        Name={"school_name"}
                        label={"Select School"}
                        color={"rgb(243, 244, 246)"}
                      />
                      <BasicTextFields
                        lable={"Address"}
                        variant={"standard"}
                        multiline={false}
                      />
                      <BasicTextFields
                        lable={"City"}
                        variant={"standard"}
                        multiline={false}
                      />
                      <BasicTextFields
                        lable={"State"}
                        variant={"standard"}
                        multiline={false}
                      />
                      <BasicTextFields
                        lable={"Pin Code"}
                        variant={"standard"}
                        type={"number"}
                        multiline={false}
                      />
                      <BasicTextFields
                        lable={"Phone"}
                        type={"number"}
                        variant={"standard"}
                        multiline={false}
                      />
                      <BasicTextFields
                        lable={"Mobile"}
                        type={"number"}
                        variant={"standard"}
                        multiline={false}
                      />
                      <BasicTextFields
                        lable={"E-Mail"}
                        variant={"standard"}
                        multiline={false}
                      />
                      <div className="sm:col-span-2">
                        <BasicTextFields
                          lable={"Firm/ Company/Trust Registration Number"}
                          variant={"standard"}
                          multiline={false}
                        />
                      </div>
                      <DatePicker label={"Dated"} />
                      <BasicTextFields
                        lable={"PAN NO"}
                        variant={"standard"}
                        multiline={false}
                      />
                      <BasicTextFields
                        lable={"GST NO"}
                        variant={"standard"}
                        multiline={false}
                      />
                      <BasicTextFields
                        lable={"GST Year of establishment of business"}
                        variant={"standard"}
                        type={"number"}
                        multiline={false}
                      />
                    </div>
                    <div
                      className="mt-3"
                      onClick={() => {
                        setSteps({ step1: false, step2: true, step3: false });
                        window.scroll({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      <BasicButton text={"Next"} />
                    </div>
                  </div>
                ) : null}
                {/* step 2 */}
                {steps.step2 ? (
                  <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                    <div className="grid sm:grid-rows-3 sm:grid-cols-3 grid-rows-[7] grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                      <div className="sm:col-span-2">
                        <BasicTextFields
                          lable={"Name of Proprietor/Partner/Director/Trustee"}
                          variant={"standard"}
                          multiline={false}
                        />
                      </div>

                      <BasicTextFields
                        lable={"PAN NO"}
                        variant={"standard"}
                        multiline={false}
                      />
                      <BasicTextFields
                        lable={"Address"}
                        variant={"standard"}
                        multiline={false}
                      />
                      <BasicTextFields
                        lable={"Pin Code"}
                        type={"number"}
                        variant={"standard"}
                        multiline={false}
                      />

                      <BasicTextFields
                        lable={"Phone"}
                        type={"number"}
                        variant={"standard"}
                        multiline={false}
                      />
                      <BasicTextFields
                        lable={"Mobile"}
                        type={"number"}
                        variant={"standard"}
                        multiline={false}
                      />
                      <BasicTextFields
                        lable={"E-Mail"}
                        variant={"standard"}
                        multiline={false}
                      />
                    </div>
                    <div className="w-full flex flex-col my-2 gap-2">
                      <h1 className="font-semibold text-gray-100">
                        Name of other Publishers/Suppliers from whom the party
                        has credit facilities:
                      </h1>
                      <div onClick={() => setSuppliers(suppliers + 1)}>
                        <BasicButton text={"Add More"} />
                      </div>
                      <ol className="list-decimal">{handleForm()}</ol>
                    </div>
                    <div
                      onClick={() => {
                        setSteps({ step1: false, step2: false, step3: true });
                        window.scroll({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      className="mt-3"
                    >
                      <BasicButton text={"Next"} />
                    </div>
                  </div>
                ) : null}
                {/* step 3 */}
                {steps.step3 ? (
                  <div className="flex flex-col gap-4 items-start w-[90%] px-6 bg-slate-600 rounded-md py-6 mb-[5rem]">
                    <div className="grid sm:grid-rows-2 sm:grid-cols-3 grid-rows-4 grid-cols-1 w-full mt-6 gap-6 rounded-md bg-slate-600">
                      <div className="sm:col-span-2">
                        <BasicTextFields
                          lable={"Name and address of the party’s main bankers"}
                          variant={"standard"}
                          multiline={false}
                        />
                      </div>

                      <BasicTextFields
                        lable={"Account Number"}
                        variant={"standard"}
                        type={"number"}
                        multiline={false}
                      />
                      <SearchDropDown
                        label={"Type of A/c "}
                        color={"rgb(243, 244, 246)"}
                      />
                      <BasicTextFields
                        lable={"IFSC"}
                        type={"number"}
                        variant={"standard"}
                        multiline={false}
                      />
                    </div>
                    <div className="w-full flex flex-col my-2 gap-2">
                      <h1 className="font-semibold text-gray-100">
                        Detail of Cheques:
                      </h1>
                      <div onClick={() => setCheque(cheque + 1)}>
                        <BasicButton text={"Add More"} />
                      </div>
                      <ol className="list-decimal">{handleCheques()}</ol>
                    </div>
                    <div className="mt-3">
                      <BasicButton text={"Submit"} />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AOF;