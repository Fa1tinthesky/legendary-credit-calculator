import theme from "./constants/theme";
import { ThemeProvider } from "@mui/material/styles/";
import { Button } from "@mui/material";
import AppBar from "./MenuAppBar";
import "./ProfilePage.css";

export default function ProfilePage() {
    return(
        <>
        <ThemeProvider theme={theme}>
            <AppBar text="Профиль"></AppBar>
            <main>
                <div sx={{height: "200vh"}}></div>
            </main>
        </ThemeProvider>
        </>
    )
}
