import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(15);
  const [password, setPassword] = useState("");
  const [numberAllow, setNumberAllow] = useState(true);
  const [characterAllow, setCharacterAllow] = useState(true);
  let btnRef = useRef();

  // Generating Random Password
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) str += "1234567890";
    if (characterAllow) str += "~!@#$%^&*()_+{}|:<>?/";

    for (let i = 1; i <= length; i++) {
      let random = Math.floor(Math.random() * str.length);
      pass += str[random];
    }
    setPassword(pass);
  }, [numberAllow, characterAllow, length]);

  // Copying password
  const copyPassword = useCallback(() => {
    btnRef.current.select();
    console.log("rendered");
    navigator.clipboard.writeText(btnRef.current.value);
  }, []);

  // UseEffect hook
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, characterAllow]);

  return (
    <>
      <h1 className="text-4xl font-bold text-white">Generate a</h1>
      <h1 className="text-4xl font-bold text-green-700 my-2">
        Random Password
      </h1>
      <div className="min-w-52 max-w-2xl bg-slate-600 h-40 p-4  mt-10 rounded-lg">
        <div className="flex justify-center items-center bg-white rounded-lg">
          <input
            type="text"
            className="w-full p-3 rounded-lg text-gray-700"
            value={password}
            placeholder="password"
            readOnly
            ref={btnRef}
          />
          <button
            onClick={copyPassword}
            className="bg-blue-950 text-white rounded-lg p-3"
          >
            Copy
          </button>
        </div>
        <div className="flex justify-a items-center flex-wrap mt-4 gap-1 text-orange-600">
          <div>
            <input
              type="range"
              className="cursor-pointer mr-1"
              min={6}
              max={30}
              id="range"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label htmlFor="range">length({length})</label>
          </div>
          <div>
            <input
              className="ml-5"
              type="checkbox"
              id="number"
              checked
              onChange={() => setNumberAllow(!numberAllow)}
            />
            <label className="cursor-pointer pl-1" htmlFor="number">
              Number
            </label>
          </div>
          <div>
            <input
              className="ml-5 cursor-pointer"
              type="checkbox"
              id="character"
              checked
              onChange={() => setCharacterAllow(!characterAllow)}
            />

            <label className="cursor-pointer pl-1" htmlFor="character">
              Character
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
