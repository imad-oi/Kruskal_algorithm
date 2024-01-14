import styled from "styled-components";

const PreStyled = styled.pre`
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  height: 300px;
  overflow: scroll;
  font-family: "Courier New", Courier, monospace;
`;

const GraphConfig = ({ data }) => {
  return (
    <div
      style={{
        // backgroundColor: "green",
        width: "100%",
        // height : '100vh',
        flex: 1,
      }}
    >
      <p>GraphData</p>
      <PreStyled>{JSON.stringify(data, null, 2)} </PreStyled>
    </div>
  );
};

export default GraphConfig;
