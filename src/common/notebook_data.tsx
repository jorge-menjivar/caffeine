import React from 'react';
import { BlockComponent } from '../render/blocks/desktop_block'

export class NotebookData {
    private lines : Map<number, any>  = new Map();
    private order : Array<number>  = new Array();
    private focus : number = 0;
    private blocks : Array<any> = new Array();
    private key_listener : any;
    private click_listener : any;
    private save_listener : any;
    private refs: Array<any> = new Array();

    constructor(key_listener: any, click_listener: any, save_listener: any) {
        this.key_listener = key_listener
        this.click_listener = click_listener
        this.save_listener = save_listener

        this.appendLine(0)
    }

    updateLine(id: number, type: String, value: String) {
        let data = {
            "type": type,
            "value": value
        }
        this.lines.set(id, data)
    }

    updateOrder(id: number, location: number) {
        let old_location = this.order.findIndex((val) => {return val == id})

        if (old_location < location) {
            location--
        }

        // Removing element from old position
        this.order.splice(old_location, 1)

        // Inserting element in new position
        this.order.splice(location, 0, id)
    }

    appendLine(id: number) {

        let ref = React.createRef<HTMLDivElement>();

        this.blocks.push(<BlockComponent
            onKeyPress={this.key_listener}
            onClick={this.click_listener}
            onSave={this.save_listener}
            key={id}
            id={id}
            innerRef={ref}
            data={this}
        />)

        let data = {
            "type": "text",
            "value": ""
        }
        this.lines.set(id, data)
        
        this.order.push(id)
        this.refs.push(ref)

        this.setFocus(id)
    }

    addLine(id: number, position: number) {

        let ref = React.createRef<HTMLDivElement>();

        this.blocks.push(<BlockComponent
            onKeyPress={this.key_listener}
            onClick={this.click_listener}
            onSave={this.save_listener}
            key={id}
            id={id}
            innerRef={ref}
            data={this}
        />)

        let data = {
            "type": "text",
            "value": ""
        }
        this.lines.set(id, data)
        
        // Inserting element in new position
        this.order.splice(position, 0, id)
        this.refs.splice(position, 0, ref)

        this.setFocus(id);
    }

    deleteLine(id: number){
        this.lines.delete(id)
        let location = this.order.findIndex((val) => {return val == id})

        // Removing element from order array
        this.order.splice(location, 1)

        // Setting focus to prev block
        this.setFocus(this.order[location - 1])
    }

    getLine(id: number){
        return this.lines.get(id)
    }

    getAllLines() {
        return this.lines
    }

    getOrder() {
        return this.order
    }

    getFocus() {
        return this.focus
    }

    getFocusIndex() {
        return this.order.findIndex((val) => {return val == this.focus})
    }

    getLastBlockID() {
        length = this.blocks.length
        return this.blocks[length - 1]
    }

    getBlocks() {
        return this.blocks
    }

    setFocus(id: number) {
        this.focus = id
    }

    getFocusRef() {
        let position = this.order.findIndex((val) => {return val == this.focus})

        return this.refs[position]
    }
}