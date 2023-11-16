import React from "react";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import BusSearchForm from "./BusSearchForm";
import './BusSearchPage.css'

const BusSearchPage = () => {

  return (
    <>
      <Header />
      <BusSearchForm />

      <div className="d-flex justify-content-around p-5">
        <div className="text-center">
          <div className="lead text-muted font-weight-normal">BUSES</div>
          <h1 style={{ color: "#007f80" }}>10,000</h1>
          <div className="text-muted">Total buses currently being tracked</div>
        </div>

        <div className="text-center">
          <div className="lead text-muted font-weight-normal">ROUTES</div>
          <h1 style={{ color: "#007f80" }}>60,000</h1>
          <div className="text-muted">
            Total routes covered by live tracking
          </div>
        </div>

        <div className="text-center">
          <div className="lead text-muted font-weight-normal">USERS</div>
          <h1 style={{ color: "#007f80" }}>40,000</h1>
          <div className="text-muted">
            Total users using Track My Bus feature
          </div>
        </div>
      </div>

      <div className="row we-promise-container bg-light p-3 pb-5">
        <div className="text-center m-4" >
          <img
            src="https://i.postimg.cc/QN5hqb9S/promise.png"
            alt="promise"
            width="85"
          />
          <h2 className="text-dark m-2">WE PROMISE TO DELIVER</h2>
        </div>

        <div className="text-center d-flex">
          <div className="border bg-white w-25 col-12 col-md-6 col-lg-4" >
            <div className="p-4">
              <img
                src="https://i.postimg.cc/wMKHptPh/maximum-choices.png"
                alt="maximum_choices"
                width="120"
              />
            </div>
            <div className="mb-5 m-4 font-weight-light lead">
              MAXIMUM CHOICE
            </div>
            <div className="m-4 p-1 text-muted">
              We give you the widest number of travel options across thousands
              of routes.
            </div>
          </div>

          <div className="border bg-white w-25 col-12 col-md-6 col-lg-4">
            <div className="p-4">
              <img
                src="https://i.postimg.cc/Y2mqs7V6/customer-care.png"
                alt="customer_care"
                width="91"
              />
            </div>
            <div className="mb-5 mt-4 font-weight-light lead">
              SUPERIOR CUSTOMER SERVICE
            </div>
            <div className="m-4 p-1 text-muted">
              We put our experience and relationships to good use and are
              available to solve your travel issues.
            </div>
          </div>

          <div className="border bg-white w-25 col-12 col-md-6 col-lg-4">
            <div className="p-4">
              <img
                src="https://i.postimg.cc/JnHmv3Tr/lowest-Fare.png"
                alt="lowest_Fare"
                width="120"
              />
            </div>
            <div className="mb-5 mt-4 font-weight-light lead">
              LOWEST PRICES
            </div>
            <div className="m-4 p-1 text-muted">
              We always give you the lowest price with the best partner offers.
            </div>
          </div>

          <div className="border bg-white w-25 col-12 col-md-6 col-lg-4">
            <div className="p-4">
              <img
                src="https://i.postimg.cc/k4LMgYVR/benefits.png"
                alt="benefits"
                width="120"
              />
            </div>
            <div className="mb-5 mt-4 font-weight-light lead">
              UNMATCHED BENEFITS
            </div>
            <div className="m-4 p-1 text-muted">
              We take care of your travel beyond ticketing by providing you with
              innovative and unique benefits.
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
}

export default BusSearchPage;
