import React from 'react';
import Sidenavbar from './views/header/header'
import { withRouter } from "react-router-dom";

function App(props) {
  return (
    <div>
        <Sidenavbar {...props}></Sidenavbar>
    </div>
  );
}
 
export default withRouter(App);
