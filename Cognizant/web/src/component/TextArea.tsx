import { ChangeEvent, CSSProperties } from 'react';
import '../css/TextArea.css';

type TextAreaProps = {
    onChange?: (name: string, value: string) => void,
    name?: string,
    label?: string,
    placeholder?: string,
    font?: string,
    fluid?: boolean,
    resizable?: boolean,
    rows?: number,
    value?: string,
    error?: string,
    style?: CSSProperties
}

const TextArea = ({ name, label, placeholder, fluid, resizable, rows, onChange, value, error, font }: TextAreaProps) => {
    let className = 'TextArea';

    if (fluid) {
        className += ' fluid';
    }

    if (resizable) {
        className += ' resizable';
    }

    if (error) {
        className += ' error';
    }

    const handleChange = onChange ? (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.name, e.target.value);
    } : undefined;

    return (
        <div className={className}>
            {(label || error) && <div className='TextArea-label'>
                <label htmlFor={name}>
                    {label}
                </label>
                {error && <i className='TextArea-error'> - {error}</i>}
            </div>}
            <textarea className={`TextArea-textarea`}
                onChange={handleChange}
                name={name}
                placeholder={placeholder}
                rows={rows}
                style={{ font: font }}
                value={value}></textarea>
        </div>
    )
}

export default TextArea
