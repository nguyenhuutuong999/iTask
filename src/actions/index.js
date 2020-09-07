import * as types from './../constants/ActionTypes';

export const listAll = () => {
    return {
        type: types.LIST_ALL
    }
}
export const saveTask = (task) => {
    return {
        type: types.SAVE_TASK,
        task //task: task
    }
}

export const toggleForm = () => {
    return {
        type: types.TOGGLE_FORM,
        
    }
}
export const openForm = () => {
    return {
        type: types.OPEN_FORM,
        
    }
}
export const closeForm = () => {
    return {
        type: types.CLOSE_FORM,
    }
}
export const updateStatus = (id) => {
    return {
        type: types.UPDATE_STATUS,
        id,
    }
}
export const deleteItem = (id) => {
    return {
        type: types.DELETE_ITEM,
        id,
    }
}
export const updateItem = (task) => {
    return {
        type: types.UPDATE_ITEM,
        task,
    }
}
export const clearForm = () => {
    return {
        type: types.CLEAR_FORM ,
       
    }
}
export const filterTable = (filter) => {
    return {
        type: types.FILTER_TABLE ,
        filter,
    }
}
export const search = (keyWord) => {
    return {
        type: types.SEARCH ,
        keyWord,
    }
}
export const sort = (sort) => {
    return {
        type: types.SORT ,
        sort,
    }
}
