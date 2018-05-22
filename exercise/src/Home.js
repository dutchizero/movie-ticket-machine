import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Home extends React.Component {
  //Declare State
  constructor(){
    super();
    this.state = {
      Data: [],
      isLoaded: false,
    }
  }
  async componentDidMount() {
    // Get data from API and Assign to state
    await fetch("http://www.mocky.io/v2/5af178123000003700ba7ff2")
      .then(res=>res.json())
      .then(
        (result)=>{
          console.log(result.data);
          var temp=result.data;
          console.log(this.state.Data);
          for (var i = 0; i < temp.length; i++) {
            // console.log(result.data[i].now_showing);
            // Set default movie Data
            if(i===0){
              this.props.setPricePerTicket(result.data[i].price);
              this.props.setMovie(result.data[i].name);
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
    this.props.setTicket(event.target.value);
    let PricePerOne=this.props.data.PricePerTicket;
    let ticket=event.target.value;
    var Price=ticket*PricePerOne;
    this.props.setPrice(Price);
  }

  //Set movie to state and calulate total price 
  setMovie(event){
    console.log(event.target.value);
    for (var i = 0; i < this.state.Data.length; i++) {
      if(this.state.Data[i].id==event.target.value){
        //console.log('hee');
        this.props.setMovie(this.state.Data[i].name);
        this.props.setPricePerTicket(this.state.Data[i].price);
        let ticket=this.props.data.Ticket;
        let PricePerOne=this.state.Data[i].price;
        var Price=ticket*PricePerOne;
        this.props.setPrice(Price);
      }
    }
  }

  //Sending data to Summary page
  LinkPurchaseSummary(event){
    console.log("linked");
    //this.props.setPricePerTicket("MisterDeddy");
  }

  //Set received money to state
  setReceivedMoney(event){
    //this.setState({MoneyReceived:event.target.value});
    this.props.setReceivedMoney(event.target.value);
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
        total price {this.props.data.Price} baht <br/>
        Money received<input id = "received" type="number" min = "0" onChange={this.setReceivedMoney.bind(this)}/><br/>
        <Link to='Summary'><button type = "submit" onClick={this.LinkPurchaseSummary.bind(this)}>ซื้อ</button></Link>
        </div>
      );
    }else{
      return(<div>Loading...</div>);
    }
  }
}

const mapStatetoProps=(state)=>{
    return {
      data:state.data
    }
}

const mapDispatchtoProps=(dispatch)=>{
    return {
      setPricePerTicket:(inputdata)=>{
        dispatch({
          type:"setPricePerTicket",
          payload:inputdata
        });
      },setTicket:(inputdata)=>{
        dispatch({
          type:"setTicket",
          payload:inputdata
        });
      },setMovie:(inputdata)=>{
        dispatch({
          type:"setMovie",
          payload:inputdata
        });
      },setMovieID:(inputdata)=>{
        dispatch({
          type:"setMovieID",
          payload:inputdata
        });
      },setPrice:(inputdata)=>{
        dispatch({
          type:"setPrice",
          payload:inputdata
        });
      },setReceivedMoney:(inputdata)=>{
        dispatch({
          type:"setReceivedMoney",
          payload:inputdata
        });
      }
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Home);