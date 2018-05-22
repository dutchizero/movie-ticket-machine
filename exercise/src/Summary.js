import React from 'react';
import {connect} from 'react-redux';


class Summary extends React.Component {
  // Rending Html
	render() {
      	//console.log(this.props.data.isInputCorrect);
      	let isInputCorrect=this.props.data.isInputCorrect;
      	if(!isInputCorrect){
      		return(<div>Loading...{this.redirect()}</div>);
      	}else{
	      	return (
	      		<div>
			        {this.props.data.MovieName} x {this.props.data.Ticket}<br/>
			        Money received {this.props.data.MoneyReceived} baht<br/>
			        Total price {this.props.data.Price} baht <br/>
			        Exchange money {this.props.data.ExchangeMoney} baht<br/>
			        Exchange banknote or coin {this.props.data.ArrChange.toString()}
		        </div>
		    );
      	}
	}
	redirect(){
		//alert("Plase complete input fill")
		window.location = '/';
	}
}

const mapStatetoProps=(state)=>{
    return {
      data:state.data
    }
}


export default connect(mapStatetoProps)(Summary);