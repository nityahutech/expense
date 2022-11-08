import React, { useState } from "react";
// import { Input } from "antd";

import "./float.css";
import TextArea from "antd/lib/input/TextArea";
// const { TextArea } = Input;

const FloatTextArea = (props) => {
    const [focus, setFocus] = useState(false);
    let { label, value, placeholder, type, required, disabled } = props;
    if (!placeholder) placeholder = label;
    const isOccupied = focus || (value && value.length !== 0);
    const labelClass = isOccupied ? "label as-label" : "label as-placeholder";
    const requiredMark = required ? <span className="text-danger">*</span> : null;

    return (
        <div
            className="float-label"
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
        >
            <TextArea disabled={disabled} className="Textarea-Border" style={{ width: '100%', borderRadius: '10px', }}
                showCount
                maxLength={500}
                autoSize={{
                    minRows: 6,

                }}

                onChange={props.onChange} type={type} defaultValue={value} />
            <label className={labelClass}>
                {isOccupied ? label : placeholder} {requiredMark}
            </label>
        </div>

    );
};

export default FloatTextArea;