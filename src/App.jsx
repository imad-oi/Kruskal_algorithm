import { useState } from "react";
import "./App.css";
import Alert from "./components/Alert.jsx";
import GraphConfig from "./components/GraphConfig.jsx";
import GraphFeed from "./components/GraphFeed";
import HeaderBar from "./components/HeaderBar";

const defaultData = {
  nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }, { id: "Jerry" }],
  links: [
    { source: "Harry", target: "Sally", weigth: 2 },
    { source: "Harry", target: "Alice", weigth: 4 },
    { source: "Sally", target: "Alice", weigth: 5 },
    { source: "Jerry", target: "Alice", weigth: 6 },
  ],
};

export default function App() {
  const [data, setData] = useState(defaultData);
  const [config, setConfig] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [nodesToBeDeleted, setNodesToBeDeleted] = useState([]); // [nodeId1, nodeId2, ...
  const [mode, setMode] = useState("add"); // ["add", "delete" ]

  console.log(nodesToBeDeleted);
  console.log(mode);
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="">
        <HeaderBar
          data={data}
          setData={setData}
          setMode={setMode}
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
        <div className="w-4/5 flex flex-col">
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
