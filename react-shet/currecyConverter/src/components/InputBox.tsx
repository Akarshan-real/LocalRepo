import { useEffect, useId } from "react";

type erroFix = {
  ["lable"]: string,
  ["amount"]: number | null,
  ["onAmountChange"]: (e: number) => void,
  ["onCurrencyChange"]: (e: string) => void,
  ['currentOptions']: string[],
  ['selectCurrency']: string,
  ['className']: string
  ['amountDisable']: boolean,
  ['currencyDisable']: boolean,
};

const InputBox = ({
  lable,
  amount,
  onAmountChange,
  onCurrencyChange,
  currentOptions = [],
  selectCurrency = "usd",
  className = "",
  amountDisable = false,
  currencyDisable = false,
}: erroFix) => {

  const amountInputId = useId();

  useEffect(() => {
    console.log("InputBox : ", currentOptions);
  }, []);


  return (
    <div className={`bg-white p-3 w-full rounded-2xl flex justify-between items-center ${className}`}>
      <div className="flex gap-2 flex-col justify-center">
        <label className="px-2" htmlFor={amountInputId}>{lable}</label>
        <input
          className="border-gray-400 border px-2 bg-blue-100 hover:bg-blue-200 transition-colors duration-150 ease-in-out rounded-sm py-1"
          id={amountInputId}
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount || ''}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-col justify-center gap-2 px-2">
        <label>Currency type</label>
        <select className="min-w-fit self-end w-fit px-1 py-0.5 bg-gray-100 outline-[0.5px] outline-gray-800 rounded-sm cursor-pointer hover:bg-gray-300 hover:scale-[1.1] transition-all ease-in-out duration-150"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currentOptions.map((_currency, index) => (
            <option className="min-w-fit cursor-pointer" key={index} value={_currency}>
              {_currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default InputBox
