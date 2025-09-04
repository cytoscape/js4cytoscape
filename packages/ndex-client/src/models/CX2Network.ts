import { 
  CX2Network as CX2NetworkType,
  CX2MetaData,
  CX2Node,
  CX2Edge,
  CX2AttributeDeclarations,
  CX2NetworkAttribute,
  CX2NodeBypass,
  CX2EdgeBypass,
  CX2VisualProperty,
  NetworkSummaryV3
} from '../types';

/**
 * CX2Network - Modern representation of CX2 format networks
 * Provides utilities for creating, manipulating, and validating CX2 networks
 */
export class CX2Network implements CX2NetworkType {
  CXVersion: string = '2.0';
  hasFragments: boolean = false;
  metaData: CX2MetaData[] = [];
  attributeDeclarations?: CX2AttributeDeclarations;
  networkAttributes?: CX2NetworkAttribute[];
  nodes?: CX2Node[];
  edges?: CX2Edge[];
  nodeBypass?: CX2NodeBypass[];
  edgeBypass?: CX2EdgeBypass[];
  visualProperties?: CX2VisualProperty;
  status?: any[];

  constructor(data?: Partial<CX2NetworkType>) {
    if (data) {
      Object.assign(this, data);
    }
    
    // Ensure required metadata is present
    this.ensureRequiredMetadata();
  }

  /**
   * Create a new empty CX2Network
   */
  static createEmpty(): CX2Network {
    const network = new CX2Network();
    network.nodes = [];
    network.edges = [];
    network.metaData = [
      {
        name: 'nodes',
        elementCount: 0
      },
      {
        name: 'edges',
        elementCount: 0
      },
    ];
    return network;
  }

  /**
   * Create CX2Network from raw JSON data
   */
  static fromJSON(json: string | object): CX2Network {
    const data = typeof json === 'string' ? JSON.parse(json) : json;
    return new CX2Network(data);
  }

  /**
   * Create CX2Network from NetworkSummary (for compatibility)
   */
  static fromNetworkSummary(summary: NetworkSummaryV3): CX2Network {
    const network = CX2Network.createEmpty();
    
    network.networkAttributes = [
      { name: summary.name },
      ...(summary.description ? [{ description: summary.description }] : []),
      ...(summary.version ? [{ version: summary.version }] : []),
    ];

    // Add properties as network attributes
    if (summary.properties) {
      Object.entries(summary.properties).forEach(([key, value]) => {
        network.networkAttributes?.push({
          [key]: (value as { t: string; v: any }).v
        });
      });
    }

    return network;
  }

  /**
   * Add a node to the network
   */
  addNode(id: number, attributes?: Record<string, any>): CX2Node {
    if (!this.nodes) {
      this.nodes = [];
    }

    const node: CX2Node = { id };
    if (attributes) {
      node.v = attributes;
    }

    this.nodes.push(node);
    this.updateNodeCount();
    return node;
  }

  /**
   * Add an edge to the network
   */
  addEdge(id: number, sourceId: number, targetId: number, attributes?: Record<string, any>): CX2Edge {
    if (!this.edges) {
      this.edges = [];
    }

    const edge: CX2Edge = {
      id,
      s: sourceId,
      t: targetId,
    };

    if (attributes) {
      edge.v = attributes;
    }

    this.edges.push(edge);
    this.updateEdgeCount();
    return edge;
  }

  /**
   * Add an individual node attribute
   */
  addNodeAttribute(nodeId: number, attributeName: string, value: any): void {

    //find the nodes with the given ID
    const node = this.nodes.find(n => n.id === nodeId);
    //set the node attribute
    if (node) {
      if (!node.v) {
        node.v = {};
      }
      node.v[attributeName] = value;
    }

  }

  /**
   * Add edge attributes (bulk)
   */
  addEdgeAttribute(edgeId: number, attributeName: string, value: any): void {
    //similar to addNodeAttribute
    const edge = this.edges.find(e => e.id === edgeId);
    if (edge) {
      if (!edge.v) {
        edge.v = {};
      }
      edge.v[attributeName] = value;
    }

  
  }

  /**
   * Set node coordinates
   */
  setNodeCoordinates(nodeId: number, x: number, y: number, z?: number): void {
    if (!this.nodes) {
      this.nodes = [];
    }

    // Find the node and update its coordinates directly
    let node = this.nodes.find(n => n.id === nodeId);
    
    if (!node) {
      // Create new node if it doesn't exist
      node = { id: nodeId };
      this.nodes.push(node);
      this.updateNodeCount();
    }

    // Set coordinates directly on the node
    node.x = x;
    node.y = y;
    if (z !== undefined) {
      node.z = z;
    }
  }

  /**
   * Get node by ID
   */
  getNode(id: number): CX2Node | undefined {
    return this.nodes?.find(node => node.id === id);
  }

  /**
   * Get edge by ID
   */
  getEdge(id: number): CX2Edge | undefined {
    return this.edges?.find(edge => edge.id === id);
  }

  /**
   * Get all nodes
   */
  getNodes(): CX2Node[] {
    return this.nodes || [];
  }

