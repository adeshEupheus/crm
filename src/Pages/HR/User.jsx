import React from "react";
import Sidebar from "../../Components/Sidebar7";
import { useState } from "react";
import { useRef } from "react";
import SwipeableTemporaryDrawer from "../../Components/Material/MaterialSidebar7";
import { useEffect } from "react";
import instance from "../../Instance";
import Cookies from "js-cookie";
import Snackbars from "../../Components/Material/SnackBar";
import HrUserCreate from "../../Components/Material/Dialog/HrUserCreate";
import { PersonAddAlt } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Backdrop,
  Button,
  CircularProgress,
  Toolbar,
} from "@mui/material";
import Navbar2 from "../../Components/Navbar2";

const User = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchRow, setSearchRow] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [searchVal, setSearchVal] = useState("");
  const [rowdata, setRowdata] = useState([]);

  const snackbarRef = useRef();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterTable = (searchVa) => {
    setPage(0);
    let tempArr = [];
    for (let ele of rowdata) {
      let Name = ele.name.toLowerCase();
      let empId = "";
      if (ele.emp_id) {
        empId = ele.emp_id.toLowerCase();
      }
      let phone = "";
      if (ele.phone) {
        phone = ele.phone;
      }
      if (
        Name.indexOf(searchVa.toLowerCase()) > -1 ||
        empId.indexOf(searchVa.toLowerCase()) > -1 ||
        phone.indexOf(searchVa.toLowerCase()) > -1
      ) {
        tempArr.push(ele);
      }
    }
    setSearchRow([]);
    if (tempArr.length === 0) {
      setSnackbarErrStatus(true);
      setErrMessage("No data Found");
      snackbarRef.current.openSnackbar();
    } else {
      setSearchRow(tempArr);
    }
  };

  const handleData = (value, id, type) => {
    switch (type) {
      case "fname":
        setSnackbarErrStatus(true);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        break;
      case "phone":
        setSnackbarErrStatus(true);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        break;
      case "vphone":
        setSnackbarErrStatus(true);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        break;
      case "email":
        setSnackbarErrStatus(true);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        break;
      case "vemail":
        setSnackbarErrStatus(true);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        break;
      case "empid":
        setSnackbarErrStatus(true);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        break;
      case "success":
        setSnackbarErrStatus(false);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        break;
      case "error":
        setSnackbarErrStatus(true);
        setErrMessage(value);
        snackbarRef.current.openSnackbar();
        break;
      case "reload":
        console.log("reload coming");
        getUserdetails();
        break;
    }
  };

  const show = null;
  const sidebarRef = useRef();

  const handleSidebarCollapsed = () => {
    sidebarRef.current.openSidebar();
  };

  const navInfo = {
    title: "HR",
    details: ["User", ""],
  };

  useEffect(() => {
    getUserdetails();
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

  const getUserdetails = async () => {
    setLoading(true);
    const res = await instance({
      url: `/hr/get/allUsers`,
      method: "GET",
      headers: {
        Authorization: `${Cookies.get("accessToken")}`,
        // accesskey: `auth74961a98ba76d4e4`,
      },
    });

    if (res.data.status === "success") {
      // console.log(res);
      let dataArr = [];
      for (let obj of res.data.message) {
        // console.log(obj);
        let fullName = `${obj.first_name ? obj.first_name : ""} ${
          obj.middle_name ? obj.middle_name : ""
        } ${obj.last_name ? obj.last_name : ""}`;
        let tempObj = {
          name: fullName,
          emp_id: obj.emp_id,
          id: obj.id,
          phone: obj.phone,
        };
        dataArr.push(tempObj);
      }
      // console.log(dataArr);
      setRowdata(dataArr);
    } else {
      setSnackbarErrStatus(true);
      setErrMessage(res.data.message);
      snackbarRef.current.openSnackbar();
    }
    setLoading(false);
  };

  const openDialogue = () => {
    dialogRef2.current.openDialog();
  };

  const dialogRef2 = useRef();

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="flex w-[100%] min-h-[100vh]">
        <div>
          <Sidebar
            highLight={"user"}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
          />
        </div>
        <div>
          <SwipeableTemporaryDrawer
            ref={sidebarRef}
            sidebarCollapsed={sidebarCollapsed}
            show={show}
            highLight={"user"}
          />
        </div>
        <HrUserCreate ref={dialogRef2} handleData={handleData} />
        <div
          className={`flex flex-col w-[100vw] relative transition-all ease-linear duration-300 lg:w-[83vw] lg:ml-[18vw] ${
            window.innerWidth < 1024 ? null : "md:ml-[30vw] ml-[85vw]"
          } `}
        >
          <Snackbars
            ref={snackbarRef}
            snackbarErrStatus={snackbarErrStatus}
            errMessage={errMessage}
          />
          <Navbar2
            handleSidebarCollapsed={handleSidebarCollapsed}
            info={navInfo}
          />
          <div className="min-h-[100vh] pt-[2vh] max-h-full bg-[#e5e7eb]">
            <div className=" sm:px-8 bg-[#e5e7eb] flex justify-end py-3">
              <a className="" onClick={() => openDialogue()}>
                <Button className="!font-bold !bg-[#0079FF] !text-white">
                  <PersonAddAlt className="mr-2" />
                  {"Create New User"}
                </Button>
              </a>
            </div>
            <div className="flex justify-around">
              <div className="w-[94%]">
                {/* <Paper className="mt-5"> */}
                <TableContainer component={Paper}>
                  <Toolbar className="bg-slate-100 flex justify-between">
                    <TextField
                      id="search-bar"
                      className="text bg-white"
                      onChange={(e) => {
                        filterTable(e.target.value);
                      }}
                      // label="Search..."
                      variant="outlined"
                      placeholder="Search..."
                      size="small"
                    />
                    {/* <div className="bg-slate-300">
                        <IconButton
                          type="submit"
                          aria-label="search"
                          onClick={filterTable}
                        >
                          <Search style={{ fill: "blue" }} />
                        </IconButton>
                      </div> */}

                    <TablePagination
                      rowsPerPageOptions={[
                        10,
                        50,
                        100,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={3}
                      count={
                        searchRow.length === 0
                          ? rowdata.length
                          : searchRow.length
                      }
                      rowsPerPage={rowsPerPage}
                      page={page}
                      slotProps={{
                        select: {
                          "aria-label": "rows per page",
                        },
                        actions: {
                          showFirstButton: true,
                          showLastButton: true,
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Toolbar>

                  <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead className="bg-white">
                      <TableRow>
                        <TableCell className="!w-[20rem]" align="left">
                          <div className="font-black text-sm ">Employee Id</div>
                        </TableCell>
                        <TableCell className="!w-[20rem]" align="left">
                          <div className="font-black text-sm ">
                            Employee Name
                          </div>
                        </TableCell>
                        <TableCell className="!w-[13rem]" align="left">
                          <div className="font-black text-sm ">Phone</div>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="">
                      {searchRow.length === 0
                        ? (rowsPerPage > 0
                            ? rowdata.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : rowdata
                          ).map((row) => (
                            <TableRow
                              key={row.series}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">{row.emp_id}</TableCell>
                              <TableCell align="left">
                                <div className="h-6">
                                  {row.name ? row.name : ""}
                                </div>
                              </TableCell>
                              <TableCell align="left">
                                {row.phone ? row.phone : "-"}
                              </TableCell>
                            </TableRow>
                          ))
                        : (rowsPerPage > 0
                            ? searchRow.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                            : searchRow
                          ).map((row) => (
                            <TableRow
                              key={row.series}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell align="left">{row.emp_id}</TableCell>
                              <TableCell align="left">
                                {row.name ? row.name : ""}
                              </TableCell>
                              <TableCell align="left">{row.phone}</TableCell>
                            </TableRow>
                          ))}
                      <TableRow></TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* </Paper> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
