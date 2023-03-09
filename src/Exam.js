// //1

// import React, { useState } from "react";

// function App() {
//   const [value, setValue] = useState("");
//   const getData = (e) => {
//     let num = e.target.value;
//     if (num >= 0) {
//       let final = Math.floor(num)
//       setValue(final)
//     }
//   }
//   let array = value.toString().split("");
//   let length = array.length
//   let total = array.reduce((a, b) => {
//     return Number(a) + Number(b)
//   }, 0)

//   return (
//     <>
//       <h1>Addition</h1>
//       <input type="text" value={value} onChange={getData} />
//       <h1>total:{total}</h1>
//       <h2>length:{length}</h2>
//       <h2>{total % length == 0 ? "it is the golden number" : "it is not gloden number"}</h2>
//     </>
//   )

// }

// export default App


//2


// import React, { useState } from "react";

// function App() {
//   const [arr, setArr] = useState("")

//   const getData = (e) => {
//     let num = e.target.value;
//     if (num >= 0) {
//       let final = Math.floor(num)
//       setArr(final)
//     } else if (!Number(num)) {
//       setArr("")
//     }
//   }
//   let array = arr.toString().split("")
//   let odd = 0
//   let even = 0

//   let calculate = array.forEach((item) => {
//     if (Number(item) == 0) {
//       alert("plase enter number valid number 0")
//     }
//     else if (Number(item) % 2 == 0) {
//       even++
//     } else {
//       odd++
//     }
//   })
//   return (
//     <>
//       <input type="text" value={arr} onChange={getData} />
//       <h1>even:{even}</h1>
//       <h1>odd:{odd}</h1>
//     </>
//   )
// }

// export default App;




//3


// import React, { useState } from "react";

// function App() {
//   const [str, setStr] = useState("");
//   const [arr, setArr] = useState([])
//   let newArr = str.split("")
//   const getData = (e) => {
//     if (Number(e.target.value)) {
//       setStr(e.target.value)
//     } else {
//       alert("this is not the number")
//     }
//   }

//   let unique = newArr.filter((item, index) => {  // remove unique items and sort
//     return newArr.indexOf(item) == index
//   }).sort()
//   let dublicate = newArr.filter((item, index) => { // remove dublicate items
//     return newArr.indexOf(item) !== index
//   })

//   let pushElement = dublicate.forEach((item) => {   // push element at the end
//     unique.push(0)
//   })

//   let updated = []

//   let Authentication = unique.forEach((item) => {    // condition for + and -
//     if (item !== "+" && item !== "-") {
//       updated.push(item)
//     }
//   })

//   let zero = [];
//   let number = []
//   let seprate = updated.forEach((item) => { // separate the array by 0 and non zero element
//     if (item == 0) {
//       zero.push(item)
//     } else {
//       number.push(item)
//     }
//   })
//   let finaleArr = number.concat(zero)  // concate the array

//   return (
//     <>
//       <h1>add the zero at the end</h1>
//       <input type="" onChange={getData} />
//       {
//         finaleArr.map((item) => {
//           return <li>{item}</li>
//         })
//       }
//     </>
//   )

// }

// export default App





// 4:


// import React, { useState } from "react";

// function App() {
//   const [data, setData] = useState("")

//   const Arr = data.split(",")  // split ","


//   let newArr = []  // put iniside the array afeter spliting by "="
//   let splitByequal = Arr.forEach((item) => {
//     newArr.push(item.split("="))
//   });
//   console.log(newArr)

//   let obj = {};
//   let arrs = [];
//   for (let i = 0; i < newArr.length; i++) {
//     for (let j = 0; j < newArr[i].length - 1; j++) {
//       if (!obj[newArr[i][j]]) {
//         obj[newArr[i][j]] = Number(newArr[i][j + 1]) // assign element as an properties of object.
//       } else {
//         obj[newArr[i][j]] += Number(newArr[i][j + 1]) // if element alredy present then add 1
//       }
//     }
//   }
//   console.log(obj)
//   for (let i = 0; i < newArr.length; i++) {
//     for (let j = 0; j < newArr[i].length - 1; j++) {
//       if (!Number(newArr[i][j])) {
//         arrs.push(newArr[i][j])
//       }
//     }
//   }
//   console.log(arrs);
//   let lengthObj = arrs.reduce((a, b) => {
//     if (!a[b]) {
//       a[b] = 1
//     } else {
//       a[b] += 1
//     }
//     return a
//   }, {});   // calculate how many time element are repeated

//   console.log(lengthObj)

//   for (let key in obj) {
//     for (let keys in lengthObj) {
//       if (key == keys) {
//         obj[key] = (Number(obj[key] / lengthObj[keys])) // calculate the avrage and assign to object
//       }
//     }
//   }

//   let finaleArray = Object.entries(obj);  // convert to the object into the array

//   return (
//     <>
//       <input type="text" onChange={(e) => setData(e.target.value)} /><br />
//       {
//         finaleArray.map((item, i) => {
//           return <p key={i}>{`${item}`}</p>
//         })
//       }
//     </>
//   )


// }

// export default App;



// find the occuerences;

// import React, { useState } from "react";


// function App() {
//   const [data, setData] = useState("")
//   const array = data.split("");
//   const getData = (e) => {
//     if (Number(e.target.value)) {
//       setData(e.target.value)
//     } else if (e.target.value == ".") {
//       alert("plase Enter valid number")
//     } else {
//       setData("")
//     }
//   }

//   let arr = [];

//   for (let i = 0; i < array.length; i++) {
//     for (let j = 0; j < array.length; j++) {
//       for (let k = 0; k < array.length; k++) {
//         if (Number(array[j]) + Number(array[k]) === array[i]) {
//           arr.push([array[j], array[k]])
//         }
//       }
//     }
//   }

//   console.log(arr)

//   return (
//     <>
//       <input type="text" value={data} onChange={getData} />
//     </>
//   )

// }

// export default App