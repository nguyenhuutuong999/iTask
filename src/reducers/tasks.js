import * as types from "./../constants/ActionTypes";

var s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};
var generateID = () => {
  return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4();
};
var findIndex = (tasks, id) => {
  var result = -1;
  tasks.forEach((task, index) => {
    if (task.id === id) {
      result = index;
    }
  });
  return result;
};



var data = JSON.parse(localStorage.getItem("tasks"));
var initialState = data ? data : [
    {
      id : generateID(),
      name: "sleep",
      status: false,
    },
    {
      id : generateID(),
      name: "Study ReactJS",
      status: true,
    },
    {
      id : generateID(),
      name: "Study React-Redux",
      status: true,
    }
];

var myReducer = (state = initialState, action) => {
  var index = '';
  switch (action.type) {
    
    case types.LIST_ALL: {
      return state;
    }
    case types.SAVE_TASK: {
      var task = {
        id : action.task.id,
        name: action.task.name,
        status: action.task.status,
      };
      if(!task.id){
        task.id = generateID();
        state.push(task);
      }else{
       index = findIndex(state, task.id);
        state[index] = task;
      }
     
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    }
    case types.UPDATE_STATUS: {
      index = findIndex(state, action.id);
      // tối ưu việc tìm kiếm index bằng lodash
      //var index = findIndex(tasks, (task) => task.id === action.id)
      if (index !== -1) {
        state[index] = {
          ...state[index],
          status: !state[index].status,
        };
      }

      localStorage.setItem("tasks", JSON.stringify(state));

      return [...state];
    }
    case types.DELETE_ITEM: {
      index = findIndex(state, action.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    }
    default:
      return state;
  }
};
export default myReducer;
