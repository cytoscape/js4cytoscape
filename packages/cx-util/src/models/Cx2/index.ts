import { Aspect } from './Aspect'
import { CxDescriptor } from './CxDescriptor'
import { Metadata } from './Metadata'
import { Status } from './Status'

type Head = [CxDescriptor] | [CxDescriptor, Metadata]
type Tail = [Status] | [Metadata, Status]

export type Cx2 = [...Head, ...Aspect[], ...Tail]
