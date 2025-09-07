// import { useEffect } from "react";
import { LinearProgress } from "@mui/material";
import theme from "../constants/theme";
import MyAreaChart from "../MyAreaChart/MyAreaChart";
import MyPieChart from "../MyPieChart/MyPieChart";
import TableComponent from "../TableComponent/TableComponent";
import classes from "./ContentComponent.module.css";
import { Button, ThemeProvider } from "@mui/material";

export default function ContentComponent({ data, currency, isLoading, body}) {
    if (isLoading) {
        return (
            <div className={`${classes.content}`} style={{ padding: "30px" }}>
                <LinearProgress color="inherit"></LinearProgress>
            </div>
        );
    }

    const table = data.table;
    let sum = data.sum,
        interestSum = 0;
    for (let item of table) {
        interestSum += item.interest;
    }
    const percentage = Math.round((interestSum / sum) * 100);
    const hostServer = `http://${import.meta.env.VITE_HOSTIP}:8080`;

    return (
        <ThemeProvider theme={theme}>
            <div className={`${classes.content}`}>
                <div className={classes.charts}>
                    <MyPieChart percentage={percentage} />
                    <MyAreaChart className={classes.area_chart} table={table} />
                </div>
                <div className={classes.table_section}>
                    <TableComponent
                        table={table}
                        currency={currency}
                    ></TableComponent>
                </div>
                <div className={classes.buttons}> 
                        <a href={`${hostServer}/api/get-excel?sum=${body.sum}&period=${body.period}&rate=${body.rate}&paymentType=${body.type}&start_date=${body.start_date}`}>
                            <Button variant="contained" color="blue" onClick={() => {console.log(body)}}>
                            Экспортировать в Excel файл
                            </Button>
                        </a>
                </div>
            </div>
        </ThemeProvider>
    );
}
