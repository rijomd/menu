import { useState } from "react"
import { Typography, Box } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';

import { FormButtonField, FormCheckBoxField } from "Components/FormElements"
import dayjs from "dayjs";

export const ItemList = ({ data, onChangeStatus, role = 'User' }:
    { data: any, onChangeStatus: (data: string, id: string,) => void, role?: string }) => {
    const [status, setStatus] = useState('');

    return (
        <table>
            <thead>
                <tr>
                    <td colSpan={5}>
                        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            <MenuIcon color="secondary" />
                            <Typography variant="body1"> Item Details</Typography>
                        </Box>
                    </td>
                </tr>
            </thead>
            <tbody>
                {data?.itemList?.map((item: any, key: number) => (
                    <tr key={key} style={{ height: '40px' }}>
                        <th>{key + 1}.</th>
                        <th colSpan={2}>{item.name}</th>
                        <th style={{ paddingLeft: '8px' }}>  {item.count} x {item.sellingPrice}</th>
                        <th style={{ paddingLeft: '8px' }}>  ₹{item.totalPrize} <Typography variant="caption">{item.offer !== 0 && `(${item.offer}% off)`}</Typography></th>
                    </tr>
                ))}
                <tr>
                    <td colSpan={5} align="right">
                        Modified at :- {dayjs(data.updatedAt).format('h:mm A')}
                    </td>
                </tr>
            </tbody>
            {(data.status !== "Closed") && <tbody>
                <tr>
                    <td colSpan={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {role !== "User" && <FormCheckBoxField
                                label="Is Approve"
                                name="status"
                                checked={status === "Approved"}
                                onChange={() => setStatus('Approved')}
                            />}
                            <FormCheckBoxField
                                label="Is Cancel"
                                name="status"
                                checked={status === "Cancelled"}
                                onChange={() => setStatus('Cancelled')}
                            />
                        </Box>
                    </td>
                    <td>
                        <FormButtonField label="Submit" onClick={() => { status === '' ? '' : onChangeStatus(status, data?._id); setStatus('') }}>
                            <KeyboardTabIcon
                                sx={{ cursor: 'pointer' }}
                            />
                        </FormButtonField>
                    </td>
                </tr>
            </tbody>}
        </table>
    )
}

