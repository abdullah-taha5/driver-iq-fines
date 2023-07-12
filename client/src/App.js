import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignIn from "./pages/Signin/SignIn.jsx";
import SignUp from "./pages/Signup/SignUp";
import jwt_decode from "jwt-decode";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Users from "./pages/admin/Users";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddDriver from "./pages/admin/addDriver/AddDriver";
import DriverSignIn from "./pages/Driver/SignIn/DriverSignIn";
import Orders from "./pages/admin/Orders";
import OrderDetails from "./pages/admin/OrderDetails";
import Drivers from "./pages/admin/Drivers";
import Invoice from "./pages/Invoices/Invoice";
import OrdersDriver from "./pages/Driver/Orders/OrdersDriver";
import OrdersUser from "./pages/OrdersUser";
import MyLocation from "./pages/MyLocation";
import SectionHero from "./pages/admin/GeneralSettings/SectionHero";
import AdminSignIn from "./pages/admin/SignIn/AdminSignIn";
import SectionFooter from "./pages/admin/GeneralSettings/SectionFooter";
import Notifications from "./pages/Driver/Notifications/Notifications";
import NotificationsAdmin from "./pages/admin/Notifications/NotificationsAdmin";
import NotificationsUser from "./pages/NotificationsUser";
import Pusher from "pusher-js";
import Commission from "./pages/admin/GeneralSettings/Commission";
import OrderPayByReceipt from "./pages/OrderPayByReceipt";
import OrdersByReceipts from "./pages/OrdersByReceipts";
import OrdersByReceiptDriver from "./pages/Driver/OrdersByReceiptDriver";
import OrdersByReceiptAdmin from "./pages/admin/OrdersByReceiptAdmin";
import OrderDetailsByReceipt from "./pages/admin/OrderDetailsByReceipt";
import InvoiceOrderByReceipt from "./pages/Invoices/InvoiceOrderByReceipt";
import CommissionByReceipts from "./pages/admin/GeneralSettings/CommissionByReceipts";
import TermsByReceipts from "./pages/admin/GeneralSettings/TermsByReceipts";
import sound from "./audio/alert.mp3";
import AboutUs from "./pages/AboutUs";

function App() {
  const token = localStorage.getItem("token");
  let userData;
  let pusher = new Pusher("bc4967bba1165cd99700", {
    cluster: "eu",
  });
  let channel = pusher.subscribe("my-channel");
  const [notifications, setNotififcations] = useState(null);

  if (token) {
    userData = jwt_decode(token);
    const audio = new Audio(sound);
    if (userData.adminRole) {
      audio.play();

      channel.bind("notifications-admin", function (data) {
        setNotififcations(data.message);
      });
    }
    if (userData.adminRole == false) {
      audio.play();

      channel.bind("notifications-client", function (data) {
        if (userData.id === data.user) {
          setNotififcations(data.message);
        }
      });
    }
    if (!userData.adminRole) {
      audio.play();

      channel.bind("notifications-driver", function (data) {
        if (userData.id === data.driver) {
          setNotififcations(data.message);
        }
      });
    }
  }

  return (
    <BrowserRouter>
      <Header userData={userData} />
      {notifications && (
        <div
          className="alert d-flex justify-content-between alert-primary alert-dismissible fade show position-fixed bottom-0 end-0 zindex-fixed"
          style={{ zIndex: "999999", width: "400px" }}
          role="alert"
        >
          <div>{notifications}</div>
          <i className="fas fa-bell fs-xl me-3"></i>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setNotififcations(null)}
          ></button>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home userData={userData} />} />
        <Route
          path="/signin"
          element={
            localStorage.getItem("token") ? <Navigate to="/" /> : <SignIn />
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<AboutUs />} />

        <Route
          path="/profile"
          element={
            localStorage.getItem("token") ? (
              <Profile userData={userData} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/order-pay-receipt"
          element={
            localStorage.getItem("token") ? (
              <OrderPayByReceipt userData={userData} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/profile/profile-info"
          element={
            localStorage.getItem("token") ? (
              <Profile userData={userData} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/profile/my-location"
          element={
            localStorage.getItem("token") ? (
              <MyLocation userData={userData} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/user/orders"
          element={
            localStorage.getItem("token") ? (
              <OrdersUser userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/user/orders-by-receipts"
          element={
            localStorage.getItem("token") ? (
              <OrdersByReceipts userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/user/notifications"
          element={
            localStorage.getItem("token") ? (
              <NotificationsUser userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/signin"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/" />
            ) : (
              <AdminSignIn />
            )
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            localStorage.getItem("token") && userData.adminRole ? (
              <AdminDashboard userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/admin-dashboard/users"
          element={
            localStorage.getItem("token") && userData.adminRole ? (
              <Users userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin-dashboard/add-driver"
          element={
            localStorage.getItem("token") && userData.adminRole ? (
              <AddDriver userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin-dashboard/drivers"
          element={
            localStorage.getItem("token") && userData.adminRole ? (
              <Drivers userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin-dashboard/orders"
          element={
            localStorage.getItem("token") && userData.adminRole ? (
              <Orders userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin-dashboard/orders-by-receipt"
          element={
            localStorage.getItem("token") && userData.adminRole ? (
              <OrdersByReceiptAdmin userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/order/:id"
          element={
            localStorage.getItem("token") && userData.adminRole ? (
              <OrderDetails userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/orders-by-receipt/:id"
          element={
            localStorage.getItem("token") && userData.adminRole ? (
              <OrderDetailsByReceipt userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/order/invoice/:id"
          element={
            localStorage.getItem("token") ? <Invoice /> : <Navigate to="/" />
          }
        />
        <Route
          path="/order-by-receipt/invoice/:id"
          element={
            localStorage.getItem("token") ? (
              <InvoiceOrderByReceipt />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin-dashboard/notifications"
          element={
            localStorage.getItem("token") && userData.adminRole ? (
              <NotificationsAdmin userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin-dashboard/general-settings/hero"
          element={
            localStorage.getItem("token") && userData.adminRole ? (
              <SectionHero userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin-dashboard/general-settings/footer"
          element={
            localStorage.getItem("token") && userData.adminRole ? (
              <SectionFooter userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin-dashboard/general-settings/commission"
          element={
            localStorage.getItem("token") && userData.adminRole ? (
              <Commission userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin-dashboard/commission-by-receipts"
          element={
            localStorage.getItem("token") && userData.adminRole ? (
              <CommissionByReceipts userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin-dashboard/terms-by-receipts"
          element={
            localStorage.getItem("token") && userData.adminRole ? (
              <TermsByReceipts userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/delegate/signin"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/" />
            ) : (
              <DriverSignIn />
            )
          }
        />
        <Route
          path="/driver/orders"
          element={
            localStorage.getItem("token") ? (
              <OrdersDriver userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/driver/orders-by-receipts"
          element={
            localStorage.getItem("token") ? (
              <OrdersByReceiptDriver userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/driver/notifications"
          element={
            localStorage.getItem("token") ? (
              <Notifications userData={userData} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
