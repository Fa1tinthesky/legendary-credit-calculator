// import { useEffect } from "react";
import MyAreaChart from "../MyAreaChart/MyAreaChart";
import MyPieChart from "../MyPieChart/MyPieChart";
import TableComponent from "../TableComponent/TableComponent";
import classes from "./ContentComponent.module.css";

export default function ContentComponent({ data, currency }) {
    const table = data.table;
    let sum = data.sum,
        interestSum = 0;
    for (let item of table) {
        interestSum += item.interest;
    }
    const percentage = (interestSum / sum) * 100;

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
