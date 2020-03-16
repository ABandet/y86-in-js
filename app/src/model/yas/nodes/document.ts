import { ICompilationNode } from '../../interfaces/ICompiler'
import { createObjectLine } from '../yas'
import { YasNode } from './yasNode'
import { Line } from './line'
import { Label } from './label'
import { call } from 'model/kernel-seq/hcl'

export class Document extends YasNode {
    private _lines : Line[]

    constructor(lines : Line[]) {
        super(0)
        this._lines = lines
    }

    evaluate(ctx : any) : void {
        this._lines.forEach((line) => {
            line.evaluate(ctx)
        })
        this._lines.forEach((line) => {
            line.postEvaluate(ctx)
        })
    }

    render() : string {
        let output = ''

        this._lines.forEach((line) => {
            output += line.render() + '\n'
        })

        return output
    }

    forEachLine(callback : (line : Line) => void) {
        this._lines.forEach((line) => {
            callback(line)
        })
    }
}