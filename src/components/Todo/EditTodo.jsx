import style from './AddTodo.module.css';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';


function EditTodo(props) {
   const [textTask, setTextTask] = useState('');

    function handleChange(event) {
        setTextTask(event.target.value);
    };
    
    useEffect(() => {
    const db = getDatabase();
    const todoRef = ref(db, `todos/${props.selectedTodoId}`);
    onValue(todoRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTextTask(data.textTask);
      }
    });
    }, [props.selectedTodoId]);

    function handleEditTodo(event) {
        event.preventDefault();

        if (textTask.length >= 1) {
            const db = getDatabase();

            const todoRef = ref(db, `todos/${props.selectedTodoId}`);
            set(todoRef, { textTask: textTask, completed: false });
            props.handleHideEditTodo();
        }
    }
    
    return (<div>
        <form className={style.wrap} onSubmit={handleEditTodo}>
            <button className={style.buttonItem} onClick={props.handleHideEditTodo}>x</button>
            <textarea value={textTask} onChange={handleChange} className={style.area}/>
            <button type="submit" className={style.buttonAdd}>Save</button>
            <button type="button" onClick={props.handleDelete}  className={style.buttonAdd}>Delete</button>
        </form>
    </div>)
};

export default EditTodo;
