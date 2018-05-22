import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Summary extends React.Component {
  // Rending Html
  render() {
      return (
        <div>
            total price {this.props.data.Price} baht <br/>
            Recieved Money {this.props.data.MoneyReceived}<br/>
        </div>
      );
    }
}

const mapStatetoProps=(state)=>{
    return {
      data:state.data
    }
}


export default connect(mapStatetoProps)(Summary);