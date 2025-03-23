import BadgeFooter from "@/components/BadgeFooter";
import BadgeInterface from "@/interfaces/BadgeInterface";
import { all_badge } from "@/data/BadgeData";

export default function Footer() {
    return (
        <footer className="w-full bg-[#1A1A1A] border-t border-gray-700 py-6 mt-auto">
            <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center items-center gap-4">
                {all_badge.map((badge: BadgeInterface) => (
                    <BadgeFooter
                        key={badge.href}
                        href={badge.href}
                        src={badge.src}
                        alt={badge.alt}
                        text={badge.text}
                    />
                ))}
            </div>
        </footer>
    );
}
