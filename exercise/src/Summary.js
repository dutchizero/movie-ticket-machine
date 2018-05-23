import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

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
		      		<h1 style={{textAlign:'center'}}>สรุปรายการซื้อ</h1>
		      		<div class="row">
		      			<div class="col-sm-12">
				      		<div class="col-sm-4" style={{marginLeft:50}}>
				      			<img src={this.props.data.Image}/>
				      		</div>
				      		<div class="col-sm-6" style={{marginTop:80}}>
						        {this.props.data.MovieName} x {this.props.data.Ticket}<br/>
						        Total price : {this.props.data.Price} baht <br/>
						        Money received : {this.props.data.MoneyReceived} baht<br/>
						        Exchange money : {this.props.data.ExchangeMoney} baht<br/>
						        Exchange banknote or coin : {this.props.data.ArrChange.toString()}<br/><br/>
						     	<Link to="/"><button style={{fontSize:16,height:'auto',width:'auto',textAlign:'right'}} class="btn btn-success" type = "submit" >กลับไปยังหน้าแรก</button></Link>
					        </div>
				        </div>
			        </div>
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