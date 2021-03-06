import {firebaseDb} from '../../utils/firebase';
import * as types from './types';

const refRoot= 'public_tasks';


export const createTask = (task) => dispatch => {

  dispatch(setIsCreating(false));

  firebaseDb.ref(refRoot)
    .push(task);
}

export const deleteTask = (key) => dispatch => {
  firebaseDb.ref(`${refRoot}/${key}`)
    .remove();
}

export function createTaskError(error) {
  return {
    type: types.CREATE_TASK_ERROR,
    payload: error
  };
}

export function createTaskSuccess(task) {
  return {
    type: types.CREATE_TASK_SUCCESS,
    payload: task
  };
}


export function loadTasksSuccess(tasks) {
  return {
    type: types.LOAD_TASKS_SUCCESS,
    payload: {list: tasks}
  };
}

export function setIsCreating(isCreating) {
  return {
    type: types.CREATE_TASK,
    payload: {isCreating}
  };
}

export function setIsFetching(isFetching) {
  return {
    type: types.FETCH_TASKS,
    payload: {isFetching}
  };
}


export const loadTasks = () => (dispatch, getState) => {
  const tasksRef=firebaseDb.ref(refRoot);

  dispatch(setIsFetching(true));

  tasksRef.on('value', snap=>{
    if(getState().tasks.list!==snap.val()){
      dispatch(loadTasksSuccess(snap.val()));
    }
  })
}


export function unloadTasks() {
  const tasksRef=firebaseDb.ref(refRoot);
  tasksRef.off();

  return {
    type: types.UNLOAD_TASKS_SUCCESS
  }
}
