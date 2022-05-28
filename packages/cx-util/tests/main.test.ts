import { Cx2 } from '../src/models/Cx2'
import { CxDescriptor } from '../src/models/Cx2/CxDescriptor'
import { toNiceCx } from '../src/util/cx2-util'

const MUSIC_URL =
  'https://public.ndexbio.org/v3/networks/7fc70ab6-9fb1-11ea-aaef-0ac135e8bacf'

describe('test basic setup', () => {
  it('Base test', async () => {
    const musicCx2: Cx2 = await fetchData(MUSIC_URL)
    expect(musicCx2.length).toBe(13)
    const firstAspect: CxDescriptor = musicCx2[0]
    
    console.info(firstAspect)

    expect(firstAspect.CXVersion).toBe('2.0')
    expect(firstAspect.hasFragments).toBe(false)

    const niceCx = toNiceCx(musicCx2)
    console.info(niceCx)
    
  })
})

const fetchData = async (url: string): Promise<Cx2> => {
  const res: Response = await fetch(url)
  const json: Cx2 = await res.json()

  return json
}
