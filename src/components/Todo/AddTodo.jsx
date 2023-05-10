import style from './AddTodo.module.css';

function AddTodo(props) {
 
    function handleChange(event) {
    props.setTask(event.target.value);
    }
    
    return (<div>
        <form className={style.wrap} onSubmit={props.handleSubmit}>
            <button className={style.buttonItem} onClick={props.handleHideAddTodo}>x</button>
            <textarea  value={props.task} onChange={handleChange} className={style.area}/>
            <button type="submit" className={style.buttonAdd}>Add</button>
        </form>
    </div>)
}

export default AddTodo;