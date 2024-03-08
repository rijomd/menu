import React, { ChangeEvent } from "react";
import { TextField, IconButton } from '@mui/material';
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";

export type TypeFormTextField = {
    name: string;
    value: any;
    onChange?: (data: ChangeEvent<HTMLInputElement>) => any;
    label?: string;
    placeholder?: string;
    error?: { isError: boolean; errorMsg: string | any };
    required?: boolean;
    type?: string;
    fileProps?: any;
    [others: string]: any;
}

export const FormFileField: React.FC<TypeFormTextField> = (props) => {
    const { label, placeholder, error, onChange = () => { }, value, required, type, name, fileProps, ...others
    } = props;

    return (
        <TextField
            variant="outlined"
            size="small"
            color="secondary"
            type="text"
            label={value?.name ? '' : label}
            value={value?.name}
            fullWidth={true}
            required={required}
            error={Boolean(error?.errorMsg)}
            helperText={error?.errorMsg || ""}
            disabled
            onChange={() => { }}
            InputProps={{
                endAdornment: (
                    <IconButton component="label">
                        <FileUploadOutlined />
                        <input
                            style={{ display: "none" }}
                            type="file"
                            hidden
                            name={name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
                            {...fileProps}
                        />
                    </IconButton>
                ),
            }}
            {...others}
        />
    );
};
