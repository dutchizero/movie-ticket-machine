import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from '../Home';
import Summary from '../Summary';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,combineReducers} from "redux";

const initialState={
	PricePerTicket: 0,
	Price: 0,
	Ticket: 0,
	MovieName: '',
	MoneyReceived: 0,
}

const DataReducer = (state=initialState,action)=>{
	switch(action.type){
		case "setPricePerTicket":
			state={
				// result:state.result+=action.payload,
				...state,
				PricePerTicket:action.payload
			}
		break;
		case "setAge":
			state={
				...state,
				age:action.payload
			}
		break;
		case "setTicket":
			state={
				...state,
				Ticket:action.payload
			}
		break;
		case "setMovie":
			state={
				...state,
				MovieName:action.payload
			}
		break;
		case "setMovieID":
			state={
				...state,
				MovieID:action.payload
			}
		break;
		case "setPrice":
			state={
				...state,
				Price:action.payload
			}
		break;
		case "setReceivedMoney":
			state={
				...state,
				MoneyReceived:action.payload
			}
		break;
		default:
	}
	return state;
}


const mylogger=(store)=>(next)=>(action)=>{
	console.log("LogACtion",action);
	next(action);
}

const store=createStore(combineReducers({data:DataReducer}),applyMiddleware(mylogger));
store.subscribe(()=>{
	console.log("Update Store:",store.getState());
})

store.dispatch({
	type:"setName",
	payload:"test"
});


export default()=>(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route path="/" exact render={props=><Home {...props}/>}/>
				<Route path="/Summary" exact render={props=><Summary/>}/>
			</Switch>
		</BrowserRouter>
	</Provider>
);