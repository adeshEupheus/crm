import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { ArrowForwardIos } from "@mui/icons-material";
import { Link } from "react-router-dom";
import DataTable from "../Components/DataTable";
import { rows, MySchoolRows } from "../DummyData";
import SwipeableTemporaryDrawer from "../Components/Material/MaterialSidebar";

const MySchool = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [highLight, setHighLight] = useState("mySchool");
  const sidebarRef = useRef();

  const navInfo = {
    title: "My School",
    details: ["Home", " / My School"],
  };

  const Tablecolumns = [
    { field: "CrmId", headerName: "CRM ID", width: 70 },
    { field: "SchoolName", headerName: "School Name", width: 230 },
    { field: "Address", headerName: "Address", width: 350 },
    { field: "Board", headerName: "Board", width: 70 },
    {
      field: "RequestedOn",
      headerName: "Requested On",
      width: 130,
    },
    {
      field: "UpdatedOn",
      headerName: "Updated On",
      width: 110,
    },
  ];

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
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, []);
  return (
    <div className="flex bg-[#111322]">
      <Sidebar sidebarCollapsed={sidebarCollapsed} highLight={highLight} />
      <div>
        <SwipeableTemporaryDrawer
          ref={sidebarRef}
          sidebarCollapsed={sidebarCollapsed}
          // show={show}
          highLight={highLight}
        />
      </div>
      <div
        className={`flex flex-col transition-all duration-300 ease-linear w-[100vw] lg:w-[83vw] lg:ml-[18vw] ${
          sidebarCollapsed ? null : "md:ml-[30vw] ml-[85vw]"
        } `}
      >
        <Navbar
          handleSidebarCollapsed={handleSidebarCollapsed}
          info={navInfo}
        />
        <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#141728]">
          <div className=" px-8 py-3 bg-[#141728]">
            <DataTable
              rows={MySchoolRows}
              Tablecolumns={Tablecolumns}
              checkbox={false}
              tableName="MySchool"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySchool;
