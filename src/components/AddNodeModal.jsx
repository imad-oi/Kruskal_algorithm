import { Form, Button } from "./HeaderBar.jsx";
import { useState } from "react";

export default function AddNodeModal({ data, setData }) {
  const [link, setLink] = useState({weigth: 1});
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setLink((prev) => ({
      ...prev,
      [name]: name === "weigth" ? parseInt(value) : value
    }));
  };

  const isLinkValid = () => {
    return link?.source !== undefined && link.source?.trim().length > 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(link);
    if (!isLinkValid) {
      setLink({weigth: 1});
      return;
    }

    const sourceAlreadyExists = data?.nodes?.some((node) => node.id === link.source);
    console.log(sourceAlreadyExists)

    if (link?.target === undefined) {
      if (sourceAlreadyExists) {
        setLink({weigth: 1});
        return;
      }
      else setData((prev) => ({
        nodes: [...prev.nodes, { id: link.source }],
        links: data.links
      }));
    }
    else {
      if (sourceAlreadyExists) setData((prev) => ({
        nodes: [...prev?.nodes],
        links: [...prev?.links, link]
      }))
      else setData((prev) => ({
        nodes: [...prev.nodes, { id: link.source }],
        links: [...prev?.links, link]
      }));
    }

    setLink({weigth: 1});
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
          className="select w-full" defaultValue={""}
          disabled={data?.nodes?.length === 0}
          onChange={(e) => handleInputChange(e)} value={link?.target}
          name="target" id="target" placeholder="Target Node"
        >
          <option disabled value="">Select target</option>
          {data?.nodes?.map((item) => (
            <option key={data?.nodes?.indexOf(item)} value={item?.id}>{item?.id}</option>
          ))}
        </select>
        <input onChange={(e) => handleInputChange(e)} value={link?.weigth}
               name="weigth" type="number" placeholder="link weigth" className="input" />
        <Button className="btn-submit" type="submit" value="add" disabled={!isLinkValid()} />
      </Form>
    </div>
  </>;
}
