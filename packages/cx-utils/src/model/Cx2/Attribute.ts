import AttributeType from './AttributeType'
import AttributeDataType from './AttributeTypeName'

/**
 * Definition of an attribute
 */
type Attribute = {
  d: AttributeDataType
  v?: AttributeType
  a?: string // an alias for the attribute if you want to minimize the length of the attribute name
}

export default Attribute
