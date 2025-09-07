import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { isAuth, signOut } from "../functions/auth";

export default function MenuAppBar() {
    const navigate = useNavigate();
    const [state, setState] = React.useState();

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "transparent",
                    color: "black",
                    boxShadow: "0",
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <Link
                            className="heading_link"
                            sx={{ color: "black" }}
                            to="/"
                        >
                            Кредитный Калькулятор
                        </Link>
                    </Typography>
                    <IconButton
                        onClick={() => {
                            navigate("/profile");
                        }}
                    >
                        {isAuth() ? (
                            <AccountCircle
                                sx={{ color: "black" }}
                            ></AccountCircle>
                        ) : (
                            <LoginIcon sx={{ color: "black" }}></LoginIcon>
                        )}
                    </IconButton>

                    {auth && isAuth() && (
                        <IconButton
                            sx={{ paddingLeft: "10px" }}
                            onClick={() => {
                                signOut();
                                setAuth(false);
                            }}
                        >
                            <LogoutIcon sx={{ color: "black" }}></LogoutIcon>
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
