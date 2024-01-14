import styled from "styled-components";
import { Modal } from "./ui/Modal";
import { useState } from "react";

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  padding: 5px;
  // position : fixed;
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
  /* Add more styles as needed */
`;
const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  /* Add more styles as needed */
`;

const HeaderBar = ({ setData, data, applyKruskal }) => {
  const [link, setLink] = useState({
    source: "",
    target: "",
    weigth: 0,
    color: "black",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setLink((prev) => ({
      ...prev,
      [name]: name === "weigth" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sourceAlreadyExists = data.nodes.some(
      (node) => node.id === link.source
    );

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
      // Handle the case where the source already exists
    }
  };

  return (
    <NavBar>
      <h3>Kruskal algorithme</h3>
      <ButtonList>
        <button onClick={applyKruskal}>Apply Kruskal</button>
        <Modal hideBtn={"cancel"} showBtn={"add"}>
          <div>
            <h1>Add new noeud</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Input
                onChange={(e) => handleInputChange(e)}
                name="source"
                type="text"
                placeholder="source noeud"
              />
              <Select
                onChange={(e) => handleInputChange(e)}
                name="target"
                id="target"
              >
                <option disabled value="">
                  Select target
                </option>
                {data &&
                  data.nodes?.map((item) => (
                    <option value={item.id}>{item.id}</option>
                  ))}
              </Select>
              <Input
                onChange={(e) => handleInputChange(e)}
                name="weigth"
                type="number"
                placeholder="link weigth"
              />

              <Input
                type="submit"
                disabled={!link.source || !link.target || !link.weigth}
                value="add"
              />
            </form>
          </div>
        </Modal>
        <button>Delete noeud</button>
      </ButtonList>
    </NavBar>
  );
};

export default HeaderBar;
