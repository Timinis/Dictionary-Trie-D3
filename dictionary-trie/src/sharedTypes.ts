import * as D3 from 'd3';

export interface Node extends D3.SimulationNodeDatum {
  id: string | D3Source;
}

export interface ClusterNode extends D3.SimulationNodeDatum {
  id: string | D3Source;
  radius: number;
  color: string;
}

export interface Edge extends D3.SimulationLinkDatum<Node> {
  source: string | D3Source;
  value: number;
  target: string | D3Target;
}
export interface Graph {
  nodesArray: Node[];
  edgesArray: Edge[];
}

export const isD3Source = (maybeD3Source: any): maybeD3Source is D3Source =>
  typeof maybeD3Source === 'object' && maybeD3Source.hasOwnProperty('id');

export const isD3Target = (maybeD3Source: any): maybeD3Source is D3Source =>
  typeof maybeD3Source === 'object' && maybeD3Source.hasOwnProperty('id');

export interface D3Source {
  id: string;
}
export interface D3Target {
  id: string;
}
