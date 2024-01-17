const linkType = {
  STRAIGHT: "STRAIGHT",
  CURVE_SMOOTH: "CURVE_SMOOTH",
  CURVE_FULL: "CURVE_FULL "
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
  WYE: "wye"
};
export const config = {
  nodeHighlightBehavior: true,
  staticGraph: true,
  node: {
    color: "#67009a",
    fontColor: "#67009a",
    symbolType: symbolType.CIRCLE,
    size: 40,
    fontSize: 14,
    fontWeight: 500,
    highlightStrokeColor: "black"
  },
  link: {
    color: "#000000",
    highlightColor: "red",
    fontSize: 14,
    labelProperty,
    type,
    renderLabel
  },
  d3: {
    gravity: -300,
    linkLength: 120
  }
};

const GraphConfig = ({ setConfig, setNodesToBeDeleted, nodesToBeDeleted }) => {
  const handleColorChangeOfLink = (e) => {
    config.link.color = e.target.value;
    const config1 = {
      ...config,
      node: { ...config.node },
      link: { ...config.link }
    };
    setConfig(config1);
  };
  const handleColorChangeOfNoeud = (e) => {
    config.node.color = e.target.value;
    const config1 = {
      ...config,
      node: { ...config.node },
      link: { ...config.link }
    };
    setConfig(config1);
  };
  const handleSymbolChange = (e) => {
    config.node.symbolType = e.target.value;
    const config1 = {
      ...config,
      node: { ...config.node },
      link: { ...config.link }
    };
    setConfig(config1);
  };
  const handleTypeChange = (e) => {
    config.link.type = e.target.value;
    const config1 = {
      ...config,
      node: { ...config.node },
      link: { ...config.link }
    };
    setConfig(config1);
  };
  const handleInputChangeFonsize = (e) => {
    config.node.fontSize = e.target.value;
    const config1 = {
      ...config,
      node: { ...config.node },
      link: { ...config.link }
    };
    setConfig(config1);
  };
  const handleInputChangeFonsizeWeight = (e) => {
    config.link.fontSize = e.target.value;
    const config1 = {
      ...config,
      node: { ...config.node },
      link: { ...config.link }
    };
    setConfig(config1);
  };
  const handleInputChangsize = (e) => {
    config.node.size = e.target.value;
    const config1 = {
      ...config,
        node: { ...config.node },
        link: { ...config.link }
        };
        setConfig(config1);
        };

  return (
    <div className="bg-slate-50 h-full border-e p-2 space-y-4">
      <h3 className="text-center">
        <span className="heading-1 py-4" style={{
          fontStyle :'italic'
        }}>Configuration</span>
      </h3>
      <hr className="my-2" />
      <div className=" flex flex-col items-start gap-3">
        <div className="flex justify-between items-center w-full">
          <label htmlFor="colorPicker" className="heading-5 ">
            Color Of Link :
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
            Color Node :{" "}
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
            Symbole Node :{" "}
          </label>
          <select
            className="select w-[50%]"
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
        <div className="flex justify-between items-center w-full">
          <label className="heading-5" htmlFor="symbolSelect">
            Type Link :{" "}
          </label>
          <select
            className="select w-[50%]"
            id="symbolSelect"
            value={config.link.type}
            onChange={handleTypeChange}
          >
            {Object.values(linkType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between items-center w-full">

          <label htmlFor="fontsize" className="heading-5"> Font Size Node</label>
          <input
            onChange={handleInputChangeFonsize}
            value={config.node.fontSize}
            name="weigth"
            type="number"
            id="fontsize"
            placeholder=""
            className="input w-[50%]"
          />
        </div>
        <div className="flex justify-between items-center w-full">

          <label htmlFor="sizenode" className="heading-5"> Size of Node</label>
          <input
            onChange={handleInputChangsize}
            value={config.node.size}
            name="weigth"
            type="number"
            id="sizenode"
            placeholder=""
            className="input w-[50%]"
          />
        </div>
        <div className="flex justify-between items-center w-full">

          <label htmlFor="fontsizeweight" className="heading-5"> Font Size Weight</label>
          <input
            onChange={handleInputChangeFonsizeWeight}
            value={config.link.fontSize}
            name="weigth"
            type="number"
            id="fontsizeweight"
            placeholder=""
            className="input w-[50%]"
          />
        </div>
      </div>
      {/* nodes to be deleted */}

      {nodesToBeDeleted.length > 0 && (
        <div>
          <hr className="my-2" />
          <h3 className="heading-5 py-1">Nodes to be deleted</h3>
          <hr className="my-2" />
          <ul className="space-y-2">
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
                  x
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
