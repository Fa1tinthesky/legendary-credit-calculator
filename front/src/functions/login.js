export default function login({ mail, password }) {
    fetch("http://10.192.9.206:8080/auth/sign-in", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Mail: mail, Password: password }),
    }).then((resp) => {
        console.log(resp);
        
    })
}
