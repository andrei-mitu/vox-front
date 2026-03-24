import {IconBaseProps} from 'react-icons';
import {FC, ReactNode} from "react";

/**
 * Supported icon libraries from react-icons
 * Easily extensible - just add new library strings here
 */
export type IconLibrary =
    'fa6'
    | 'md'
    | 'ai'
    | 'bs'
    | 'bi'
    | 'cg'
    | 'di'
    | 'fc'
    | 'fi'
    | 'go'
    | 'gr'
    | 'hi'
    | 'hi2'
    | 'im'
    | 'iot'
    | 'pi'
    | 'ri'
    | 'si'
    | 'sl'
    | 'tb'
    | 'tfi'
    | 'ti'
    | 'vsc'
    | 'wi'
    | 'io';

/**
 * Configuration object for dynamically loaded icons
 * Used when icon data comes from API or backend
 */
export interface IconConfig {
    library: IconLibrary;
    iconName: string;
}

/**
 * Props for the dynamic Icon component
 * Extends react-icons IconBaseProps for full customization
 */
export interface IIcon extends IconConfig, IconBaseProps {
    /**
     * Fallback element to show if icon fails to load
     * Can be a React component or null
     */
    fallback?: ReactNode;
}

/**
 * Type for dynamically imported icon components
 */
export type IconComponent = FC<IconBaseProps> | undefined;

export interface IIconProps {
    icon?: IconConfig;
    iconPosition?: 'left' | 'right';
    iconSize?: number;
}