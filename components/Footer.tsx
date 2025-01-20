import {Badge, all_badge} from "@/data/badge";
import BadgeFooter from "@/components/BadgeFooter";

export default function Footer() {
    return (
        <footer>
            {all_badge.map((badge: Badge) => (
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
