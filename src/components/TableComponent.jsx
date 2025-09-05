// table : [
// {месяц, сумма, основной долг, начисленные проценты, остаток}
// ]
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { css } from "@emotion/css";

export default function TableComponent({ table }) {
    const headerStyle = {
        fontWeight: "bold",
        color: "white",
        borderColor: "#ffffff20",
    };
    const elementStyle = {
        color: "#f1f1f1ff",
        borderColor: "#ffffff20",
    };

    const rd = css`
        background-color: red;
    `;

    return (
        <main>
            <TableContainer
                sx={{
                    width: "max-content",
                    background: "rgba(0, 0, 0, 0.1)",
                    borderRadius: "16px",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10px)",
                    "-webkit-backdrop-filter": "blur(10px)",
                }}
                component={Paper}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={headerStyle}>Дата платежа</TableCell>
                            <TableCell sx={headerStyle}>Сумма</TableCell>
                            <TableCell sx={headerStyle}>
                                Основной долг
                            </TableCell>
                            <TableCell sx={headerStyle}>
                                Начисленные проценты
                            </TableCell>
                            <TableCell sx={headerStyle}>Остаток</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {table.map((row, index) => (
                            <TableRow
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                                key={index}
                            >
                                <TableCell sx={elementStyle}>
                                    {row.date}
                                </TableCell>
                                <TableCell sx={elementStyle}>
                                    {row.sum}
                                </TableCell>
                                <TableCell sx={elementStyle}>
                                    {row.main_debt}
                                </TableCell>
                                <TableCell sx={elementStyle}>
                                    {row.percent}
                                </TableCell>
                                <TableCell sx={elementStyle}>
                                    {row.remain}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </main>
    );
}
