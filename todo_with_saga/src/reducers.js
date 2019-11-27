import uuid from "uuid";
import { combineReducers } from "redux";

export const ADD_TODO = "ADD_TODO";
export const SET_FILTER = "SET_FILTER";
export const CHANGE_ASSIGNEE = "CHANGE_ASSIGNEE";
export const TOGGLE_COMPLETED = "TOGGLE_COMPLETED";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

const notificationReducer = (state = { notifications: {} }, action) => {
  switch (action.type) {
    case ADD_TODO: {
      return applySetNotifyAboutAddTodo(state, action);
    }
    case HIDE_NOTIFICATION: {
      return applyRemoveNotification(state, action);
    }
    default:
      return state;
  }
};

function applyRemoveNotification(state, action) {
  const {
    [action.payload.id]: notificationToRemove,
    ...restNotifications
  } = state.notifications;
  return { notifications: restNotifications };
}

function applySetNotifyAboutAddTodo(state, action) {
  const { todoId, todoName } = action.payload;
  return {
    ...state,
    notifications: {
      ...state.notifications,
      [todoId]: "Todo Created: " + todoName
    }
  };
}

const todoReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_ASSIGNEE: {
      return applyChangeAssignee(state, action);
    }
    case ADD_TODO: {
      return applyAddTodo(state, action);
    }
    case TOGGLE_COMPLETED: {
      return applyToggleCompleted(state, action);
    }
    default:
      return state;
  }
};

const applyAddTodo = (state, action) => {
  const assignee = findAssigneeByName(
    Object.values(state.assignees),
    action.payload.assigneeName
  );

  if (assignee) {
    let newTodo = {
      id: uuid(),
      name: action.payload.todoName,
      completed: false,
      assignee: assignee.id
    };

    return {
      ...state,
      todos: { ...state.todos, [newTodo.id]: newTodo },
      todoIds: [...state.todoIds, newTodo.id]
    };
  }

  const newAssignee = {
    id: uuid(),
    name: action.payload.assigneeName
  };

  const newTodo = {
    id: action.payload.todoId,
    name: action.payload.todoName,
    completed: false,
    assignee: newAssignee.id
  };

  return {
    ...state,
    todoIds: [...state.todoIds, newTodo.id],
    todos: { ...state.todos, [newTodo.id]: newTodo },
    assignees: { ...state.assignees, [newAssignee.id]: newAssignee }
  };
};

const filterReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_FILTER: {
      return applySetFilter(state, action);
    }
    default:
      return state;
  }
};

const applySetFilter = (state, action) => {
  return { ...state, filterType: action.payload.filterType };
};

const applyToggleCompleted = (state, action) => {
  return {
    ...state,
    todos: {
      ...state.todos,
      [action.payload.todoId]: {
        ...state.todos[action.payload.todoId],
        completed: action.payload.isCompleted
      }
    }
  };
};

const findAssigneeByName = (assignees, name) => {
  return assignees.find(elem => elem.name === name);
};

const applyChangeAssignee = (state, action) => {
  let newAssignee = findAssigneeByName(
    Object.values(state.assignees),
    action.payload.newAssigneeName
  );

  if (newAssignee) {
    return {
      ...state,
      todos: {
        ...state.todos,
        [action.payload.todoId]: {
          ...state.todos[action.payload.todoId],
          assignee: newAssignee.id
        }
      }
    };
  }

  newAssignee = { id: uuid(), name: action.payload.newAssigneeName };

  return {
    ...state,
    todos: {
      ...state.todos,
      [action.payload.todoId]: {
        ...state.todos[action.payload.todoId],
        assignee: newAssignee.id
      }
    },
    assignees: {
      ...state.assignees,
      [newAssignee.id]: newAssignee
    }
  };
};

const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer,
  notificationState: notificationReducer
});

export default rootReducer;
