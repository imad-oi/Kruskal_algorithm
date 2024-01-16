import { Graph } from "react-d3-graph";
import DialogModal from "./ui/DialogModal";
import { useState } from "react";

export default function GraphFeed({
  data,
  setData,
  config,
  setNodesToBeDeleted,
  mode,
  setMode,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [node, setNode] = useState(null);

  const onClickNode = function (nodeId) {
    const node = {
      id: nodeId,
      links: data.links?.filter((l) => l.source === nodeId ),
    };
    setNode(node);
    console.log(node);

    if (mode === "delete") {
      setNodesToBeDeleted((prev) => {
        if (prev.some((n) => n.id === nodeId)) return prev;
        else return [...prev, node];
      });
      return;
    }

    setOpenDialog(true);
  };

  const onClickLink = function (source, target, event) {
    console.log(source, target, event);
  };
  return (
    <>
      <Graph
        id="graph-id"
        data={data}
        config={config}
        onClickNode={onClickNode}
        onClickLink={onClickLink}
      />

      <DialogModal
        setData={setData}
        data={data}
        setNode={setNode}
        open={openDialog}
        setOpen={setOpenDialog}
        node={node}
      />
    </>
  );
}
