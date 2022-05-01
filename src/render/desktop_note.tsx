import React, {useEffect, useRef, useState} from 'react';
import { ipcRenderer, KeyboardEvent } from 'electron'

// import '../watcher/watcher';
import '../../css/editor.css';

import { NotebookData } from '../common/notebook_data';

function App() {
    const data = React.useRef(new NotebookData(KeyListener, ClickListener, SaveListener))
    const [updateTime, setUpdateTime] = React.useState(+ new Date())

    useEffect(() => {
        console.log('changes in data')
    }, [data])

    useEffect(() => {
        let ref = data.current.getFocusRef()

        if (ref.current) {
            ref.current.click();
        }
    }, [updateTime])

    function ClickListener(event: any, id: number) {
        // Update focus to clicked block
        data.current.setFocus(id);

        setUpdateTime(+ new Date())
    }

    function KeyListener(event: any, id: number, isEmpty: boolean) {
        if (event.key === "Enter") {
            manageEnter(id);
        }
        else if (event.key == "Backspace") {
            manageBackspace(id, isEmpty);
        }
        
        setUpdateTime(+ new Date())
    }

    function SaveListener(event: KeyboardEvent) {
        console.log("in save listener")
        // blocksRef.current.map((block) => {
        //     // block.ref.current.getAlert();
        // })

        let file_data = {
            lines: data.current.getAllLines(),
            order: data.current.getOrder()
        }
        ipcRenderer.send('save', file_data);

        setUpdateTime(+ new Date())
    }

    function manageBackspace(currentBlockID: number, isEmpty: boolean) {
        // Deleting current block
        if (isEmpty && currentBlockID !== 0){
            data.current.deleteLine(currentBlockID)
        }
    }

    function manageEnter(currentBlockID: number) {
        let currentIndex : number = data.current.getFocusIndex()
        let lastBlockID : number = data.current.getLastBlockID()
        let nextBlockID : number = + new Date();

        // console.log(`current block ${currentBlockID}`)
        // console.log(`last block ${lastBlockID}`)
        // key = key + 1;

        // Add new block if user is on the last block already
        if (currentBlockID === lastBlockID) {
            // console.log("last block, making new one")
            data.current.appendLine(nextBlockID)
        }
        else {
            data.current.addLine(nextBlockID, currentIndex+1)
        }
    }

    let blocks = data.current.getBlocks()
    return (
        <div className="note">
            {blocks.map((block) => block)}
        </div>
    );
}

export default App;
