import React from "react";
import { Handle, Position } from "reactflow";

export default function PersonNode({ id, data }) {
  const handleDelete = (e) => {
    e.stopPropagation(); // prevent node click
    if (data.onDelete) {
      data.onDelete(id);
    }
  };

  return (
    <div
      style={{
        width: 150,
        background: "#fff",
        borderRadius: 12,
        padding: 10,
        border: "1px solid #ddd",
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative"
      }}
    >
      {/* DELETE BUTTON */}
      <button
        onClick={handleDelete}
        style={{
          position: "absolute",
          top: 5,
          right: 5,
          background: "#ef4444",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: 22,
          height: 22,
          cursor: "pointer",
          fontSize: 12
        }}
      >
        ✕
      </button>

      {/* Top Handle */}
      <Handle type="target" position={Position.Top} />

      {/* Person Image */}
      <img
        src={data.photo || "https://via.placeholder.com/80"}
        alt="person"
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: 8
        }}
      />

      {/* Name */}
      <div style={{ fontWeight: "bold" }}>{data.label}</div>

      {/* Bottom Handle */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}