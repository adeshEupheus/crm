import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import logoLight from "../../assets/img/logo-light-icon.png";
import { useState } from "react";
import {
  Dashboard,
  PhoneAndroid,
  Person,
  ForwardToInbox,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import instance from "../../Instance";
import TransitionsModal from "./Model";
import { useRef } from "react";

const SwipeableTemporaryDrawer = React.forwardRef((props, ref) => {
  const [modelOpen, setModelOpen] = useState(false);

  const [userType, setUserType] = useState();

  const [isSchoolClicked, setIsSchoolClicked] = useState(
    props.show === 2 ? false : true
  );
  const [user, setUser] = useState({});
  let highLight = props.highLight;
  const [isSchoolDetailClicked, setIsSchoolDetailClicked] = useState(
    props.show === 2 ? true : false
  );

  const dialogRef = useRef();
  const openDialog = () => {
    dialogRef.current.openDialog();
  };

  useLayoutEffect(() => {
    const getUser = async () => {
      const res = await instance({
        url: "user/profile",
        method: "GET",
        headers: {
          Authorization: `${Cookies.get("accessToken")}`,
        },
      }).catch((err) => {
        if (err.response.status === 401) {
          setModelOpen(true);
        }
      });
      setUser(res.data.message);
    };
    getUser();
  }, []);

  React.useEffect(() => {
    const userlogintype = Cookies.get("type");
    setUserType(userlogintype);
    if (props.show === null) {
      setIsSchoolClicked(false);
      setIsSchoolDetailClicked(false);
    }
  }, []);
  const [state, setState] = React.useState({
    left: false,
  });
  const sidebarRef = React.useRef();

  React.useImperativeHandle(ref, () => ({
    openSidebar() {
      //   toggleDrawer("left", true);
      setState({ left: true });
    },
  }));

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="flex items-center gap-3 justify-center py-4">
        <img
          src={logoLight}
          className=" w-[10vw] md:w-[3.7vw] h-auto object-cover"
          alt=""
        />
        <h4 className="text-gray-50">Eupheus Learning</h4>
      </div>

      <aside className="flex flex-col px-6 text-gray-50 py-4">
        {/* <span className="text-lg">Hi,HR</span> */}
        <span className="text-lg">{`Hi, ${
          user.first_name ? user.first_name : ""
        }`}</span>
        <span className="text-sm text-gray-50">
          {user.emp_id ? user.emp_id : ""}
        </span>
        <hr className="text-gray-50 mt-4" />
      </aside>

      <Link to="/hr/home">
        <aside
          className={`px-6 py-2 ${
            highLight === "dashboard"
              ? "hover:bg-[#3b82f6]"
              : "hover:bg-[#71717a]"
          } flex ${
            highLight === "dashboard" ? "bg-[#3b82f6]" : ""
          } rounded-md gap-4 cursor-pointer group`}
        >
          <div className="flex gap-4">
            <Dashboard
              className={`${
                highLight === "dashboard" ? "!text-gray-50" : "!text-gray-50"
              } group-hover:!text-gray-50 !transition-all !duration-150 !ease-linear`}
            />
            <span
              className={`${
                highLight === "dashboard" ? "text-gray-50" : "text-gray-50"
              } group-hover:!text-gray-950 transition-all duration-150 ease-linear`}
            >
              DashBoard
            </span>
          </div>
        </aside>
      </Link>
      <Link to="/hr/user">
        <aside
          className={`px-6 py-2 my-4 flex gap-4 cursor-pointer ${
            highLight === "user" ? "bg-[#3b82f6]" : ""
          } group ${
            highLight === "user" ? "hover:bg-[#3b82f6]" : "hover:bg-[#71717a]"
          } hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <Person
            className={`${
              highLight === "user" ? "!text-gray-50" : "!text-gray-50"
            } group-hover:!text-gray-50 !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "user" ? "text-gray-50" : "text-gray-50"
            } group-hover:!text-gray-950  transition-all duration-150 ease-linear`}
          >
            User
          </span>
        </aside>
      </Link>
      <Link to="/hr/phonegroup">
        <aside
          className={`px-6 py-2 my-4 flex gap-4 cursor-pointer ${
            highLight === "phone" ? "bg-[#3b82f6]" : ""
          } group ${
            highLight === "phone" ? "hover:bg-[#3b82f6]" : "hover:bg-[#71717a]"
          } hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <PhoneAndroid
            className={`${
              highLight === "phone" ? "!text-gray-50" : "!text-gray-50"
            } group-hover:!text-gray-50 !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "phone" ? "text-gray-50" : "text-gray-50"
            } group-hover:!text-gray-950 transition-all duration-150 ease-linear`}
          >
            Phone Group
          </span>
        </aside>
      </Link>

      <Link to="/hr/sendmessage">
        <aside
          className={`px-6 py-2 my-4 flex gap-4 cursor-pointer ${
            highLight === "message" ? "bg-[#3b82f6]" : ""
          } group ${
            highLight === "message"
              ? "hover:bg-[#3b82f6]"
              : "hover:bg-[#71717a]"
          } hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <ForwardToInbox
            className={`${
              highLight === "message" ? "!text-gray-50" : "!text-gray-50"
            } group-hover:!text-gray-50 !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "message" ? "text-gray-50" : "text-gray-50"
            } group-hover:!text-gray-50 transition-all duration-150 ease-linear`}
          >
            Send Message
          </span>
        </aside>
      </Link>

      {/* <Link to="/admin/uploadinvoice">
        <aside
          className={`px-6 py-2 my-4 flex gap-4 ${
            highLight === "uploadinvoice" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <DocumentScanner
            className={`${
              highLight === "uploadinvoice"
                ? "!text-[#659DBD]"
                : "!text-gray-400"
            } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "uploadinvoice" ? "text-gray-200" : "text-gray-400"
            } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
          >
            Upload Invoice
          </span>
        </aside>
      </Link>

      <Link to="/admin/invoice">
        <aside
          // onClick={openDialog}
          className={`px-6 py-2 flex gap-4 ${
            highLight === "invoice" ? "bg-gray-500" : ""
          } cursor-pointer group hover:bg-gray-500 rounded-md transition-all duration-150 ease-linear`}
        >
          <ReceiptOutlined
            className={`${
              highLight === "invoice" ? "!text-[#659DBD]" : "!text-gray-400"
            } group-hover:!text-[#659DBD] !transition-all !duration-150 !ease-linear`}
          />
          <span
            className={`${
              highLight === "invoice" ? "text-gray-200" : "text-gray-400"
            } group-hover:!text-gray-100 transition-all duration-150 ease-linear`}
          >
            Invoice Tagging
          </span>
        </aside>
      </Link> */}
    </Box>
  );

  return (
    <div ref={sidebarRef}>
      <TransitionsModal open={modelOpen} />;
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
});

export default SwipeableTemporaryDrawer;
