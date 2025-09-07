import theme from "./constants/theme";
import { ThemeProvider } from "@mui/material/styles/";
import { backdropClasses, Button } from "@mui/material";
import AppBar from "./MenuAppBar";
import "./ProfilePage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../functions/auth";
import ContentComponent from "./ContentComponent/ContentComponent";
import getCookie from "../functions/getCookie";

export default function ProfilePage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [table, setTable] = useState([]);

    useEffect(() => {
        if (!isAuth()) navigate("/login");

        console.log(getCookie("auth"));

        fetch(`http://${import.meta.env.VITE_HOSTIP}:8080/api/get-calc`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cookie: getCookie("auth") }),
        })
            .then((resp) => {
                return resp.json();
            })
            .then((rData) => {
                // console.log(rData);

                if (!rData) rData = [];

                console.log(rData);

                let newData = rData.map((item) => {
                    return {
                        ...item.object,
                        date: item.object.date.slice(0, 10),
                    };
                });
                setTable(newData);
                setIsLoading(false);
            });
    }, []);

    return (
        isAuth() && (
            <>
                <ThemeProvider theme={theme}>
                    <AppBar text="Профиль"></AppBar>
                    <main>
                        <ContentComponent
                            isCharts={false}
                            data={{ table, monthly: 100, sum: 1 }}
                            isLoading={isLoading}
                            currency={"$"}
                        ></ContentComponent>
                    </main>
                </ThemeProvider>
            </>
        )
    );
}
