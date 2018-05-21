import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from '../Home';
import Summary from '../Summary';
export default()=>(
	<BrowserRouter>
		<Switch>
			<Route path="/" exact render={props=><Home {...props}/>}/>
			<Route path="/Summary" exact render={props=><Summary name="MisterDeddy"/>}/>
		</Switch>
	</BrowserRouter>
);