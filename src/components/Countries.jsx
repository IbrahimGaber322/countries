import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';

const Countries = ({c}) => {
    return(
        <Grid item xs={12}>
        <Paper elevation={10} sx={{width:"100%", height:"fit-content", p:2, borderRadius:3}} >
         <Typography color={"#008080"} variant='h6'>Name: <span style={{color:"blue"}}>{c.name}</span></Typography>
         <Typography color={"#008080"} variant='h6'>Region: <span style={{color:"green"}}>{c.region}</span></Typography>
         <Typography color={"#008080"} variant='h6'>Area: <span style={{color:"red"}}>{c.area}</span></Typography>
        </Paper>
</Grid>
    );
}

export default Countries;