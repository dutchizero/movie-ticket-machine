import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './theme/Home.css';
class Home extends React.Component {
  //Declare State
  constructor(){
    super();
    this.state = {
      Data: [],
      isLoaded: false,
      ArrMoney: [1000, 500, 100, 50, 20, 10, 5, 2, 1],
      ArrSelected: [],
      MovieName: 'test',
    }
  }
  async componentDidMount() {
    // Get data from API and Assign to state
    await fetch("http://www.mocky.io/v2/5af178123000003700ba7ff2",{method:'get'})
      .then(res=>res.json())
      .then(
        (result)=>{
          //console.log(result.data);
          var temp=result.data;
          var isFirstData=1;
          for (var i = 0; i < temp.length; i++) {
            // console.log(result.data[i].now_showing);
            // Set default movie Data
            if(result.data[i].now_showing===true){
              if(isFirstData===1){
                this.props.setPricePerTicket(result.data[i].price);
                this.props.setMovie(result.data[i].name);
                this.props.setImgage(result.data[i].image);
                isFirstData=0;
                result.data[i].isSelect="false";
              }else{
                result.data[i].isSelect="false";
              }
              this.state.Data.push(result.data[i]);
            }
          }
          this.setState({isLoaded:true});
        });
      console.log(this.state.Data);
  }

  //Calulate total price if there're any change on input tag
  setTicket(event){
    // console.log(event.target.value);
    this.props.setTicket(event.target.value);
    let PricePerOne=this.props.data.PricePerTicket;
    let ticket=event.target.value;
    var Price=ticket*PricePerOne;
    console.log(PricePerOne);
    this.props.setPrice(Price);
  }

  //Set movie to state and calulate total price 
  setMovie(event){
    console.log(event.target.value);
    for (var i = 0; i < this.state.Data.length; i++) {
      if(this.state.Data[i].id==event.target.value){
        this.props.setMovie(this.state.Data[i].name);
        this.props.setPricePerTicket(this.state.Data[i].price);
        let ticket=this.props.data.Ticket;
        let PricePerOne=this.state.Data[i].price;
        var Price=ticket*PricePerOne;
        this.props.setPrice(Price);
        this.props.setImgage(this.state.Data[i].image);
      }
    }
  }

  //Sending data to Summary page
  LinkPurchaseSummary(event){
    console.log("linked");
    //Check input of Ticket
    if((this.props.data.Ticket==null)||(this.props.data.Ticket==0)){
      //if input data is 0 or null alert user to input variable
      alert("Please input ticket that you want to buy");
      window.location = '/';
    }else{
      //Check input of money
      if((this.props.data.MoneyReceived==0)||(this.props.data.MoneyReceived==null)){
        //if input data is 0 or null alert user to input variable
        alert("Please input money");
        window.location = '/';
      }else{
        //Prepare variable for push to state
        let ExchangeMoney = this.props.data.MoneyReceived-this.props.data.Price;
        //Check money ,Is that money enough for buy a ticket
        if(ExchangeMoney<0){
          //If dosen't enough aleart message to user to input more money
          alert("Money is not enough for ticket");
          window.location = '/';
        }else{
          this.props.setInputCorrect(true);
          let IndexArrMoney = 0;
          let ArrChange = [];
          if(ExchangeMoney===0){
            //If input money is equal to total price push "-" to Array
            let tempArrChange=["-"]
            this.props.setArrChange(tempArrChange);
          }else{
            //Loop until all exchange money is a banknote or coin
            this.props.setExchaneMoney(ExchangeMoney);
            while(ExchangeMoney>0){
              //Check exchange money can separate into which banknote or coin
              if(parseInt((ExchangeMoney/this.state.ArrMoney[IndexArrMoney]),10)>0){
                //Push that banknote or coin into array
                ExchangeMoney = ExchangeMoney-this.state.ArrMoney[IndexArrMoney];
                ArrChange.push(this.state.ArrMoney[IndexArrMoney]);
              }else{
                //If can't separate into this banknote or coin,Let move to next index
                IndexArrMoney++;
              }
            }
            this.props.setArrChange(ArrChange);
          }
        }
      }
    }
  }

  //Set received money to state
  setReceivedMoney(event){
    //this.setState({MoneyReceived:event.target.value});
    this.props.setReceivedMoney(event.target.value);
    //console.log(this.props.data.MovieName);
  }

  ClickPicture(event){
    //console.log(event.target.id);
    for (var i = 0; i < this.state.Data.length; i++) {
      if(this.state.Data[i].id==event.target.id){
        //console.log("found"+event.target.id+"and data[i]"+this.state.Data[i].id);
        this.props.setMovie(this.state.Data[i].name);
        this.props.setPricePerTicket(this.state.Data[i].price);
        let ticket=this.props.data.Ticket;
        let PricePerOne=this.state.Data[i].price;
        var Price=ticket*PricePerOne;
        this.props.setPrice(Price);
        this.props.setImgage(this.state.Data[i].image);
        console.log(document.getElementById("Selector").value);
        document.getElementById("Selector").value = this.state.Data[i].id;
      }
    }
  }
  // Rending Html
  render() {
    const list=this.state.Data;
    const listData=list.map((list=>
      <option key={list.id} id = {list.id} name="movie" value={list.id}>{list.name}</option>
    ));
    const list2=this.state.Data;
    const listSmallImage=list2.map((list2=>
      <div class="col-sm-3">
        <input type="hidden" value = {list2.id}/>
        <img onClick={this.ClickPicture.bind(this)} class="demo w3-opacity w3-hover-opacity-off" id ={list2.id} style={{ cursor: 'pointer' }}  src={list2.image}/>
      </div>
    ));
    if(this.state.isLoaded===true){
      return (
        <div>
          <div class="row" style={{marginTop :50,marginButtom:50}}>
            <div class="col-sm-12">
                  {listSmallImage}
            </div>
            <div class="col-sm-12">
              <div class="col-sm-4">
                
              </div>
              <div class="col-sm-4">
                <br/>
                <form style={{fontSize:20}}>
                  Please select movie
                  <select id="Selector" style={{fontSize:16,height:35}} class="form-control" onChange={this.setMovie.bind(this)}>
                    {listData}
                  </select>
                  Please input number of ticket 
                  <input style={{fontSize:16,height:35}} class="form-control" id = "ticket" type="number" min = "0" onChange={this.setTicket.bind(this)}/><br/>
                  Total price {this.props.data.Price} baht <br/><br/>
                  Money received 
                  <input style={{fontSize:16,height:30}} class="form-control" id = "received" type="number" min = "0" onChange={this.setReceivedMoney.bind(this)}/>
                  <Link to="Summary"><button style={{fontSize:16,height:30,width:70}} class="btn btn-success" type = "submit" onClick={this.LinkPurchaseSummary.bind(this)}>ซื้อ</button></Link>
                </form>
              </div>
            </div>
          </div>
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
      },setArrChange:(inputdata)=>{
        dispatch({
          type:"setArrChange",
          payload:inputdata
        });
      },setExchaneMoney:(inputdata)=>{
        dispatch({
          type:"setExchaneMoney",
          payload:inputdata
        });
      },setInputCorrect:(inputdata)=>{
        dispatch({
          type:"setInputCorrect",
          payload:inputdata
        });
      },setImgage:(inputdata)=>{
        dispatch({
          type:"setImgage",
          payload:inputdata
        });
      }
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(Home);