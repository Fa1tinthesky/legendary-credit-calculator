import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
// import Switch from "@mui/material/Switch";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormGroup from "@mui/material/FormGroup";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";

export default function MenuAppBar() {
    const navigate = useNavigate();

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
                        <AccountCircle sx={{ color: "black" }}></AccountCircle>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
