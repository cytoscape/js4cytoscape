import { Cx2 } from '../models/Cx2'
import { Aspect } from '../models/Cx2/Aspect'
import { CoreAspectTag } from '../models/Cx2/CoreAspectTag'
import { CxDescriptor } from '../models/Cx2/CxDescriptor'
import { NiceCx } from '../models/Cx2/NiceCx'

const isAspect = (aspect: Aspect | CxDescriptor): boolean => {
  const keys = Object.keys(aspect)
  if (keys.length === 1) {
    return true
  }
  return false
}

const getAspect = (cx2: Cx2, aspectTag: string): object[] => {
  const slice: Aspect[] = cx2.slice(1, cx2.length - 1) as Aspect[]

  for (const aspect of slice) {
    const aspectName: string = Object.keys(aspect)[0]
    const aspectValues: object[] = aspect[aspectName]
    if (aspectName === aspectTag) {
      return aspectValues
    }
  }

  return []
}

const getNodes = (cx2: Cx2): Node[] => {
  return getAspect(cx2, CoreAspectTag.Nodes) as Node[]
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

export { toNiceCx, getNodes }
