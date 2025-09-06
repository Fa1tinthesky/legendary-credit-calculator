import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormComponent from "./components/FormComponent/FormComponent";

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <main>
                            <FormComponent></FormComponent>
                        </main>
                    }
                ></Route>
                <Route path="*" element={<h1>404. Not found</h1>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
