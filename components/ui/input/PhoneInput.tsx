'use client';

import {InputHTMLAttributes, useRef} from 'react';
import IntlTelInput from 'intl-tel-input/reactWithUtils';
import 'intl-tel-input/styles';
import type {IntlTelInputRef} from 'intl-tel-input/react';
import {ClassNameProps} from '@/types/interfaces';
import {twMerge} from 'tailwind-merge';
import {IIconProps} from '@/types/components/IIcon';
import {tw} from "@/lib/utils/tw";

interface IPhoneInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, ClassNameProps, IIconProps {
    placeholder?: string;
    required?: boolean;
    value?: string;
    isDisabled?: boolean;
    classNameInput?: string;
    initialCountry?: string;
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
        className,
        classNameInput,
        isDisabled,
        onChangeNumber,
        onChangeValidity,
        onChangeCountry,
        countrySearch = true,
        allowDropdown = true,
        separateDialCode = false,
        fixDropdownWidth = true,
        formatAsInternational = true,
        ...props
    }: IPhoneInputProps) => {
    const phoneRef = useRef<IntlTelInputRef>(null);

    return (
        <div className='w-full'>
            <label className='block'>
                <div
                    className={tw(
                        isDisabled ? 'bg-gray-50 opacity-50 cursor-not-allowed' : '',
                        className || ''
                    )}
                >
                    <div className='flex-1'>
                        <IntlTelInput
                            ref={phoneRef}
                            onChangeNumber={onChangeNumber}
                            onChangeValidity={onChangeValidity}
                            onChangeCountry={onChangeCountry}
                            initOptions={{
                                initialCountry: 'gb',
                                strictMode: true,
                                formatAsYouType: true,
                                nationalMode: !formatAsInternational,
                                formatOnDisplay: true,
                                countrySearch: countrySearch,
                                allowDropdown: allowDropdown,
                                separateDialCode: separateDialCode,
                                fixDropdownWidth: fixDropdownWidth,
                                showFlags: true
                            }}
                            inputProps={{
                                ...props,
                                disabled: isDisabled,
                                className: twMerge(
                                    'border-none outline-none w-full bg-transparent text-sm',
                                    classNameInput || ''
                                ),
                            }}
                        />
                    </div>
                </div>
            </label>
        </div>
    );
};
