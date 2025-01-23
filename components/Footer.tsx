import BadgeFooter from "@/components/BadgeFooter";
import BadgeInterface from "@/interfaces/BadgeInterface";
import {all_badge} from "@/data/BadgeData";

export default function Footer() {
    return (
        <footer>
            {all_badge.map((badge: BadgeInterface) => (
                <div key={badge.href}>
                    <BadgeFooter
                        href={badge.href}
                        src={badge.src}
                        alt={badge.alt}
                        text={badge.text}
                    />
                </div>
            ))}
        </footer>
    );
}
