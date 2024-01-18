import React, { useEffect, useState } from "react";
import countries from "../../../countries/Countries";

const DialogModal = ({ open, setOpen, node, setNode, data, setData }) => {
  const [selectedTargets, setSelectedTargets] = useState({});
  const [weights, setWeights] = useState({});
  const [isAddNewLink, setIsAddNewLink] = useState(false);

  // for new link
  const [target, setTarget] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    if (node?.links) {
      const initialTargets = node.links.reduce((acc, link) => {
        acc[link.target] = link.target;
        return acc;
      }, {});
      setSelectedTargets(initialTargets);

      const initialWeights = node.links.reduce((acc, link) => {
        acc[link.target] = link.weigth;
        return acc;
      }, {});
      setWeights(initialWeights);
    }
  }, [node]);

  const handleTargetChange = (target, e) => {
    setSelectedTargets((prev) => ({ ...prev, [target]: e.target.value }));
  };

  const handleWeightChange = (target, e) => {
    setWeights((prev) => ({ ...prev, [target]: e.target.value }));
  };

  const handleUpdateNode = () => {
    // Update your node here
    node.links = node.links.map((link) => {
      const targetAlreadyExists = data?.nodes?.some(
        (node) => node.id === link.target
      );
      const country = countries.find((item) => item.id === link.target);
      if (!targetAlreadyExists) {
        data.nodes.push({ ...country, color: "#000" });
      }
      if (selectedTargets[link.target]) {
        link.target = selectedTargets[link.target];
        const targetAlreadyExists = data?.nodes?.some(
          (node) => node.id === link.target
        );
        const country = countries.find((item) => item.id === link.target);
        if (!targetAlreadyExists) {
          data.nodes.push({ ...country, color: "#000" });
        }
      }
      if (weights[link.target]) {
        link.weigth = weights[link.target];
      }
      return link;
    });

    // Update data.links to reflect the changes made in the dialog
    const newLinks = data.links.filter((item) => item.source !== node.id);
    newLinks.push(...node.links);
    setData({ ...data, links: newLinks });
    setOpen(false);
  };

  const handleDeteleNode = () => {
    // Delete your node here
    const newNodes = data.nodes.filter((item) => item.id !== node.id);
    const newLinks = data.links.filter(
      (item) => item.source !== node.id && item.target !== node.id
    );
    setData({ ...data, nodes: newNodes, links: newLinks });
    // ...
    setOpen(false);
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    console.log(target, weight);
    const newLink = {
      source: node.id,
      target: target,
      weigth: weight,
    };
    console.log(newLink);

    const newLinks = data.links.concat(newLink);
    // node.links = node.links.concat(newLink);
    setNode({ ...node, links: node.links.concat(newLink) });
    // setData({ ...data, links: newLinks });
  };

  const handleDeleteLink = (source, target) => {
    // Delete your link here
    const newNodeLinks = node.links.filter(
      (item) => !(item.source === source && item.target === target)
    );
    setNode({ ...node, links: newNodeLinks });
    // setData({ ...data, links: newLinks });
  };

  return (
    <>
      {open && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="flex justify-between p-4">
                <h3 className="heading-3">Update node : {node.id}</h3>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <ul>
                  <li className="flex justify-between py-2">
                    <p>Current links : </p>
                    <button
                      className="btn"
                      onClick={() => setIsAddNewLink((prev) => !prev)}
                    >
                      new link
                    </button>
                  </li>
                  {isAddNewLink && (
                    <form
                      onSubmit={(e) => handleAddLink(e)}
                      className="flex justify-between  items-center py-2"
                    >
                      <div className="flex flex-col  justify-between py-2">
                        <label htmlFor="target">Target</label>
                        <select
                          // onChange={(e) => handleTargetChange(node.id, e)}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setTarget(e.target.value);
                          }}
                          className="select"
                          name="target"
                          id="target"
                        >
                          <option value="">select one</option>
                          {countries?.map((item) => (
                            <option
                              key={countries?.indexOf(item)}
                              value={item?.id}
                            >
                              {item?.id}
                            </option>
                          ))}
                          {/* {data.nodes
                            .filter(
                              (item) =>
                                item.id !== node.id &&
                                node.links.every(
                                  (link) => link.target !== item.id
                                )
                            )
                            .map((item) => (
                              <option value={item.id}> {item.id} </option>
                            ))} */}
                        </select>
                      </div>
                      <div className="flex flex-col justify-between py-2">
                        <label htmlFor="weight">Weight</label>
                        <input
                          className="input"
                          // onChange={(e) => handleWeightChange(node.id, e)}
                          onChange={(e) => setWeight(e.target.value)}
                          type="number"
                          name="weight"
                          id="weight"
                        />
                      </div>
                      <button className="btn" type="submit">
                        + add
                      </button>
                    </form>
                  )}
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          source
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          target
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          weight
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {node?.links?.map((link) => {
                        return (
                          <tr key={link.target}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {link.source}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <select
                                value={selectedTargets[link.target] || ""}
                                onChange={(e) =>
                                  handleTargetChange(link.target, e)
                                }
                              >
                                {
                                  // data.nodes
                                  countries
                                    .filter((node) => node.id !== link.source)
                                    .map((item) => (
                                      <option value={item.id}>
                                        {" "}
                                        {item.id}{" "}
                                      </option>
                                    ))
                                }
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <input
                                className="input"
                                type="number"
                                value={weights[link.target] || ""}
                                onChange={(e) =>
                                  handleWeightChange(link.target, e)
                                }
                              />
                            </td>
                            <td>
                              <button
                                className="btn-delete"
                                onClick={() =>
                                  handleDeleteLink(link.source, link.target)
                                }
                              >
                                delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </ul>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="btn"
                  onClick={handleUpdateNode}
                >
                  update
                </button>
                <button
                  type="button"
                  className="mt-3 mx-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-50 text-base font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeteleNode}
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DialogModal;
