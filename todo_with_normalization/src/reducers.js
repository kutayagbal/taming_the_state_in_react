export const ASSIGNED_TO_CHANGE = "ASSIGNED_TO_CHANGE";

const reducer = (state, action) => {
  switch (action.type) {
    case ASSIGNED_TO_CHANGE: {
      return applyChangeAssinedTo(state, action);
    }
    default:
      return state;
  }
};

const applyChangeAssinedTo = (state, action) => {
  let newAssignee = Object.values(state.todos.entities.assignedTo).find(
    elem => elem.name === action.payload.name
  );

  if (newAssignee) {
    return {
      ...state,
      todos: {
        ...state.todos,
        entities: {
          ...state.todos.entities,
          todos: {
            ...state.todos.entities.todos,
            [action.payload.todoId]: {
              ...state.todos.entities.todos[action.payload.todoId],
              assignedTo: newAssignee.id
            }
          }
        }
      }
    };
  }

  const maxId = Math.max(...Object.keys(state.todos.entities.assignedTo));
  newAssignee = { id: maxId + 1, name: action.payload.name };

  return {
    ...state,
    todos: {
      ...state.todos,
      entities: {
        ...state.todos.entities,
        todos: {
          ...state.todos.entities.todos,
          [action.payload.todoId]: {
            ...state.todos.entities.todos[action.payload.todoId],
            assignedTo: newAssignee.id
          }
        },
        assignedTo: {
          ...state.todos.entities.assignedTo,
          [newAssignee.id]: newAssignee
        }
      }
    }
  };
};

export default reducer;
