
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

# Next Goal -----> update the todo

* Now we want to update the todo basically i want to mark is any specific todo is done or not.

* For this first i have checked if on checked any value chaged or not by below code 
```js  
<input type='checkbox' onChange={(e) => console.log(e.target.checked)}/>
```
* Now in order to track which todo is updated or not we need an id property in todo so we pass and id property in todo from the todoList from where we are rendering the Todo component.

* To track each todo check unchecked property we also need to maintian the state so we use useState.like below one, but still we have to propogate the value from <Todo/> componenet to the <App> component where our todo list exist i.e here we have to propogate the value from the child to the parent for this we use callbacks

* From parent to child send property through ---->> props
* From child to parent send property through ---->> callbacks 

* So here we have to pass a callback to the <TodoList /> component which will get the update of any todo.

* Also <TodoList /> get props of updateList from the app.jsx 
* In <TodoList /> component we pass a prop of changeFinished inside the <Todo/> component, inside changeFinished we pass a parameter named isFinished which is nothing but the check unchecked done by user i.e (e.target.checked);

```js
function TodoList ({ list, updateList }) {
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
              updateList(updatedList)
            }}
          />
        ))}
    </div>
  )
}
```

Next Goal : Introducing Context api

**Problem : As we can see here there is a lot of props and state we have to maintain like we have to send the props from parent to child and from child to parent using callbacks which is very problematic and cumbersome to maintian such type of code. To solve this problem we have context api.**

* Context is working like a parent component in which we pass all the props as a child.

* suppose we make a context component and we wrap our App component inside that context then anytime and anywhere we can access the props, there is no need to prop drilling from one component to another component because all component are running throught the App component.

* There will be direct acces of all the props in every component.

Implementation : 

1. At first we have created a context folder inside the components and create a file TodoContext.js and inside this file we have imported the react createContext.

```js
import { createContext } from "react";
export default createContext(null);
```
* createContext helps us in creating the parent component;

* so using the createContext we can create any context and it provide a provider method using
which we can provide the context value.

* we wrapped our app component with context provider and provide the state value.

```js
<TodoContext.Provider value={{list, setList}}> 
    <AddTodo updateList={(todo) => setList([
      ...list, 
      {
        id: list.length+1, 
        todoData : todo, 
        finished:false
      }
    ])}/>
    <TodoList />
    </TodoContext.Provider>
```

* After providing the context to our <App /> component we use the useContext from react using which we extract the props from the context like below one : 

```js
const {list, setList} = useContext(TodoContext)
```
* Now we not need to pass prop manually from each component but there is still problems of call backs that we use to pass the prop from child to parent component, see below the problem of callbacks

```js
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
```

Now we will solve this using the Reducers concept.
