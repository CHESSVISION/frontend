import React from "react";

interface ButtonProps {
    name: string;
    command: () => void;
}

const Button: React.FC<ButtonProps> = ({name, command}: ButtonProps) => {/**/
    const className = "rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"

    return (
        <div>
            <button
                className={className}
                onClick={command}
            >
                {name}
            </button>
        </div>
    );
}

export default Button;
