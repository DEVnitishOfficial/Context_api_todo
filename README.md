
# Goal : Learning context api

## Basic setup :

* we have created a components folder inside this we have three component
1. TodoList ----> having a list of todo, iterate on each todo and render the <Todo/> component on each todo
```js
function TodoList () {
   const [list, setList] = useState([
    { id: 1, todoData: 'todo 1', finished:false },
    { id: 2, todoData: 'todo 2', finished:false }
  ])
  return (
    <div>
      {list.length > 0 &&
        list.map(todo => <Todo key={todo.id} todoData={todo.todoData} />)}
    </div>
  )
}
```


2. Todo ----> Have a basic input tag with type checkbox and two button edit and delete
```js
function Todo ({ todoData }) {
  return (
    <div>
      <input type='checkbox' />
      {todoData}
      <button>Edit</button>
      <button>Delete</button>
    </div>
  )
}
```

3. AddTodo -----> Have a input with type text and a button for adding todo.

```js
function AddTodo () {
  return (
    <div>
      <input type='text' placeholder='Add your next todo' />
      <button> Add Todo</button>
    </div>
  )
}
```

**Next challenge : How to add todo in the todoList**

* So to add a todo we did following things
1. Since we have <todoList /> and <addTodo /> both are in app.jsx file so we move our list state from <TodoList /> component to the <App/> component because from here we can easily can pass prop to the <TodoList /> component and then using the map function we can iterate on each todo and render the <Todo /> component on each todo very easily.

2. In <AddTodo /> component we are passing a prop updateList which get input from the user, and then we update it in a list state inside the app.jsx file.

3. See all your files after add todo list functionality : 

i. <TodoList/> component
```js
function TodoList ({list}) {
  
  return (
    <div>
      {list.length > 0 &&
        list.map((todo) => <Todo key={todo.id} todoData={todo.todoData} isFinished={todo.finished} />)}
    </div>
  )
}
```
ii. <Todo/> component
```js
function Todo ({ todoData, isFinished }) {
  return (
    <div>
      <input type='checkbox' checked={isFinished}/>
      {todoData}
      <button>Edit</button>
      <button>Delete</button>
    </div>
  )
}
```
iii. <AddTodo /> component
```js
function AddTodo ({updateList}) {
    const [inputText, setInputText] = useState('')
  return (
    <div>
      <input
       type='text' 
       placeholder='Add your next todo'
       value={inputText} 
       onChange={(e) => setInputText(e.target.value)}
       />
      <button onClick={() => updateList(inputText)} > Add Todo</button>
    </div>
  )
}
```

