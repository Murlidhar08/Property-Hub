// Packages
import ReactQuill from "react-quill";
import DOMPurify from 'dompurify';

// Style
import "react-quill/dist/quill.snow.css";

export default function QuillEditor({ value, onChange }) {
  const onEditorChange = (value) => {
    // Sanitize the editor value
    let sanitizedValue = DOMPurify.sanitize(value);

    onChange(sanitizedValue);
  }
  return (
    <ReactQuill
      style={{ height: 200, marginBottom: 60 }}
      theme="snow"
      value={value}
      onChange={onEditorChange}
    />
  );
}
