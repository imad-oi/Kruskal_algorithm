import { useState } from "react";
import "./App.css";
import Alert from "./components/Alert.jsx";
import GraphConfig, {
  configResultColor,
  config as initialConfig,
} from "./components/GraphConfig.jsx";
import GraphFeed from "./components/GraphFeed";
import HeaderBar from "./components/HeaderBar.jsx";

const defaultData = {
  nodes: [],
  links: []
}


export default function App() {
  const [data, setData] = useState(defaultData);
  const [config, setConfig] = useState(initialConfig);
  const [configResulColor, setConfigResulColor] = useState(configResultColor);
  const [alertMessage, setAlertMessage] = useState("");
  const [nodesToBeDeleted, setNodesToBeDeleted] = useState([]); // [nodeId1, nodeId2, ...
  const [mode, setMode] = useState("add"); // ["add", "delete" ]

  data.nodes.forEach((node) => {
    node.color = getNodeColor(node?.id);
  });

  function getNodeColor(nodeId) {
    const isNodeToBeDeleted = nodesToBeDeleted.some(
      (deletedNode) => deletedNode?.id === nodeId
    );

    return isNodeToBeDeleted ? "#FF0000" : config?.node?.color;
  }

  return (
    <div id="app" className="flex flex-col h-screen w-full">
      <div className="">
        <HeaderBar
          mode={mode}
          setMode={setMode}
          data={data}
          setData={setData}
          setAlertMessage={setAlertMessage}
          nodesToBeDeleted={nodesToBeDeleted}
          setNodesToBeDeleted={setNodesToBeDeleted}
          configResulColor={configResulColor}
          setConfigResulColor={setConfigResulColor}
        />
      </div>
      <div className="flex flex-grow ">
        <div className="w-1/5">
          <GraphConfig
            nodesToBeDeleted={nodesToBeDeleted}
            setNodesToBeDeleted={setNodesToBeDeleted}
            setConfig={setConfig}
            setConfigResulColor={setConfigResulColor}
          />
        </div>
        <div id="graph" className="w-4/5 flex flex-col">
          <Alert message={alertMessage} />
          <GraphFeed
            nodesToBeDeleted={nodesToBeDeleted}
            setNodesToBeDeleted={setNodesToBeDeleted}
            data={data}
            setData={setData}
            config={config}
            mode={mode}
            setMode={setMode}
          />
        </div>
      </div>
    </div>
  );
}

// const handleApplyKruskal = async () => {
//   try {
//     const resJson = await axios.post("http://localhost:5000/kruskal", data);

//     // Update links with MST coloring based on the server response
//     const mstEdges = resJson.data; // Assuming server response contains MST edges
//     const transformedMSTEdges = mstEdges.map((edge) => [edge[0], edge[1]]);

//     const updatedLinks = data.links.map((link) => {
//       const isMSTEdge = transformedMSTEdges.some(
//         (edge) => edge[0] === link.source && edge[1] === link.target
//       );
//       return {
//         ...link,
//         color: isMSTEdge ? "green" : "#d3d3d3", // Change color based on MST or not
//       };
//     });
//     setData((prevData) => ({
//       ...prevData,
//       links: updatedLinks,
//     }));
//   } catch (error) {
//     console.log(error);
//   }
// };
