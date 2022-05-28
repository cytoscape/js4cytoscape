import { Cx2 } from '../models/Cx2'
import { Aspect } from '../models/Cx2/Aspect'
import { CxDescriptor } from '../models/Cx2/CxDescriptor'
import { NiceCx } from '../models/Cx2/NiceCx'

const isAspect = (aspect: Aspect | CxDescriptor): boolean => {
  const keys = Object.keys(aspect)
  if (keys.length === 1) {
    return true
  }
  return false
}

const toNiceCx = (cx2: Cx2): NiceCx => {
  const niceCx: NiceCx = {}

  cx2.forEach((fragment: CxDescriptor | Aspect) => {
    if (isAspect(fragment)) {
      const aspect = fragment as Aspect
      const aspectName: string = Object.keys(aspect)[0]
      const aspectValues: object[] = aspect[aspectName]
      niceCx[aspectName] = aspectValues
    }
  })

  return niceCx
}

export { toNiceCx }
