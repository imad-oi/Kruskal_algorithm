import { useState } from "react";

const linkType = {
  STRAIGHT: "STRAIGHT", CURVE_SMOOTH: "CURVE_SMOOTH", CURVE_FULL: "CURVE_FULL "
};

const type = linkType.CURVE_SMOOTH;
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
}
const config = {
  nodeHighlightBehavior: true,
  node: {
    color: "#000000", fontColor: "blue", symbolType:"star",size: 100, fontSize: 14, highlightStrokeColor: "black"
  },
  link: {
    color: "#000000", highlightColor: "red", fontSize: 14, labelProperty, type, renderLabel
  }
};

const GraphConfig = ({ setConfig }) => {


  const handleColorChangeOfLink = (e) => {

    config.link.color=e.target.value;
    const config1= {
  nodeHighlightBehavior: true,
  node: {...config.node},
  link: {...config.link}
    }
    setConfig(config1)
  };
  const handleColorChangeOfNoeud = (e) => {

    config.node.color=e.target.value;
    const config1= {
  nodeHighlightBehavior: true,
  node: {...config.node},
  link: {...config.link}
    }
    setConfig(config1)
  };
  const handleSymbolChange = (e) => {
    config.node.symbolType=e.target.value;
    const config1= {
  nodeHighlightBehavior: true,
  node: {...config.node},
  link: {...config.link},
    }
    setConfig(config1)
  };



  return (
    <div className="bg-gray-500 text-white w-full rounded-2xl shadow-md h-[100vh] space-y-8   p-4">
    <div className="space-x-3">
        <label htmlFor="colorPicker" className="mt-12">Choisir le couleur des Arret : </label>
        <input className="mt-12"
          type="color"
          id="colorPicker"
          value={config.link.color}
          onChange={handleColorChangeOfLink}
        />
      </div>
    <div className="space-x-3">
        <label htmlFor="colornode">Choisir le couleur  des Sommets : </label>
        <input
          type="color"
          id="colornode"
          value={config.node.color}
          onChange={handleColorChangeOfNoeud}
        />
      </div>
      <div >
        <label htmlFor="symbolSelect">Choisir un symbole : </label>
        <select className="text-gray-800"
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
  );
};

export default GraphConfig;
