function todoReducer(state, action) {
  if (action.type == "add_todo") {
    let todoText = action.payload.todoText;
    return [
      ...state,
      {
        id: state.length + 1,
        todoData: todoText,
        finished: false,
      },
    ];
  } else if (action.type == "edit_todo") {
    let todo = action.payload.todo;
    let todoData = action.payload.todoData;

    const updatedList = state.map((t) => {
      if (t.id == todo.id) {
        t.todoData = todoData;
      }
      return t;
    });
    return updatedList;
  } else if (action.type == "delete_todo") {
    const todo = action.payload.todo;
    const updatedList = state.filter((t) => t.id != todo.id);

    return updatedList;
  } else if (action.type == "toggle_todo") {
    let todo = action.payload.todo;
    let isFinished = action.payload.isFinished;

    const updatedList = state.map((t) => {
      if (t.id == todo.id) {
        todo.finished = isFinished;
      }
      return t;
    });
    return updatedList;
  }else{
    return state
  }
}

export default todoReducer;
