import { Box } from '@mui/material';

import { PageOutLine } from "Components/OutLine/PageOutLine";
import { getAuthUser } from 'Services/Methods/AuthMethods';

import { CategoryList } from '../Components/CategoryList';

const DashBoard = () => {
    const user = getAuthUser();

    return (
        <PageOutLine>
            {user.userRole === 'User' ? <Box sx={{ padding: '8px' }}>
                <CategoryList />
            </Box> : <></>}
        </PageOutLine>
    )
}
export default DashBoard