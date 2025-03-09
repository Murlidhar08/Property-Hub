import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function QuillEditor() {
  const [value, setValue] = useState("");

  return (
    <ReactQuill
      style={{ height: 200, marginBottom: 60 }}
      theme="snow"
      value={value}
      onChange={setValue}
    />
  );
}
