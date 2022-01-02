
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

import services from './services.js';
import { canisterId } from "../../declarations/weaveProfileFe_assets";


const style = {
  position: 'relative',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function Login(props) {
    const navigate = useNavigate();

  return (
    <Grid item xs={3}>
        <Box sx={style}>
            <Grid container spacing={3} sx={{ width: '100%', textAlign: "center" }}>
                <Grid item xs={12}>
                    <Button onClick={} color="primary" variant="outlined" sx={{ width: "200px" }} onClick={(e)=>{onSignInStoic(e)}}>
                        <Grid container>
                            <Grid item xs={4}>
                                <img style={{maxWidth: '30px', height:'auto', margin:0}} src="https://entrepot.app/stoic.png"/>
                            </Grid>
                            <Grid item xs={8}>
                                Stoic wallet
                            </Grid>
                        </Grid>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button color="primary" variant="outlined" sx={{ width: "200px" }} onClick={(e)=>{onSignInPlug(e)}}>
                        <Grid container>
                            <Grid item xs={4}>
                            <img style={{maxHeight: '30px', width:'auto', margin:0}} src="https://docs.plugwallet.ooo/imgs/logo.png"/>
                            </Grid>
                            <Grid item xs={8}>
                                Plug wallet
                            </Grid>
                        </Grid>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </Grid>
  );


  async function onSignInStoic(event) {
    event.preventDefault();
    props.setLoading(true);
    const identity = await services.onSignInStoic();
    if(identity) {
      localStorage.setItem("wallet", 'Stoic');
      props.setIdentity(identity);
      props.setLoading(false);
      navigate('/profile');
    } else {
      props.setLoading(false);
    }
  };


  async function onSignInPlug(event) {
    event.preventDefault();
    props.setLoading(true);
    const identity = await services.onSignInPlug();
    if(identity){
      localStorage.setItem("_scApp", JSON.stringify(identity));
      localStorage.setItem("wallet", 'Plug');
      props.setIdentity(identity);
      props.setLoading(false);
      navigate('/profile');
    } else {
      props.setLoading(false);
    }
  }

}
