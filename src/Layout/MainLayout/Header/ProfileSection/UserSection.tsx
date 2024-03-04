import { Tooltip, Avatar } from '@mui/material';
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
        <Tooltip title={'Name : ' + user.name}>
            <Avatar {...stringAvatar(user.name)} />
        </Tooltip>
    )
}