  /**
   * Get all edges
   */
  getEdges(): CX2Edge[] {
    return this.edges || [];
  }

  /**
   * Get node count
   */
  getNodeCount(): number {
    return this.nodes?.length || 0;
  }

  /**
   * Get edge count
   */
  getEdgeCount(): number {
    return this.edges?.length || 0;
  }

  /**
   * Get network name from attributes
   */
  getNetworkName(): string | undefined {
    return this.networkAttributes?.find(attr => 'name' in attr)?.name;
  }

  /**
   * Set network name
   */
  setNetworkName(name: string): void {
    if (!this.networkAttributes) {
      this.networkAttributes = [];
    }

    // Remove existing name attribute
    this.networkAttributes = this.networkAttributes.filter(attr => !('name' in attr));
    
    // Add new name
    this.networkAttributes.push({ name });
  }

  /**
   * Get network attribute by key
   */
  getNetworkAttribute(key: string): any {
    return this.networkAttributes?.find(attr => key in attr)?.[key];
  }

  /**
   * Set network attribute
   */
  setNetworkAttribute(key: string, value: any): void {
    if (!this.networkAttributes) {
      this.networkAttributes = [];
    }

    // Remove existing attribute with same key
    this.networkAttributes = this.networkAttributes.filter(attr => !(key in attr));
    
    // Add new attribute
    this.networkAttributes.push({ [key]: value });
  }

  /**
   * Validate the CX2 network structure
   */
  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check required fields
    if (!this.CXVersion) {
      errors.push('CXVersion is required');
    }

    if (this.hasFragments === undefined) {
      errors.push('hasFragments is required');
    }

    if (!this.metaData || this.metaData.length === 0) {
      errors.push('metaData is required and must not be empty');
    }

    // Validate metadata
    this.metaData?.forEach((meta, index) => {
      if (!meta.name) {
        errors.push(`metaData[${index}] is missing required 'name' field`);
      }
    });

    // Validate nodes
    if (this.nodes) {
      this.nodes.forEach((node, index) => {
        if (node.id === undefined || node.id === null) {
          errors.push(`nodes[${index}] is missing required 'id' field`);
        }
      });
    }

    // Validate edges
    if (this.edges) {
      this.edges.forEach((edge, index) => {
        if (edge.id === undefined || edge.id === null) {
          errors.push(`edges[${index}] is missing required 'id' field`);
        }
        if (edge.s === undefined || edge.s === null) {
          errors.push(`edges[${index}] is missing required 's' (source) field`);
        }
        if (edge.t === undefined || edge.t === null) {
          errors.push(`edges[${index}] is missing required 't' (target) field`);
        }

        // Check if source and target nodes exist
        if (this.nodes && edge.s !== undefined && edge.t !== undefined) {
          const sourceExists = this.nodes.some(node => node.id === edge.s);
          const targetExists = this.nodes.some(node => node.id === edge.t);
          
          if (!sourceExists) {
            errors.push(`edges[${index}] references non-existent source node ${edge.s}`);
          }
          if (!targetExists) {
            errors.push(`edges[${index}] references non-existent target node ${edge.t}`);
          }
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Convert to JSON string
   */
  toJSON(): string {
    return JSON.stringify(this, null, 2);
  }

  /**
   * Create a deep copy of the network
   */
  clone(): CX2Network {
    return new CX2Network(JSON.parse(this.toJSON()));
  }

  /**
   * Get basic statistics about the network
   */
  getStatistics() {
    return {
      nodeCount: this.getNodeCount(),
      edgeCount: this.getEdgeCount(),
      hasCoordinates: Boolean(this.nodes && this.nodes.some(node => 
        node.x !== undefined || node.y !== undefined || node.z !== undefined
      )),
      hasVisualProperties: Boolean(this.visualProperties && (
        this.visualProperties.default || 
        this.visualProperties.edgeMapping || 
        this.visualProperties.nodeMapping
      ))
    };
  }

  /**
   * Ensure required metadata is present
   */
  private ensureRequiredMetadata(): void {
    if (!this.metaData) {
      this.metaData = [];
    }

    // Ensure nodes metadata exists
    if (this.nodes && !this.metaData.find(m => m.name === 'nodes')) {
      this.metaData.push({
        name: 'nodes',
        elementCount: this.nodes.length
      });
    }

    // Ensure edges metadata exists  
    if (this.edges && !this.metaData.find(m => m.name === 'edges')) {
      this.metaData.push({
        name: 'edges',
        elementCount: this.edges.length
      });
    }
  }

  /**
   * Update node count in metadata
   */
  private updateNodeCount(): void {
    const nodesMeta = this.metaData?.find(m => m.name === 'nodes');
    if (nodesMeta) {
      nodesMeta.elementCount = this.nodes?.length || 0;
    }
  }

  /**
   * Update edge count in metadata
   */
  private updateEdgeCount(): void {
    const edgesMeta = this.metaData?.find(m => m.name === 'edges');
    if (edgesMeta) {
      edgesMeta.elementCount = this.edges?.length || 0;
    }
  }
}
