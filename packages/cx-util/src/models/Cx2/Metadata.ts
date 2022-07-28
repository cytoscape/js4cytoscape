import { Aspect } from "./Aspect"

export interface Metadata extends Aspect {
  metaData: MetadataValue[]
}

export interface MetadataValue {
  name: string
  elementCount?: number
}
