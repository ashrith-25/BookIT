import React, { useEffect, useState } from "react";
import styles from "./SortingBar.module.css";
import SecurityIcon from '@mui/icons-material/Security';
import { useDispatch, useSelector } from "react-redux";

let sortingAttributes = []

const SortingBar = () =>{

  const originalbuses = useSelector(state => state.originalbuses)
  const filteredbuses = useSelector(state => state.filteredbuses)

  // const [sortingAttributes, setSortingAttributes] = useState([])
  const [flag, setFlag] = useState(0)
  const dispatch = useDispatch()
  const filters = useSelector(state => state.filters)

  const checkSorting = (e) => {
    if(e.target.checked) {
      // setSortingAttributes([...sortingAttributes, e.target.labels[0].innerText.toLowerCase()])
      sortingAttributes.push(e.target.labels[0].innerText.toLowerCase())
      setFlag(prev => prev + 1)
      dispatch({ type: "sortingattributes", payload: sortingAttributes})
    }
    else {
      let arr = [...sortingAttributes]
      let index = arr.indexOf(e.target.labels[0].innerText.toLowerCase())
      if(index !== -1) {
        arr.splice(index, 1);
        // setSortingAttributes(arr)
        sortingAttributes = [...arr]
        setFlag(prev => prev + 1)
        dispatch({ type: "sortingattributes", payload: sortingAttributes})
      }
    }
  }

  const sortBuses = () => {

    if(filters.length === 0) {

      if(sortingAttributes.includes('fare')) {
        const sortedData = originalbuses.sort(function(bus1 ,bus2){
          return +bus1.ticket_cost.slice(0, bus1.ticket_cost.indexOf('/')) - bus2.ticket_cost.slice(0, bus2.ticket_cost.indexOf('/'))
        })

        dispatch({ type: 'sortedbuses', payload: sortedData})
      }

      if(sortingAttributes.includes('rating')) {
        const sortedData = originalbuses.sort(function(bus1 ,bus2){
          return +bus2.rating - +bus1.rating
        })

        dispatch({ type: 'sortedbuses', payload: sortedData})
      }
    }

    else if(filters.length !== 0) {

      const filteredBuses = []
      let uniquebuses = []

      if(originalbuses !== 'No buses found') {
        originalbuses.forEach(bus => {
          if(filters.includes(bus.bustype.toLowerCase()) || filters.includes(bus.busclass.toLowerCase())) {
            filteredBuses.push(bus)
            uniquebuses = filteredBuses.filter((item, index) => filteredBuses.indexOf(item) === index);
            console.log(uniquebuses)
          }


          let ticket_cost = bus.ticket_cost.slice(0, bus.ticket_cost.indexOf('/'));
          if((filters.includes('<=500') && +ticket_cost <= 500) || 
            (filters.includes('500-1000') && (+ticket_cost > 500 && +ticket_cost < 1000)) || 
            (filters.includes('>=1000') && +ticket_cost >= 1000)) {
            filteredBuses.push(bus)
            uniquebuses = filteredBuses.filter((item, index) => filteredBuses.indexOf(item) === index);
            console.log(uniquebuses)
          }

        });
      }
       
      if(sortingAttributes.includes('fare')) {
        // console.log(uniquebuses)
        console.log('i am here')
        const sortedData = uniquebuses.sort(function(bus1 ,bus2){
          return +bus1.ticket_cost.slice(0, bus1.ticket_cost.indexOf('/')) - bus2.ticket_cost.slice(0, bus2.ticket_cost.indexOf('/'))
        })

        dispatch({ type: 'sortedbuses', payload: sortedData})
      }

      if(sortingAttributes.includes('rating')) {
        const sortedData = uniquebuses.sort(function(bus1 ,bus2){
          return +bus2.rating - +bus1.rating
        })

        dispatch({ type: 'sortedbuses', payload: sortedData})
      }
    }
  }

  useEffect(() => {
    sortBuses()
  },[sortingAttributes])

  return (
    <>
      <div className={styles.securityContainer}>
        <SecurityIcon style={{ fontSize: "25px", paddingBottom: "10px" }} />
        <div> All bus ratings include safety as a major factor</div>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.mainContainer1}>
          <div>BUSES LIST</div>
          <div>SORT BY :</div>
        </div>
        <div className={styles.mainContainer2} onClick={checkSorting}>
        <input
              type="checkbox"
              name="departure"
              id="departure"
              onClick={checkSorting}
            />
            &nbsp;&nbsp;
            <label htmlFor="departure">Departure</label>
        </div>
        <div className={styles.mainContainer3} onClick={checkSorting}>
        <input
              type="checkbox"
              name="duration"
              id="duration"
              onClick={checkSorting}
            />
            &nbsp;&nbsp;
            <label htmlFor="duration">Duration</label>
        </div>
        <div className={styles.mainContainer4} onClick={checkSorting}>
        <input
              type="checkbox"
              name="arrivals"
              id="arrivals"
              onClick={checkSorting}
            />
            &nbsp;&nbsp;
            <label htmlFor="arrivals">Arrivals</label>
        </div>
        <div className={styles.mainContainer5} onClick={checkSorting}>
        <input
              type="checkbox"
              name="rating"
              id="rating"
              onClick={checkSorting}
            />
            &nbsp;&nbsp;
            <label htmlFor="rating">Rating</label>
        </div>
        <div className={styles.mainContainer6} onClick={checkSorting}>
            <input
              type="checkbox"
              name="fare"
              id="fare"
              onClick={checkSorting}
            />
            &nbsp;&nbsp;
            <label htmlFor="fare">Fare</label>
        </div>
        <div className={styles.mainContainer7} onClick={checkSorting}>
        <input
              type="checkbox"
              name="seatsavailable"
              id="seatsavailable"
              onClick={checkSorting}
            />
            &nbsp;&nbsp;
            <label htmlFor="seatsavailable">Seats Available</label>
        </div>
      </div>
    </>
  );
};

export default SortingBar;
