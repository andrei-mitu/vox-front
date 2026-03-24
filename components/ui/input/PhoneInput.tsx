'use client';

import {InputHTMLAttributes, useRef} from 'react';
import IntlTelInput from 'intl-tel-input/reactWithUtils';
import 'intl-tel-input/styles';
import type {IntlTelInputRef} from 'intl-tel-input/react';
import {ClassNameProps} from '@/types/interfaces';
import {twMerge} from 'tailwind-merge';
import {IIconProps} from '@/types/components/IIcon';

interface IPhoneInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, ClassNameProps, IIconProps {
    placeholder?: string;
    required?: boolean;
    value?: string;
    isDisabled?: boolean;
    classNameInput?: string;
    initialCountry?: string;
    label?: string
    error?: string
    onChangeNumber?: (number: string) => void;
    onChangeValidity?: (isValid: boolean) => void;
    onChangeCountry?: (country: string) => void;
    // Dropdown options
    countrySearch?: boolean;
    allowDropdown?: boolean;
    separateDialCode?: boolean;
    fixDropdownWidth?: boolean;
    excludeCountries?: string[];
    onlyCountries?: string[];
    // Format options
    formatAsInternational?: boolean;
}

export const PhoneInput = (
    {
        // Basic styling & state props
        className,
        classNameInput,
        isDisabled,
        error,
        label,
        // International Tel Input callbacks
        onChangeNumber,
        onChangeValidity,
        onChangeCountry,
        // Options with sensible defaults
        countrySearch = true,
        allowDropdown = true,
        separateDialCode = false,
        fixDropdownWidth = true,
        formatAsInternational = true,
        // Additional input props (e.g., placeholder, id, value)
        ...props
    }: IPhoneInputProps) => {
    const phoneRef = useRef<IntlTelInputRef>(null);

    // Extract label, error, and id for consistency with our Input component
    const {id} = props as any;

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <div className="flex items-center justify-between">
                    <label htmlFor={id} className="text-sm text-primary">
                        {label}
                    </label>
                    {error && <span className="error text-sm text-red-500">{error}</span>}
                </div>
            )}
            <IntlTelInput
                ref={phoneRef}
                onChangeNumber={onChangeNumber}
                onChangeValidity={onChangeValidity}
                onChangeCountry={onChangeCountry}
                initOptions={{
                    initialCountry: "md",
                    strictMode: true,
                    formatAsYouType: true,
                    nationalMode: !formatAsInternational,
                    formatOnDisplay: true,
                    countrySearch: countrySearch,
                    allowDropdown: allowDropdown,
                    separateDialCode: separateDialCode,
                    fixDropdownWidth: fixDropdownWidth,
                    showFlags: true,
                }}
                inputProps={{
                    ...props,
                    disabled: isDisabled,
                    className: twMerge(
                        "w-full px-4 py-3 rounded-lg text-sm",
                        "bg-accent-muted border border-default",
                        "text-primary placeholder:text-muted",
                        "transition-all duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-accent",
                        "border-none outline-none",
                        classNameInput || ""
                    ),
                }}
            />
        </div>
    );
};
