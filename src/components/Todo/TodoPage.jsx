import AddTodo from './AddTodo';
import EditTodo from './EditTodo';
import style from './TodoPage.module.css';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, set, update } from 'firebase/database';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";



function TodoPage() {
    const [todos, setTodos] = useState([]);
    const [showAddTodo, setShowAddTodo] = useState(false);
    const [showEditTodo, setShowEditTodo] = useState(false);
    const [task, setTask] = useState('');
    const [selectedTodoId, setSelectedTodoId] = useState(null);
    const [selectedTodoText, setSelectedTodoText] = useState('');
     const navigate = useNavigate();

    function handleSignOut() {
    const auth = getAuth();
    signOut(auth)
    .then(() => {
       navigate('/auth');
    })
    .catch((error) => {
      console.log(error)
    });
}


    function handleSubmit(event) {
            event.preventDefault();
            
            if (task.length >= 1) {
            const db = getDatabase();
        
            const newTask = push(ref(db, 'todos'));
            set(newTask, {
                textTask: task,
                completed: false
            });

            setTask('');
            }
            handleHideAddTodo();
    };
    
    useEffect(() => {
        const db = getDatabase();
        const todosRef = ref(db, 'todos');

        onValue(todosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const todosArray = Object.entries(data).map(([id, value]) => {
            return { id, ...value };
            });
            setTodos(todosArray);
        }
        });
    }, []);
    
    function handleShowAddTodo() {
    setShowAddTodo(true);
    };

    function handleHideAddTodo() {
    setShowAddTodo(false);
    };

    function handleShowEditTodo() {
    setShowEditTodo(true);
    };

    function handleHideEditTodo() {
    setShowEditTodo(false);
    setSelectedTodoId(null);
    setSelectedTodoText('');
    };

    function handleSelectTodo(todo) {
        setSelectedTodoId(todo.id);
        setSelectedTodoText(todo.textTask);
        handleShowEditTodo();
    }

    function handleDelete() {
    const db = getDatabase();
    const todoRef = ref(db, `todos/${selectedTodoId}`);
        set(todoRef, null);
        setTodos(todos.filter(todo => todo.id !== selectedTodoId));
    handleHideEditTodo();
    };

    function handleCompleteTodo(todo) {
    const db = getDatabase();
    const todoRef = ref(db, `todos/${todo.id}`);
    update(todoRef, {
        completed: !todo.completed
    });
}

    return (<div className={style.wrapPage}>
        <button className={style.buttonLogout} onClick={handleSignOut}>Log out</button>
        <div className={style.wrap}>
            <h2 className={style.title}>Todo</h2>
            {todos.length === 0 ? (
          <p className={style.noText}>No todos yet</p>
        ) : (
            <div className={style.wrapList}>
                <ul className={style.list}>
                {todos.map((todo) => (
                    <li key={todo.id} className={`${style.item} ${todo.completed ? style.itemActive : ""}`} >
                        <div className={style.wrapItem}>
                            <div>
                                <div className={`${style.checkbox} 
                                    ${todo.completed ? style.checkboxActive : ""}`}
                                    onClick={() => handleCompleteTodo(todo)}></div>
                            </div>
                            <p className={`${style.text} 
                                    ${todo.completed ? style.textActive : ""}`}>{todo.textTask}</p>
                        </div>
                        <button className={style.buttonItem} onClick={() => handleSelectTodo(todo)}>...</button>
                    </li>
                       ))}
                </ul>
            </div>
                     )}
            <button className={style.buttonAdd} onClick={handleShowAddTodo}>Add Todo</button>
        </div>
         {showAddTodo && (
            <AddTodo handleHideAddTodo={handleHideAddTodo} handleSubmit={handleSubmit} task={task} setTask={setTask} />
        )}
         {showEditTodo && (
            <EditTodo handleHideEditTodo={handleHideEditTodo}  handleDelete={handleDelete} selectedTodoId={selectedTodoId}/>
              )}
    </div>)
}

export default TodoPage;