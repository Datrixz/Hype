import { useState } from "react";

function App() {
  const [input, setInput] = useState(""); //to store input box value
  const [output, setOutput] = useState([]); //to store the character count in

  // OnSubmit function for Form
  const display = (e) => {
    setOutput([]);                //initialize output as empty on each click
    const charArr = [...input];  //Array of chracters from string
    const count = {};           //Object to store {char : count} pair

    // Iterating through "charArr" and storing count values in "count" object
    charArr.map((element) => {
      if (
        (element >= "A" && element <= "Z") ||
        (element >= "a" && element <= "z")
      ) {
        element = element.toUpperCase();

        if (count[element]) {
          count[element] += 1;
        } else {
          count[element] = 1;
        }
      }
    });

    // Seperating Keys and Values and storing in individual array
    const keys = Object.keys(count);
    const values = Object.values(count);

    // storing key and values pair in seperate array for displaying data.
    let temp = "";
    let temArr = [];
    for (let i = 0; i < keys.length; i++) {
      temp = `${keys[i]}-${values[i]}`;
      temArr = [...temArr, temp];
      console.log(temArr);
    }

    //Finally setting the "output = temporary array"
    setOutput(temArr);

    //Prevent default behaviour of refreshing  page on submission
    e.preventDefault();
  };

  return (
      <div className="flex justify-center items-center h-screen w-screen p-6">
        <div className="min-h-[80vh] border w-[80vw] bg-slate-200 rounded-3xl shadow-lg flex flex-col p-6">
          <div className="text-4xl font-medium text-center">
            <h1>Character Counter</h1>
          </div>
          <form onSubmit={display}>
            <textarea
              type="text"
              name="input"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="placeholder:text-slate-400 outline-none rounded-md my-8 text-xl outline outline-1 outline-stone-400 p-2 w-full resize-none"
              rows={3}
              placeholder="Type your text here..."
            />
            <br />
            <button
              type="submit"
              className="bg-blue-400 px-4 py-2 rounded-lg drop-shadow-md text-white shadow-blue-400 font-bold hover:bg-blue-500 active:bg-blue-800 active:drop-shadow-none"
            >
              Submit
            </button>
          </form>
          <hr className="my-6" />
          <h2 className="text-3xl mb-6">Result:</h2>
          <div id="output-area" className="flex-1 break-words overflow-y-auto">
            {output.map((e, i) => {
              return (
                <div key={i}>
                  <h1>{e}</h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
  );
}

export default App;
