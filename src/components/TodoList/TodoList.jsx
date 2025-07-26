import { useContext } from 'react'
import Todo from '../Todo/Todo'
import TodoContext from '../context/TodoContext'

function TodoList () {
  const {list, setList} = useContext(TodoContext)
  console.log('list>>>',list);
  return (
    <div>
      {list.length > 0 &&
        list.map(todo => (
          <Todo
            key={todo.id}
            todoData={todo.todoData}
            isFinished={todo.finished}
            id={todo.id}
            changeFinished={isFinished => {
              const updatedList = list.map(t => {
                if (t.id == todo.id) {
                  todo.finished = isFinished
                }
                return t
              })
              setList(updatedList)
            }}
            onDelete={() => {
              const updatedList = list.filter((t) => t.id != todo.id)
              setList(updatedList);
            }}
            onEdit={(todoData) => {
              const updatedList = list.map(t => {
                if(t.id == todo.id){
                  t.todoData = todoData
                }
                return t
              })
              setList(updatedList);
            }}
          />
        ))}
    </div>
  )
}

export default TodoList
