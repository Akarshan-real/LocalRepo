import { useCallback, useEffect, useRef, useState } from 'react';
import './app.css';

function App() {
  const [passLength, setPassLength] = useState<number>(8);
  const [numAllowed, setNumAllowed] = useState<boolean>(false);
  const [charAllowed, setCharAllowed] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const passRef = useRef<HTMLInputElement>(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) {
      str += "0123456789";
    };

    if (charAllowed) {
      str += "!@#$%^&*()_+";
    };

    for (let i = 0; i < passLength; i++) {
      pass += str[Math.floor(Math.random() * str.length + 1)];
    };

    setPassword(pass);

  }, [passLength, numAllowed, charAllowed, setPassword]);

  const copyToClipboard = () : void => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0,passLength);
    window.navigator.clipboard.writeText(passRef.current?.value || password);
  };

  useEffect(() => {
    passwordGenerator();
  }, [charAllowed , numAllowed , passLength]);

  return (
    <div className='w-full mid h-screen bg-black'>
      <div className='mx-auto py-10 px-4 rounded-lg bg-slate-800 outline outline-white shadow-black w-2/5 flex items-center justify-evenly flex-col'>
        <h1 className='text-white tracking-tight text-7xl font-semibold'>Password Generator</h1>
        <form className='my-5 w-2/3 flex'>
          <input
            type="text"
            value={password}
            placeholder='Generated password'
            readOnly
            ref={passRef}
            className='rounded-l-2xl border-2 border-r px-4 text-2xl py-1 text-white border-black focus:outline-0 flex-1'
          />
          <button type="button" onClick={copyToClipboard} className='text-2xl flex justify-center items-center rounded-r-2xl border-black bg-green-500 border-2 border-l px-4 py-1 cursor-pointer hover:bg-green-400 transition-colors ease-in-out duration-150 text-white font-light'><span>Copy</span></button>
        </form>
        <div className='mid gap-8'>
          <span className='mid gap-1'>
            <span className='text-white text-lg'>Length : </span>
            <span className='mid h-full'><input className='cursor-pointer' type="range" max={24} value={password.length} min={6} onChange={(e) => setPassLength(Number(e.target.value))} /></span>
            <span className='text-white text-lg'>{passLength}</span>
          </span>
          <span className='mid gap-2'>
            <input className='w-4 h-4 cursor-pointer' type="checkbox" onChange={() => setCharAllowed(x => !x)} />
            <label className='text-white'>Characters ?</label>
          </span>
          <span className='mid gap-2'>
            <input className='w-4 h-4 cursor-pointer' type="checkbox" onChange={() => setNumAllowed(x => !x)} />
            <label className='text-white'>Numbers ?</label>
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
