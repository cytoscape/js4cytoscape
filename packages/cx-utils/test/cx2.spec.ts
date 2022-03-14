import Cx2 from "../src/model/Cx2"
import { getNodes } from "../src/utils/cx2-util"
import { getNetwork } from "./test-helper"

// Small data
const UUID_SMALL = '848d122e-ecb7-11eb-b666-0ac135e8bacf'

describe('Check CX2 format data utilities', () => {
  it('Test CX2 data structure', async () => {
    const cx2: Cx2 = await getNetwork(UUID_SMALL) as Cx2
    expect(cx2).toBeDefined()

    console.log(cx2)
    expect(Array.isArray(cx2)).toBeTruthy()
    expect(cx2[0]['CXVersion']).toBe('2.0')

    const nodes = getNodes(cx2)
    console.log(nodes)
    expect(nodes).toBeTruthy()
  })
})