import { useEffect, useState } from 'react';
import './app.css';
import { InputBox } from "./components/exportComponents";
import { useCurrencyInfo } from './hooks/useCurrencyInfo';

function App() {

  const [amount, setAmount] = useState<number | null>(null);
  const [from, setFrom] = useState<string>("usd");
  const [to, setTo] = useState<string>("inr");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [dropDown, setDropDown] = useState<boolean>(false);

  const currencyInfo = useCurrencyInfo(from);

  const options = currencyInfo
    ? Object.keys(currencyInfo[from] as Record<string, number> || {})
    : [];


  useEffect(() => {
    console.log("App : ", currencyInfo);
    console.log("options : ", options);
  }, [])


  const swap = () => {
    const tempFrom = from;
    setFrom(to);
    setTo(tempFrom);

    const tempAmount = amount;
    setAmount(convertedAmount);
    setConvertedAmount(tempAmount);
  };

  useEffect(() => {
    if (!currencyInfo) return;

    const rates = currencyInfo[from] as Record<string, number>;
    const rate = rates?.[to];

    if (rate && amount !== null) {
      setConvertedAmount(amount * rate);
    };
  }, [amount, from, to, currencyInfo]);

  return (
    <div className='w-full min-h-screen flex justify-center items-center' style={{ backgroundImage: "url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>

      <div className='flex flex-col relative z-10 justify-center items-center p-4 gap-4 rounded-2xl border-white border-2 bg-white/2 backdrop-blur-3xl shadow-lg w-2/5'>
        <div className='relative flex flex-col justify-center items-center gap-2 w-full'>
          <InputBox
            lable="From"
            amount={amount}
            onAmountChange={setAmount}
            currentOptions={options}
            selectCurrency={from}
            onCurrencyChange={setFrom}
            className=''
            amountDisable={false}
            currencyDisable={false}
          />
          <button className='cursor-pointer absolute top-1/2 left-1/2 -translate-1/2 border-3 border-white rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors duration-200 ease-in-out text-white px-2 py-1' onClick={swap}>
            swap
          </button>
          <InputBox
            lable="To"
            amount={convertedAmount}
            onAmountChange={setConvertedAmount}
            currentOptions={options}
            selectCurrency={to}
            onCurrencyChange={setTo}
            className=''
            amountDisable={false}
            currencyDisable={false}
          />
        </div>
        <button className='text-lg z-[inherit] w-full py-4 rounded-2xl text-white cursor-pointer bg-blue-600 hover:bg-blue-700 transition-colors duration-200 ease-in-out'
        onClick={() => amount && convertedAmount ? setDropDown(x => !x) : setDropDown(x => x)}
        >
          Convert {from.toUpperCase()} to {to.toUpperCase()}
        </button>

        <div className={`absolute py-2 px-8 bg-orange-800 rounded-2xl transition-all ease-in-out duration-250 flex justify-center items-center bottom-0 z-0 ${dropDown ? "opacity-100 translate-y-[120%]" : "opacity-0"}`}>
          <span className='text-white text-3xl'>{amount} {from.toUpperCase()} is {convertedAmount} {to.toUpperCase()}</span>
        </div>
      </div>
    </div>
  )
}

export default App
