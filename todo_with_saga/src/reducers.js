import { combineReducers } from "redux";

export const ADD_TODO = "ADD_TODO";
export const SET_FILTER = "SET_FILTER";
export const CHANGE_ASSIGNEE = "CHANGE_ASSIGNEE";
export const TOGGLE_COMPLETED = "TOGGLE_COMPLETED";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";
export const ASSIGNEE_CREATED_NOTIFICATION = "ASSIGNEE_CREATED_NOTIFICATION";

const notificationReducer = (state = { notifications: {} }, action) => {
  switch (action.type) {
    case ADD_TODO:
    case CHANGE_ASSIGNEE:
      return applySetNotify(state, action);
    case HIDE_NOTIFICATION:
      return applyRemoveNotification(state, action);
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

function applySetNotify(state, action) {
  const { notification } = action.payload;
  if (notification !== undefined) {
    return {
      ...state,
      notifications: {
        ...state.notifications,
        [notification.id]: notification.texts
      }
    };
  }

  return state;
}

const todoReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_ASSIGNEE:
      return applyChangeAssignee(state, action);
    case ADD_TODO:
      return applyAddTodo(state, action);
    case TOGGLE_COMPLETED:
      return applyToggleCompleted(state, action);
    default:
      return state;
  }
};

const applyAddTodo = (state, action) => {
  const { todo, assignee, isNewAssignee } = action.payload;

  if (isNewAssignee) {
    return {
      ...state,
      todoIds: [...state.todoIds, todo.id],
      todos: { ...state.todos, [todo.id]: todo },
      assignees: { ...state.assignees, [assignee.id]: assignee }
    };
  }

  return {
    ...state,
    todos: { ...state.todos, [todo.id]: todo },
    todoIds: [...state.todoIds, todo.id]
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

const applyChangeAssignee = (state, action) => {
  const { todoId, assignee, isNewAssignee } = action.payload;

  if (isNewAssignee) {
    return {
      ...state,
      todos: {
        ...state.todos,
        [todoId]: {
          ...state.todos[todoId],
          assignee: assignee.id
        }
      },
      assignees: {
        ...state.assignees,
        [assignee.id]: assignee
      }
    };
  }

  return {
    ...state,
    todos: {
      ...state.todos,
      [todoId]: {
        ...state.todos[todoId],
        assignee: assignee.id
      }
    }
  };
};

const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer,
  notificationState: notificationReducer
});

export default rootReducer;
