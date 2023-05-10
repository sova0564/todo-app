import style from './Authentication.module.css';


function SignIn(props) {

    return (<div>
        <div className={style.form}>
            <h2 className={style.title}>Welcome back</h2>
            <p className={style.subtitle}>Login or Create to continue</p>
            <div className={style.inputWrap}>
                <label htmlFor="email" className={style.labelForm}>Email address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    className={style.inputForm}
                    onChange={props.handleChange}
                />
                <label htmlFor="password" className={style.labelForm}>Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    className={style.inputForm}
                    onChange={props.handleChange}
                />
                <button className={style.button} onClick={props.handleSignIn}>LOG IN</button>
                <p className={style.text}>or</p>
                <button className={style.button} onClick={props.handleSignUp}>SIGN UP</button>
                </div>
        </div>
    </div>)
}

export default SignIn;