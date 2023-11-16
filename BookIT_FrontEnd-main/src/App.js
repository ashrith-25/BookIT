import Home from "./Components/Home/Home";
import Login from "./Components/Logins/Login";
import SignUp from "./Components/Logins/SignUp";
import { Routes, Route } from "react-router-dom";
import PaymentData from "./Components/Payments/PaymentData";
import Admin from "./Components/adminpage/Admin";
import Userlist from "./Components/adminpage/Userlist";
import BussesList from "./Components/adminpage/Busses";
import BookingList from "./Components/adminpage/BookingList";
import UserProfile from "./Components/User/UserProfile";
import BusSearchPage from "./Components/Buses/BusSearchPage";
import Busticket from "./Components/Buses/Busticket";
import Seats from "./Components/Seats/seats";
import BusesDisplayPage from "./Components/Buses/BusesDisplayPage";
import VerifyUser from "./Components/Logins/VerifyUser";
import ForgotPassword from "./Components/Logins/ForgotPassword";
import Adminprofile from "./Components/User/Adminprofile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="adminlogin" element={<Login />} />
        <Route path="/searchbuses" element={<BusSearchPage />} />
        <Route
          path="/displaybuses/:source/:destination/:date"
          element={<BusesDisplayPage />}
        />
        <Route path="payment" element={<PaymentData />} />
        <Route path="admin" element={<Admin />} />
        <Route path="userlist" element={<Userlist />} />
        <Route path="busseslist" element={<BussesList />} />
        <Route path="bookinglist" element={<BookingList />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="adminprofile" element={<Adminprofile />} />
        <Route path="verify" element={<VerifyUser />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route
          path="busticket/:source/:destination/:date"
          element={<Busticket />}
        />
        <Route path="seats" element={<Seats />} />
      </Routes>
    </>
  );
}

export default App;
