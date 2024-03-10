import React, { ChangeEvent } from "react";
import { IconButton, Typography,  FormHelperText } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";

export type TypeFormTextField = {
    name: string;
    value: any;
    onChange?: (data: ChangeEvent<HTMLInputElement>) => any;
    label?: string;
    error?: { isError: boolean; errorMsg: string | any };
    fileProps?: any;
    [others: string]: any;
}



export const FormFileField: React.FC<TypeFormTextField> = (props) => {
    const { label, error, onChange = () => { }, value, name, fileProps
    } = props;
    const theme = useTheme();

    const Wrapper = styled('div')(({ }) => ({
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${Boolean(error?.isError) ? '#f44336' : '#ccc'}`,
        borderRadius: '3px',
        padding: '0px 8px',

    }));

    return (
        <>
            <Wrapper >
                <IconButton component="label" sx={{
                    transition: 'all .2s ease-in-out',
                    background: theme.palette.secondary.light,
                    color: theme.palette.secondary.dark,
                    '&:hover': {
                        background: theme.palette.secondary.dark,
                        color: theme.palette.secondary.light
                    }
                }}>
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
                {value ?
                    <Typography variant="body2">{value?.name || value}</Typography>
                    : <Typography variant="body2">{label}</Typography>}

            </Wrapper>
            {error?.errorMsg && <FormHelperText sx={{ color: '#f44336' }} >{error.errorMsg}</FormHelperText>}
        </>
    );
};
