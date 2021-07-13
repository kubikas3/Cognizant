import ReactAce from 'react-ace/lib/ace';
import 'ace-builds/src-noconflict/mode-csharp'
import 'ace-builds/src-noconflict/theme-textmate'
import '../css/CodeArea.css';

type TextAreaProps = {
    onChange?: (value: string, event: any) => void,
    name?: string,
    label?: string,
    placeholder?: string,
    fluid?: boolean,
    //resizable?: boolean,
    rows?: number,
    value?: string,
    error?: string,
}

const CodeArea = ({ name, label, placeholder, fluid, onChange, value, error }: TextAreaProps) => {
    let className = 'CodeArea';

    if (fluid) {
        className += ' fluid';
    }

    // if (resizable) {
    //     className += ' resizable';
    // }

    if (error) {
        className += ' error';
    }

    return (
        <div className={className}>
            {(label || error) && <div className='CodeArea-label'>
                <label htmlFor={name}>
                    {label}
                </label>
                {error && <i className='CodeArea-error'> - {error}</i>}
            </div>}
            <ReactAce className={`CodeArea-textarea`}
                onChange={onChange}
                name={name}
                placeholder={placeholder}
                mode='csharp'
                theme='textmate'
                fontSize={14}
                setOptions={{
                    minLines: 20,
                    maxLines: 20,
                }}
                value={value}></ReactAce>
        </div>
    )
}

export default CodeArea
