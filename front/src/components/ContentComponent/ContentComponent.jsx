// import { useEffect } from "react";
import { Backdrop, CircularProgress, LinearProgress } from "@mui/material";
import theme from "../constants/theme";
import MyAreaChart from "../MyAreaChart/MyAreaChart";
import MyPieChart from "../MyPieChart/MyPieChart";
import TableComponent from "../TableComponent/TableComponent";
import classes from "./ContentComponent.module.css";
import { Button, ThemeProvider } from "@mui/material";
import { isAuth } from "../../functions/auth";
import getCookie from "../../functions/getCookie";
import { useState } from "react";

export default function ContentComponent({
    data,
    currency,
    isLoading,
    body,
    isCharts = true,
    sData,
}) {
    if (isLoading) {
        return (
            <div className={`${classes.content}`} style={{ padding: "30px" }}>
                <LinearProgress color="inherit"></LinearProgress>
            </div>
        );
    }

    function handleAdding() {
        setIsLoading2(true);
        fetch(`${hostServer}/api/create-calc`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Cookie: getCookie("auth"),
                Rows: sData["table"],
            }),
        }).then(() => {
            setIsLoading2(false);
        });
    }

    const [isLoading2, setIsLoading2] = useState(false);

    const table = data.table;
    let percentage, hostServer, sum, interestSum;
    if (isCharts) {
        (sum = data.sum), (interestSum = 0);
        for (let item of table) {
            interestSum += item.interest;
        }
        percentage = Math.round((interestSum / sum) * 100);
        hostServer = `http://${import.meta.env.VITE_HOSTIP}:8080`;
    }
    return (
        <ThemeProvider theme={theme}>
            <div className={`${classes.content}`}>
                {isCharts && (
                    <div className={classes.charts}>
                        <MyPieChart percentage={percentage} />
                        <MyAreaChart
                            className={classes.area_chart}
                            table={table}
                        />
                    </div>
                )}
                <div className={classes.table_section}>
                    <TableComponent
                        table={table}
                        currency={currency}
                    ></TableComponent>
                </div>
                {isCharts && (
                    <div className={classes.buttons}>
                        <a
                            href={`${hostServer}/api/get-excel?sum=${body.sum}&period=${body.period}&rate=${body.rate}&paymentType=${body.type}&start_date=${body.start_date}`}
                        >
                            <Button
                                variant="contained"
                                color="blue"
                                onClick={() => {
                                    console.log(body);
                                }}
                            >
                                Экспортировать в Excel файл
                            </Button>
                        </a>
                        {isAuth() && (
                            <Button
                                onClick={() => {
                                    // console.log(
                                    //     JSON.stringify({
                                    //         Cookie: getCookie("auth"),
                                    //         Rows: table,
                                    //     })
                                    // );
                                    handleAdding();
                                }}
                                variant="contained"
                                color="blue"
                            >
                                Добавить в профиль
                            </Button>
                        )}
                    </div>
                )}
            </div>

            <Backdrop
                sx={(theme) => ({
                    color: "#fff",
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={isLoading2}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </ThemeProvider>
    );
}
