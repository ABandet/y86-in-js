import * as hcl from "../../../model/kernel-seq/hcl";

test("hcl test", () => {
    expect(hcl.call("test")).toBe(4)
})