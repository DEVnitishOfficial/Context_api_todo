import { useContext } from 'react'
import Todo from '../Todo/Todo'
import TodoContext from '../../context/TodoContext'
import TodoDispatchContext from '../../context/TodoDispatchContext'

function TodoList () {

  const {dispatch} = useContext(TodoDispatchContext)
  const { list } = useContext(TodoContext)

  function onFinished (todo, isFinished) {
    dispatch({type : 'toggle_todo', payload:{todo, isFinished} })
  }

  function deleteTodo (todo) {
    dispatch({type : 'delete_todo', payload : {todo}})
  }

  function updateTodo (todo, todoData) {
    dispatch({type:'edit_todo', payload:{todo, todoData}})
  }

  return (
    <div>
      {list.length > 0 &&
        list.map(todo => (
          <Todo
            key={todo.id}
            todoData={todo.todoData}
            isFinished={todo.finished}
            id={todo.id}
            changeFinished={(isFinished) => onFinished(todo, isFinished)}
            onDelete={() => deleteTodo(todo)}
            onEdit={(todoData) => updateTodo(todo, todoData)}
          />
        ))}
    </div>
  )
}

export default TodoList
