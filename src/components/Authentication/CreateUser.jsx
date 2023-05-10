import style from './Authentication.module.css';

function CreateUser(props) {
    return (<div>
         <div className={style.form}>
            <h2 className={style.title}>Create an account</h2>
            <div className={style.inputWrap}>
                <label for="email" className={style.labelForm}>Email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email"
                        className={style.inputForm}
                        onChange={props.handleChange}
                    />
                <label for="password" className={style.labelForm} >Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password"
                        className={style.inputForm}
                        onChange={props.handleChange}
                    />
                    <button className={style.button} onClick={props.handleSignUp}>SIGN UP</button>
            </div>
        </div>
    </div>)
}

export default CreateUser;