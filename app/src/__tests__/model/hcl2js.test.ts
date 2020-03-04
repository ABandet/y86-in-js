import { Hcl2js } from '../../model/hcl2js'

test('hcl2js simple program', () => {
    let hcl = `
    intsig valb 'VALB'
    intsig icode 'ICODE'
    
    bool f = icode in {valb, 3};`

    let hcl2js = new Hcl2js()
    let result = hcl2js.assemble(hcl)

    expect(result.errors.length).toBe(0)

    hcl = `
    intsig valb 'VALB'
    intsig icode 'ICODE'
    
    bool f = random in {valb, 3};`

    result = hcl2js.assemble(hcl)
    expect(result.errors.length).not.toBe(0)
})