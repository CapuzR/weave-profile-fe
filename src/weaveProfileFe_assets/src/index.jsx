import React, { useState } from 'react';
import * as React from 'react'
import ReactDOM from 'react-dom';

import { HashRouter as Router } from "react-router-dom";

import AppRouter  from './appRouter';
import TopAppBar from './topAppBar';
import Coffee from './buyMeACoffee';

import Grid from '@mui/material/Grid';
import theme from './theme';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider as MuiThemeProvider } from '@mui/system';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';


export default function Index() {
  const [identity, setIdentity] = useState(JSON.parse(localStorage.getItem('_scApp')));
  const [loading, setLoading] = useState(false);
  const [isProfileReady, setIsProfileReady] = useState(false);


  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          {
            <Backdrop style={{ zIndex: 11, color: "#0000FF" }} open={loading}>
              <CircularProgress style={{ zIndex: 11, color: "#0000FF" }} />
            </Backdrop>
          }
          <Grid container 
          sx={{
            margin: 0, 
            padding: 0, 
            minHeight: '100vh'
          }} 
          >
            <Grid item xs={12} sx={{ zIndex: 9 }}>
              <TopAppBar setIdentity={setIdentity} identity={identity} setLoading={setLoading} />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ marginTop: 15 }}>
                <AppRouter identity={identity} setLoading={setLoading} loading={loading} setIdentity={setIdentity} />
              </Grid>
            </Grid>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
              <Coffee setIdentity={setIdentity} identity={identity} setLoading={setLoading} />
            </Grid>
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ textAlign: "center" }}>
            <Grid item xs={3}>
              <Typography sx={{ mt: 2, TextAlign: "center" }}>
                Developed by: Weave 100% on-chain on The Internet Computer.
              </Typography>
              <Typography sx={{ mt: 2, TextAlign: "center" }}>
                Inspect the backend canister <a target="_blank" href="https://ic.rocks/principal/wrcb3-5qaaa-aaaal-qaahq-cai">here</a>
              </Typography>
              <Grid item xs={12}>
                  <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ textAlign: "center", marginTop: 1.5 }}>     
                      <Typography sx={{ mt: 2, TextAlign: "center", padding: 0 }}>
                          Other dApps:
                      </Typography>
                    <Grid item>
                          <a style={{ fontSize: 15, color:'#000', TextAlign: "center" }} href="https://7jb66-saaaa-aaaak-aacdq-cai.raw.ic0.app/" target="_blank">Weave Forms</a>
                      </Grid>
                      <Grid item>
                          <a style={{ fontSize: 15, color:'#000' }} href="https://elementum.one" target="_blank">Elementum</a>
                      </Grid>
                  </Grid>
              </Grid>
            </Grid>
            </Grid>
          </Grid>
        </ThemeProvider>
      </MuiThemeProvider>
    </Router>
  );
}

ReactDOM.render(<Index />, document.querySelector('#app'));