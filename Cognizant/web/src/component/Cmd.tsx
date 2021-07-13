import { CSSProperties, PointerEvent, useState } from 'react';
import '../css/Cmd.css';
import { ReactComponent as CloseIcon } from '../img/close.svg';

type CmdProps = {
    x?: number,
    y?: number,
    onClose?: () => void,
    open?: boolean,
    title?: string,
    output?: string,
    draggable?: boolean,
};

const defaultProps: CmdProps = {
    title: 'cmd'
}

const Cmd = ({ onClose, open, x, y, draggable, title, output }: CmdProps) => {
    const [position, setPosition] = useState({ x: x || 0, y: y || 0 });
    let className = 'Cmd';
    let rel = { x: 0, y: 0 };

    const pointerMoveHandler = (e: globalThis.PointerEvent): any => {
        setPosition({ x: e.pageX - rel.x, y: Math.max(0, e.pageY - rel.y) });
        e.stopPropagation();
        e.preventDefault();
    };

    const pointerUpHandler = (e: globalThis.PointerEvent) => {
        window.removeEventListener('pointermove', pointerMoveHandler);
        e.stopPropagation();
        e.preventDefault();
    };

    const pointerDownHandler = draggable ? (e: PointerEvent) => {
        rel = { x: e.pageX - position.x, y: e.pageY - position.y };
        window.addEventListener('pointermove', pointerMoveHandler);
        window.addEventListener('pointerup', pointerUpHandler);
        window.addEventListener('pointercancel', pointerUpHandler);
        e.stopPropagation();
        e.preventDefault();
    } : undefined;

    const closeHandler = onClose ? () => {
        onClose();
    } : undefined;

    let style: CSSProperties = {
        display: open ? 'flex' : 'none'
    };
    
    style = { ...style, left: position.x, top: position.y };

    return (
        <div className={className}
            style={style}>
            <div className='Cmd-titlebar'>
                <div className='Cmd-title'
                    onPointerDown={pointerDownHandler}>{title}</div>
                <div className='Cmd-controls'>
                    <div className='Cmd-close' onClick={closeHandler}>
                        <CloseIcon className='Cmd-closeIcon' />
                    </div>
                </div>
            </div>
            <pre className='Cmd-screenbuffer'>{output}</pre>
        </div>
    )
};

Cmd.defaultProps = defaultProps;
export default Cmd
