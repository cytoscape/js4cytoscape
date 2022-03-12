type CxObject = Nodes | Edges

type Node = {
  "@id": number, // Node ID
  n?: string, // Node name
  r?: string
}

type Edge = {
  "@id": number, // Node ID
  s: number, // Source node ID
  t: number, // Target node ID
  i?: string // Interaction 
}

type Nodes = {
  nodes: Node[]
}

type Edges = {
  edges: Edge[]
}

type CX = CxObject[]

export {Node, Nodes, Edge, Edges, CxObject, CX}