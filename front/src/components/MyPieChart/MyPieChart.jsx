import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import classes from "./MyPieChart.module.css";
import "./MyPieChart.css";
import { useEffect, useState } from "react";

export default function MyPieChart({ percentage }) {
    const data = [
        { name: "Основной долг", value: 100 - percentage },
        { name: "Проценты", value: percentage },
    ];
    const [isFirstTime, setIsFirstTime] = useState(true);

    const RADIAN = Math.PI / 180;
    const COLORS = ["#faffe4c8", "#dfa1cbc0"];

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
        const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="#5a5a5aff"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${((percent ?? 1) * 100).toFixed(0)}%`}
            </text>
        );
    };

    const animationDuration = 2000;

    useEffect(() => {
        setTimeout(() => {
            setIsFirstTime(false);
        }, animationDuration + 300)
    }, []);

    return (
        <ResponsiveContainer width="40%" height="100%">
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    data={data}
                    innerRadius={0}
                    outerRadius={120}
                    labelLine={false}
                    animationDuration={animationDuration}
                    isAnimationActive={isFirstTime}
                    label={renderCustomizedLabel}
                    className={classes.pie}
                >
                    {data.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index]}></Cell>
                    ))}
                </Pie>
                <Tooltip></Tooltip>
            </PieChart>
        </ResponsiveContainer>
    );
}