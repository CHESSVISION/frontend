export interface Badge{
    href: string;
    src: string;
    alt: string;
    text: string;
}

export const all_badge: Badge[] = [
    {
        href: "https://github.com/CHESSVISION/",
        src: "/github.svg",
        alt: "Github",
        text: "Github"
    },
    {
        href: "https://www.instagram.com/kuisskui",
        src: "/person.svg",
        alt: "kuisskui Instagram",
        text: "kuisskui"
    },
    {
        href: "https://www.instagram.com/banana._.zzz/",
        src: "/person.svg",
        alt: "banana._.zzz Instagram",
        text: "bananaz"
    }
    // Add more badges here as needed
];