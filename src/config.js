const linkType = {
    STRAIGHT: "STRAIGHT",
    CURVE_SMOOTH: "CURVE_SMOOTH",
    CURVE_FULL: "CURVE_FULL ",
  };
  
  const renderLabel = true;
  const labelProperty = (link) => {
    return `${link.weigth}`;
  };
  
 export const config = {
    nodeHighlightBehavior: true,
    node: {
      color: "black",
      fontColor: "black",
      size: 150,
      fontSize: 16,
      highlightStrokeColor: "black",
      highlightFontSize: 18,
      highlightFontWeight: "bold",
      highlightFontColor: "red",
    },
    link: {
      color: "#222",
      highlightColor: "red",
      fontSize: 14,
      labelProperty,
      type: linkType.STRAIGHT,
      renderLabel,
    },
    d3: {
      gravity: -300,
      linkLength: 120,
    },
  };