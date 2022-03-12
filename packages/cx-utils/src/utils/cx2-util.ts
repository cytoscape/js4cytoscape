import Cx2, { Cx2Element } from "../model/Cx2";
import AspectName from "../model/Cx2/AspectName";
import Nodes from "../model/Cx2/Nodes";

export const getNodes = (cx: Cx2): Nodes | undefined => {

  for(let index in cx) {
    const element: Cx2Element = cx[index]
    
  
    const nodeKey: AspectName = 'nodes'
    const value = element[nodeKey]
    if(value) {
      return value as Nodes
    }
  }

  return undefined
}