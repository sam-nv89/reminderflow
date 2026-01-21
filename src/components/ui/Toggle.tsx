import React from 'react';

interface ToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    id?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
    checked,
    onChange,
    label,
    disabled = false,
    id,
}) => {
    const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className="flex items-center gap-md">
            <label className="toggle">
                <input
                    type="checkbox"
                    id={toggleId}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={disabled}
                />
                <span className="toggle-slider" />
            </label>
            {label && (
                <label
                    htmlFor={toggleId}
                    className="text-sm cursor-pointer"
                    style={{ color: disabled ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)' }}
                >
                    {label}
                </label>
            )}
        </div>
    );
};
