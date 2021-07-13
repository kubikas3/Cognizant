import { ReactNode } from 'react'
import '../css/Form.css';
import Loader from './Loader';

type FormProps = {
    children?: React.ReactNode,
    title?: string,
    loading?: boolean,
    onSubmit?: (e: React.FormEvent) => void,
}

type FieldProps = {
    children?: ReactNode
};

const Field = ({ children }: FieldProps) => {
    return (
        <div className='Form-Field'>
            {children}
        </div>
    )
};

const Form = ({ children, title, loading, onSubmit }: FormProps) => {
    return (
        <div className='Form'>
            {title && <h2 className='Form-title'>{title}</h2>}
            {loading && <Loader></Loader>}
            <form onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    )
};

Form.Field = Field;

export default Form;
