import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

function Home() {

    let callRef = useRef();
    const [gender, setGender] = useState("");
    const [fromData, setFromData] = useState({});
    const [bool, setBool] = useState(false);
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [id, setId] = useState("");
    const [value, setValue] = useState("");
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState([]);
    const [send, setSend] = useState(false);


    const getDate = (e) => {
        let name = e.target.name
        setFromData((old) => { return { ...old, [name]: e.target.value } });
        setBool(true);
    }

    // get the form data
    const getFromData = (e) => {
        let name = e.target.name;
        setFromData((old) => { return { ...old, [name]: e.target.value } });
    }

    useEffect(() => {
        if (bool) {
            let brithDate = new Date(fromData.brithDate);
            let today = new Date();
            let yearAge = (Number(today.getFullYear()) - Number(brithDate.getFullYear())) - 1;
            let monthAge = 12 - Number(brithDate.getMonth()) + 1;
            let currenDate = new Date().getDate();
            let bod = brithDate.getDate();
            let sub = currenDate - bod
            var days = 31 + sub;
            setYear(yearAge);
            setMonth(monthAge);
            setDay(days);
        }
    }, [bool]);

    const submitData = (e) => {
        e.preventDefault();
        console.log(fromData.name)
        let regex = new RegExp(/(0|91)?[6-9][0-9]{9}/);

        if (fromData.name && fromData.middleName && fromData.lastname && fromData.address && fromData.brithDate) {
            // Return true if the mobile_number
            // matched the ReGex
            fetch("http://localhost:3000/userData", {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(fromData)
            });
        } else {
            alert("plase fill data")
        }
        setSend(true);
    }

    const getData = async () => {
        let response = await fetch("http://localhost:3000/useData");
        let data = await response.json()
        setData(data);
    }

    useEffect(() => {
        getData()
    }, [send]);


    const update = (id) => {
        let find = data.find((item) => {
            return item.id == id
        });
        setFromData(find);
        setId(find.id);
        setEdit(true)
    }

    const search = (e) => {
        setValue(e.target.value);
        let arr = ["name", "lastname", "middlename"];
        let searching = data.filter((item) => {
            return item.name.includes(e.target.value);
        })
        setData(searching)
    }

    const updatedData = () => {
        fetch(`http://localhost:3000/userData/${id}`, {
            method: "PATCH",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(fromData)
        });
        setEdit(!edit)
    }
    return (
        <div className="container">
            <div className="formcontainer">
                <form onSubmit={submitData}>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option>gender</option>
                        <option>Mr.</option>
                        <option>Miss.</option>
                    </select> &nbsp;&nbsp;
                    <label htmlFor="name" >name:</label>&nbsp;&nbsp;
                    <input type="text" name="name" autoComplete="off" required value={fromData.name} onChange={getFromData} />&nbsp;&nbsp;
                    <label htmlFor="MiddleName" >MiddleName:</label>&nbsp;&nbsp;
                    <input type="text" required autoComplete="off" name="middleName" value={fromData.middleName} onChange={getFromData} />&nbsp;&nbsp;
                    <label htmlFor="Lastname" >Lastname:</label>&nbsp;&nbsp;
                    <input type="text" required autoComplete="off" name="lastname" value={fromData.lastname} onChange={getFromData} />&nbsp;&nbsp;<br /><br />
                    <label htmlFor="fullname">fullname:</label>
                    <input type="text" ref={callRef} /><br /><br /><br />
                    <label htmlFor="mobile">mobile number</label>
                    <input type="number" name="mobileNumber" value={fromData.mobileNumber} onChange={getFromData} required autoCapitalize="off" /><br /><br />
                    <label htmlFor="age">Brith of date:</label>
                    <input type="date" name="brithDate" value={fromData.brithDate} required onChange={getDate} /><br /><br />
                    <p>year:{year} Month:{month} Day:{day}</p><br /><br />
                    <textarea name="address" value={fromData.address} required onChange={getFromData} cols="50" >plase fill your address...</textarea><br /><br />
                    <button type="submit">{edit ? <button onClick={updatedData}>update</button> : "submit"}</button><br /><br />
                </form>

            </div>
            {    // Tab button event
                window.addEventListener("keydown", (e) => {
                    if (e.key === "Tab") {
                        let fname = fromData.name;
                        let Mname = fromData.middleName;
                        let Lname = fromData.lastname;
                        let firstname = fname.slice(0, 1).toUpperCase() + fname.slice(1);
                        let middleName = Mname.slice(0, 1).toUpperCase() + Mname.slice(1);
                        let lastname = Lname.slice(0, 1).toUpperCase() + Lname.slice(1);
                        callRef.current.value = gender + " " + firstname + " " + middleName + " " + lastname;
                    };
                })}
            <div className="dataContainer">

                <input type="serach" value={value} onChange={search} />
                <table className="table" border={1} style={{ borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>MiddleName</th>
                            <th>Lastname</th>
                            <th>BrithDate</th>
                            <th>address</th>
                            <th>edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? data.map((item) => {
                            const { name, brithDate, middleName, lastname, address, id } = item;
                            return <tr key={id}>
                                <td>{name}</td>
                                <td>{middleName}</td>
                                <td>{lastname}</td>
                                <td>{brithDate}</td>
                                <td>{address}</td>
                                <button onClick={() => update(id)}>edit</button>
                            </tr>
                        }) : ""}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;






// nst [name, setName] = useState(fromData.name);
// const [middlename, setMiddlename] = useState(fromData.middleName);
// const [lastname, setLastName] = useState(fromData.lastname);
// const [mobileNumber, setMobileNumber] = useState(fromData.mobileNumber);
// const [address,setAddress] =useState(fromData.address);
// const[brithDate,setBrithDate] =



