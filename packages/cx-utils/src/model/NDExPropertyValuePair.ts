type CxDataType = string | number | number

type NDExPropertyValuePair = {
  subNetworkId: string | null,
  predicateString: string,
  dataType: 'string' | 'boolean' | 'number',
  value: CxDataType
}


export default NDExPropertyValuePair