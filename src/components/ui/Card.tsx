import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverable?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
    children,
    hoverable = false,
    padding = 'md',
    className = '',
    ...props
}) => {
    const paddingMap = {
        none: '',
        sm: 'p-sm',
        md: 'p-lg',
        lg: 'p-xl',
    };

    const combinedClassName = [
        'card',
        hoverable ? 'card-hover' : '',
        paddingMap[padding],
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={combinedClassName} {...props}>
            {children}
        </div>
    );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
    title,
    subtitle,
    action,
    className = '',
    ...props
}) => {
    return (
        <div className={`card-header ${className}`} {...props}>
            <div>
                <h3 className="card-title">{title}</h3>
                {subtitle && <p className="card-subtitle">{subtitle}</p>}
            </div>
            {action && <div>{action}</div>}
        </div>
    );
};
