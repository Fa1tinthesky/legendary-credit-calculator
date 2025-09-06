import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContentComponent from "./components/ContentComponent/ContentComponent";
import { useEffect, useState } from "react";

function getData(setData, setIsLoading, body) {
    setIsLoading(true);
    fetch("http://10.192.9.134:8080/api/calculate", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    })
        .then((resp) => {
            return resp.json();
        })
        .then((response) => {
            let newResponse = {
                ...response,
                table: response.table.map((item) => {
                    return { ...item, date: item.date.slice(0, 10) };
                }),
            };
            setData(newResponse);
            setIsLoading(false);
        });
}

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});

    useEffect(() => {
        getData(setData, setIsLoading, {
            sum: 100000,
            currency: 1,
            period: 12,
            rate: 12,
            type: 1,
            start_date: "2025-09-03",
        });
    }, []);

    console.log(data);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <main>
                            {!isLoading && (
                                <ContentComponent
                                    // percentage={17}
                                    // table={table}
                                    currency={"$"}
                                    data={data}
                                ></ContentComponent>
                            )}
                        </main>
                    }
                ></Route>
                <Route path="*" element={<h1>404. Not found</h1>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
