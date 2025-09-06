import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContentComponent from "./components/ContentComponent/ContentComponent";
import { useEffect, useState } from "react";
import getData from "./functions/getData";
import LoginPage from "./components/LoginPage/LoginPage";
import login from "./functions/login";

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

        login({ mail: "farskurinyjesin@gmail.com", password: "123" });
    }, []);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <main>
                            {!isLoading && (
                                <ContentComponent data={data} currency={"$"} />
                            )}
                        </main>
                    }
                ></Route>
                <Route path="/login" element={<LoginPage></LoginPage>}></Route>

                <Route path="*" element={<h1>404. Not found</h1>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
