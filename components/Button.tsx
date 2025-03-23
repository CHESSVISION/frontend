import React from "react";

interface ButtonProps {
    name: string;
    command: () => void;
}

const Button: React.FC<ButtonProps> = ({ name, command }: ButtonProps) => {/**/
    const className = "rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm h-10 px-4"

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
