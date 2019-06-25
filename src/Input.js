import React from "react";
import { Form } from "semantic-ui-react";

const Input = props => {
  const { attribute, name, type, required } = props.f;

  return (
    <div>
      <Form.Field>
        <label>{name}</label>
        <input
          onChange={e => props.send(attribute, e)}
          id={attribute}
          name={attribute}
          type={type}
          required={required}
        />
      </Form.Field>
    </div>
  );
};

export default Input;
