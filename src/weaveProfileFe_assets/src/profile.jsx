import { useState, useEffect } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Form from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import services from './services.js';
import validations from './utils/validations';


const style = {
  position: 'relative',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Profile(props) {
  const [value, setValue] = useState(0);
  const [ profileState, setProfileState ] = useState(services.profile);

  useEffect(async ()=>{
    props.setLoading(true);
    let profile = await services.getProfile(localStorage.getItem('wallet'));
    props.setLoading(false);
    if((localStorage.getItem('wallet') == 'Stoic' && "ok" in profile) || (localStorage.getItem('wallet') == 'Plug' && profile)) {
      let pD = {
        bio: {
          givenName: profile.ok.bio.givenName || [],
          familyName:profile.ok.bio.familyName || [],
          username: profile.ok.bio.username || [],
          displayName: profile.ok.bio.displayName || [],
          location: profile.ok.bio.location || [],
          about: profile.ok.bio.about || [],
          email: profile.ok.bio.email || [],
          phone: profile.ok.bio.phone || [],
          socials: [{
            deSo: [{
              distrikt: profile.ok.bio.socials && profile?.ok.bio.socials.length != 0 && profile.ok.bio.socials[0].deSo && profile?.ok.bio.socials[0].deSo.length != 0 && profile?.ok.bio.socials[0]?.deSo[0]?.distrikt || [],
              dscvr: profile.ok.bio.socials && profile?.ok.bio.socials.length != 0 && profile.ok.bio.socials[0].deSo && profile?.ok.bio.socials[0].deSo.length != 0 && profile?.ok.bio.socials[0]?.deSo[0]?.dscvr || [],
              openChat: profile.ok.bio.socials && profile?.ok.bio.socials.length != 0 && profile.ok.bio.socials[0].deSo && profile?.ok.bio.socials[0].deSo.length != 0 && profile?.ok.bio.socials[0]?.deSo[0]?.openChat || [],
            }],
            ceSo: [{
              discord: profile.ok.bio.socials && profile?.ok.bio.socials.length != 0 && profile.ok.bio.socials[0].ceSo && profile?.ok.bio.socials[0].ceSo.length != 0 && profile?.ok.bio.socials[0]?.ceSo[0]?.discord || [],
              twitter: profile.ok.bio.socials && profile?.ok.bio.socials.length != 0 && profile.ok.bio.socials[0].ceSo && profile?.ok.bio.socials[0].ceSo.length != 0 && profile?.ok.bio.socials[0]?.ceSo[0]?.twitter || [],
              instagram: profile.ok.bio.socials && profile?.ok.bio.socials.length != 0 && profile.ok.bio.socials[0].ceSo && profile?.ok.bio.socials[0].ceSo.length != 0 && profile?.ok.bio.socials[0]?.ceSo[0]?.instagram || [],
              facebook: profile.ok.bio.socials && profile?.ok.bio.socials.length != 0 && profile.ok.bio.socials[0].ceSo && profile?.ok.bio.socials[0].ceSo.length != 0 && profile?.ok.bio.socials[0]?.ceSo[0]?.facebook || [],
              tiktok: profile.ok.bio.socials && profile?.ok.bio.socials.length != 0 && profile.ok.bio.socials[0].ceSo && profile?.ok.bio.socials[0].ceSo.length != 0 && profile?.ok.bio.socials[0]?.ceSo[0]?.tiktok || [],
            }]
          }]
        }
      };
      setProfileState([pD]);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleProfileChange = (key, val, level) => {
    const newState = profileState;
    if(level == "Bio") newState[0].bio[key] = [val];
    if(level == "DeSo" && newState[0].bio.socials.length != 0) if(newState[0].bio.socials[0].deSo.length != 0) newState[0].bio.socials[0].deSo[0][key] = [val];
    if(level == "CeSo" && newState[0].bio.socials.length != 0) if(newState[0].bio.socials[0].ceSo.length != 0) newState[0].bio.socials[0].ceSo[0][key] = [val];
    
    setProfileState([...newState]);
  };

  const handleSubmit = async ()=> {
    if(!validations.isAValidEmail(profileState[0].bio.email) && profileState[0].bio.email != "")  {
      window.alert("Wrong email format.");
    } else {
      props.setLoading(true);
      const profile = await services.getProfile(localStorage.getItem('wallet'))
      if((localStorage.getItem('wallet') == 'Stoic' && "ok" in profile) || (localStorage.getItem('wallet') == 'Plug' && profile)) {
        services.updateProfile(...profileState, localStorage.getItem('wallet'));
        props.setLoading(false);
      } else {
        services.createProfile(...profileState, localStorage.getItem('wallet'));
        props.setLoading(false);
      }
    }
  };

  return (
    <Grid item xs={3}>
      {
      <Backdrop sx={{ zIndex: 11, color: "#fff" }} open={props.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      }
        <Box sx={style}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Bio" {...a11yProps(0)} />
                <Tab label="DeSo" {...a11yProps(2)} />
                <Tab label="CeSo" {...a11yProps(3)} />
                <Tab label="Wallets (Soon)" disabled {...a11yProps(1)} />
              </Tabs>
          </Box>
          <Typography style={{padding: 25, paddingBottom: 0}}>All optional: Just fill those you feel comfortable with.</Typography>
          <Form
          onSubmit={handleSubmit}
          id="profile"
          >
            <TabPanel value={value} index={0}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                      label="Display Name"
                      name="displayName"
                      value={profileState[0].bio.displayName || ""}
                      onChange={(e) => handleProfileChange("displayName", e.target.value, "Bio")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      label="Username"
                      name="username"
                      value={profileState[0].bio.username || ""}
                      onChange={(e) => handleProfileChange("username", e.target.value, "Bio")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      label="First Name"
                      name="givenName"
                      value={profileState[0].bio.givenName || ""}
                      onChange={(e) => handleProfileChange("givenName", e.target.value, "Bio")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      label="Last Name"
                      name="familyName"
                      value={profileState[0].bio.familyName || ""}
                      onChange={(e) => handleProfileChange("familyName", e.target.value, "Bio")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      label="Email"
                      name="email"
                      value={profileState[0].bio.email || ""}
                      onChange={(e) => { handleProfileChange("email", e.target.value, "Bio");}}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      label="Phone"
                      name="phone"
                      value={profileState[0].bio.phone || ""}
                      onChange={(e) => handleProfileChange("phone", e.target.value, "Bio")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      label="Location"
                      name="location"
                      value={profileState[0].bio.location[0] || ""}
                      onChange={(e) => handleProfileChange("location", e.target.value, "Bio")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      label="About"
                      name="about"
                      multiline
                      value={profileState[0].bio.about || ""}
                      onChange={(e) => handleProfileChange("about", e.target.value, "Bio")}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                      label="Distrikt"
                      name="distrikt"
                      value={profileState[0].bio.socials[0]?.deSo[0]?.distrikt || ""}
                      onChange={(e) => handleProfileChange("distrikt", e.target.value, "DeSo")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      label="Dscvr"
                      name="dscvr"
                      value={profileState[0].bio.socials[0]?.deSo[0]?.dscvr || ""}
                      onChange={(e) => handleProfileChange("dscvr", e.target.value, "DeSo")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      label="Openchat"
                      name="openchat"
                      value={profileState[0].bio.socials[0]?.deSo[0]?.openChat || ""}
                      onChange={(e) => handleProfileChange("openChat", e.target.value, "DeSo")}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                      label="Discord"
                      name="discord"
                      value={profileState[0].bio.socials[0]?.ceSo[0]?.discord || ""}
                      onChange={(e) => handleProfileChange("discord", e.target.value, "CeSo")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      label="Twitter"
                      name="twitter"
                      value={profileState[0].bio.socials[0]?.ceSo[0]?.twitter || ""}
                      onChange={(e) => handleProfileChange("twitter", e.target.value, "CeSo")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      label="Instagram"
                      name="instagram"
                      value={profileState[0].bio.socials[0]?.ceSo[0]?.instagram || ""}
                      onChange={(e) => handleProfileChange("instagram", e.target.value, "CeSo")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      label="Facebook"
                      name="facebook"
                      value={profileState[0].bio.socials[0]?.ceSo[0]?.facebook || ""}
                      onChange={(e) => handleProfileChange("facebook", e.target.value, "CeSo")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      label="Tiktok"
                      name="tiktok"
                      value={profileState[0].bio.socials[0]?.ceSo[0]?.tiktok || ""}
                      onChange={(e) => handleProfileChange("tiktok", e.target.value, "CeSo")}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            {/* <Grid item xs={6}> */}
              <Button style={{marginLeft: "15px"}} onClick={handleSubmit} form="profile">
                  Update
              </Button>
            {/* </Grid> */}
          </Form>
        </Box>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Bio
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
    </Grid>
  );
}
