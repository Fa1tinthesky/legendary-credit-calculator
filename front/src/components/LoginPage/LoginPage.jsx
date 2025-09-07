import { useEffect, useRef, useState } from "react";
import classes from "./LoginPage.module.css";
import login, { signOut } from "../../functions/auth";
import { Link, useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";

export default function LoginPage() {
    const mailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        signOut();
    });

    return (
        <main className={classes.main}>
            <div className={classes.card}>
                <h1 className={classes.login_heading}>Вход в аккаунт</h1>
                <div className={classes.input_wrapper}>
                    <input
                        ref={mailRef}
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
                <div className={classes.signUp}>
                    У вас нет аккаунта{" "}
                    <Link to={"/register"}>Зарегистрироваться!</Link>
                </div>

                <div className={classes.container_button}>
                    <button
                        onClick={() => {
                            setIsLoading(true);
                            login({
                                mail: mailRef.current.value,
                                password: passwordRef.current.value,
                            });
                            setIsLoading(false);
                            navigate("/");
                        }}
                        className={classes.btn}
                    >
                        <a href="#">Войти</a>
                    </button>
                </div>
            </div>
            <Backdrop
                sx={(theme) => ({
                    color: "#fff",
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </main>
    );
}
