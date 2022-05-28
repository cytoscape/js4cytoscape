export const CoreAspectTagMap = {
  Nodes: 'nodes',
  Edges: 'edges',
  NetworkAttributes: 'networkAttributes',
  AttributeDeclaration: 'attributeDeclaration',
  VisualProperties: 'visualProperties'
}

export type CoreAspectTag = typeof CoreAspectTagMap[keyof typeof CoreAspectTagMap]



