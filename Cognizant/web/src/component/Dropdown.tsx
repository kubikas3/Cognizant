import { useState } from 'react'
import '../css/Dropdown.css';

type DropdownOption = {
    text?: string,
    value?: any
};

type DropdownProps = {
    fluid?: boolean,
    float?: 'left' | 'right',
    placeholder?: string,
    name?: string,
    label?: string,
    error?: string,
    options?: DropdownOption[]
};

const Dropdown = ({ fluid, float, name, label, error, placeholder, options }: DropdownProps) => {
    const [selectedItem, setSelectedItem] = useState<DropdownOption>();
    let className = 'Dropdown';

    if (fluid) {
        className += ' fluid';
    }

    if (float) {
        className += ` ${float}`;
    }

    if (error) {
        className += ' error';
    }

    const itemSelectedHandler = (item: DropdownOption) => {
        setSelectedItem(item);
    };

    return (
        <div className={className}>
            {label && <div className='Dropdown-label'>
                <label htmlFor={name}>{label}</label>
                {error && <i> - {error}</i>}
            </div>}
            <div className='Dropdown-select' tabIndex={0}>
                {selectedItem ? <div>{selectedItem.text}</div> :
                    <div className='Dropdown-placeholder'>
                        {placeholder}
                    </div>}
            </div>
            <div className='Dropdown-options-wrapper'>
                <div className='Dropdown-options'>
                    {options?.map((o, i) =>
                        <div key={i} tabIndex={i + 1} className='Dropdown-option'
                            onPointerDown={() => itemSelectedHandler(o)}>
                            {o.text}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dropdown
