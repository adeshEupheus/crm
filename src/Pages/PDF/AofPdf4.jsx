import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { Link, redirect } from "react-router-dom";
import eupheusLogo from "./eupheusLogo.png";
import instance from "../../Instance";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import { getToken } from "../../util/msAuth";
import { protectedResources } from "../../util/msConfig";
import { CheckBox } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { Button } from "@mui/material";
// var converter = require('number-to-words')
import { ToWords } from "to-words";
import moment from "moment";
import axios from "axios";
import Snackbars from "../../Components/Material/SnackBar";
// import { networkInterfaces } from "os";
// const { networkInterfaces } = require('os');

const toWords = new ToWords();

const AofPdf4 = () => {
  const [date, setDate] = useState("");
  const [partySchool, setPartySchool] = useState("");
  const [partySchoolAlt, setPartySchoolAlt] = useState("");
  const [solePPPStatus, setSolePPPStatus] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [firmRegNo, setFirmRegNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [estYear, setEstYear] = useState("");
  const [aofName, setAofName] = useState("");
  const [aofPan, setAofPan] = useState("");
  const [aofAddress, setAofAddress] = useState("");
  const [aofPin, setAofPin] = useState("");
  const [aofPhone, setAofPhone] = useState("");
  const [aofMobile, setAofMobile] = useState("");
  const [aofEmail, setAofEmail] = useState("");
  const [creditParties, setCreditParties] = useState([]);
  const [bankName, setBankName] = useState("");
  const [accNo, setAccNo] = useState("");
  const [accType, setAccType] = useState("");
  const [accIfsc, setAccIfsc] = useState("");
  const [bankChecq, setBankChecq] = useState([]);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [todDiscData, setTodDiscData] = useState({});
  const [cashDiscData, setCashDiscData] = useState({});
  const [specDiscArr, setSpecDiscArr] = useState([]);
  const [seriesArr, setSeriesArr] = useState([]);
  const [publisheArr, setPublisherArr] = useState([]);
  const [overallArr, setOverallArr] = useState([]);
  const [goodPicks, setGoodPicks] = useState([]);
  const [snackbarErrStatus, setSnackbarErrStatus] = useState(true);
  const [modelOpen, setModelOpen] = useState(false);
  const [user, setUser] = useState("");

  const [cashDiscDataAvail, setCashDiscDataAvail] = useState(true);
  const [todDiscDataAvail, setTodDiscDataAvail] = useState(true);
  const [specialArrAvail, setSpecialArrAvail] = useState(true);
  const [seriesArrAval, setSeriesArrAval] = useState(true);
  const [publisherArrAvail, setPublisherArrAvail] = useState(true);
  const [overallArrAvail, setOverallArrAvail] = useState(true);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [ip, setIP] = useState("");
  const [status, setStatus] = useState(null);
  const [checked, setChecked] = useState(false);
  const [classesUpto, setClassesUpto] = useState("");
  const [studentNum, setStudentNum] = useState("");
  const [bpCode, setBpCode] = useState("");
  const [validDate, setValidDate] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [dsgntn, setDsgntn] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const { aofid } = useParams();

  const snackbarRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getLocationNdIP = async () => {
    if (!checked) {
      // alert("Please select the checkbox to continue");
      setSnackbarErrStatus(true);
      setErrMessage("Select the checkbox to continue");
      snackbarRef.current.openSnackbar();
      return;
    }

    let lati, long;
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          lati = position.coords.latitude;
          // setLat(position.coords.latitude);
          // console.log("latitude=", position.coords.latitude);
          long = position.coords.longitude;
          // setLng(position.coords.longitude);
          // console.log("longitude=", position.coords.longitude);
          // console.log("---------------------")
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }

    const resp = await axios.get(`https://geolocation-db.com/json/`);
    let ipAdd = resp.data.IPv4;
    // setIP(res.data.IPv4);

    // getUser();
    // };

    // const getUser = async () => {
    let dataPost = {
      id: aofid,
      coordinates: [{ lat: lati, lng: long }],
      ip: ipAdd,
    };
    // console.log(dataPost);
    const res = await instance({
      // url: `sales_data/aof/get/detail/a6663609-a912-4e0e-9a37-4935213a3d1a`,
      url: `sales_data/aof/verfication/customer/redirect`,
      method: "POST",
      data: dataPost,
      headers: {
        // Authorization: Cookies.get("accessToken"),
        accesskey: `auth0026c3956e3d0fba`,
      },
    });

    // console.log(res.data)
    if (res.data.status === "success") {
      // alert(res.data.message)
      setSnackbarErrStatus(false);
      setErrMessage(res.data.message);
      snackbarRef.current.openSnackbar();

      setTimeout(() => {
        navigate(`/thankyou`);
      }, 2000);
    } else {
      setSnackbarErrStatus(true);
      setErrMessage(res.data.message);
      snackbarRef.current.openSnackbar();
    }
  };

  // const closeTab=()=>{
  // window.location.href.close()
  //     window.open("about:blank", "_self");
  // navigate(`/thankyou`);

  // window.open("about:blank", "_self");
  // window.close();
  // }

  useLayoutEffect(() => {
    const userId = Cookies.get("id");
    // console.log(userId);
    const getUser = async () => {
      const res = await instance({
        // url: `sales_data/aof/get/detail/a6663609-a912-4e0e-9a37-4935213a3d1a`,
        url: `user/getuserdetail`,
        method: "POST",
        data: { id: userId },
        headers: {
          // Authorization: Cookies.get("accessToken"),
          accesskey: `auth0026c3956e3d0fba`,
        },
      });
      // console.log(res.data.message);
      let data = res.data.message;
      let name = `${data.first_name ? data.first_name : ""} ${
        data.middle_name ? data.middle_name : ""
      } ${data.last_name ? data.last_name : ""}`;
      // console.log(name)
      setUser(name);
    };
    // getUser();
  }, []);

  const monthMap = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const getUser = async (creatorId) => {
    const res = await instance({
      // url: `sales_data/aof/get/detail/a6663609-a912-4e0e-9a37-4935213a3d1a`,
      url: `user/getuserdetail`,
      method: "POST",
      data: { id: creatorId },
      headers: {
        // Authorization: Cookies.get("accessToken"),
        accesskey: `auth0026c3956e3d0fba`,
      },
    });
    // console.log(res.data.message);
    let data = res.data.message;
    let name = `${data.first_name ? data.first_name : ""} ${
      data.middle_name ? data.middle_name : ""
    } ${data.last_name ? data.last_name : ""}`;
    // console.log(name)
    setUser(name);
  };

  const getData = async () => {
    // console.log(aofid)
    const res = await instance({
      // url: `sales_data/aof/get/detail/a6663609-a912-4e0e-9a37-4935213a3d1a`,
      url: `sales_data/aof/get/detail/${aofid}`,
      method: "GET",
      headers: {
        // Authorization: Cookies.get("accessToken"),
        accesskey: `auth0026c3956e3d0fba`,
      },
    });

    let creatrId = res.data.message.created_by;
    // console.log(creatrId);
    getUser(creatrId);
    // console.log(res.data.message);
    let data = res.data.message;
    let date1 = data.date;
    setDsgntn(data.designation);
    let date1conv = moment(date1).format("DD-MM-YYYY");
    // console.log(date1conv)
    if (data.bpcode) {
      setBpCode(data.bpcode);
    } else {
      setBpCode(data.temp_bpcode);
    }
    setValidDate(data.valid);
    // console.log(data);
    // console.log(data.name)
    let crdt_Lmt = data.credit_limit;
    let crdt_Lmt_Word = toWords.convert(Number(crdt_Lmt));
    setCreditLimit(crdt_Lmt_Word);
    let goodPick = data.aof_goods_picks;
    let a = 1;
    for (let obj of goodPick) {
      obj.sl = a;
      a++;
    }
    setGoodPicks(goodPick);
    setDate(date1conv);
    // console.log(date1);
    let dateArr = date1.split("-");
    // console.log(dateArr)
    let day = dateArr[2];
    setDay(day);
    let month = monthMap[dateArr[1]];
    setMonth(month);
    let year = dateArr[0];
    setYear(year);
    // console.log(month)
    // console.log(monthMap[month]);
    setClassesUpto(data.classes);
    setStudentNum(data.students_number);
    if (data.fk_school) {
      setPartySchool(data.fk_school.school_name);
    } else {
      setPartySchool(data.name);
    }
    setSolePPPStatus(data.status_type);
    setAddress(data.address);
    setCity(data.fk_city.city);
    setState(data.fk_state.state);
    setPinCode(data.zip_code);
    setPhone(data.phone);
    setMobile(data.mobile);
    setEmail(data.email);
    setFirmRegNo(data.firm_reg);
    setPanNo(data.pan);
    // console.log(data.gst)
    setGstNo(data.gst);
    setEstYear(data.business_est);
    let aofData = res.data.message.aof_trustees[0];
    setAofName(aofData.name);
    setAofPan(aofData.pan);
    setAofAddress(aofData.address);
    setAofPin(aofData.zip_code);
    setAofPhone(aofData.phone);
    setAofMobile(aofData.mobile);
    setAofEmail(aofData.email);
    let crdtPrts = aofData.aof_credit_parties;
    let i = 1;
    for (let obj of crdtPrts) {
      obj.sl = i;
      i++;
    }
    // console.log(crdtPrts)
    setCreditParties(crdtPrts);

    if (res.data.message.aof_banks.length === 0) {
      // console.log(res.data.message.aof_banks);
    } else {
      let bnkData = res.data.message.aof_banks[0];
      // console.log(bnkData);
      setBankName(bnkData.name);
      setAccNo(bnkData.account_no);
      setAccType(bnkData.acc_type);
      setAccIfsc(bnkData.ifsc);
      let bnkDataArr = bnkData.aof_bank_cheques;
      let j = 1;
      for (let obj of bnkDataArr) {
        obj.sl = j;
        j++;
      }
      // console.log(bnkDataArr);
      setBankChecq(bnkDataArr);
    }

    // console.log(res.data);
    if (res.data.tod.length !== 0) {
      let todDiscData = res.data.tod[0];
      setTodDiscData(todDiscData);
    } else {
      let todDiscData = {
        percent: "",
        remark: "",
        percentages_type: "",
      };
      setTodDiscDataAvail(false);
      setTodDiscData(todDiscData);
    }

    if (res.data.cash.length !== 0) {
      let cashDiscData = res.data.cash[0];
      setCashDiscData(cashDiscData);
    } else {
      let cashDiscData = {
        percent: "",
      };
      setCashDiscDataAvail(false);
      setCashDiscData(cashDiscData);
    }

    let specialDiscArr = res.data.special;
    // console.log(specialDiscArr);
    if (specialDiscArr.length === 0) {
      setSpecialArrAvail(false);
    }

    setSpecDiscArr(specialDiscArr);
    let seriesArr = [],
      publisherArr = [],
      overallArr = [];
    for (let obj of specialDiscArr) {
      if (obj.series) seriesArr.push(obj);
      if (obj.publisher) publisherArr.push(obj);
      if (obj.overall) overallArr.push(obj);
    }
    // console.log(seriesArr)
    let m = 1;
    for (let obj of seriesArr) {
      obj.sl = m;
      m++;
    }
    // console.log(seriesArr);
    if (seriesArr.length === 0) {
      setSeriesArrAval(false);
    }
    setSeriesArr(seriesArr);
    // console.log(publisherArr)
    let n = 1;
    for (let obj of publisherArr) {
      obj.sl = n;
      n++;
    }
    // console.log(publisherArr);
    if (publisherArr.length === 0) {
      setPublisherArrAvail(false);
    }
    setPublisherArr(publisherArr);

    let o = 1;
    for (let obj of overallArr) {
      obj.sl = o;
      o++;
    }
    // console.log(seriesArr);
    if (overallArr.length === 0) {
      setOverallArrAvail(false);
    }
    setOverallArr(overallArr);
  };

  return (
    <div className="bg-white">
      <Snackbars
        ref={snackbarRef}
        snackbarErrStatus={snackbarErrStatus}
        errMessage={errMessage}
      />

      <div className="bg-white ">
        <div className="">
          <div className="flex justify-center mt-[1rem]">
            <img width={170} src={eupheusLogo} />
          </div>

          <div
            className="flex justify-center text-sm mt-[1rem] font-bold md:text-lg ml-[1rem] md:ml-0"
            // style={{ marginTop: "50px", fontSize: "15pt" }}
          >
            <u>CUSTOMER REGISTRATION FORM AND AGREEMENT</u>
          </div>
          <div
            className=" flex flex-col ml-[6rem] sm:flex-row sm:justify-around"
            style={{ marginTop: "30px", fontSize: "11pt" }}
          >
            <div>No.: {bpCode}</div>
            <div>Date : {date ? date : ""}</div>
            <div className="border-2 border-black w-1/2 sm:w-[20%] ">
              <div className="">{validDate}</div>
            </div>
          </div>

          <div className="m-[1rem] sm:m-[2rem]">
            <div className="!flex-col border-2 border-black p-5 ">
              <div className="">
                <b>Name of Party School*: {partySchool ? partySchool : ""}</b>
              </div>
              <div className="">
                Status*: {solePPPStatus ? solePPPStatus : ""}
              </div>
              <div className="">Address*: {address ? address : ""}</div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div>City*: {city ? city : ""}</div>
                <div>State*: {state ? state : ""}</div>
                <div>Pin Code*: {pinCode ? pinCode : ""}</div>
              </div>
              <div className=" flex flex-col sm:flex-row sm:justify-between">
                <div>Phone: {phone ? phone : ""}</div>
                <div>Mobile*: {mobile ? mobile : ""}</div>
                <div>E-Mail*: {email ? email : ""}</div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div>
                  Total no of Students*:
                  {studentNum ? studentNum : ""}
                </div>
                <div>Classes Up to: {classesUpto ? classesUpto : ""}</div>
              </div>
              <div className="!flex gap-[2rem]">
                <div>
                  Firm/ Company/Trust Registration Number:
                  {firmRegNo ? firmRegNo : ""}
                </div>
                <div>Dated: {date ? date : ""}</div>
              </div>
              <div className="!flex gap-[4rem]">
                <div>PAN No: {panNo ? panNo : ""}(Copy Enclosed)</div>
                <div>GST. No:{gstNo ? gstNo : ""}</div>
              </div>
              <div className="">
                <b>
                  (Copy enclosed or in case if not registered with GST then
                  furnish declaration in Annexure-B)
                </b>
              </div>
              <div className="">
                Year of establishment of business: {estYear ? estYear : ""}
              </div>
            </div>
          </div>

          <div className="m-[1rem] sm:m-[2rem]">
            <div className="!flex-col border-2 border-black p-5">
              <div className="">
                <div className="flex flex-col sm:flex-row">
                  <div>
                    <b>Name of Proprietor/Partner/Director/Trustee*:</b>
                  </div>
                  <div>
                    <b>{aofName ? aofName : ""}</b>
                  </div>
                </div>
              </div>
              <div className="" style={{ marginTop: "5px" }}>
                PAN No.: {aofPan ? aofPan : ""}
              </div>
              <div className="!flex gap-[2rem]">
                <div>Address: {aofAddress ? aofAddress : ""}</div>
                <div>Pin Code: {aofPin ? aofPin : ""}</div>
                <div></div>
              </div>
              <div
                className="flex flex-col sm:flex-row sm:justify-between"
                style={{ marginTop: "5px" }}
              >
                <div>Phone: {aofPhone ? aofPhone : ""}</div>
                <div>Mobile*: {aofMobile ? aofMobile : ""}</div>
                <div>E-Mail*: {aofEmail ? aofEmail : ""}</div>
              </div>
            </div>
          </div>

          <div className="m-[1rem] sm:m-[2rem]">
            <div className="flex-col border-2 border-black p-5">
              <div className="">
                Name of other Publishers/Suppliers from whom the party has
                credit facilities:
              </div>
              {creditParties.map((item) => {
                return (
                  <div
                    className="flex justify-around"
                    style={{ marginTop: "5px" }}
                  >
                    <div>
                      {item.sl ? item.sl : ""}. {item.name ? item.name : ""}
                    </div>
                    <div>
                      Annual Business: {item.business ? item.business : ""}
                    </div>
                  </div>
                );
              })}
              {/* <div className="flex justify-around" style={{ marginTop: "5px" }}>
              <div>1. ________________________________</div>
              <div>
                Annual Business: __________________________________________
              </div>
            </div>
            <div className="flex justify-around" style={{ marginTop: "5px" }}>
              <div>1. ________________________________</div>
              <div>
                Annual Business: __________________________________________
              </div>
            </div>
            <div className="flex justify-around" style={{ marginTop: "5px" }}>
              <div>1. ________________________________</div>
              <div>
                Annual Business: __________________________________________
              </div>
            </div> */}
            </div>
          </div>

          <div className="m-[1rem] sm:m-[2rem]">
            <div className="!flex-col border-2 border-black p-5">
              <div className="">
                Name and address of the party’s main bankers*:
                {bankName ? bankName : ""}
              </div>
              <div
                className="flex flex-col sm:flex-row sm:justify-between"
                style={{ marginTop: "5px" }}
              >
                <div>Account Number*:{accNo ? accNo : ""}</div>
                <div>
                  Type of A/c (SB/CA/CC):
                  {accType}
                </div>
              </div>
              <div className="flex justify-start">
                IFSC*: {accIfsc ? accIfsc : ""}
              </div>
              <div className="flex justify-start">Detail of Cheques*:</div>

              {bankChecq.map((item) => {
                return (
                  <div
                    className="flex flex-col sm:flex-row sm:justify-between"
                    style={{ marginTop: "5px" }}
                  >
                    <div>
                      {item.sl ? item.sl : ""}. Cheque No.:{" "}
                      {item.cheque_no ? item.cheque_no : ""}
                    </div>
                    <div>Bank: {item.bank ? item.bank : ""}</div>
                    <div>
                      Branch/IFSC: {item.branch_ifsc ? item.branch_ifsc : ""}
                    </div>
                  </div>
                );
              })}

              {/* <div className="flex justify-around" style={{ marginTop: "5px" }}>
              <div>1. Cheque No.: ___________________</div>
              <div>Bank: ______________</div>
              <div>Branch/IFSC: ____________</div>
            </div>
            <div className="flex justify-around" style={{ marginTop: "5px" }}>
              <div>2. Cheque No.: ___________________</div>
              <div>Bank: ______________</div>
              <div>Branch/IFSC: ____________</div>
            </div>
            <div className="flex justify-around" style={{ marginTop: "5px" }}>
              <div>3. Cheque No.: ___________________</div>
              <div>Bank: ______________</div>
              <div>Branch/IFSC: ____________</div>
            </div> */}
            </div>
          </div>

          {/* <div
          style={{
            marginTop: "40px",
            fontSize: "8pt",
            borderTop: "2px solid silver",
          }}
        >
          <div
            className="flex justify-center"
            style={{ marginTop: "5px", fontSize: "8pt" }}
          >
            Proficiency Learning Solutions Private Limited
          </div>
          <div
            className="flex justify-center"
            style={{ marginTop: "1px", fontSize: "8pt" }}
          >
            A-12, 2nd Floor, Mohan Cooperative Industrial Estate, Main Mathura
            Road, New Delhi – 110044. Phone: +91-11-61400200
          </div>
          <div className="flex justify-center" style={{ fontSize: "8pt" }}>
            <a href={"https://www.eupheus.in/"}>https://www.eupheus.in/</a>
          </div>
        </div> */}
        </div>

        <div className=" m-[1rem] sm:m-[2rem]">
          {/* <div className="flex justify-center" style={{ marginTop: "30px" }}>
          <img width={170} src={eupheusLogo} />
        </div> */}

          <div className=" flex justify-center font-bold text-md md:text-lg">
            <u>Agreement for supply of Educational Books</u>
          </div>

          <div className="mt-4">
            <div>
              THIS AGREEMENT is made on this {`${day ? day : ""} TH `} day of{" "}
              {`${month ? month : ""} `},{`${year ? year : ""} `} , by and
              between Proficiency Learning Solutions Pvt. Ltd., company
              incorporated and registered under the Companies Act, 2013 with its
              registered office located at 5th Floor, Cabin No 3, Right side at
              Plot No E-196, Phase 8B, Mohali, Mohali, Punjab, India, 160020
              through {user ? user : ""}. Hereinafter referred to as “Eupheus”
              which expression shall unless repugnant to the context means and
              include its successors and assigns of the ONE PART
            </div>
            <div className="flex justify-center">And</div>
            <div>
              {`${partySchool ? partySchool : ""} `} (the "Distributor"), with
              its principal place of business located at{" "}
              {`${address ? address : ""}, ${city ? city : ""}, ${
                state ? state : ""
              }, ${pinCode ? pinCode : ""} `}{" "}
              through {`${aofName ? aofName : ""}`} which expression shall
              unless repugnant to the context or meaning thereof, include its
              successors and permitted assigns, through its Authorized
              Signatory, on the OTHER PART.
            </div>
          </div>
          <div className="flex justify-center">
            Eupheus and {`${partySchool ? partySchool : ""} `} shall
            collectively be referred to as “Parties” and individually as “Party”
            wherever the context permits.
          </div>

          <div style={{ margin: "10px" }} className="flex justify-center">
            NOW, THEREFORE, in consideration of the promises hereinafter made by
            the parties hereto, it is agreed as follows:
          </div>

          <div style={{ margin: "10px" }} className="flex container">
            <div>1. </div>
            <div>
              <b>Credit Limit.</b> Distributer shall be entitled to a maximum
              annual Credit Limit of Rs. {creditLimit} during the term of this
              agreement.
            </div>
          </div>
          <div style={{ margin: "10px" }} className="flex container">
            <div>2. </div>
            <div>
              <b>Payment Process.</b> The Distributor is required to pay 60% of
              the total invoiced amount, within 90 Calendar Days from the date
              of invoice and balance payment of 40% within 120 Calendar Days
              from the date of Invoice. Payment shall be made via interbank
              transfer to Eupheus account at a bank designated by Eupheus or by
              Demand Draft.
            </div>
          </div>
          <div style={{ margin: "10px" }} className="flex container">
            <div>3. </div>
            <div>
              <b>Discount.</b> The Distributor shall be entitled to discount(s)
              on the products as per Annexure – 1, which shall be applicable in
              the event the payment is received as per the following Clause 2
              above and such Turnover discount shall be applicable on Net
              Business i.e. Net Business would mean sales value as per invoice
              less discounts allowed/applied and adjusting the value of Returns
              as per Eupheus’ credit note.{" "}
            </div>
          </div>
          <div style={{ margin: "10px" }} className="flex container">
            <div>4. </div>
            <div>
              <b>Delivery of Goods.</b> The Goods as per the specifications in
              the Purchase Order issued by the Distributor shall be delivered
              through a carrier appointed by Eupheus. The Goods may be picked up
              from the designated warehouse of Eupheus upon the option of the
              Distributor. In the event the Goods are received or picked up by
              any other person appointed by the Distributor then the Distributor
              shall provide details and specimen signatures of such persons at
              the space provided at the end of this Agreement. Distributor and
              all such authorized persons on behalf of the Distributor shall
              sign and affix Distributor’s seal at the time of receiving the
              Goods through the carrier or picking up the Goods from the
              warehouse of Eupheus.{" "}
            </div>
          </div>
          <div style={{ margin: "10px" }} className="flex container">
            <div>5. </div>
            <div>
              <b>Cost of Delivery.</b> Unless otherwise agreed between the
              Parties herein,{" "}
              <b>
                Eupheus shall not be responsible for all shipping cost,
                including freight and domestic transportation charges.
              </b>
            </div>
          </div>
          <div style={{ margin: "10px" }} className="flex container">
            <div>6. </div>
            <div>
              <b>Risk of Loss.</b> Title, risk of loss, theft and damage shall
              pass to Distributor upon delivery of Product to the carrier,
              whether appointed by the Distributor.
            </div>
          </div>
          <div style={{ margin: "10px" }} className="flex container">
            <div>7. </div>
            <div>
              <b>Defective Products.</b> In the event that the Product is found
              to be defective Distributor shall promptly notify Eupheus through
              e-mail or post of the existence of such Defect in the Product
              within three (3) Calendar days of acceptance of the Products. Both
              Distributor and Eupheus shall, in good faith, work to resolve the
              problem. After Eupheus determines that the product is defective
              and cannot be remedied without having such Defective Product
              shipped back to Eupheus, Eupheus will ship a replacement for the
              Defective Product within a reasonable time and Distributor shall,
              upon notice of shipment by Eupheus, exchange the Defective Product
              with the different product.
            </div>
          </div>
        </div>

        <div className="m-[1rem] sm:m-[2rem]">
          {/* <div className="flex justify-center" style={{ marginTop: "30px" }}>
          <img width={170} src={eupheusLogo} />
        </div> */}

          <div style={{ margin: "10px" }} className="">
            <div>
              8.<b>Return Policy.</b> The unsold books once delivered may be
              returned to Eupheus by the Distributor subject to the following
              conditions: <br /> (a) A maximum 10 % (ten percent) of invoiced
              value will be allowed to be returned if unutilized (“Returns”)
              quantity at any given point of time. <br />
              (b) The returned books shall not be utilized or used by any person
              and are in good condition, meaning thereby that the books shall
              not be torn or dirty or any scribbled marks or pen marks or bound
              or damaged or otherwise in such condition that the books are unfit
              for resale by Eupheus. <br />
              (c) Such returns need to be notified by the Distributor through
              e-mail or post. <br />
              (d) Such return of books shall be delivered by the Distributor
              with reasonable care to the warehouse/Clearing & Forwarding Agent
              of Eupheus, details of which shall be provided by Eupheus, within
              180 days of date of delivery and in no case later than 31st August
              of the year in which such books were invoiced/ supplied. <br />
              (e) The liability of expenses incurred by the Distributor for such
              return of books shall be of the Distributor and in no way such
              expenses shall be reimbursed to the Distributor by Eupheus. <br />
              (f) Any additional/special discount(s) applied at the time of sale
              shall be adjusted for the return of books and credit note will be
              calculated accordingly.
            </div>
          </div>
          <div style={{ margin: "10px" }} className="flex m-[1rem] sm:m-[2rem]">
            <div>9. </div>
            <div>
              <b>Trust Relationship:</b> The products supplied by Eupheus to the
              Distributor till the receipt of full payment by Eupheus shall be
              held under trust by the Distributor and returnable on simple
              demand by Eupheus through a written notice. Distributor agrees to
              issue 2 (two) cheques as security as mentioned in the account
              opening form. In case the Customer changes its bank account or
              there is any notification by the bank / Reserve Bank of India
              requiring the changes in the cheques, from time to time, the
              Customer shall be obligated to change the security cheques given
              at the time of opening the account. In case Customer makes a
              default in making the payment or adhere to any term or condition
              of this Agreement, Eupheus will have the right to present any of
              the security cheque for realization of its dues without any
              obligation of informing the Customer. No Stock will be issued by
              Customer to any employee of Eupheus or transferred to any other
              third party under any condition whatsoever without the written
              authorization of undersigned or Managing Director / CFO of
              Eupheus.
            </div>
          </div>
          <div style={{ margin: "10px" }} className="flex m-[1rem] sm:m-[2rem]">
            <div>10. </div>
            <div>
              <b>Printing and Publishing. </b> The Distributor has the limited
              right of distributing the books purchased from Eupheus and is not
              authorized to print or copy any of the artistic and literary works
              of which Eupheus is the permitted and authorized user. Breach of
              this section will be grounds for immediate termination of this
              Agreement without prejudice to any other legal remedies Eupheus
              may deem appropriate.
            </div>
          </div>
          <div style={{ margin: "10px" }} className="flex m-[1rem] sm:m-[2rem]">
            <div>11. </div>
            <div>
              <b>Prohibition from Selling on E-Commerce Platform. </b> The
              Distributor shall not, without prior written permission from
              Eupheus, sell or offer to sell, trade or offer to trade, either
              directly or indirectly through itself or through its agents,
              affiliates, associates, sister concerns or through any other third
              party, the books purchased from Eupheus on any E-Commerce website,
              platform, application or any other way whatsoever including but
              not limited to Amazon, Flipkart and/or Snapdeal or any website,
              platform or application that the Distributor has or may develop.
              The breach of this clause may result in immediate termination of
              this Agreement and blacklisting of the Distributor by Eupheus.
            </div>
          </div>
          <div style={{ margin: "10px" }} className="flex m-[1rem] sm:m-[2rem]">
            <div>12. </div>
            <div>
              <b>Non Disclosure:</b> Each party shall protect the other's
              Confidential Information from unauthorized dissemination and use
              the same degree of care that such party uses to protect its own
              information. Neither party shall disclose to third parties the
              other's Confidential Information without the prior written consent
              of the other party. Neither party shall use the other's
              Confidential Information for purposes other than those necessary
              to directly further the purposes of this Agreement. Each employee
              or agent of the Distributor, performing duties hereunder, shall be
              made aware of this Agreement and said employee or agent of the
              Distributor is bound to the same level of confidentiality
              contained herein.
            </div>
          </div>
          <div style={{ margin: "10px" }} className="flex m-[1rem] sm:m-[2rem]">
            <div>13. </div>
            <div>
              <b>Trademarks and Logo Use:</b> Eupheus hereby grants the right to
              the Distributor to use the logo and trademark of the books solely
              for the purpose of distribution of the books and the Distributor
              shall not have any right over the trademarks or logos of the books
              whatsoever and agree to act under the following terms and
              conditions: <br />
              a. This License is granted for the benefit of Distributor with a
              legitimate intent to advertise and distribute the books of Eupheus{" "}
              <br />
              b. It is agreed by the Distributor that it does not acquire any
              right, title or interest in or to the intellectual property rights
              of the books of Eupheus; and <br />
              c. The Distributor may not, under any circumstances, alter the
              appearance of the Logos, marks, either by alteration, size, color
              or combination with any other logo. Breach of this section will be
              grounds for immediate termination of this Agreement without
              prejudice to any other legal remedies Eupheus may deem
              appropriate.
            </div>
          </div>

          <div style={{ margin: "10px" }} className="flex m-[1rem] sm:m-[2rem]">
            <div>14. </div>
            <div>
              <b>Termination of Agreement:</b> The term of this Agreement shall
              be for three (3) years from the date of signing of this Agreement
              unless sooner terminated. Following such Initial Term, this
              Agreement can be renewed for successive three (3) year on mutual
              agreement on the same terms or amended terms, unless either party
              notifies the other in writing of an intention not to renew the
              Agreement.
              <br />
              Termination shall not relieve either party of obligations incurred
              prior thereto. This Agreement may be terminated under the
              following stipulations without exception under any circumstances:
              <br />
              a. by the Distributor at anytime upon ninety (90) days written
              notice to Eupheus citing the reason. <br />
              b. by Eupheus upon ninety (90) days written notice to the
              Distributor citing the reason. <br />
              c. by Eupheus upon ninety (90) days written notice to the
              Distributor in the event of the Distributor’s involvement in
              voluntary or involuntary bankruptcy proceedings under the
              Bankruptcy Laws of India;
            </div>
          </div>
        </div>

        <div className=" m-[1rem] sm:m-[2rem]">
          {/* <div className="flex justify-center" style={{ marginTop: "30px" }}>
          <img width={170} src={eupheusLogo} />
        </div> */}

          <div style={{ margin: "10px" }} className="flex m-[1rem] sm:m-[2rem]">
            <div>15. </div>
            <div>
              <b>Relationship between the Parties:</b> The relationship between
              the parties established by this Agreement shall be solely that of
              supplier and distributor and all rights and powers not expressly
              granted to the Distributor are expressly reserved to Eupheus. The
              Distributor shall have no right, power or authority in any way to
              bind Eupheus for the fulfillment of any condition not herein
              contained, or to any contract or obligation, expressed or implied.
            </div>
          </div>
          <div style={{ margin: "10px" }} className="flex m-[1rem] sm:m-[2rem]">
            <div>16. </div>
            <div>
              <b>Severability:</b> The invalidity or unenforceability of any
              provisions of this Agreement shall not affect validity or
              enforceability of any other provision of this Agreement, which
              shall remain in full force and effect.
            </div>
          </div>
          <div style={{ margin: "10px" }} className="flex m-[1rem] sm:m-[2rem]">
            <div>17. </div>
            <div>
              <b>Amendments:</b> No change or modification of this Agreement
              will be valid unless it is in writing and signed by each party to
              this Agreement.
            </div>
          </div>
          <div style={{ margin: "10px" }} className="flex m-[1rem] sm:m-[2rem]">
            <div>18. </div>
            <div>
              <b>Applicable Law:</b> This Agreement shall be governed by Laws of
              India and the courts of Delhi shall have exclusive jurisdiction.
            </div>
          </div>
          <div style={{ margin: "10px" }} className="flex m-[1rem] sm:m-[2rem]">
            <div>19. </div>
            <div>
              <b>Resolution of Disputes:</b> Any dispute/claims arising out of
              or in connection with this contract, including any question
              regarding its existence, validity or termination shall be first
              tried by negotiation between the parties by their authorised
              representatives within fourteen (14) days after one party delivers
              a written request with details of disputes/claims for a meeting to
              the other party. If after such meeting, the parties have not
              succeeded in negotiating a resolution of the dispute, then either
              party may commence arbitration as provided herein by delivering a
              written demand for arbitration to the other party. If either party
              commences arbitration in the manner described above, the dispute
              will be referred to an independent sole arbitrator mutually
              appointed by the parties. Such arbitration shall be held in Delhi
              and seat of arbitration shall also be Delhi. The arbitration will
              be governed by Arbitration and Conciliation, Act 1996 along with
              all its amended provisions and the language of arbitration shall
              be English only. The law governing this arbitration agreement
              shall be Indian Law. The law governing the contract shall be
              Indian Laws.
            </div>
          </div>

          {/* <div style={{ margin: "40px" }}>
            <div style={{ marginTop: "30px" }}>
              IN WITNESS WHEREOF, the parties have caused this Agreement to be
              executed by their duly authorized officers as of the date and year
              indicated above.
            </div>
          </div> */}

          {/* <div
            className="flex flex-col m-[2rem] sm:flex-row sm:justify-around sm:m-0"
            style={{ marginTop: "30px" }}
          >
            <div className="">
              <div>
                <b>For Proficiency Learning</b>
              </div>
              <div>
                <b>Solutions Private Limited</b>
              </div>
              <div style={{ marginTop: "20px" }}>By: _____________</div>
              <div style={{ marginTop: "2px" }}>Name: {user ? user : ""}</div>
              <div style={{ marginTop: "2px" }}>Title: _____________</div>
              <div style={{ marginTop: "2px" }}>(Authorised Officer)</div>
              <div style={{ marginTop: "2px" }}>Witness1: _______________</div>
            </div>
            <div>
              <div>
                <b>For Customer</b>
              </div>
              <div style={{ marginTop: "45px" }}>By: _____________</div>
              <div style={{ marginTop: "2px" }}>
                Name: {aofName ? aofName : ""}
              </div>
              <div style={{ marginTop: "2px" }}>Title: _____________</div>
              <div style={{ marginTop: "2px" }}>(Authorised Officer)</div>
              <div style={{ marginTop: "2px" }}>Witness1: _______________</div>
            </div>
          </div> */}
        </div>

        <div>
          <div className="flex justify-center" style={{ marginTop: "30px" }}>
            Details of persons authorized on behalf of the Distributor to
            receive the Goods or pick up of Goods from Eupheus’s warehouse.
          </div>
          <div
            style={{
              marginLeft: "40px",
              marginRight: "40px",
              marginBottom: "40px",
              marginTop: "10px",
            }}
          >
            <table style={{ border: "1px solid black", width: "100%" }}>
              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black", width: "10%" }}>
                  S. No
                </th>
                <th style={{ border: "1px solid black", width: "30%" }}>
                  Name
                </th>
                <th style={{ border: "1px solid black", width: "30%" }}>
                  Designation
                </th>
                <th style={{ border: "1px solid black", width: "30%" }}>
                  Specimen Signatures
                </th>
              </tr>

              {goodPicks.map((i) => {
                return (
                  <tr style={{ border: "1px solid black" }}>
                    <td style={{ border: "1px solid black" }}>{` ${i.sl}`}</td>
                    <td
                      style={{ border: "1px solid black" }}
                    >{` ${i.name}`}</td>
                    <td
                      style={{ border: "1px solid black" }}
                    >{` ${i.designation}`}</td>
                    <td
                      style={{ border: "1px solid black" }}
                    >{` ${i.signature}`}</td>
                  </tr>
                );
              })}

              {/* 
              <tr style={{ border: "1px solid black" }}>
                <td style={{ border: "1px solid black" }}>&nbsp;</td>
                <td style={{ border: "1px solid black" }}>&nbsp;</td>
                <td style={{ border: "1px solid black" }}>&nbsp;</td>
              </tr>

              <tr style={{ border: "1px solid black" }}>
                <td style={{ border: "1px solid black" }}>&nbsp;</td>
                <td style={{ border: "1px solid black" }}>&nbsp;</td>
                <td style={{ border: "1px solid black" }}>&nbsp;</td>
              </tr>

              <tr style={{ border: "1px solid black" }}>
                <td style={{ border: "1px solid black" }}>&nbsp;</td>
                <td style={{ border: "1px solid black" }}>&nbsp;</td>
                <td style={{ border: "1px solid black" }}>&nbsp;</td>
              </tr> */}
            </table>
          </div>
        </div>

        <div className="">
          {/* <div className="flex justify-center" style={{ marginTop: "30px" }}>
          <img width={170} src={eupheusLogo} />
        </div> */}
          <div className="flex justify-center" style={{ marginTop: "50px" }}>
            <b style={{ borderBottom: "1px solid black" }}>Annexure A</b>
          </div>
          <div className="flex justify-center" style={{ marginTop: "10px" }}>
            <b style={{ borderBottom: "1px solid black" }}>
              Discounts Applicable
            </b>
          </div>

          <div>
            <div style={{ margin: "40px" }}>
              <table style={{ border: "1px solid black", width: "100%" }}>
                <tr style={{ border: "1px solid black" }}>
                  <th style={{ border: "1px solid black", width: "40%" }}>
                    Type of Discounts
                  </th>
                  <th style={{ border: "1px solid black", width: "20%" }}>%</th>
                  <th style={{ border: "1px solid black", width: "40%" }}>
                    Remarks
                  </th>
                </tr>

                {todDiscDataAvail ? (
                  <tr style={{ border: "1px solid black" }}>
                    <td style={{ border: "1px solid black" }}>&nbsp;</td>
                    <td style={{ border: "1px solid black" }}>&nbsp;</td>
                    <td style={{ border: "1px solid black" }}>&nbsp;</td>
                  </tr>
                ) : (
                  ""
                )}

                {todDiscDataAvail ? (
                  <tr style={{ border: "1px solid black" }}>
                    <td style={{ border: "1px solid black" }}>TOD</td>
                    <td style={{ border: "1px solid black" }}>{`${
                      todDiscData.percent ? todDiscData.percent : ""
                    }`}</td>
                    <td style={{ border: "1px solid black" }}>{`${
                      todDiscData.remark ? todDiscData.remark : ""
                    }  ${
                      todDiscData.percentages_type
                        ? todDiscData.percentages_type
                        : ""
                    }`}</td>
                  </tr>
                ) : (
                  ""
                )}

                {todDiscDataAvail ? (
                  <tr style={{ border: "1px solid black" }}>
                    <td style={{ border: "1px solid black" }}>&nbsp;</td>
                    <td style={{ border: "1px solid black" }}>&nbsp;</td>
                    <td style={{ border: "1px solid black" }}>&nbsp;</td>
                  </tr>
                ) : (
                  ""
                )}

                {cashDiscDataAvail ? (
                  <tr style={{ border: "1px solid black" }}>
                    <td style={{ border: "1px solid black" }}>CASH DISCOUNT</td>
                    <td style={{ border: "1px solid black" }}>{`${
                      cashDiscData.percent ? cashDiscData.percent : ""
                    } `}</td>
                    <td style={{ border: "1px solid black" }}>{`${
                      todDiscData.remark ? todDiscData.remark : ""
                    }`}</td>
                  </tr>
                ) : (
                  ""
                )}

                {cashDiscDataAvail ? (
                  <tr style={{ border: "1px solid black" }}>
                    <td style={{ border: "1px solid black" }}>&nbsp;</td>
                    <td style={{ border: "1px solid black" }}>&nbsp;</td>
                    <td style={{ border: "1px solid black" }}>&nbsp;</td>
                  </tr>
                ) : (
                  ""
                )}

                {specialArrAvail ? (
                  <tr style={{ border: "1px solid black" }}>
                    <td style={{ border: "1px solid black" }}>SPECIAL </td>
                    <td style={{ border: "1px solid black" }}></td>
                    <td style={{ border: "1px solid black" }}></td>
                  </tr>
                ) : (
                  ""
                )}
                {/* <tr style={{ border: "1px solid black" }}>
                <td style={{ border: "1px solid black" }}>&nbsp;</td>
                <td style={{ border: "1px solid black" }}>&nbsp;</td>
                <td style={{ border: "1px solid black" }}>&nbsp;</td>
              </tr> */}

                {publisherArrAvail ? (
                  <tr style={{ border: "1px solid black" }}>
                    <td style={{ border: "1px solid black" }}>Publisher </td>
                    <td style={{ border: "1px solid black" }}></td>
                    <td style={{ border: "1px solid black" }}></td>
                  </tr>
                ) : (
                  ""
                )}

                {publisherArrAvail ? (
                  <>
                    {publisheArr.map((i) => {
                      return (
                        <tr style={{ border: "1px solid black" }}>
                          <td style={{ border: "1px solid black" }}>{`${
                            i.sl ? i.sl : ""
                          }) ${i.publisher.name ? i.publisher.name : ""}`}</td>
                          <td style={{ border: "1px solid black" }}>{`${
                            i.publisher.percent ? i.publisher.percent : ""
                          } %`}</td>
                          <td style={{ border: "1px solid black" }}>{` ${
                            i.publisher.percentages_type
                              ? i.publisher.percentages_type
                              : ""
                          }`}</td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  ""
                )}

                {seriesArrAval ? (
                  <tr style={{ border: "1px solid black" }}>
                    <td style={{ border: "1px solid black" }}>Series </td>
                    <td style={{ border: "1px solid black" }}></td>
                    <td style={{ border: "1px solid black" }}></td>
                  </tr>
                ) : (
                  ""
                )}

                {seriesArrAval ? (
                  <>
                    {seriesArr.map((i) => {
                      return (
                        <tr style={{ border: "1px solid black" }}>
                          <td style={{ border: "1px solid black" }}>{`${
                            i.sl ? i.sl : ""
                          }) ${i.series.name ? i.series.name : ""}`}</td>
                          <td style={{ border: "1px solid black" }}>{`${
                            i.series.percent ? i.series.percent : ""
                          } %`}</td>
                          <td style={{ border: "1px solid black" }}>{`${
                            i.series.percentages_type
                              ? i.series.percentages_type
                              : ""
                          }`}</td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  ""
                )}

                {overallArrAvail ? (
                  <tr style={{ border: "1px solid black" }}>
                    <td style={{ border: "1px solid black" }}>Overall </td>
                    <td style={{ border: "1px solid black" }}></td>
                    <td style={{ border: "1px solid black" }}></td>
                  </tr>
                ) : (
                  ""
                )}

                {overallArrAvail ? (
                  <>
                    {overallArr.map((i) => {
                      return (
                        <tr style={{ border: "1px solid black" }}>
                          <td style={{ border: "1px solid black" }}>{`${
                            i.sl ? i.sl : ""
                          }) ${i.overall.name ? i.overall.name : ""}`}</td>
                          <td style={{ border: "1px solid black" }}>{`${
                            i.overall.percent ? i.overall.percent : ""
                          } %`}</td>
                          <td style={{ border: "1px solid black" }}>{` ${
                            i.overall.remark ? i.overall.remark : ""
                          }`}</td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  ""
                )}

                {seriesArrAval ? (
                  <tr style={{ border: "1px solid black" }}>
                    <td style={{ border: "1px solid black" }}>&nbsp;</td>
                    <td style={{ border: "1px solid black" }}>&nbsp;</td>
                    <td style={{ border: "1px solid black" }}>&nbsp;</td>
                  </tr>
                ) : (
                  ""
                )}
                {/* <tr style={{ border: "1px solid black" }}>
                <td style={{ border: "1px solid black" }}>learning links</td>
                <td style={{ border: "1px solid black" }}>30% </td>
                <td style={{ border: "1px solid black" }}>On GROSS </td>
              </tr> */}
              </table>
            </div>
          </div>

          <div style={{ margin: "40px" }}>
            <div style={{ marginTop: "30px" }}>
              IN WITNESS WHEREOF, the parties have caused this Agreement to be
              executed by their duly authorized officers as of the date and year
              indicated above.
            </div>
          </div>

          <div
            className="flex flex-col m-[2rem] sm:flex-row sm:justify-around sm:m-0"
            style={{ marginTop: "20px" }}
          >
            <div>
              <div>
                <b>PROFICIENCY LEARNING</b>
              </div>
              <div>
                <b>SOLUTIONS PVT. LTD.</b>
              </div>
              <div style={{ marginTop: "10px" }}>By: {user}</div>
              <div style={{ marginTop: "5px" }}>Party Name: </div>
              <div style={{ marginTop: "5px" }}>Designation: </div>
              {/* <div style={{ marginTop: "5px" }}>Witness 1: </div> */}
            </div>
            <div>
              <div>
                <b>NAME OF DISTRIBUTOR:</b>
              </div>
              <div style={{ marginTop: "30px" }}>By: ________________</div>
              <div style={{ marginTop: "5px" }}>
                Party Name: {partySchool ? partySchool : ""}
              </div>
              <div style={{ marginTop: "5px" }}>Designation: {dsgntn}</div>
              {/* <div style={{ marginTop: "5px" }}>Witness 2: </div> */}
            </div>
          </div>

          {/* {gstNo.length === 0 ? ( */}
          <div style={{ marginTop: "20px", borderTop: "2px solid silver" }}>
            <div className="flex justify-center" style={{ marginTop: "20px" }}>
              <b style={{ borderBottom: "1px solid black" }}>Annexure B</b>
            </div>
            <div className="flex justify-center" style={{ marginTop: "10px" }}>
              <b>
                Declaration of GST Not-Applicable under the provisions of Goods
                and Service Tax Act
              </b>
            </div>
            <div style={{ margin: "20px" }}>
              I/ We {partySchool ? partySchool : ""} (Name of the
              Proprietor/Karta/Authorized Signatory), being ,{dsgntn}{" "}
              (Designation) of ,{partySchool ? partySchool : ""}.(Legal Name as
              per PAN) do hereby state that I/We am/are not liable to
              registration under the provisions of Goods and Service Tax Act.
            </div>
            <div style={{ margin: "20px" }}>
              I/We declare that as soon as we Become eligible for GST
              Registration, we shall get ourselves registered with the Goods and
              Services Tax department and give our GSTN to Proficiency Learning
              Solutions Private Limited.
            </div>
            <div className="flex justify-around" style={{ marginTop: "20px" }}>
              <div>
                <div style={{ marginTop: "60px" }}>
                  {/* <u>GSTIN AAACA1234DIZL</u> */}
                </div>
              </div>
              <div>
                <div>
                  <b>For Customer</b>
                </div>
                <div style={{ marginTop: "30px" }}>(Stamp and Signature)</div>
                <div style={{ marginTop: "5px" }}>Date: _______________</div>
              </div>
            </div>
          </div>
        </div>
        <hr className="w-[95%] bg-black h-[2px] my-[1rem] mx-[1rem]" />
        <div className="flex flex-col sm:flex-row sm:justify-between mx-[1rem] ">
          <div>
            <Checkbox
              checked={checked}
              onChange={() => {
                setChecked(!checked);
              }}
            />
            Agree With Terms & Conditions
          </div>
          <Button
            // onClick={getLocationNdIP}
            onClick={getLocationNdIP}
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AofPdf4;
