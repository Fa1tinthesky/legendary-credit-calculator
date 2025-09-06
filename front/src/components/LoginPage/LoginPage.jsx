import { useRef } from "react";
import classes from "./LoginPage.module.css";
import login from "../../functions/login";

export default function LoginPage() {
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleLogin() {
        login({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        });
    }

    return (
        <main className={classes.main}>
            <div className={classes.card}>
                <h1 className={classes.login_heading}>Login</h1>
                <div className={classes.input_wrapper}>
                    <input
                        ref={emailRef}
                        className={classes.input}
                        type="text"
                        placeholder="Email"
                    />
                    <input
                        ref={passwordRef}
                        className={classes.input}
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <div className={classes.container_button}>
                    <button className={classes.btn}>
                        <a
                            href="#"
                            onClick={() => {
                                handleLogin();
                            }}
                        >
                            Login
                        </a>
                    </button>
                </div>
            </div>
        </main>
    );
}
