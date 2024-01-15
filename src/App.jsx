// App.js
import { useEffect, useState } from "react";
import GraphFeed from "./components/GraphFeed";
import RightBar from "./components/RightBar";
import HeaderBar from "./components/HeaderBar";
import GraphConfig from "./components/GraphConfig";
import GraphData from "./components/GraphData";
import axios from "axios";
import { config } from "./config";


function App() {
  const [data, setData] = useState({
    nodes: [{ id: "imad" }, { id: "elhabib" }, { id: "hamza" }],
    links: [
      { source: "imad", target: "hamza", weigth: 2, color: "black" },
      { source: "imad", target: "elhabib", weigth: 3, color: "black" },
    ],
  });

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
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <HeaderBar
        data={data}
        setData={setData}
        applyKruskal={handleApplyKruskal}
      />
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            flex: 3,
          }}
        >
          <div>
            <GraphFeed data={data} config={config} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* <GraphConfig data={data} />
            <GraphData /> */}
          </div>
        </div>

        <div
          style={{
            flex: 1,
          }}
        >
          <RightBar />
        </div>
      </div>
    </div>
  );
}

export default App;