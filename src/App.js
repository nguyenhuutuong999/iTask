import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";
import TaskForm from "./components/TaskForm";

import TaskList from "./components/TaskList";

class App extends Component {
  render() {
    var { isDisplayForm } = this.props;
   // var showTaskForm = isDisplayForm ?<div className="col-xs-3 toggle-open"> <TaskForm /> </div> :"" ;

    return (
      <div className="">
         <h2 className="text-center" id="abc">I Do, You Do ???</h2>
        <div className="row">
          
            {/* TaskForm */}
            {/* {showTaskForm} */}
            <div style={{width:isDisplayForm ? "22%" : "0px"}} className="col-xs-3 toggle"><TaskForm /></div>
          
            <div style ={{width:isDisplayForm ? "78%" : "80%"}} className= "container toggle-resize ">
             
       
              {/* Search and Sort */}

              {/* TaskList */}
              <TaskList />
            </div>
          </div>
        </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
  };
};
export default connect(mapStateToProps, null)(App);
