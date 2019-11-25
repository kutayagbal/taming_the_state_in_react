export const CHANGE_ASSIGNED = "CHANGE_ASSIGNED";
export const ADD_TODO = "ADD_TODO";
export const TOGGLE_COMPLETED = "TOGGLE_COMPLETED";

const todoReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_ASSIGNED: {
      return applyChangeAssinedTo(state, action);
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

const applyToggleCompleted = (state, action) => {
  return {
    ...state,
    todos: {
      ...state.todos,
      [action.payload.todoId]: {
        ...state.todos[action.payload.todoId],
        completed: action.payload.completed
      }
    }
  };
};

const applyAddTodo = (state, action) => {
  const maxTodoId = Math.max(...state.todoIds);

  const assignee = findAssigneeByName(
    Object.values(state.assignees),
    action.payload.assigneeName
  );

  if (assignee) {
    let newTodo = {
      id: maxTodoId + 1,
      name: action.payload.todoName,
      completed: false,
      assignedTo: assignee.id
    };

    return {
      ...state,
      todos: { ...state.todos, [newTodo.id]: newTodo },
      todoIds: [...state.todoIds, newTodo.id]
    };
  }

  const maxAssigneeId = Math.max(...Object.keys(state.assignees));
  const newAssignee = {
    id: maxAssigneeId + 1,
    name: action.payload.assigneeName
  };

  const newTodo = {
    id: maxTodoId + 1,
    name: action.payload.todoName,
    completed: false,
    assignedTo: newAssignee.id
  };

  return {
    ...state,
    todoIds: [...state.todoIds, newTodo.id],
    todos: { ...state.todos, [newTodo.id]: newTodo },
    assignees: { ...state.assignees, [newAssignee.id]: newAssignee }
  };
};

const findAssigneeByName = (assignees, name) => {
  return assignees.find(elem => elem.name === name);
};

const applyChangeAssinedTo = (state, action) => {
  let newAssignee = findAssigneeByName(
    Object.values(state.assignees),
    action.payload.name
  );

  if (newAssignee) {
    return {
      ...state,
      todos: {
        ...state.todos,
        [action.payload.todoId]: {
          ...state.todos[action.payload.todoId],
          assignedTo: newAssignee.id
        }
      }
    };
  }

  const maxId = Math.max(...Object.keys(state.todoState.entities.assignedTo));
  newAssignee = { id: maxId + 1, name: action.payload.name };

  return {
    ...state,
    todos: {
      ...state.todos,
      [action.payload.todoId]: {
        ...state.todos[action.payload.todoId],
        assignedTo: newAssignee.id
      }
    },
    assignees: {
      ...state.assignees,
      [newAssignee.id]: newAssignee
    }
  };
};

export default todoReducer;
