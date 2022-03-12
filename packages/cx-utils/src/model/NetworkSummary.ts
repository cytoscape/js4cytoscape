import NDExPropertyValuePair from "./NDExPropertyValuePair";

interface NetworkSummary {
  name: string; //	Name or title of the network, not unique, same meaning as dc:title
  description: string; //	Text description of the network, same meaning as dc:description
  creationTime: number; //	Time at which the network was created
  modificationTime: number; // Time at which the network was last modified
  visibility: "PUBLIC" | "PRIVATE"; //PUBLIC means it can be found or read by anyone, including anonymous users. PRIVATE is the default, means that it can only be found or read by users according to their permissions.
  version: string; // Format is not controlled but best practice is to use string conforming to Semantic Versioning.
  nodeCount: number; // the number of node objects in the network
  edgeCount: number; // the number of edge objects in the network
  properties: NDExPropertyValuePair[]; // List of NDExPropertyValuePair objects: describes properties of the network.
  externalId: string; // UUID of this network
  ownerUUID: string; // UUID of this networks owner
  isReadOnly: boolean; //	True if this network is marked as readonly in NDEx.
  subnetworkIds: number[]; // List of integers which are identifiers of subnetworks.
  errorMessage: string; // If this network is not a valid CX network, this field holds the error message produced by the CX network validator.
  isValid: boolean; // True if this network is a valid CX network.
  owner: string; //	userName of the network owner.
  indexed: boolean; // True if the network needs to be indexed.
  completed: boolean; // True means all pending operation on this network has been finished.
  warnings: string[]; // If there are potential errors in the network, this field holds the warning message produced by the CX network validator.
  isShowcase: boolean; //	True if this network is showcased in the owner’s account.
  isCertified: boolean; // True if this is a published network in NDEx, with a DOI assigned and a valid publication reference.
  hasLayout: boolean; // True if the network has coordinates on its nodes.
  hasSample: boolean; // True if the network has a sample network.
}

export default NetworkSummary;
