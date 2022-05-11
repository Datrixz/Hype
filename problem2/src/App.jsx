import axios from "axios";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState(false); //Optional feature for loading spinner
  const [names, setNames] = useState([]);

  const add = () => {
    setLoading(true);
    let flag = true;
    let random = 1;
    while (flag) {
      let inrandom = Math.floor(Math.random() * 50) + 1;
      if(names.length===0){break}
      for (let i = 0; i < names.length; i++) {
        if (names[i].id === inrandom) {
          flag = true;
          break;
        } else {
          flag = false;
        }
      }
      random=inrandom
    }
    let temp = {};
    axios
      .get(`https://swapi.dev/api/people/${random}`)
      .then((response) => {
        temp = { id: random, name: response.data.name };
        setNames([...names, temp]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const del = (e) => {
    let delId = e.target.getAttribute("name");
    console.log(delId);
    const newArrTemp = names.filter((item) => {
      return item.id != delId;
    });
    setNames(newArrTemp);
  };

  const loadScr = <div className="text-6xl pt-20">Loading...</div>;

  const display = names.map((e) => {
    return (
      <div
        key={e.id}
        className="p-6 w-screen md:w-[40vw] rounded-md shadow-lg text-left text-lg font-semibold flex md:flex-row flex-col justify-between"
      >
        {e.name}
        <button
          name={e.id}
          onClick={del}
          className="outline-none w-fit self-end border-none bg-red-500 rounded-lg shadow-md px-2 text-white"
        >
          delete
        </button>
      </div>
    );
  });

  return (
    <div className="App">
      <div className="container h-screen w-screen flex flex-col items-center p-4">
        <h1 className="text-4xl font-bold my-4">Add Star Wars Characters:</h1>
        <button
          className="outline-none border-none w-fit bg-blue-500 disabled:bg-gray-400 rounded-lg px-6 py-3 text-white font-bold"
          onClick={add}
          disabled={loading}
        >
          Add Record
        </button>
        {loading ? loadScr : display}
      </div>
    </div>
  );
}

export default App;
