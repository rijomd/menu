import { useState } from "react"
import { Typography, Box } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';

import { FormCheckBoxField } from "Components/FormElements"

export const ItemList = ({ data, onChangeStatus, role = 'User' }:
    { data: any, onChangeStatus: (data: string, id: string,) => void, role?: string }) => {
    const [status, setStatus] = useState('');

    return (
        <table>
            <thead>
                <tr>
                    <td colSpan={4}>
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
                        <th>  ₹{item.sellingPrice}</th>
                    </tr>
                ))}
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
                        <KeyboardTabIcon color="secondary" onClick={() => { status === '' ? '' : onChangeStatus(status, data?._id); setStatus('') }} />
                    </td>
                </tr>
            </tbody>}
        </table>
    )
}

