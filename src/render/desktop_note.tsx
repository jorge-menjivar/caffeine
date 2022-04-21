import React, {useEffect, useRef, useState} from 'react';
import { ipcRenderer, KeyboardEvent } from 'electron'

// import '../watcher/watcher';
import '../../css/editor.css';


import { BlockComponent } from './blocks/desktop_block'

function App() {

    const [focus, setFocus] = useState(0)
    let tmpRef = React.createRef<HTMLDivElement>()
    const [blocks, setBlocks] = useState([{
        component: <BlockComponent
            onKeyPress={KeyListener}
            onClick={ClickListener}
            onSave={SaveListener}
            key={0}
            id={0}
            innerRef={tmpRef}
        />,
        id: 0,
        ref: tmpRef
    }]);

    // The following implementation allows the callbacks to KeyListener to have access to up-to-date
    // information in the blocks state. If accessing the blocks state directly, this returns a stale value.
    const blocksRef = useRef(blocks);
    blocksRef.current = blocks;
    const focusRef = useRef(focus);
    focusRef.current = focus;

    useEffect(() => {
        console.log(`focus on block ${focusRef.current}`)
        console.log(blocksRef.current)

        let ref = blocksRef.current.filter((block) => block.id === focusRef.current)[0].ref

        if (ref.current) {
            // refsRef.current.get(focusRef.current).ref.current.focus();
            ref.current.click();
        }
    }, [focus])

    useEffect(() => {
        console.log(`block change detected`)
    }, [blocks])

    function ClickListener(event: any, id: number) {
        // Update focus to clicked block
        setFocus(id);
        return;
    }

    function KeyListener(event: any, id: number, isEmpty: boolean) {
        if (event.key === "Enter") {
            manageEnter(id);
        }
        else if (event.key == "Backspace") {
            manageBackspace(id, isEmpty);
        }
        return;
    }

    function SaveListener(event: KeyboardEvent) {
        console.log("in save listener")
        ipcRenderer.send('save');
    }

    function manageBackspace(currentBlockID: number, isEmpty: boolean) {
        // Deleting current block
        if (isEmpty && currentBlockID !== 0){
            let currentIndex : number = blocksRef.current.findIndex((block) => block.id === currentBlockID);
            let prevBlockID : number = blocksRef.current[currentIndex-1].id;
            console.log(`Deleting block ${currentBlockID}. Index ${currentIndex}`)

            blocksRef.current.splice(currentIndex, 1);
            setBlocks(blocksRef.current);
            console.log(`attempt to change focus to ${prevBlockID}`)
            setFocus(prevBlockID);
            // console.log('Updated blocks array:')
            // console.log(blocks)
        }
        return;
    }

    function manageEnter(currentBlockID: number) {
        let currentIndex : number = blocksRef.current.findIndex((block) => block.id === currentBlockID)
        let lastBlockID : number = blocksRef.current[blocksRef.current.length-1].id
        let nextBlockID : number = + new Date();

        // console.log(`current block ${currentBlockID}`)
        // console.log(`last block ${lastBlockID}`)
        // key = key + 1;

        // Add new block if user is on the last block already
        if (currentBlockID === lastBlockID) {
            // console.log("last block, making new one")
            let ref = React.createRef<HTMLDivElement>();

            setBlocks([
                ...blocksRef.current,
                {
                    component: <BlockComponent
                        onKeyPress={KeyListener}
                        onClick={ClickListener}
                        onSave={SaveListener}
                        key={nextBlockID}
                        id={nextBlockID}
                        innerRef={ref}
                    />,
                    id: nextBlockID,
                    ref: ref
                }
            ]);
        }
        else {
            nextBlockID = blocksRef.current[currentIndex+1].id
        }

        // console.log(`current focus: ${focusRef.current}`)
        // console.log(`attempt to change focus to ${nextBlockID}`)
        // Change focus to the next block
        setFocus(nextBlockID);
        return;
    }

    return (
        <div className="note">
            {blocks.map((block) => block.component)}
        </div>
    );
}

export default App;
