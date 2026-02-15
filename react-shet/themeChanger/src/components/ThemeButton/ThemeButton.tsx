import useTheme from "../../context/theme";

const ThemeButton = () => {

  const { themeMode, darkTheme, lightTheme } = useTheme();
  const onChange = (e: any) => {
    const isLightTheme = e.currentTarget.checked;
    if (isLightTheme) {
      lightTheme();
    } else {
      darkTheme();
    }
  };

  return (
    <label className="absolute top-2 right-2 cursor-pointer flex items-center gap-2">

      <input
        type="checkbox"
        className="sr-only peer"
        onChange={onChange}
        checked={themeMode === "light"}
      />

      <div className="relative w-11 h-6 bg-gray-200 rounded-full 
    peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
    dark:peer-focus:ring-blue-800 dark:bg-gray-700 
    peer-checked:bg-blue-600
    after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
    after:bg-white after:border after:rounded-full after:h-5 after:w-5 
    after:transition-all 
    peer-checked:after:translate-x-full">
      </div>

      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
        Toggle Theme
      </span>

    </label>
  );

};

export default ThemeButton;
