import { Graph } from "react-d3-graph"
// import PropTypes from 'prop-types';

const GraphFeed = ({
    data,
    config,
}) => {
    const onClickNode = function (nodeId) {
        const node = {id: nodeId, links: data.links?.filter(l => l.source === nodeId)}
        console.log(node)
    };
    
    const onClickLink = function (source, target, event) {
        console.log(source, target, event)
    };
  return (
        <Graph
            id="graph-id"
            data={data}
            config={config}
            onClickNode={onClickNode}
            onClickLink={onClickLink}
        />
  )
}


GraphFeed.defaultProps = {
    data: {
        nodes: [
            { id: "imad" },
            { id: "elhabib" },
            { id: "hamza" },
        ],
        links: [
            { source: "imad", target: "hamza", weigth: 2 },
            { source: "imad", target: "elhabib", weigth: 3 },
        ],
    },
    config: {
        nodeHighlightBehavior: true,
        node: {
            color: "black",
            fontColor: "black",
            size: 150,
            fontSize: 16,
            highlightStrokeColor: "black",
            highlightFontSize: 18,
            highlightFontWeight: "bold",
            highlightFontColor: "red",
        },
        link: {
            color: "#222",
            highlightColor: "red",
            fontSize: 14,
            labelProperty: (link) => {
                return `${link.weigth}`;
            },
            type: "STRAIGHT",
            renderLabel: true,
        },
        d3: {
            gravity: -300,
            linkLength: 120,
        },
    },
}
export default GraphFeed
