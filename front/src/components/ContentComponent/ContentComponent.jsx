// import { useEffect } from "react";
import { LinearProgress } from "@mui/material";
import MyAreaChart from "../MyAreaChart/MyAreaChart";
import MyPieChart from "../MyPieChart/MyPieChart";
import TableComponent from "../TableComponent/TableComponent";
import classes from "./ContentComponent.module.css";

export default function ContentComponent({ data, currency, isLoading }) {
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

    console.log(currency);

    return (
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
        </div>
    );
}
