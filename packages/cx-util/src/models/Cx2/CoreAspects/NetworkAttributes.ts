import { Aspect } from '../Aspect'
import { CxValue } from '../CxValue'

export interface NetworkAttributes extends Aspect {
  networkAttributes: [
    {
      name: string,
      description: string,
      version: string,
      [key: string]: CxValue
    }
  ]
}
