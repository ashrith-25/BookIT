import React from 'react'
import styles from "./BusesDisplayPage.module.css";
import Header from '../Home/Header'
import Filters from "./Filters";
import Right from "./Right";

const Booking = () =>{

return(
    <>
      <div className={styles.SelectBus}>
        <Header/>
        <div className={styles.SelectBus_mainContent}>
          <Filters />
          <Right />
        </div>
      </div>
    </>
)
}

export default Booking