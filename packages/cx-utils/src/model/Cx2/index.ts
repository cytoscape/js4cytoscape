import CxDescriptor from './CxDescriptor'
import Metadata from './Metadata'
import Nodes from './Nodes'

interface Cx2 {
  [index: number]: Cx2Element
}

export type Cx2Element = CxDescriptor | Metadata | Nodes

export default Cx2
