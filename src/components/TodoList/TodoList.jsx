import { useContext } from 'react'
import Todo from '../Todo/Todo'
import TodoContext from '../context/TodoContext'

function TodoList () {
  const { list, setList } = useContext(TodoContext)

  function onFinished (todo, isFinished) {
    const updatedList = list.map(t => {
      if (t.id == todo.id) {
        todo.finished = isFinished
      }
      return t
    })
    setList(updatedList)
  }

  function deleteTodo (todo) {
    const updatedList = list.filter(t => t.id != todo.id)
    setList(updatedList)
  }

  function updateTodo (todo, todoData) {
    const updatedList = list.map(t => {
      if (t.id == todo.id) {
        t.todoData = todoData
      }
      return t
    })
    setList(updatedList)
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
