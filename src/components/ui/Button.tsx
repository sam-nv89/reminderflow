import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
    isLoading?: boolean;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    isLoading = false,
    fullWidth = false,
    className = '',
    disabled,
    ...props
}) => {
    const baseClass = 'btn';
    const variantClass = `btn-${variant}`;
    const sizeClass = size !== 'md' ? `btn-${size}` : '';
    const widthClass = fullWidth ? 'w-full' : '';

    const combinedClassName = [
        baseClass,
        variantClass,
        sizeClass,
        widthClass,
        className,
    ].filter(Boolean).join(' ');

    return (
        <button
            className={combinedClassName}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <span className="loader" style={{ width: 16, height: 16, borderWidth: 2 }} />
                    <span>{children}</span>
                </>
            ) : (
                <>
                    {Icon && iconPosition === 'left' && <Icon size={18} />}
                    {children && <span>{children}</span>}
                    {Icon && iconPosition === 'right' && <Icon size={18} />}
                </>
            )}
        </button>
    );
};
