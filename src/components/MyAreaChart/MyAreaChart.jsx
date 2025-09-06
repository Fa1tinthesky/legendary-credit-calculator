import React, { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const MyAreaChart = ({ table }) => {
    let data = table.map((item) => {
        return {
            name: item.date,
            "Основной долг": item.body,
            "Начисленные проценты": item.interest,
        };
    });

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="Основной долг"
                    stackId="1"
                    stroke="rgba(0, 0, 0, 0.7)"
                    fill="#faffe4c8"
                />
                <Area
                    type="monotone"
                    dataKey="Начисленные проценты"
                    stackId="1"
                    stroke="rgba(0, 0, 0, 0.7)"
                    fill="#dfa1cbc0"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default MyAreaChart;
