import { useEffect, useRef, useState } from "react";
import classes from "./SignUp.module.css";
import { confirmEmail, signOut, signUp } from "../../functions/auth";
import { Link, useNavigate } from "react-router-dom";
import { Backdrop, Button, CircularProgress } from "@mui/material";

export default function SignUpPage() {
    const navigate = useNavigate();

    const nameRef = useRef();
    const mailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const codeRef = useRef();

    const [isConfirmPassword, setConfirmPassword] = useState(false);
    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        signOut();
    });

    function signUpHandle() {
        if (passwordRef.current.value != confirmPasswordRef.current.value) {
            setError("*Пароли должны быть одинаковыми");
            return;
        }

        setIsLoading(true);

        signUp({
            mail: mailRef.current.value,
            password: passwordRef.current.value,
            name: nameRef.current.value,
            setError,
            setIsLoading,
            setConfirmPassword,
            setData,
        });
    }

    function handleConfirm() {
        confirmEmail({
            email: data.mail,
            password: data.password,
            code: codeRef.current.value,
            setError,
            setIsLoading,
            navigate,
        });
    }

    if (isConfirmPassword) {
        return (
            <main className={classes.main}>
                <div className={`${classes.confirm_card}`}>
                    <h2>
                        Введите шестизначный код <br /> отправленный на ваш
                        email
                    </h2>
                    <input
                        ref={codeRef}
                        type="text"
                        className={classes.input}
                    />
                    <div className={classes.confirm_error}>{error}</div>
                    <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="blue"
                        sx={{ margin: 1, borderRadius: 16 }}
                        onClick={handleConfirm}
                    >
                        Подтвердить
                    </Button>
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

    return (
        <main className={classes.main}>
            <div className={classes.card}>
                <h1 className={classes.login_heading}>Регистрация</h1>
                <div className={classes.input_wrapper}>
                    <input
                        ref={mailRef}
                        className={classes.input}
                        type="text"
                        placeholder="Email"
                    />
                    <input
                        ref={nameRef}
                        className={classes.input}
                        type="text"
                        placeholder="Your Name"
                    />
                    <input
                        onChange={() => {
                            setError("");
                        }}
                        ref={passwordRef}
                        className={classes.input}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        onChange={() => {
                            setError("");
                        }}
                        ref={confirmPasswordRef}
                        className={classes.input}
                        type="password"
                        placeholder="Confirm Password"
                    />
                </div>

                <div className={classes.error}>{error}</div>

                <div className={classes.login}>
                    У вас уже есть аккаунт? <Link to={"/login"}>Войти!</Link>
                </div>

                <div className={classes.container_button}>
                    <button
                        onClick={() => {
                            signUpHandle();
                        }}
                        className={classes.btn}
                    >
                        <a href="#">Регистрация</a>
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
