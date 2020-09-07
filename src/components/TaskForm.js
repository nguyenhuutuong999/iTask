import React, { Component } from "react";
import {connect} from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      status: false,
    };
  }
  //chỉ nhận giá trị một lần khi gọi
  componentDidMount() {
  
    if (this.props.taskEditing && this.props.taskEditing.id !== '') { 
      this.setState({
        id: this.props.taskEditing.id,
        name: this.props.taskEditing.name,
        status: this.props.taskEditing.status,
      });
  
    }else{
      this.setState({
        id: "",
        name: "",
        status: false,
      });
    
    }
  }
  // nhận bất cứ khi nào truyền props ko chỉ 1 lần
  componentWillReceiveProps(nextProps) {
   
    if (nextProps.taskEditing) {
      this.setState({
        id: nextProps.taskEditing.id,
        name: nextProps.taskEditing.name,
        status: nextProps.taskEditing.status,
      });
      // truong hợp bấm vào work rồi chuyển sang update
    } else if (nextProps.taskEditing === null) {
      this.setState({
        id: "",
        name: "",
        status: false,
      });
    }
  }
  
  onCloseForm = () => {
    
    this.props.onCloseForm();
  };
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;

    if (name === "status") {
      value = target.value === "true" ? true : false;
    }
    this.setState({
      [name]: value,
    });
  };
  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSaveTask(this.state);
    
    this.onClear();
    this.onCloseForm();
  };
  onClear = () => {
    this.setState({
      name: "",
      status: false,
    });
  };
  render() {
    var { id } = this.state;
    return (
      //TaskForm
      
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {id  !== ''? "Update ToDo" :  "Add ToDo" }
            <i

              
              className="fa fa-times-circle "
              aria-hidden="true"
              onClick={this.onCloseForm}
             
            ></i>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
          

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={this.state.name}
                name="name"
                onChange={this.onChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                className="form-control"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
                required="required"
              >
                <option value={true}>Done</option>
                <option value={false}>Todo</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success">
              Add
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.onClear}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) =>{
  return{
      taskEditing: state.itemEditing,
  }
};

const mapDispatchToProps = (dispatch, props) =>{
  return{
    onSaveTask : (task) =>{
      dispatch(actions.saveTask(task));
    },
    onCloseForm : () =>{ 
      dispatch(actions.closeForm());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
