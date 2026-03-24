import {IIconProps} from './IIcon';
import {ClassNameProps} from "@/types/interfaces";
import {AnchorHTMLAttributes, ButtonHTMLAttributes} from "react";

interface IButtonBase extends ClassNameProps, IIconProps {
    variant?: ButtonVariantType
    label?: string;
}

export interface IButton extends IButtonBase, ButtonHTMLAttributes<HTMLButtonElement> {
}

export interface IButtonLink extends IButtonBase, AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
}

export const ButtonVariantEnum = {
    OUTLINE: 'outline',
    DEFAULT: 'default',
    OUTLINE_WHITE: 'outline-white',
    GRAY: 'gray'
} as const;

export type ButtonVariantType = typeof ButtonVariantEnum[keyof typeof ButtonVariantEnum];