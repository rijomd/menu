import { Tooltip, Avatar, Box, Typography } from '@mui/material';
import { getAuthUser } from 'Services/Methods/AuthMethods';

export const UserSection = () => {
    const user = getAuthUser();

    function stringAvatar(name: string) {
        return {
            sx: {
                textTransform: 'uppercase'
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[0][3]}`,
        };
    }

    return (
        <Tooltip title={
            <Box >
                <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
                    <Typography variant='h6' color='Background'>{'Name : '}</Typography>
                    <Typography variant='h6' color='Background'>{user.name}</Typography>
                </Box>
                <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
                    <Typography variant='h6' color='Background'>{'Location : '}</Typography>
                    <Typography variant='h6' color='Background'>{user?.locationName || "Head"}</Typography>
                </Box>
            </Box>
        }>
            <Avatar {...stringAvatar(user.name)} />
        </Tooltip>
    )
}