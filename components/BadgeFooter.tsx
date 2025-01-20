import {Badge} from "@/data/badge";
import Image from "next/image";
import React from "react";

const BadgeFooter: React.FC<Badge> = ({href, src, alt, text}) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <Image src={src} alt={alt} width={16} height={16}/>
            {text}
        </a>
    );
}

export default BadgeFooter;
