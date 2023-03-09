import React, { useState } from "react";
// import Exam from "./Exam"
import Personal from "./component/Personal";
import { Routes, Route } from "react-router-dom";
import Datas from "./component/Data";
import Nav from "./component/Nav";

function App() {
    const [data, setData] = useState("");

    const getData = (e) => {
        setData(e.target.value);
    }
    return (
        <>
            <Nav />
            <h1>select the form</h1>
            <label htmlFor="selectform">selectform:</label>&nbsp;&nbsp;
            <select value={data} onChange={getData}>
                <option>selectForm</option>
                <option>personal</option>
                <option>bussiness</option>
            </select><br /><br /><br />



            <Routes>
                <Route path="/" element={data ? <Personal /> : ""} />
                <Route path="/data" element={<Datas />} />
            </Routes>
        </>
    )
}

export default App