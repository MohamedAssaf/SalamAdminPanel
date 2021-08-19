import { Form } from "react-bootstrap";

function DynamicFormLabel({ text, lang }) {
  return (
    <Form.Label style={lang == "en" ? { float: "left" } : { float: "right" }}>
      {text}
    </Form.Label>
  );
}

export default DynamicFormLabel;
