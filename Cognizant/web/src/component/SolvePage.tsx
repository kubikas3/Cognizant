import '../css/SolvePage.css';
import TextInput from './TextInput';
import Form from './Form';
import Button from './Button';
import React, { useState } from 'react';
import { submitTaskAsync } from '../redux/actions/challengeSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Loader from './Loader';
import CodeArea from './CodeArea';
import Cmd from './Cmd';
import Dropdown from './Dropdown';

const SolvePage = () => {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [script, setScript] = useState('');
    const [cmdOpen, setCmdOpen] = useState(false);
    const challenge = useAppSelector((state) => state.challenge);
    const lastResult = challenge.lastResult;
    const output = lastResult && `${lastResult?.output}\n[Stats]\nCPU time: ${lastResult.cpuTime}s\nMemory usage: ${(parseInt(lastResult?.memory) / 1024).toFixed(2)} kB`;
    //const cmds = challenge.results.map(r => <Cmd title={r.name} output={r.output} />);
    
    const handleNameChange = (name: string, value: string) => {
        setName(value);
    };

    const handleScriptChange = (value: string) => {
        setScript(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(submitTaskAsync({ name: name, script: script }));
        setCmdOpen(true);
    };

    const handleCmdClose = () => {
        setCmdOpen(false);
    };

    return (
        <div className='SolvePage'>
            {challenge.status === 'loading' && <Loader dimmer>
                Compiling your beautiful code...
            </Loader>}
            <div className='SolvePage-Windows'>
                <Cmd title={lastResult?.name}
                    x={20}
                    y={20}
                    output={output}
                    onClose={handleCmdClose}
                    open={cmdOpen && challenge.status === 'idle'}
                    draggable />
            </div>
            <div className='SolvePage-Content'>
                <Form title='Solution' onSubmit={handleSubmit}>
                    <Form.Field>
                        <TextInput onChange={handleNameChange}
                            value={name}
                            fluid
                            name='name'
                            label='Name'
                            error={challenge.error?.validationErrors?.name}
                            placeholder='Joe' />
                    </Form.Field>
                    <Form.Field>
                        <Dropdown placeholder='Task...'
                            fluid
                            label='Task'
                            options={[
                                { text: 'Task 1' },
                                { text: 'Task 2' },
                                { text: 'Task 3' },
                            ]} />
                    </Form.Field>
                    <Form.Field>
                        <CodeArea
                            fluid
                            label='Script'
                            placeholder='using System...'
                            error={challenge.error?.validationErrors?.script}
                            onChange={handleScriptChange}
                            value={script} />
                        {/* <TextArea onChange={handleCodeChange}
                            label='Script'
                            placeholder='using System...'
                            error={challenge.error?.validationErrors?.script}
                            rows={20}
                            fluid
                            resizable
                            font='0.8rem Consolas, monaco, monospace'></TextArea> */}
                    </Form.Field>
                    <Button float='right'>SUBMIT</Button>
                </Form>
            </div>
        </div>
    )
}

export default SolvePage
