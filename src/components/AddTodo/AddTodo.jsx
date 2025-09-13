import { useContext, useState } from 'react'
import TodoDispatchContext from '../../context/TodoDispatchContext'

function AddTodo () {

  const {dispatch} = useContext(TodoDispatchContext)
  const [inputText, setInputText] = useState('')
  
  return (
    <div>
      <input
        type='text'
        placeholder='Add your next todo'
        value={inputText}
        onChange={e => setInputText(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch({type:'add_todo', payload : {todoText : inputText}})
          setInputText('')
        }}
      >
        Add Todo
      </button>
    </div>
  )
}

export default AddTodo
