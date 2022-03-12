import AttributeType from "./AttributeType"

type Node = {
  id: number
  v: NodeAttributes
  x?: number
  y?: number
  z?: number
}

interface NodeAttributes {
  [key: string]: AttributeType
}

export default Node
