import { ChangeEvent, CSSProperties } from 'react'
import '../css/TextInput.css';

type TextInputProps = {
    onChange?: (name: string, value: string) => void,
    name?: string,
    label?: string,
    title?: string,
    type?: 'text' | 'number',
    placeholder?: string,
    fluid?: boolean,
    style?: CSSProperties,
    value?: string,
    error?: string
};

const TextInput = ({ onChange, name, label, title, type, placeholder, value, fluid, error }: TextInputProps) => {
    let className = 'TextInput';

    if (fluid) {
        className += ' fluid';
    }

    if (error) {
        className += ' error';
    }

    const handleChange = onChange ? (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.name, e.target.value);
    } : undefined;

    return (
        <div className={className}>
            {label && <div className='TextInput-label'>
                <label htmlFor={name}>{label}</label>
                {error && <i> - {error}</i>}
            </div>}
            <div>
                <input className='TextInput-input'
                    onChange={handleChange}
                    name={name}
                    type={type}
                    title={title}
                    placeholder={placeholder}
                    value={value}></input>
            </div>
        </div>
    )
}

export default TextInput
