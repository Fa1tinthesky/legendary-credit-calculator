import getCookie from "./getCookie";

export function signOut() {
    document.cookie = "auth=;";
}

export default function login({ mail, password, navigate, setError }) {
    fetch(`http://${import.meta.env.VITE_HOSTIP}:8080/auth/sign-in`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Mail: mail, Password: password }),
    })
        .then((resp) => {
            if (!resp.ok) {
                setError("*Неправильная почта или пароль!")
            }
            console.log(resp);
            return resp.json();
        })
        .then((data) => {
            document.cookie = `auth=${data["status"]}`;
            navigate('/');
        });
}

export function signUp({
    mail,
    password,
    name,
    setError,
    setIsLoading,
    setConfirmPassword,
    setData,
    navigate,
}) {
    fetch(`http://${import.meta.env.VITE_HOSTIP}:8080/auth/sign-up`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Mail: mail, Password: password, Login: name }),
    })
        .then((resp) => {
            if (!resp.ok) {
                setError("*Эта почта уже используется!");
                setIsLoading(false);
                return;
            }
            setError("");
            setConfirmPassword(true);
            setIsLoading(false);
            setData({ mail, password });
        })
        .catch((e) => {
            setIsLoading(false);
            setError(e.name);
        });
}

export function confirmEmail({
    email,
    password,
    code,
    setError,
    setIsLoading,
    navigate,
}) {
    setIsLoading(true);
    fetch(`http://${import.meta.env.VITE_HOSTIP}:8080/auth/confirm-email`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Mail: email,
            Password: code,
        }),
    })
        .then((resp) => {
            if (!resp.ok) {
                setError("*Неправильный код");
                setIsLoading(false);
                return;
            }
            console.log(resp);
            setIsLoading(false);
            login({ mail: email, password, navigate });
        })
        .catch((e) => {
            setIsLoading(false);
            setError("*Incorrect code(try again)");
        });
}

export function isAuth() {
    return !!getCookie("auth");
}
