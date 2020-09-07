import {combineReducers} from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import itemEditing from './itemEditing';
import filterTable from './filterTable';
import searchKeyWord from  './searchKeyWord';
import sortTable from  './sortTable';

const myReducer =  combineReducers({
    tasks,
    isDisplayForm,
    itemEditing,
    filterTable,
    searchKeyWord,
    sortTable,
     //tasks: tasks
});

export default myReducer;