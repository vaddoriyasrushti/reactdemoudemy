import React from 'react';
import Signup from '../container/authsidebar/authsidebar';
import Home from '../container/home/home';
import Coursedetail from '../container/coursedetail/coursedetail';
import Coursepage from '../views/coursepage/coursepage';
import cartdisplay from '../container/cartdisplay/cartdisplay';
import Searchpage from '../container/search/search';
import Teachonudemy from '../views/teachonudemy/teachonudemy';
import { Route, Switch } from 'react-router-dom';

const Router = (props) => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Signup} />
            <Route exact path="/course/:coursename" component={Coursepage} />
            <Route exact path="/cart" component={cartdisplay} />
            <Route exact path="/search/:searchtitle" component={Searchpage} />
            <Route exact path="/course/:coursename/:subcat" component={Coursepage} />
            <Route exact path="/course/:coursename/:subcat/:topic" component={Coursedetail} {...props} />
            <Route exact path="/addcourse" component={Teachonudemy} />
            {/* <Route exact path="/course/:coursename" 
                        render={(routeProps) => ( <Coursepage xyz={routeProps} /> )}/> */}

        </Switch>
    );
}

export default Router;
