import { createEmptyObjectLine } from '../yas'
import { YasNode } from './yasNode'

export class Line extends YasNode {
    private _innerNodes : YasNode[]
    private _comment : string = ""

    constructor(line : number, innerNodes : YasNode[], comment : string) {
        super(line)
        this._innerNodes = innerNodes
        this._comment = comment
    }

    evaluate(ctx : any) : () => void {
        let laterEvaulationFunctions = this._innerNodes.map((node : YasNode) => {
            return node.evaluate(ctx)
        })

        return () => {
            laterEvaulationFunctions.forEach((laterEvaulationFunction) => {
                laterEvaulationFunction()
            })

            if(this._innerNodes.length > 0) {
                const lastInnerNode = this._innerNodes[this._innerNodes.length - 1]

                this.vaddr = lastInnerNode.vaddr
                this.instructionBytes = lastInnerNode.instructionBytes
            }

            this._innerNodes.forEach((node) => {
                this.statementAsText += node.statementAsText + ' '
            })

            this.statementAsText += this._comment
        }
    }

    render() : string {
        if(this._innerNodes.length == 0) {
            return createEmptyObjectLine(this._comment)
        } else {
            return super.render()
        }
    }
}