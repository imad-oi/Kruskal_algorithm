import { useState } from "react";
import GraphFeed from "./components/GraphFeed";
import HeaderBar from "./components/HeaderBar";
import axios from "axios";
import "./App.css";
import GraphConfig from "./components/GraphConfig.jsx";
import Alert from "./components/Alert.jsx";
import { config as initialConfig } from "./components/GraphConfig.jsx";

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
  nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }, { id: "Jerry" }],
  links: [
    { source: "Harry", target: "Sally", weigth: 1 },
    { source: "Harry", target: "Alice", weigth: 1 },
    { source: "Sally", target: "Alice", weigth: 1 },
    { source: "Jerry", target: "Alice", weigth: 1 },
  ],
};

export default function App() {
  const [data, setData] = useState(defaultData);
  const [config, setConfig] = useState(initialConfig);
  const [alertMessage, setAlertMessage] = useState("");
  const [nodesToBeDeleted, setNodesToBeDeleted] = useState([]); // [nodeId1, nodeId2, ...

  data.nodes.forEach((node) => {
    node.color = getNodeColor(node?.id);
  });
  
  function getNodeColor(nodeId) {
    // Vérifiez si le nœud est dans la liste nodesToBeDeleted
    const isNodeToBeDeleted = nodesToBeDeleted.some(
      (deletedNode) => deletedNode?.id === nodeId
    );
  
    // Utilisez une couleur spécifique si le nœud doit être supprimé
    return isNodeToBeDeleted ? '#FF0000' : config?.node?.color;
  

  }

  const handleApplyKruskal = async () => {
    try {
      const resJson = await axios.post("http://localhost:5000/kruskal", data);

      // Update links with MST coloring based on the server response
      const mstEdges = resJson.data; // Assuming server response contains MST edges
      const transformedMSTEdges = mstEdges.map((edge) => [edge[0], edge[1]]);

      const updatedLinks = data.links.map((link) => {
        const isMSTEdge = transformedMSTEdges.some(
          (edge) => edge[0] === link.source && edge[1] === link.target
        );
        return {
          ...link,
          color: isMSTEdge ? "green" : "#d3d3d3", // Change color based on MST or not
        };
      });
      setData((prevData) => ({
        ...prevData,
        links: updatedLinks,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="">
        <HeaderBar
          data={data}
          setData={setData}
          applyKruskal={handleApplyKruskal}
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
        <div className="w-4/5">
          <Alert message={alertMessage} />

          <GraphFeed
            nodesToBeDeleted={nodesToBeDeleted}
            setNodesToBeDeleted={setNodesToBeDeleted}
            data={data}
            config={config}
          />
        </div>
      </div>
    </div>
  );
}
