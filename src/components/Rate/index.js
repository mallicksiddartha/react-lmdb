import React, { useState } from "react";

//styles
import { Content } from "./Rate.styles";

const Rate = ({ callback }) => {
    const [value, setValue] = useState(5);

    return (
        <Content>
            <div>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={value}
                    onChange={
                        e => setValue(e.currentTarget.value)
                    }
                />
            </div>
            <div>
                <span>{value}</span>
            </div>

            <div>
                <button onClick={() => callback(value)}>Rate</button>
            </div>

        </Content>
    )
}

export default Rate;