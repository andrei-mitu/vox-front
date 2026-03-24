import {ClassNameProps} from "@/types/interfaces";

export interface IFooterGroup extends ClassNameProps{
    title: string;
    links: {
        label: string;
        href: string;
    }[];
}