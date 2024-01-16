import { useState } from "react";
import "./App.css";
import Alert from "./components/Alert.jsx";
import GraphConfig, {
  config as initialConfig,
} from "./components/GraphConfig.jsx";
import GraphFeed from "./components/GraphFeed";
import HeaderBar from "./components/HeaderBar.jsx";

// const defaultData = {
//   nodes: [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }],
//   links: [
//     { source: "1", target: "2", weigth: 1 },
//     { source: "1", target: "3", weigth: 2 },
//     { source: "2", target: "3", weigth: 4 },
//     { source: "4", target: "3", weigth: 3 },
//   ],
// };

const defaultData = {
  nodes: [
    { id: "canada", x: 100, y: 100 },
    { id: "Sally", x: 200, y: 100 },
    { id: "Alice", x: 300, y: 100 },
    { id: "Jerry", x: 400, y: 100 },
  ],
  links: [
    { source: "canada", target: "Sally", weigth: 2 },
    { source: "canada", target: "Alice", weigth: 4 },
    { source: "Sally", target: "Alice", weigth: 5 },
    { source: "Jerry", target: "Alice", weigth: 6 },
  ],
};

export default function App() {
  const [data, setData] = useState(defaultData);
  const [config, setConfig] = useState(initialConfig);
  const [alertMessage, setAlertMessage] = useState("");
  const [nodesToBeDeleted, setNodesToBeDeleted] = useState([]); // [nodeId1, nodeId2, ...
  const [mode, setMode] = useState("add"); // ["add", "delete" ]

  data.nodes.forEach((node) => {
    node.color = getNodeColor(node?.id);
  });

  function getNodeColor(nodeId) {
    // Vérifiez si le nœud est dans la liste nodesToBeDeleted
    const isNodeToBeDeleted = nodesToBeDeleted.some(
      (deletedNode) => deletedNode?.id === nodeId
    );

    // Utilisez une couleur spécifique si le nœud doit être supprimé
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
        />
      </div>
      <div className="flex flex-grow ">
        <div className="w-1/5">
          <GraphConfig
            nodesToBeDeleted={nodesToBeDeleted}
            setNodesToBeDeleted={setNodesToBeDeleted}
            setConfig={setConfig}
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
