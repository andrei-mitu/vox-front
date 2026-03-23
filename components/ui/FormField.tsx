import { type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

interface BaseProps {
    label: string;
    id: string;
}

type InputProps = BaseProps & { multiline?: false } & InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = BaseProps & { multiline: true; rows?: number } & TextareaHTMLAttributes<HTMLTextAreaElement>;

type FormFieldProps = InputProps | TextareaProps;

export function FormField(props: FormFieldProps) {
    const { label, id, multiline, ...rest } = props;

    return (
        <div>
            <label htmlFor={id} className="block text-sm mb-2" style={{ color: 'var(--login-text)' }}>
                {label}
            </label>
            {multiline ? (
                <textarea
                    id={id}
                    className="login-input resize-none"
                    {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                />
            ) : (
                <input
                    id={id}
                    className="login-input"
                    {...(rest as InputHTMLAttributes<HTMLInputElement>)}
                />
            )}
        </div>
    );
}