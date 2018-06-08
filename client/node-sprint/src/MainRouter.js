
import React from 'react';
import { Route, Switch } from 'react-router-dom'
import App from './App';
import Actions from './Actions';

const MainRouter = () =>{
    return(
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/projects" component={App}/>
            <Route path="/projects/:id/actions" component ={Actions} />
        </Switch>
    )
}
export default MainRouter;