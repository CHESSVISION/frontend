import Image from "next/image";
import React from "react";
import BadgeInterface from "@/interfaces/BadgeInterface";

const BadgeFooter: React.FC<BadgeInterface> = ({ href, src, alt, text }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
            <Image
                src={src}
                alt={alt}
                width={18}
                height={18}
                className="object-contain filter invert"
            />
            <span className="text-sm">{text}</span>
        </a>
    );
};

export default BadgeFooter;
