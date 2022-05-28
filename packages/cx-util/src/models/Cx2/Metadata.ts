import { Aspect } from "./Aspect"

export interface Metadata extends Aspect {
  metadata: MetadataValue[]
}

export interface MetadataValue {
  name: string
  elementCount?: number
}
