import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, hint, className = '', id, ...props }, ref) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
        const inputClass = `input ${error ? 'input-error' : ''} ${className}`;

        return (
            <div className="input-group">
                {label && (
                    <label htmlFor={inputId} className="input-label">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={inputClass}
                    {...props}
                />
                {hint && !error && (
                    <span className="input-hint">{hint}</span>
                )}
                {error && (
                    <span className="input-error-message">{error}</span>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
