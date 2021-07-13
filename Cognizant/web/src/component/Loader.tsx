import { ReactNode } from 'react';
import '../css/Loader.css';

type LoaderProps = {
    children?: ReactNode
    dimmer?: boolean
};

const Loader = ({ children, dimmer }: LoaderProps) => {
    let className = 'Loader';

    if (dimmer) {
        className += ' dimmer';
    }

    return (
        <div className={className}>
            <div className='Loader-dimmer'>
                <div className="Loader-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <h3>
                        {children}
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Loader
