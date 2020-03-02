export { INT32_MAX, INT32_MIN, UINT32_MAX, numberToByteArray, stringToNumber, changeEndianess }

const INT32_MAX = (1 << 30) * 2 - 1 // '* 2'  is a little hack to counter js' floatting points
const INT32_MIN = 1 << 31

const UINT32_MAX = (1 << 30) * 4 - 1 // Same as above, '* 4' is here to fool fp

function numberToByteArray(value : number, maxBytes : number = UINT32_MAX, padToMax : boolean = false) : number[] {
    let bytes = new Array<number>()
    
    while(value != 0 && bytes.length < maxBytes) {
        const byte = value & 0xff
        bytes.push(byte)
        value = (value - byte) / 256
    }
    while(padToMax && bytes.length < maxBytes) {
        bytes.push(0)
    }

    return bytes
}

function stringToNumber(strValue : string) : number {
    if(strValue.match("[0-9]+")) {
        return parseInt(strValue)
    } else if(strValue.match("0x[0-9a-fA-F]+")) {
        return parseInt(strValue, 16)
    } else if(strValue.match("0b[0-1]+")) {
        return parseInt(strValue, 2)
    } else {
        throw new Error("The format of the number '" + strValue + "' is not supported")
    }
}

function changeEndianess(value : number) {
    let newValue = 0
    const bytes = numberToByteArray(value)

    bytes.forEach((byte) => {
        newValue <<= 8
        newValue |= byte
    })

    return newValue
}