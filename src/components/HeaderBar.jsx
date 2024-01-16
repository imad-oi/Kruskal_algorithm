import styled from "styled-components";
import { Modal } from "./ui/Modal";
import { useState } from "react";

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  padding: 5px;
  width: 100%;
  background-color: lightgray;
`;

const ButtonList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  padding: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;
const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const HeaderBar = ({
  setData,
  data,
  applyKruskal,
  setAlertMessage,
  nodesToBeDeleted,
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
    }
    const updatedNodes = data.nodes.filter(
      (node) => !nodesToBeDeleted.some((n) => n.id === node.id)
    );
    const updatedLinks = data.links.filter(
      (link) =>
        !nodesToBeDeleted.some((node) =>
          node.links.some((l) => l.source === link.source)
        )
    );
    setData((prevData) => ({
      ...prevData,
      nodes: updatedNodes,
      links: updatedLinks,
    }));
    setNodesToBeDeleted([]);
    setMode("add");
  };

  return (
    <nav className="bg-black py-6 flex flex-col ">
      <h3 className="heading-1 pb-5">Kruskal algorithme</h3>
      <div className="flex justify-center gap-3">
        <button className="btn" onClick={applyKruskal}>
          Apply Kruskal
        </button>
        <Modal
          hideBtn={"cancel"}
          showBtn={"Add noeud"}
          style={{ margin: "auto 0 0 auto" }}
        >
          <div className="add-modal">
            <h2 className="heading-3 py-2">Add new noeud</h2>
            <hr className="my-2" />
            <Form onSubmit={(e) => handleSubmit(e)}>
              <input
                onChange={(e) => handleInputChange(e)}
                name="source"
                type="text"
                placeholder="Source Node"
                className="input"
              />
              <select
                className="select w-full"
                onChange={(e) => handleInputChange(e)}
                name="target"
                id="target"
                placeholder="Target Node"
              >
                <option disabled value="" selected>
                  Select target
                </option>
                {data?.nodes?.map((item) => (
                  <option key={data?.nodes.indexOf(item)} value={item.id}>
                    {item.id}
                  </option>
                ))}
              </select>
              <input
                onChange={(e) => handleInputChange(e)}
                value={link.weigth}
                name="weigth"
                type="number"
                placeholder="link weigth"
                className="input"
              />

              <Input
                className="btn-submit"
                type="submit"
                disabled={!link.source}
                value="add"
              />
            </Form>
          </div>
        </Modal>
        <button className="btn" onClick={() => handleDeleteNodes()}>
          Delete Nodes
        </button>
        <button
          className="btn"
          onClick={() => setData({ nodes: [], links: [] })}
        >
          Reset Graph
        </button>
        {/* <Modal hideBtn={"cancel"} showBtn={"supprimer"}>
          <div>
            <h2>Supprimer un Sommet</h2>
            <Select
              onChange={(e) => handleInputChangeSommet(e)}
              name="sommet"
              id="sommet"
            >
              <option disabled value="">
                Select Sommet
              </option>
              {data &&
                data.nodes?.map((item) => (
                  <option value={item.id}>{item.id}</option>
                ))}
            </Select>
            <button className="btn" onClick={deletSommet}>
              Suprimmer
            </button>
          </div>
        </Modal> */}
      </div>
    </nav>
  );
};

export default HeaderBar;
