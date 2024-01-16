import { Form, Button } from "./HeaderBar.jsx";
import { useState } from "react";

const initLink = { source: "", target: "", weigth: 1 };
export default function AddNodeModal({ data, setData }) {
  const [link, setLink] = useState({ ...initLink });
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setLink((prev) => ({
      ...prev,
      [name]: name === "weigth" ? parseInt(value) : value
    }));
  };

  const isLinkValid = () => {
    return link.source?.trim().length > 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = { nodes: data.nodes, links: data.links };

    if (!isLinkValid) {
      setLink({ ...initLink });
      return;
    }

    const sourceAlreadyExists = data?.nodes?.some((node) => node.id === link.source);

    if (link?.target === "") {
      if (!sourceAlreadyExists) newData.nodes = [...data?.nodes, { id: link.source }];
    } else {
      if (sourceAlreadyExists) {
        const linkAlreadyExists = data?.links?.some(l =>
          l.source === link.source
          && l.target === link.target
          && l.weigth === link.weigth
        );
        if (!linkAlreadyExists) newData.links = [...data?.links, link];
      } else {
        newData.nodes = [...data.nodes, { id: link.source }];
        newData.links = [...data?.links, link];
      }
    }

    // console.log(newData)
    setData(newData)
    setLink({...link, weigth: 1, target: ""});
  };

  return <>
    <div className="add-modal">
      <h2 className="heading-3 py-2">Add new node</h2>
      <hr className="my-2" />
      <Form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => handleInputChange(e)} value={link?.source}
          name="source" type="text" placeholder="Source Node" className="input"
        />
        <select
          className="select w-full"
          disabled={data?.nodes?.length === 0}
          onChange={(e) => handleInputChange(e)} value={link?.target}
          name="target" id="target" placeholder="Target Node"
        >
          <option disabled value="">Select target</option>
          {data?.nodes?.filter(n => n.id !== link.source).map((item) => (
            <option key={data?.nodes?.indexOf(item)} value={item?.id}>{item?.id}</option>
          ))}
        </select>
        <input onChange={(e) => handleInputChange(e)} value={link?.weigth}
               name="weigth" type="number" placeholder="link weigth" className="input" />
        <Button className="btn-submit" type="submit" value="add" disabled={!isLinkValid()} />
      </Form>
    </div>
  </>;
};
