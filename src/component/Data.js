import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actionData } from "../services/Action/Action";

function Datas() {
    const dispatch = useDispatch()
    const [datas, setDatas] = useState([]);
    const getData = async function () {
        let response = await fetch("http://localhost:3000/userData");
        let data = await response.json();
        console.log("data", data);
        setDatas(data)
    }

    useEffect(() => {
        getData()
    }, [])

    const search = () => { }

    const update = (id) => {
        let find = datas.find((item) => {
            return item.id === id
        })
        console.log(find)
        dispatch(actionData(find))
    }
    return (
        <>
            <div className="data_container">
                <input type="search" placeholder="search..." onChange={search} />
                <table border={1} style={{ borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>middleName</th>
                            <th>lastname</th>
                            <th>BrithDate</th>
                            <th>mobileNumber</th>
                            <th>address</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((item) => {
                            let { name, middlename, lastname, brithDate, mobilenumber, address, id } = item;
                            return <tr key={id}>
                                <td>{name}</td>
                                <td>{middlename}</td>
                                <td>{lastname}</td>
                                <td>{brithDate}</td>
                                <td>{mobilenumber}</td>
                                <td>{address}</td>
                                <td><button onClick={() => update(id)}>Edit</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Datas