import type { ReactNode , ButtonHTMLAttributes} from "react";

type ButtonType = {
    children ?: ReactNode | string,
    type ?: "button" | "submit" | "reset",
    bgColor ?: string,
    textColor ?: string,
    className ?: string,
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
} : ButtonType) => {
    return (
        <button className={`px-4 py-2 rounded-lg  ${className} ${textColor} ${bgColor}`} {...props}>
            {children}
        </button>
    )
};

export default Button;
