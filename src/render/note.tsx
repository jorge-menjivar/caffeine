import React, {useEffect, useRef, useState} from 'react';
// import '../watcher/watcher';
import '../../css/editor.css';


import { TextComponent } from './blocks/text/text'

function App() {

    const [focus, setFocus] = useState(0)
    const [refs, setRefs] = useState(new Map([[0, {index:0, ref: React.createRef<HTMLDivElement>()}]]));
    const [blocks, setBlocks] = useState([
        <TextComponent onKeyPress={KeyListener} onClick={ClickListener} key={0} id={0} innerRef={refs.get(0).ref} />
    ])

    // The following implementation allows the callbacks to KeyListener to have access to up-to-date
    // information in the blocks state. If accessing the blocks state directly, this returns a stale value.
    const blocksRef = useRef(blocks);
    blocksRef.current = blocks;
    const refsRef = useRef(refs);
    refsRef.current = refs;
    const focusRef = useRef(focus);
    focusRef.current = focus;

    useEffect(() => {
        // console.log(`focus on block ${focusRef.current}`)
        // console.log(blocksRef.current)
        // console.log(refsRef.current)

        if (refsRef.current.get(focusRef.current).ref.current) {
            // refsRef.current.get(focusRef.current.id).ref.current.focus();
            refsRef.current.get(focusRef.current).ref.current.click();
        }
    }, [focus])

    function ClickListener(event: any, id: number) {
        // Update focus to clicked block
        setFocus(id);
        return;
    }

    function KeyListener(event: any, id: number) {
        if (event.shiftKey && event.key === "Enter") {
            manageEnter(id);
        }
        else if (event.key == "Backspace") {
            manageBackspace(id);
        }
        return;
    }

    function manageBackspace(id: number) {
        // console.log("Backspace")
    }

    function manageEnter(currentBlockID: number) {
        let currentIndex : number = refsRef.current.get(currentBlockID).index
        let lastBlockID : number = blocksRef.current.at(blocksRef.current.length-1).props.id
        let nextBlockID : number = + new Date();

        // console.log(`current block ${currentBlockID}`)
        // console.log(`last block ${lastBlockID}`)
        // key = key + 1;

        // Add new block if user is on the last block already
        if (currentBlockID === lastBlockID) {
            // console.log("last block, making new one")
            let ref = React.createRef<HTMLDivElement>();
            setRefs(refsRef.current.set(nextBlockID, {index: currentIndex+1, ref: ref}));
            setBlocks([
                ...blocksRef.current,
                <TextComponent onKeyPress={KeyListener} onClick={ClickListener} key={nextBlockID} id={nextBlockID} innerRef={ref}/>
            ]);
        }
        else {
            nextBlockID = blocksRef.current.at(currentIndex+1).props.id
        }

        // console.log(`current focus: ${focusRef.current}`)
        // console.log(`attempt to change focus to ${nextBlockID}`)
        // Change focus to the next block
        setFocus(nextBlockID);
        return;
    }

    return (
        <div className="container-fluid">
            <h1>Note</h1>
            {blocks}
            <br/>
        </div>
    );
}

export default App;
