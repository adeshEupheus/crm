import { useSelector } from "react-redux";

// Pages
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import MySchool from "./Pages/MySchool";
import Tagging from "./Pages/Tagging";
import SchoolDirectory from "./Pages/SchoolDirectory";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalesInvoices from "./Pages/SalesInvoice";
import UpdateStocks from "./Pages/UpdateStocks";
import Opportunities from "./Pages/Opportunities";
import ManageSchool from "./Pages/ManageSchool";
import AdminLogin from "./Pages/AdminLogin";
import AdminHome from "./Pages/AdminHome";
import AdminSignUp from "./Pages/AdminSignUp";
import AdminAllUser from "./Pages/AdminAllUser";
import AdminState from "./Pages/AdminState";
import AdminCity from "./Pages/AdminCity";
import AdminCountry from "./Pages/AdminCountry";
import SchoolTagging from "./Pages/SchoolTagging";
import Schools from "./Pages/Schools";
import TagSchool from "./Pages/TagSchool";
import AddSchool from "./Pages/AddSchool";

function App() {
  const isAuth = true
  // const isAuth = useSelector((state) => state.auth.user);

  return (
    <div className=" font-Roboto bg-[#111322]">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={isAuth ? <Home /> : <Login />} />
          <Route path="/mySchool" element={isAuth ? <MySchool /> : <Login />} />
          <Route path="/tagging" element={isAuth ? <Tagging /> : <Login />} />
          <Route
            path="/schoolDirectory"
            element={isAuth ? <SchoolDirectory /> : <Login />}
          />
          <Route
            path="/salesInvoices"
            element={isAuth ? <SalesInvoices /> : <Login />}
          />
          <Route
            path="/updateStocks"
            element={isAuth ? <UpdateStocks /> : <Login />}
          />
          <Route
            path="/opportunities"
            element={isAuth ? <Opportunities /> : <Login />}
          />
          <Route
            path="/manageSchool"
            element={isAuth ? <ManageSchool /> : <Login />}
          />
          <Route
            path="/school/tagging"
            element={isAuth ? <SchoolTagging /> : <Login />}
          />
          <Route
            path="/school/schools"
            element={isAuth ? <Schools /> : <Login />}
          />
          <Route
            path="/tagschool"
            element={isAuth ? <TagSchool /> : <Login />}
          />
          <Route
            path="/addschool"
            element={isAuth ? <AddSchool /> : <Login />}
          />

          {/* Admin */}

          <Route path="/admin/signIn" element={<AdminLogin />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/user/create/new" element={<AdminSignUp />} />
          <Route path="/admin/all/user" element={<AdminAllUser />} />
          <Route path="/admin/location/state" element={<AdminState />} />
          <Route path="/admin/location/city" element={<AdminCity />} />
          <Route path="/admin/location/country" element={<AdminCountry />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
