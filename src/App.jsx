import React, { useCallback, useEffect, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [isNumIncluded, setIsNumIncluded] = useState(false);
  const [isCharIncluded, setisCharIncluded] = useState(false);
  const [copy, setCopy] = useState("Copy");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumIncluded) str += "0123456789";
    if (isCharIncluded) str += ":;!@#$%^&*()[]{}|/><";
    for (let i = 1; i <= length; i++) {
      let rndm = Math.floor(Math.random() * str.length);
      pass += str.charAt(rndm);

      setPassword(pass);
    }
  }, [length, isNumIncluded, isCharIncluded]);

  const copyToClipBoard = () => {
    window.navigator.clipboard.writeText(password);
    setCopy("Copied");
  };

  useEffect(() => {
    setCopy("Copy");
  }, [password]);

  return (
    <div className="w-full h-screen bg-zinc-900 flex justify-center items-center">
      <div className="main flex justify-center items-center flex-col bg-slate-700 w-2/3 rounded-md min-h-28 py-9">
        <h1 className="font-semibold text-white text-2xl m-5">
          Password Generator
        </h1>

        <div className="w-2/3 h-10 rounded-s-md rounded-e-md bg-slate-300 flex">
          <input
            type="text"
            id="passId"
            className="rounded-s-md h-full w-4/5 outline-none text-xl p-2"
            readOnly
            value={password}
            placeholder="Password"
          />
          <button
            className="rounded-e-md hover:bg-blue-800 transition-all w-1/5 h-full bg-blue-500 text-white font-semibold text-xl"
            onClick={copyToClipBoard}
          >
            {copy}
          </button>
        </div>

        <div className="inputs w-full h-20 flex justify-center items-center gap-5">
          <div className="flex gap-1">
            <input
              type="range"
              min={6}
              max={30}
              defaultValue={8}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
              id="inpt1"
            />
            <label className="text-white " htmlFor="inpt1">
              Length {length}
            </label>
          </div>

          <div className="flex gap-1">
            <input
              type="checkbox"
              onChange={() => setIsNumIncluded((prev) => !prev)}
              defaultChecked={isNumIncluded}
              id="inpt2"
              className="cursor-pointer"
            />
            <label htmlFor="inpt2" className="text-white">
              Include Numbers
            </label>
          </div>

          <div className="flex gap-1">
            <input
              type="checkbox"
              defaultChecked={isCharIncluded}
              onChange={() => setisCharIncluded((prev) => !prev)}
              id="inpt3"
              className="cursor-pointer"
            />
            <label htmlFor="inpt3" className="text-white">
              Include Characters
            </label>
          </div>
        </div>

        <button
          onClick={passwordGenerator}
          className="bg-slate-900 text-white px-10 py-4 rounded-md text-lg font-semibold border transition-all active:border-white border-slate-700"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
