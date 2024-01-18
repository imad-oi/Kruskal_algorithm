import { Form, Button } from "./HeaderBar.jsx";
import { useState } from "react";
import countries from "../../countries/Countries.js";

const initLink = { source: countries[0], target: countries[1], weigth: 1 };
export default function AddNodeModal({ data, setData }) {
  const [link, setLink] = useState({ ...initLink });

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    console.log(value, name);

    setLink((prev) => ({
      ...prev,
      [name]:
        name === "weigth"
          ? parseInt(value)
          : countries.filter((c) => c.id === value)[0],
    }));
  };

  const isNodeConnected = (country) => {
    return data.links.some(
      (l) => l.source === link.source.id && l.target === country.id
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const linkStr = {
      source: link.source?.id,
      target: link.target?.id,
      weigth: link.weigth,
    };
    const sourceNode = { ...link.source, color: "#000" };
    const targetNode = { ...link.target, color: "#000" };

    console.log(linkStr);
    console.log(link);

    const newData = { nodes: data.nodes, links: data.links };

    const sourceAlreadyExists = data?.nodes?.some(
      (node) => node.id === linkStr.source
    );
    const targetAlreadyExists = data?.nodes?.some(
      (node) => node.id === linkStr.target
    );

    if (!linkStr.target) {
      if (!sourceAlreadyExists) newData.nodes.push(sourceNode);
    } else {
      if (sourceAlreadyExists) {
        const linkAlreadyExists = data?.links?.some(
          (l) =>
            l.source === linkStr.source &&
            l.target === linkStr.target &&
            l.weigth === linkStr.weigth
        );
        if (!linkAlreadyExists) {
          if (!targetAlreadyExists) newData.nodes.push(targetNode);
          newData.links.push(linkStr);
        }
      } else {
        newData.nodes.push(sourceNode);
        if (!targetAlreadyExists) newData.nodes.push(targetNode);
        newData.links = [...data?.links, linkStr];
      }
    }

    console.log(newData);
    setData(newData);
  };

  return (
    <>
      <div className="add-modal">
        <h2 className="heading-3 py-2">Add new node</h2>
        <hr className="my-2" />
        <Form onSubmit={(e) => handleSubmit(e)}>
          <select
            className="select w-full"
            onChange={(e) => handleInputChange(e)}
            value={link?.source?.id}
            name="source"
            id="source"
            placeholder="Target Node"
          >
            <option  value=""disabled >select country</option>
            {countries?.map((item) => (
              <option key={countries?.indexOf(item)} value={item?.id}>
                {item?.id}
              </option>
            ))}
          </select>
          <select
            className="select w-full"
            onChange={(e) => handleInputChange(e)}
            value={link?.target?.id}
            name="target"
            id="target"
            placeholder="Target Node"
          >
            <option value="" disabled>select country</option>
            {countries
              ?.filter((n) => n.id !== link.source.id && !isNodeConnected(n))
              .map((item) => (
                <option key={countries?.indexOf(item)} value={item?.id}>
                  {item?.id}
                </option>
              ))}
          </select>
          <input
            onChange={(e) => handleInputChange(e)}
            value={link?.weigth}
            name="weigth"
            type="number"
            placeholder="link weigth"
            className="input"
          />
          <Button className="btn-submit" type="submit" value="add" />
        </Form>
      </div>
    </>
  );
}
