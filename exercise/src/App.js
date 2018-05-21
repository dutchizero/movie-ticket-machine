import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {
  constructor(){
    super();
    this.state = {
      item: [],
      isLoaded: false,
      PricePerTicket: 0,
      testArr:{
        data:[1,2,3,4]
        ,total:6
      },
      price: 0,
      ticket: 0,
    }
    this.calprice=this.calprice.bind(this);
  }
  async componentDidMount() {
    await fetch("http://www.mocky.io/v2/5af178123000003700ba7ff2")
      .then(res=>res.json())
      .then(
        (result)=>{
          console.log(result.data);
          var temp=result.data;
          console.log(this.state.item);
          for (var i = 0; i < temp.length; i++) {
            // console.log(result.data[i].now_showing);
            if(i==0){
              this.setState({PricePerTicket:result.data[i].price})
              console.log(this.state.PricePerTicket);
            }
            if(result.data[i].now_showing==true){
              this.state.item.push(result.data[i]);
            }
          }
          this.setState({
            isLoaded: true,
          });
        });
      // console.log(this.state.item);
  }


  calprice(event){
    console.log(event.target.value);
    this.setState({ticket:event.target.value})
    console.log(this.state.PricePerTicket);
    let PricePerOne=this.state.PricePerTicket;
    let ticket=event.target.value;
    this.setState({price:ticket*PricePerOne});
  }

  setMovie(event){
    console.log(event.target.value);
    var x = document.getElementById("ticket").value;
    console.log(x);
    this.setState({PricePerTicket:event.target.value});
    let ticket=this.state.ticket;
    let PricePerOne=event.target.value;
    this.setState({price:ticket*PricePerOne});
  }


  render() {
    const list=this.state.item;
    // console.log(this.state.PricePerTicket)
    var price = 0;
    const listData=list.map((list=>
      <option key={list.id} id = {list.id} name="movie" value={list.price}>{list.name}</option>
    ));
      return (
        <div>
        <select onChange={this.setMovie.bind(this)}>{listData}</select><br/>
        <input id = "ticket" type="number" min = "0" onChange={this.calprice.bind(this)}/><br/>
        total price {this.state.price} baht
        </div>
      );
  }

}

export default App;
