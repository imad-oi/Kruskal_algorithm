import styled from "styled-components";
import { Modal } from "./ui/Modal";
import AddNodeModal from "./AddNodeModal.jsx";
import kruskalAlgo from "../../algorithm/kruskal-algo.js";
import { useState } from "react";

export const Button = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;
export const Form = styled.form`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const HeaderBar = ({
  data,
  mode,
  nodesToBeDeleted,
  //
  setAlertMessage,
  setData,
  setNodesToBeDeleted,
  setMode,
}) => {
  const [link, setLink] = useState({ source: "", target: "", weigth: 1 });
  const [sommet, setSommet] = useState({});
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setLink((prev) => ({
      ...prev,
      [name]: name === "weigth" ? parseInt(value) : value,
    }));
  };
  const handleInputChangeSommet = (e) => {
    setSommet(e.target.value);
    console.log(e.target.value);
  };
  const deletSommet = () => {
    let index = data.nodes.indexOf(
      data.nodes.find((node) => node.id === sommet)
    );
    console.log(index);
    data.nodes.splice(index, 1);
    data.links.forEach((element) => {
      if (element.target === sommet || element.source === sommet) {
        let index = data.links.indexOf(sommet);
        data.links.splice(index, 1);
      }
    });

    setData({
      nodes: data.nodes,
      links: data.links,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const sourceAlreadyExists = data.nodes.some(
      (node) => node.id === link.source
    );

    if (link.source && link.target === "") {
      if (sourceAlreadyExists) return;
      else {
        const links = data.links;
        setData((prev) => ({
          nodes: [...prev.nodes, { id: link.source }],
          links: data.links,
        }));
      }
      return;
    }

    if (!sourceAlreadyExists) {
      setData((prev) => ({
        nodes: [...prev.nodes, { id: link.source }],
        links: [...prev.links, link],
      }));
    } else {
      console.log("Source already exists:", link.source);
      setData((prev) => ({
        nodes: [...prev.nodes],
        links: [...prev.links, link],
      }));
    }
  };

  const handleDeleteNodes = () => {
    if (nodesToBeDeleted.length === 0) {
      setAlertMessage("please select  nodes to delete");
      setMode("delete");
      setTimeout(() => {
        setAlertMessage("");
      }, 3000);
      return;
    } else {
      console.log(nodesToBeDeleted);
    }
    const updatedNodes = data.nodes.filter(
      (node) => !nodesToBeDeleted.some((n) => n.id === node.id)
    );
    const updatdNodesIds = updatedNodes.map((node) => {
      return {
        id: node.id,
      };
    });

    const updatedLinks = data.links.filter(
      (link) =>
        !nodesToBeDeleted.some(
          (node) => node.id === link.target || node.id === link.source
        )
    );
    console.log(updatedLinks);

    setData((prevData) => ({
      ...prevData,
      nodes: updatdNodesIds,
      links: updatedLinks,
    }));
    setNodesToBeDeleted([]);
    setMode("add");
  };

  return (
    <div id="nav">
      <nav id="nav-1" className="py-6 flex flex-col ">
        <h3 className="heading-1 pb-5">Kruskal algorithm</h3>
        <div className="flex justify-center gap-3">
          <button
            className="btn"
            onClick={() => {
              let result = kruskalAlgo(data, "red");
              console.log(result);
              setData(result);
            }}
          >
            Apply Kruskal
          </button>
          <Modal
            hideBtn={"cancel"}
            showBtn={"Add Node"}
            style={{ margin: "auto 0 0 auto" }}
          >
            <AddNodeModal data={data} setData={setData} />
          </Modal>
          <button
            className="btn"
            onClick={() => {
              handleDeleteNodes();
            }}
          >
            Delete Nodes
          </button>
          <button
            className="btn"
            onClick={() => setData({ nodes: [], links: [] })}
          >
            Reset Graph
          </button>
          <button
            className={`${mode === "add" ? "btn" : "btn-delete"}`}
            onClick={() =>
              setMode((prev) => {
                if (prev === "add") return "delete";
                else return "add";
              })
            }
          >
            {mode === "add" ? "Adding " : "delete "} {"Node active "}
          </button>
        </div>
      </nav>
    </div>
    // <nav className="bg-black py-6 flex flex-col ">
    //   <h3 className="heading-1 pb-5">Kruskal algorithm</h3>
    //   <div className="flex justify-center gap-3">
    //     <button className="btn" disabled={data.links?.length === 0} onClick={() => {
    //       let result = kruskalAlgo(data, "red");
    //       setData(result);
    //     }}>Apply Kruskal</button>
    //     <Modal hideBtn={"cancel"} showBtn={"Add Node"} style={{ margin: "auto 0 0 auto" }}>
    //       <AddNodeModal data={data} setData={setData} />
    //     </Modal>
    //     <button className="btn">Delete Nodes</button>
    //     <button className="btn" onClick={() => setData({ nodes: [], links: [] })}>Reset Graph</button>
    //   </div>
    // </nav>
  );
};

export default HeaderBar;
