import { Grid, Skeleton, Box } from '@mui/material';

export const ItemSkeleton = () => {
    return (
        <>
            <Grid container>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((number: number) => {
                    return <Grid item key={number}>
                        <Skeleton variant="rectangular" height={130} />
                        <Box sx={{ pt: 0.5 }}>
                            <Skeleton />
                        </Box>
                    </Grid>
                })}
            </Grid>
        </>
    )
}