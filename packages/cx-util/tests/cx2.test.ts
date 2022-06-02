import { Cx2 } from '../src/models/Cx2'
import { CxDescriptor } from '../src/models/Cx2/CxDescriptor'
import { toNiceCx, getNodes } from '../src/util/cx2-util'

import * as fs from 'fs/promises'
import { Status } from '../src/models/Cx2/Status'
import { Aspect } from '../src/models/Cx2/Aspect'
import { Metadata, MetadataValue } from '../src/models/Cx2/Metadata'

// Original Data
const MUSIC_URL =
  'https://public.ndexbio.org/v3/networks/7fc70ab6-9fb1-11ea-aaef-0ac135e8bacf'

describe('CX2 file loading basic setup', () => {
  it('Load CX2 as text file, and check its contents', async () => {
    const data = await fs.readFile(`${__dirname}/test-data/music.json`, 'utf8')

    const musicCx2: Cx2 = JSON.parse(data)
    const cx2length: number = musicCx2.length

    expect(cx2length).toBe(13)
    const firstAspect: CxDescriptor = musicCx2[0]

    expect(firstAspect.CXVersion).toBe('2.0')
    expect(firstAspect.hasFragments).toBe(false)
    
    const secondAspect: Aspect = musicCx2[1]
    // This is a pre-metadata aspect
    const preMetadata: Metadata = secondAspect as Metadata
    console.info(preMetadata)
    expect(preMetadata.metaData).toBeDefined()
    const metaValues: MetadataValue[] = preMetadata.metaData
    expect(metaValues.length).toBe(10)

    const lastAspect: Status = musicCx2[cx2length - 1] as Status

    const status: [{ success: boolean; error?: string }] = lastAspect.status
    expect(status[0].success).toBe(true)
    expect(status[0].error).toBeUndefined()

    const nodes: Node[] = getNodes(musicCx2)
    expect(nodes.length).toBe(70)

    const niceCx = toNiceCx(musicCx2)
    // console.info(niceCx)
  })
})
