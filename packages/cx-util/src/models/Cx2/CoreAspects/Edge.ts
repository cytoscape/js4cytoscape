import { Attribute } from './Attribute'

export interface Edge {
  id: number
  s: number
  t: number
  v?: Attribute
}
