import { Graph } from "react-d3-graph";

export default function GraphFeed({ data, config }) {
  const onClickNode = function(nodeId) {
    const node = { id: nodeId, links: data.links?.filter(l => l.source === nodeId) };
    console.log(node);
  };

  const onClickLink = function(source, target, event) {
    console.log(source, target, event);
  };
  return (
    <Graph
      id="graph-id"
      data={data}
      config={config}
      onClickNode={onClickNode}
      onClickLink={onClickLink}
    />
  );
}
