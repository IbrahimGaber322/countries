import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';

const Countries = ({c}) => {
    return(
        <Grid item xs={12}>
        <Paper elevation={10} sx={{width:"100%", height:"fit-content", my:1, p:2}} >
         <Typography>Name: {c.name}</Typography>
         <Typography>Independent? {c.independent? "Yes":"No"}</Typography>
         <Typography>Region: {c.region}</Typography>
         <Typography>Area: {c.area}</Typography>
        </Paper>
</Grid>
    );
}

export default Countries;