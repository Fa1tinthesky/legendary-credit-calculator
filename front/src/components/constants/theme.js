import {
    createTheme,
    alpha,
    getContrastRatio,
} from "@mui/material/styles";

const blueBase = "#000000";
const blueMain = alpha(blueBase, 0.7);

let theme = createTheme({
    palette: {
        blue: {
            main: blueMain,
            light: alpha(blueBase, 0.5),
            dark: alpha(blueBase, 0.9),
            contrastText:
            getContrastRatio(blueMain, "#fff") > 4.5 ? "#fff" : "#111",
        },
    },
    components: {
        MuiPickersToolbar: {
            styleOverrides: {
                root: {
                    color: '#f8bbd0',
                    borderRadius: '2px',
                    borderWidth: '1px',
                    borderColor: '#e91e63',
                    border: '1px solid',
                    backgroundColor: '#880e4f',
                }
            }
        }
    }
});

export default theme;
