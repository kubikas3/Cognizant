import React from 'react';
import '../css/Button.css';

type ButtonProps = {
    children?: React.ReactNode,
    fluid?: boolean,
    variant?: 'primary' | 'secondary' | 'tertiary',
    float?: 'left' | 'right'
}

const Button = ({ children, fluid, variant, float }: ButtonProps) => {
    let className = 'Button';

    if (float) {
        className += ` ${float}`;
    }

    if (variant) {
        className += ` ${variant}`;
    }

    if (fluid) {
        className += ` fluid`;
    }

    return (
        <div className={className}>
            <button className='Button-button'>
                {children}
            </button>
        </div>
    )
}

export default Button
