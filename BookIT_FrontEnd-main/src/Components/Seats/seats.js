import "./seats.css";
import React from "react";
import { useNavigate, useNavigation } from "react-router-dom";

let arr = [];
class Seats extends React.Component {
  // const { myProp } = this.props;
  constructor(props) {
    super(props);

    this.state = {
      seatL: props.myprop1[0],
      seatU: props.myprop1[1],
      seatAvailable: props.myprop1[2],
      seatReserved: [],
      seatBooked: props.myprop1[3],
      bus: props.myprop1[4],
    };
    arr[0] = props.source;
    arr[1] = props.destination;
    arr[2] = props.date;
  }

  // componentDidMount(){
  //   this.generatedata();
  // }

  onClickData(seatL) {
    if (this.state.seatBooked.indexOf(seatL) <= -1) {
      if (this.state.seatReserved.indexOf(seatL) > -1) {
        this.setState({
          seatAvailable: this.state.seatAvailable.concat(seatL),
          seatReserved: this.state.seatReserved.filter((res) => res !== seatL),
        });
      } else {
        this.setState({
          seatReserved: this.state.seatReserved.concat(seatL),
          seatAvailable: this.state.seatAvailable.filter(
            (res) => res !== seatL
          ),
        });
      }
    }
  }

  // generatedata(){
  //   for (var j = 65; j <= 72; j++) {
  //     for (var i = 1; i <= 3; i++) {
  //       var item = String.fromCharCode(j) + i;
  //       this.state.seatL.push(item);
  //     }
  //   }
  //   console.log(this.state.seatL);
  // }

  render() {
    return (
      <div className="Full">
        <h1>Select Seats</h1>
        <div className="flexbox1">
          <div className="boost"></div>
          <div className="lower">
            <div className="heading">lower deck</div>
            <DrawGrid
              seat={this.state.seatL}
              available={this.state.seatAvailable}
              reserved={this.state.seatReserved}
              booked={this.state.seatBooked}
              onClickData={this.onClickData.bind(this)}
            />
          </div>
          <div className="upper">
            <div className="heading">Upper deck</div>
            <DrawGridU
              seat={this.state.seatU}
              available={this.state.seatAvailable}
              reserved={this.state.seatReserved}
              booked={this.state.seatBooked}
              onClickData={this.onClickData.bind(this)}
            />
          </div>
          <div className="boost"> </div>
        </div>
        <div className="flexbox2">
          <div className="boost1"> </div>

          <ReservedList
            reserved={this.state.seatReserved}
            bus={this.state.bus}
          />
          <div className="boost"> </div>
        </div>
      </div>
    );
  }
}

class DrawGrid extends React.Component {
  render() {
    return (
      <div className="container123">
        <table className="grid123">
          {console.log(this.props.booked)}
          <tbody>
            <tr>
              {this.props.seat.map((row, index) => (
                <td
                  className={
                    this.props.booked.indexOf(row) > -1
                      ? "booked"
                      : this.props.reserved.indexOf(row) > -1
                      ? "reserved"
                      : "available"
                  }
                  style={{
                    marginRight: index % 3 === 0 ? "80px" : "0px",
                    width: "30px",
                    height: "30px",
                  }}
                  key={row}
                  onClick={(e) => this.onClickSeat(row)}
                >
                  {row}{" "}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* <AvailableList available = { this.props.available } />
          <ReservedList reserved = { this.props.reserved } /> */}
      </div>
    );
  }
  onClickSeat(seat) {
    this.props.onClickData(seat);
  }
}
class DrawGridU extends React.Component {
  render() {
    return (
      <div className="container123">
        <table className="grid123">
          <tbody>
            <tr>
              {this.props.seat.map((row, index) => (
                <td
                  className={
                    this.props.booked.indexOf(row) > -1
                      ? "booked"
                      : this.props.reserved.indexOf(row) > -1
                      ? "reserved"
                      : "available"
                  }
                  style={{
                    marginRight: index % 3 === 0 ? "80px" : "0px",
                    width: "30px",
                    height: "30px",
                  }}
                  key={row}
                  onClick={(e) => this.onClickSeat(row)}
                >
                  {row}{" "}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* <AvailableList available = { this.props.available } />
          <ReservedList reserved = { this.props.reserved } /> */}
      </div>
    );
  }

  onClickSeat(seat) {
    this.props.onClickData(seat);
  }
}

// class AvailableList extends React.Component {
//   render() {
//     const seatCount = this.props.available.length;
//     return(
//       <div className="left">

//       </div>
//     )
//   }
// }

class ReservedList extends React.Component {
  // navigation = useNavigation();
  onsubmit(x, y) {
    console.log("hi");
    if (x.length > 0) {
      localStorage.setItem("selected", x);
      localStorage.setItem("Bus", JSON.stringify(y));
      window.location.href = `https://book-it-front-end.vercel.app//busticket/${arr[0]}/${arr[1]}/${arr[2]}`;
      // this.props.navigation.navigate('busticket')
    }
  }
  render() {
    return (
      <>
        <div className="something">
          <h4>Reserved Seats: ({this.props.reserved.length})</h4>

          {this.props.reserved.map((res) => (
            <b key={res}>{res} , </b>
          ))}
        </div>
        <div>
          <button
            style={{ height: "50px", width: "70px", color: "blue" }}
            onClick={() => this.onsubmit(this.props.reserved, this.props.bus)}
          >
            {" "}
            Submit{" "}
          </button>
        </div>
      </>
    );
  }
}

export default Seats;
