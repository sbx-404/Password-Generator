import { useState, useCallback, useEffect, useRef } from "react";

export default function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");

  // useRef Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "~!@#$%^&*()_+`/.,<>;:[]{}";
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      console.log(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // copy Button
  const copyToClipBoard = () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,50);
    window.navigator.clipboard.writeText(password);
  };

  // action in input field the function will call itself again

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 my-8 text-black-500 bg-gray-800">
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password" 
             ref={passwordRef}
             readOnly
          />
          <button
            className="outline-none bg-blue-700 text-white px-3  py-0.5 shrink-0"
            onClick={copyToClipBoard}
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2 text-orange-500">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              value={length}
              min={8}
              max={50}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
            />
            <label>length : {length}</label>

            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label htmlFor="numberInput">Number</label>
            </div>

            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="CharacterInput"
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label htmlFor="CharacterInput">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
