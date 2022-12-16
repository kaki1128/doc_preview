import dayjs from "dayjs";
import React from "react";
import { DatePickerController, TimeInputController } from "../../Elements/Controllers";

export default ({ field, label, name, required, form }) => {

    const type = field.details.details.timeType;
    const format = field.details.details.format;
    const presetCurrent = field.details.details.presetCurrent;

    let filling = null;
    if (type === "date") {
        filling =
            <DatePickerController
                name={name}
                label={label}
                format={format}
                required={required}
                form={form}
                presetCurrent={presetCurrent}
            />
    }
    else if (type === "time") {
        filling =
            <TimeInputController
                name={name}
                label={label}
                format={format}
                required={required}
                form={form}
                presetCurrent={presetCurrent}
            />
    }

    return (
        <>
            {filling}
        </>
    )
}