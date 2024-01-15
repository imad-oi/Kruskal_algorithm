// App.js
import { useState } from "react";
import GraphFeed from "./components/GraphFeed";
import HeaderBar from "./components/HeaderBar";
import axios from "axios";
import "./App.css";
import GraphConfig from "./components/GraphConfig.jsx";

const defaultData = {
  nodes: [],
  links: []
};

export default function App() {
  const [data, setData] = useState(defaultData);
  const [config, setConfig] = useState({});

  const handleApplyKruskal = async () => {
    try {
      const resJson = await axios.post("http://localhost:5000/kruskal", data);

      // Update links with MST coloring based on the server response
      const mstEdges = resJson.data; // Assuming server response contains MST edges
      const transformedMSTEdges = mstEdges.map((edge) => [edge[0], edge[1]]);

      const updatedLinks = data.links.map((link) => {
        const isMSTEdge = transformedMSTEdges.some((edge) => edge[0] === link.source && edge[1] === link.target);
        return {
          ...link, color: isMSTEdge ? "green" : "#d3d3d3" // Change color based on MST or not
        };
      });
      setData((prevData) => ({
        ...prevData, links: updatedLinks
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <HeaderBar
        data={data}
        setData={setData}
        applyKruskal={handleApplyKruskal}
      />
      <div style={{ display: "flex" }}>
        <div className="w-[70%]">
          <GraphFeed data={data} config={config} />
        </div>
        <div className="w-[30%] h-[100vh]">
          <GraphConfig setConfig={setConfig} />
        </div>
      </div>
    </div>);
}
