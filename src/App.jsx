import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TableComponent from "./components/TableComponent";

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <TableComponent
                            table={[
                                {
                                    date: "Март, 2025",
                                    sum: 14977.23,
                                    main_debt: 10477.23,
                                    percent: 4500.0,
                                    remain: 289522.77,
                                },
                                {
                                    date: "Март, 2025",
                                    sum: 14977.23,
                                    main_debt: 10477.23,
                                    percent: 4500.0,
                                    remain: 289522.77,
                                },
                                {
                                    date: "Март, 2025",
                                    sum: 14977.23,
                                    main_debt: 10477.23,
                                    percent: 4500.0,
                                    remain: 289522.77,
                                },
                                {
                                    date: "Март, 2025",
                                    sum: 14977.23,
                                    main_debt: 10477.23,
                                    percent: 4500.0,
                                    remain: 289522.77,
                                },
                            ]}
                        />
                    }
                ></Route>
                <Route path="*" element={<h1>404. Not found</h1>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
