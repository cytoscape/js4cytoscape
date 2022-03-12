import NetworkSummary from '../src/model/NetworkSummary'
import { getNetwork, getNetworkSummary } from './ndex-helper'

const UUID_NEST = '60112105-f853-11e9-bb65-0ac135e8bacf'

// Small data
const UUID_SMALL = '848d122e-ecb7-11eb-b666-0ac135e8bacf'

describe('NDEx API call', () => {
  it('fetch network summary', async () => {
    const summary: NetworkSummary = await getNetworkSummary(UUID_NEST) as NetworkSummary
    expect(summary).toBeDefined()

    const { creationTime } = summary
    const modDate: Date = new Date(creationTime)
    expect(modDate).toBeDefined()
    expect(modDate.getUTCFullYear()).toBe(2019)
    console.log(modDate.toDateString())

    const cx = await getNetwork(UUID_SMALL)
    expect(cx).toBeDefined()
    expect(Array.isArray(cx)).toBeTruthy()
  })
})
