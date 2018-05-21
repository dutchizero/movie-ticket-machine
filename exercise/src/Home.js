import React from 'react';
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom';

class Home extends React.Component {
  //Declare State
  constructor(){
    super();
    this.state = {
      Data: [],
      isLoaded: false,
      PricePerTicket: 0,
      Price: 0,
      Ticket: 0,
      MovieName: '',
      MovieID:'',
      MoneyReceived: 0,
    }
  }
  async componentDidMount() {
    // Get data from API and Assign to state
    await fetch("http://www.mocky.io/v2/5af178123000003700ba7ff2")
      .then(res=>res.json())
      .then(
        (result)=>{
          // console.log(result.data);
          var temp=result.data;
          console.log(this.state.Data);
          for (var i = 0; i < temp.length; i++) {
            // console.log(result.data[i].now_showing);
            // Set default movie Data
            if(i===0){
              this.setState({
                PricePerTicket:result.data[i].price,
                MovieName:result.data[i].name,
                MovieID:result.data[i].id
              });
            }
            if(result.data[i].now_showing===true){
              this.state.Data.push(result.data[i]);
            }
          }
          this.setState({isLoaded:true});
        });
      // console.log(this.state.item);
  }

  //Calulate total price if there're any change on input tag
  setTicket(event){
    // console.log(event.target.value);
    this.setState({Ticket:event.target.value})
    let PricePerOne=this.state.PricePerTicket;
    let ticket=event.target.value;
    this.setState({Price:ticket*PricePerOne});
  }

  //Set movie to state and calulate total price 
  setMovie(event){
    // console.log(event.target.value);
    this.setState({PricePerTicket:event.target.value});
    let ticket=this.state.ticket;
    let PricePerOne=event.target.value;
    this.setState({Price:ticket*PricePerOne});
  }

  //Sending data to Summary page
  LinkPurchaseSummary(event){
    console.log("linked");
    this.prosp.history.push('/Summary?MisterDeddy');
  }

  //Set received money to state
  setReceivedMoney(event){
    this.setState({MoneyReceived:event.target.value});
  }
  // Rending Html
  render() {
    const list=this.state.Data;
    // console.log(this.state.PricePerTicket)
    const listData=list.map((list=>
      <option key={list.id} id = {list.id} name="movie" value={list.id}>{list.name}</option>
    ));
    if(this.state.isLoaded===true){
      return (
        <div>
        please select movie<select onChange={this.setMovie.bind(this)}>{listData}</select><br/>
        please input number of ticket<input id = "ticket" type="number" min = "0" onChange={this.setTicket.bind(this)}/><br/>
        total price {this.state.Price} baht        
        Money received<input id = "received" type="number" min = "0" onChange={this.setReceivedMoney.bind(this)}/><br/>
        <Link to="/Summary"><button type = "submit" onClick={this.LinkPurchaseSummary.bind(this)}>ซื้อ</button></Link>
        </div>
      );
    }else{
      return(<div>Loading...</div>);
    }
  }
}

export default Home;