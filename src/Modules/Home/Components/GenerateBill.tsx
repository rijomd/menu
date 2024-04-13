import { styled, Box } from "@mui/system";
import MapsUgcIcon from '@mui/icons-material/MapsUgc';

import { Typography } from "@mui/material";

const Wrapper = styled('div')(({ }) => ({
    height: '20vh',
    display: 'flex',
    alignItems: 'center',
    background: '#f4f4f48c',
    border: "3px dotted #ccc",
    justifyContent: 'center',
    width: '30%',
    position: 'relative',
    cursor: 'pointer'
}));

export const GenerateBill = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', height: '50vh', alignItems: 'center' }}>
            <Wrapper>
                <MapsUgcIcon color="secondary"
                    sx={{ position: 'absolute', top: '-25%', right: '-9%', width: '50px', height: '50px' }} />
                <Typography sx={{ textAlign: 'center' }} variant="h6">Generate Your Bill</Typography>
            </Wrapper>
        </Box>
    )
}

