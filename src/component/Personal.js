import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Datas from "./Data";
function Personal() {
    const editData = useSelector((state) => state.Reducer);
    console.log(editData)
    const callRef = useRef()
    const [name, setName] = useState("");
    const [middlename, setMiddleName] = useState("");
    const [lastname, setLastname] = useState("");
    const [mobilenumber, setMobileNumber] = useState("");
    const [brithDate, setBrithDate] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [bool, setBool] = useState(false);
    const [formData, setFormData] = useState({});
    const [data, setData] = useState([]);
    const [send, setSend] = useState(false);
    const [value, setValue] = useState("");
    const [id, setId] = useState("");
    const [edit, setEidt] = useState(false)

    const getDate = (e) => {
        setBrithDate(e.target.value);
        let BrithDate = new Date(e.target.value);
        let today = new Date();
        let yearAge = (Number(today.getFullYear()) - Number(BrithDate.getFullYear())) - 1;
        let monthAge = 12 - Number(BrithDate.getMonth()) + 1;
        let currenDate = new Date().getDate();
        let bod = BrithDate.getDate();
        let sub = currenDate - bod
        var days = 31 + sub;
        setYear(yearAge);
        setMonth(monthAge);
        setDay(days);
    }

    useEffect(() => {
        let firstname = name.slice(0, 1).toUpperCase() + name.slice(1);
        let middleName = middlename.slice(0, 1).toUpperCase() + middlename.slice(1);
        let lastnames = lastname.slice(0, 1).toUpperCase() + lastname.slice(1);
        callRef.current.value = gender + " " + firstname + " " + middleName + " " + lastnames
    }, [name, middlename, lastname])

    const validation = () => {
        let result = true;
        //name
        if (name === "" && name === null && middlename === "" && middlename === null && lastname === "" && lastname === null && address == "" && address == null) {
            result = false;
            alert("plase fill information name")
        }

        if (parseInt(name)) {
            result = false;
            alert("plase fill character")
        }

        // middlename

        if (parseInt(middlename)) {
            result = false;
            alert("plase fill character")
        }

        // lastname

        if (parseInt(lastname)) {
            result = false;
            alert("plase fill character")
        }


        // // authentication for mobile
        let regex = new RegExp(/(0|91)?[6-9][0-9]{9}/);

        if (mobilenumber.length !== 10) {
            result = false;

            alert("length of the mobile number should be the 10")
        }

        if (!regex.test(mobilenumber) == true) {
            result = false
            alert("plase enter correct mobile number")
        }

        return result;

    }

    const submitData = (e) => {
        e.preventDefault();
        if (validation()) {
            if (edit) {
                fetch(`http://localhost:3000/userData/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        name, middlename, lastname, address, brithDate, mobilenumber
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
            } else {
                let obj = { name, middlename, lastname, brithDate, mobilenumber, address };
                let check = data.filter((item) => {
                    return item.mobilenumber.includes(mobilenumber)
                })
                if (check.length === 0) {
                    fetch("http://localhost:3000/userData", {
                        method: "POST",
                        headers: {
                            "content-Type": "application/json"
                        },
                        body: JSON.stringify(obj)
                    });
                } else {
                    alert("mobile number is alerdy register")

                }

            }

        }
        getData();
    }

    const getData = async () => {
        let response = await fetch("http://localhost:3000/userData")
        let data = await response.json()
        setData(data);
    }

    const search = (e) => {
        let name = e.target.value
        let filter = data.filter((item) => {
            return item.name.includes(name.toLowerCase())
        })
        setData(filter)
    }



    const update = (id) => {
        let find = data.find((item) => {
            return item.id === id
        })
        setName(find.name)
        setMiddleName(find.middlename)
        setLastname(find.lastname)
        setLastname(find.mobilenumber)
        setLastname(find.brithDate)
        setLastname(find.address)
        setId(id);
        setEidt(true)
    }


    return (
        <div className="main_container">
            <div className="from_container">
                <h3 style={{ margin: "5px" }}>personal form</h3>
                <form onSubmit={submitData}>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option>gender</option>
                        <option>Mr.</option>
                        <option>Miss.</option>
                    </select> &nbsp;&nbsp;<br /><br />
                    <label htmlFor="name" >name:</label>&nbsp;&nbsp;

                    <input type="text" value={name} required autoComplete="off" name="name" onChange={(e) => setName(e.target.value)} />&nbsp;&nbsp;<br /><br />

                    <label htmlFor="MiddleName" >MiddleName:</label>&nbsp;&nbsp;

                    <input type="text" value={middlename} required autoComplete="off" name="middleName" onChange={(e) => setMiddleName(e.target.value)} />&nbsp;&nbsp;<br /><br />

                    <label htmlFor="Lastname" >Lastname:</label>&nbsp;&nbsp;

                    <input type="text" value={lastname} required autoComplete="off" name="lastname" onChange={(e) => setLastname(e.target.value)} />&nbsp;&nbsp;<br /><br />

                    <label htmlFor="fullname">fullname:</label>

                    <input type="text" ref={callRef} /><br /><br /><br />

                    <label htmlFor="mobile">mobile number</label>

                    <input type="number" value={mobilenumber} required autoComplete="off" onChange={(e) => setMobileNumber(e.target.value)} /><br /><br />

                    <label htmlFor="age">Brith of date:</label>

                    <input type="date" value={brithDate} required autoComplete="off" onChange={getDate} /><br /><br />
                    <p>year:{year} Month:{month} Day:{day}</p><br /><br />
                    <label htmlFor="address">address:</label><span> <textarea name="address" value={address} onChange={(e) => setAddress(e.target.value)} required cols="50" >plase fill your address...</textarea><br /><br /></span>
                    <button type="submit">{edit ? "update" : "submit"}</button>
                </form>
            </div>
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
                        {data.map((item) => {
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
        </div>
    )

}
export default Personal