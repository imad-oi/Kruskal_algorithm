import styled from "styled-components";
import { Modal } from "./ui/Modal";
import AddNodeModal from "./AddNodeModal.jsx";
import kruskalAlgo from "../../algorithm/kruskal-algo.js";

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

const HeaderBar = ({ setData, data }) => {
  // const [sommet, setSommet] = useState({});
  // const handleInputChangeSommet = (e) => {
  //   setSommet(e.target.value);
  //   console.log(e.target.value);
  // };
  // const deletSommet = () => {
  //   let index = data.nodes.indexOf(
  //     data.nodes.find((node) => node.id === sommet)
  //   );
  //   console.log(index);
  //   data.nodes.splice(index, 1);
  //   data.links.forEach((element) => {
  //     if (element.target === sommet || element.source === sommet) {
  //       let index = data.links.indexOf(sommet);
  //       data.links.splice(index, 1);
  //     }
  //   });
  //
  //   setData({
  //     nodes: data.nodes,
  //     links: data.links,
  //   });
  // };

  return (
    <nav className="bg-black py-6 flex flex-col ">
      <h3 className="heading-1 pb-5">Kruskal algorithm</h3>
      <div className="flex justify-center gap-3">
        <button className="btn" onClick={() => setData(kruskalAlgo(data), "blue")}>
          Apply Kruskal
        </button>
        <Modal
          hideBtn={"cancel"}
          showBtn={"Add Node"}
          style={{ margin: "auto 0 0 auto" }}>
          <AddNodeModal data={data} setData={setData}/>
        </Modal>
        <button className="btn">Delete Nodes</button>
        <button className="btn" onClick={() => setData({ nodes: [], links: [] })}>Reset Graph</button>
      </div>
    </nav>
  );
};

export default HeaderBar;
