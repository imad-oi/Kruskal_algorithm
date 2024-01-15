const linkType = {
  STRAIGHT: "STRAIGHT",
  CURVE_SMOOTH: "CURVE_SMOOTH",
  CURVE_FULL: "CURVE_FULL ",
};

const type = linkType.CURVE_FULL;
const renderLabel = true;
const labelProperty = (link) => {
  return `${link.weigth}`;
};
const symbolType = {
  CIRCLE: "circle",
  CROSS: "cross",
  DIAMOND: "diamond",
  SQUARE: "square",
  STAR: "star",
  TRIANGLE: "triangle",
  WYE: "wye",
};
const config = {
  nodeHighlightBehavior: true,
  node: {
    color: "#000000",
    fontColor: "blue",
    symbolType: "star",
    size: 100,
    fontSize: 14,
    highlightStrokeColor: "black",
  },
  link: {
    color: "#000000",
    highlightColor: "red",
    fontSize: 14,
    labelProperty,
    type,
    renderLabel,
  },
};

const GraphConfig = ({ setConfig, setNodesToBeDeleted, nodesToBeDeleted }) => {
  const handleColorChangeOfLink = (e) => {
    config.link.color = e.target.value;
    const config1 = {
      nodeHighlightBehavior: true,
      node: { ...config.node },
      link: { ...config.link },
    };
    setConfig(config1);
  };
  const handleColorChangeOfNoeud = (e) => {
    config.node.color = e.target.value;
    const config1 = {
      nodeHighlightBehavior: true,
      node: { ...config.node },
      link: { ...config.link },
    };
    setConfig(config1);
  };
  const handleSymbolChange = (e) => {
    config.node.symbolType = e.target.value;
    const config1 = {
      nodeHighlightBehavior: true,
      node: { ...config.node },
      link: { ...config.link },
    };
    setConfig(config1);
  };

  return (
    <div className="bg-slate-50 h-full border-e p-2">
      <h3 className="text-center">
        <span className="heading-1 py-4">Configuration</span>
      </h3>
      <hr className="my-2" />
      <div className=" flex flex-col items-start gap-">
        <div className="flex justify-between items-center w-full">
          <label htmlFor="colorPicker" className="heading-5">
            Couleur des Arret :
          </label>
          <input
            className=""
            type="color"
            id="colorPicker"
            value={config.link.color}
            onChange={handleColorChangeOfLink}
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <label className="heading-5" htmlFor="colornode">
            Couleur des Sommets :{" "}
          </label>
          <input
            type="color"
            id="colornode"
            value={config.node.color}
            onChange={handleColorChangeOfNoeud}
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <label className="heading-5" htmlFor="symbolSelect">
            Symbole :{" "}
          </label>
          <select
            className="select"
            id="symbolSelect"
            value={config.node.symbolType}
            onChange={handleSymbolChange}
          >
            {Object.values(symbolType).map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* nodes to be deleted */}
      
      {
        nodesToBeDeleted.length > 0 && (
        <div>
          <hr className="my-2" />
          <h3 className="heading-5 py-!">Nodes to be deleted</h3>
          <hr className="my-2" />
          <ul className="flex flex-col gap-1 py-2 h-[30vh] overflow-y-scroll ">
            {nodesToBeDeleted?.map((node) => (
              <li key={node} className="flex justify-between items-center">
                <span className="text-black font-bold">&#x25cf; {node.id}</span>
                <button
                  className="btn-delete"
                  onClick={() =>
                    setNodesToBeDeleted((prevNodes) =>
                      prevNodes.filter((n) => n !== node)
                    )
                  }
                >
                  remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GraphConfig;
