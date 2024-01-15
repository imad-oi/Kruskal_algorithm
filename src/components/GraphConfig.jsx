const linkType = {
  STRAIGHT: "STRAIGHT", CURVE_SMOOTH: "CURVE_SMOOTH", CURVE_FULL: "CURVE_FULL "
};
const type = linkType.CURVE_SMOOTH;
const renderLabel = true;
const labelProperty = (link) => {
  return `${link.width}`;
};

const config = {
  nodeHighlightBehavior: true,
  node: {
    color: "blue", fontColor: "blue", size: 100, fontSize: 14, highlightStrokeColor: "blue"
  },
  link: {
    color: "#222", highlightColor: "red", fontSize: 14, labelProperty, type, renderLabel
  }
};

const GraphConfig = ({ setConfig }) => {
  setConfig(config)
  return (
    <div>
    </div>
  );
};

export default GraphConfig;
