import React, { useEffect, useState } from "react";
import { InputController } from "../Elements/Controllers";
import { useFieldArray } from "react-hook-form";
import { Button, Grid, IconButton, Popover, Radio, Typography } from "@mui/material";
import TextInputField from "../../rhf/TextInputField";
import { Delete } from "@mui/icons-material";

export default ({ index, form, control = form.control }) => {

    const { fields, remove, append } = useFieldArray({
        control,
        name: `ArrayField.${index}.details.selections`
    });

    const [selectedValue, setSelectedValue] = useState();
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        form.setValue(`ArrayField.${index}.details.details.default`,
            form.getValues(`ArrayField.${index}.details.selections.${parseInt(event.target.value)}`))
    };
    const handleClick = (event) => {
        if (event.target.value === selectedValue) {
            setSelectedValue("");
            form.setValue(`ArrayField.${index}.details.details.default`, "")
        }
    };

    //Radio button disabled
    useEffect(() => {
        form.setValue(`ArrayField.${index}.details.details.default`,
            form.getValues(`ArrayField.${index}.details.selections.${selectedValue}`))
    }, [form.getValues(`ArrayField.${index}.details.selections.${selectedValue}`)])

    //Set-Default hint popover
    const [anchorEl, setAnchorEl] = useState(null);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    //Append button styling
    const [appendButton, setAppendButton] = useState(false)

    return (
        <Grid item xs={12}>
            Selections:&emsp;
            {fields.map((nestedItem, nestedIndex) => {
                return (
                    <Grid container spacing={1} key={nestedItem.id}>
                        <Grid item xs={2}>
                            <Radio
                                checked={selectedValue === `${nestedIndex}`}
                                onChange={handleChange}
                                onClick={handleClick}
                                value={nestedIndex}
                                name="radio-buttons"
                                size="small"
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                            // disabled
                            />
                            <Popover
                                id="mouse-over-popover"
                                sx={{
                                    pointerEvents: 'none',
                                }}
                                open={open}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                onClose={handlePopoverClose}
                                disableRestoreFocus
                            >
                                <Typography sx={{ p: 1, fontSize: "12px" }}>Set this as default value</Typography>
                            </Popover>
                        </Grid>

                        <Grid item xs={8}>
                            <TextInputField
                                form={form}
                                name={`ArrayField.${index}.details.selections.${nestedIndex}`}
                                required={true}
                            />
                            {form.formState.errors.ArrayField?.[index]?.fieldName &&
                                (<div style={{ color: "red", fontSize: "12px" }}>
                                    *This field is Required
                                </div>)
                            }
                        </Grid>

                        <Grid item xs={1}>
                            <IconButton
                                onClick={() => {
                                    remove(nestedIndex)
                                    if (nestedIndex == selectedValue) {
                                        form.setValue(`ArrayField.${index}.details.details.default`, "")
                                        setSelectedValue("")
                                    }
                                }}>
                                <Delete fontSize="small" />
                            </IconButton>
                        </Grid>
                    </Grid>
                )
            })}

            <Button type="button" variant="outlined" size="small"
                onClick={() => { append(); setAppendButton(true) }}
                style={appendButton ? { marginTop: "5px" } : {}}
            >
                Append Selection
            </Button>
        </Grid>
    )
} 