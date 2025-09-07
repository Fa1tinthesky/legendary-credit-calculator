// table : [
//     {месяц, сумма, основной долг, начисленные проценты, остаток}
// ]
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import numberWithCommas from "../../functions/numberWithCommas";

export default function TableComponent({ table, currency }) {
    let sum = 0;
    let debtSum = 0;
    let percentSum = 0;

    for (let index = 0; index < table.length; index++) {
        sum += table[index].payment;
        debtSum += table[index].body;
        percentSum += table[index].interest;
    }

    sum = Math.round(sum);
    debtSum = Math.round(debtSum);
    percentSum = Math.round(percentSum);

    const headerStyle = {
        fontWeight: "bold",
        color: "black",
        borderColor: "#ffffff20",
        fontSize: "17px",
    };
    const elementStyle = {
        color: "#2f2f2fff",
        borderColor: "#ffffff20",
        fontSize: "17px",
    };

    return (
        <TableContainer
            sx={{
                width: "max-content",
            }}
            component={Paper}
            className="glass_matte_effect"
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={headerStyle}>Дата платежа</TableCell>
                        <TableCell align="right" sx={headerStyle}>
                            Сумма
                        </TableCell>
                        <TableCell align="right" sx={headerStyle}>
                            Основной долг
                        </TableCell>
                        <TableCell align="right" sx={headerStyle}>
                            Начисленные проценты
                        </TableCell>
                        <TableCell align="right" sx={headerStyle}>
                            Остаток
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {table.map((row, index) => (
                        <TableRow
                            hover={true}
                            sx={{
                                transition: ".2s",
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                            key={index}
                        >
                            <TableCell sx={elementStyle}>{row.date}</TableCell>
                            <TableCell align="right" sx={elementStyle}>
                                {numberWithCommas(row.payment, currency)}
                            </TableCell>
                            <TableCell align="right" sx={elementStyle}>
                                {numberWithCommas(row.body, currency)}
                            </TableCell>
                            <TableCell align="right" sx={elementStyle}>
                                {numberWithCommas(row.interest, currency)}
                            </TableCell>
                            <TableCell align="right" sx={elementStyle}>
                                {numberWithCommas(row.remainder, currency)}
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell sx={headerStyle}>Итоги:</TableCell>
                        <TableCell sx={headerStyle} align="right">
                            {numberWithCommas(sum, currency)}
                        </TableCell>
                        <TableCell sx={headerStyle} align="right">
                            {numberWithCommas(debtSum, currency)}
                        </TableCell>
                        <TableCell sx={headerStyle} align="right">
                            {numberWithCommas(percentSum, currency)}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
