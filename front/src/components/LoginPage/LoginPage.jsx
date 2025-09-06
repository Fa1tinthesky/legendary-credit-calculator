import classes from "./LoginPage.module.css";

export default function LoginPage() {
    return (
        <main className={classes.main}>
            <div className={classes.card}>
                <h1 className={classes.login_heading}>Login</h1>
                <div className={classes.input_wrapper}>
                    <input
                        className={classes.input}
                        type="text"
                        placeholder="Email"
                    />
                    <input
                        className={classes.input}
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <div className={classes.container_button}>
                    <button className={classes.btn}>
                        <a href="#">Login</a>
                    </button>
                </div>
            </div>
        </main>
    );
}
