import theme from "./constants/theme";
import { ThemeProvider } from "@mui/material/styles/";
import { Button } from "@mui/material";
import AppBar from "./MenuAppBar";
import "./ProfilePage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../functions/auth";

export default function ProfilePage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth()) navigate("/login");
    }, []);

    return (
        isAuth() && (
            <>
                <ThemeProvider theme={theme}>
                    <AppBar text="Профиль"></AppBar>
                    <main>
                        <div sx={{ height: "200vh" }}></div>
                    </main>
                </ThemeProvider>
            </>
        )
    );
}
