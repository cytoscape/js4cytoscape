import { NDEx } from '@js4cytoscape/ndex-client'
import Cx2 from '../src/model/Cx2'
import NetworkSummary from '../src/model/NetworkSummary'

const NDEX_BASE_URL = 'http://www.ndexbio.org/v2'

export const getNetworkSummary = async (
  uuid: string,
): Promise<NetworkSummary | string> => {
  try {
    let ndex = new NDEx(NDEX_BASE_URL)
    const summary = await ndex.getNetworkSummary(uuid)
    return summary
  } catch (error: unknown) {
    return `Could not get network summary: ${error}`
  }
}

export const getNetwork = async (uuid: string): Promise<Cx2 | string> => {
  try {
    let ndex = new NDEx(NDEX_BASE_URL)
    const cx = await ndex.getCX2Network(uuid)
    return cx
  } catch (error) {
    return `Could not get CX: ${error}`
  }
}
