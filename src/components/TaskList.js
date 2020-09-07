import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";
import * as actions from "./../actions/index";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1,
      sort: {
        by: "name",
        value: 1,
      },
    };
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    var filter = {
      name: name === "filterName" ? value : this.state.filterName,
      status:
        name === "filterStatus" ? parseInt(value) : this.state.filterStatus,
    };
    this.props.onFilterTable(filter);
    this.setState({
      [name]: value,
    });
    console.log(this.state);
  };
  onClick = (sortBy, sortValue) => {
    // nên dùng một biến trung gian, không nên set trực tiếp vì khả năng props sẽ chạy sau setState
    var sort = {
      by: sortBy,
      value: sortValue,
    };
    this.setState({
      sort: {
        by: sortBy,
        value: sortValue,
      },
    });
    this.props.onSort(sort);
  };
  onToggleForm = () => {
    //trường hợp đang sử dụng update chuyển sang work
    var { itemEditing } = this.props;
    if (itemEditing && itemEditing.id !== "") {
      this.props.onOpenForm();
    } else {
      this.props.onToggleForm();
    }
    this.props.onClearForm();
  };

  render() {
    var { tasks, filter, keyWord, sort } = this.props;

    //search key word
    if (keyWord) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1;
      });
    }

    // sort

    if (sort.by === "name") {
      tasks = tasks.sort((a, b) => {
        if (a.name > b.name) return sort.value;
        else if (a.name < b.name) return -sort.value;
        else return 0;
      });
    } else {
      tasks = tasks.sort((a, b) => {
        if (a.status > b.status) return -sort.value;
        else if (a.status < b.status) return sort.value;
        else return 0;
      });
    }
    //filter function

    if (filter.name) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(filter.name) !== -1;
      });
    }
    tasks = tasks.filter((task) => {
      if (filter.status === -1) {
        return tasks;
      } else {
        return task.status === (filter.status === 1 ? true : false);
      }
    });
    var tasksClose = tasks.filter((task) => {
      return task.status === true;
    });
    var tasksOpen = tasks.filter((task) => {
      return task.status === false;
    });
    // var tasks = this.props.tasks
    var elTasksClose = tasksClose.map((task, index) => {
      return <TaskItem key={task.id} index={index} task={task} />;
    });
    var elTasksOpen = tasksOpen.map((task, index) => {
      return <TaskItem key={task.id} index={index} task={task} />;
    });

    return (
      <div className="center col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
        <table className="table table-hover">
          <tbody>
            <tr>
              <td>
                <button
                  id="toggle"
                  type="button"
                  className="btn btn-warning"
                  onClick={this.onToggleForm}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i>
                  Add Todo
                </button>
              </td>
              <td className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.filterName}
                  name="filterName"
                  onChange={this.onChange}
                  placeholder="Search Title..."
                />
              </td>
              <td>
                <div className="dropdown">
                  <button
                    className="btn btn-infor dropdown-toggle"
                    type="button"
                    id="dropdownMenu1"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    Sort{" "}
                    <span className="fa fa-caret-square-o-down ml-5"></span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li onClick={() => this.onClick("name", 1)}>
                      <p role="button">
                        <span className="fa fa-sort-alpha-asc pr-5">
                          Tên A-Z{" "}
                          <i
                            className={
                              sort.by === "name" && sort.value === 1
                                ? "fa fa-check"
                                : ""
                            }
                          ></i>
                        </span>
                      </p>
                    </li>

                    <li onClick={() => this.onClick("name", -1)}>
                      <p role="button">
                        <span className="fa fa-sort-alpha-desc pr-5">
                          Tên Z-A{" "}
                          <i
                            className={
                              sort.by === "name" && sort.value === -1
                                ? "fa fa-check"
                                : ""
                            }
                          ></i>
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            {/* TaskItem */}
          </tbody>
        </table>

        <div className="card-deck mb-4">
          <div className="col-xs-6">
            <h3 className="text-center red">ToDo</h3>
            <div className="flex-box col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {elTasksOpen}
            </div>
          </div>
          <div className="ver-line"></div>
          <div className="col-xs-6">
            <h3 className="text-center green">Done</h3>

            <div className="flex-box col-xs-12 col-sm-12 col-md-12 col-lg-12">
              {elTasksClose}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    tasks: state.tasks,
    filter: state.filterTable,
    keyWord: state.searchKeyWord,
    sort: state.sortTable,
    itemEditing: state.itemEditing,
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable: (filter) => {
      dispatch(actions.filterTable(filter));
    },
    onSort: (sort) => {
      dispatch(actions.sort(sort));
    },
    onToggleForm: () => {
      dispatch(actions.toggleForm());
    },
    onClearForm: () => {
      dispatch(actions.clearForm());
    },
    onOpenForm: () => {
      dispatch(actions.openForm());
    },
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(TaskList);
