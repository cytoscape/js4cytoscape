import { NetworkSummary } from '../src/models/NetworkSummary'
import { NDExProperty } from '../src/models/NetworkSummary/NDExProperty'

// For testing only
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { NDEx } = require('@js4cytoscape/ndex-client')

// Original Data
const MUSIC_UUID = '7fc70ab6-9fb1-11ea-aaef-0ac135e8bacf'

describe('Summary file loading basic setup', () => {
  it('Load Network Summary', async () => {
    const client = new NDEx('https://public.ndexbio.org/v2')
    const musicSummary: NetworkSummary = await client.getNetworkSummary(
      MUSIC_UUID
    )
    console.log(musicSummary)

    expect(musicSummary).toBeDefined()

    const modTime: Date = new Date(musicSummary.modificationTime)
    expect(modTime).toBeDefined()

    const year = modTime.getFullYear()
    expect(year).toBe(2021)

    console.info(year)
    const props: NDExProperty[] = musicSummary.properties

    expect(props.length).toBe(4)

    const firstProp: NDExProperty = props[0]
    expect(firstProp.subNetworkId).toBeNull()
  })
})
