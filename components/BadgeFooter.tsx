import Image from "next/image";
import React from "react";
import BadgeInterface from "@/interfaces/BadgeInterface";

const BadgeFooter: React.FC<BadgeInterface> = ({href, src, alt, text}) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Image src={src} alt={alt} width={16} height={16}/>
            {text}
        </a>
    );
}

export default BadgeFooter;
