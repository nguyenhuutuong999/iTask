import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../actions/index";

class TaskItem extends Component {
  onUpdateStatus = () => {
    this.props.onUpdateStatus(this.props.task.id);
  };
  onUpdate = () => {
    this.props.onOpenForm();
    this.props.updateItem(this.props.task);
  };
  onDeleteItem = () => {
    this.props.onDeleteItem(this.props.task.id);
    this.props.onCloseForm();
    //dispatch(actions.deleteItem)
  };

  render() {
    var { task, index } = this.props;
    return (
      <div className={task.status === true ? "card bg-success" : "card bg-danger"} >
        <div className="title">
          <h4 className={task.status === true ? "text-success" : "text-danger"}>
            {index + 1}
          </h4>
          <button
            className={
              task.status === false ? "btn btn-success" : "btn btn-danger"
            }
            onClick={this.onUpdateStatus}
          >
            {task.status === false ? "Close" : "Open"}
          </button>
        </div>
        <hr/>
        <p className="content">{task.name}</p>
        <p className="mg-t50">
          <button
            type="button"
            className="btn btn-edit"
            onClick={this.onUpdate}
          >
            <span className="fa fa-pencil mr-5"></span>
          </button>
          &nbsp;
          <button
            type="button"
            className="btn btn-delete"
            onClick={this.onDeleteItem}
          >
            <span className="fa fa-trash mr-5"></span>
          </button>
        </p>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateStatus: (id) => {
      dispatch(actions.updateStatus(id));
    },   
    onDeleteItem: (id) => {
      dispatch(actions.deleteItem(id));
    },
    onCloseForm: () => {
      dispatch(actions.closeForm());
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    },
    updateItem: (task) => {
      dispatch(actions.updateItem(task));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
