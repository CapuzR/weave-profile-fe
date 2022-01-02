import {StoicIdentity} from "ic-stoic-identity";
import { createActor as wPCreateActor } from "../../declarations/weaveProfile/index";
import { canisterId } from "../../declarations/weaveProfileFe_assets/index";
import { Principal } from '@dfinity/principal';
import { idlFactory }  from '../../declarations/weaveProfile/weaveProfile.did.js';

const host = "https://localhost:8080"
const whitelist = [canisterId, 'wrcb3-5qaaa-aaaal-qaahq-cai'];

const profile = [{
  bio: {
    givenName: [],
    familyName: [],
    username: [],
    displayName: [],
    location: [],
    about: [],
    email: [],
    phone: [],
    socials: [{
      deSo: [{
        distrikt: [],
        dscvr: [],
        openChat: [],
      }],
      ceSo: [{
        discord: [],
        twitter: [],
        instagram: [],
        facebook: [],
        tiktok: [],
      }]
    }]
  }
}];

export default {
    onSignInStoic,
    onSignOutStoic,
    onSignInPlug,
    isAuth,
    verifyConnectionAndAgent,
    profile,
    getProfile,
    updateProfile,
    wPActor,
    createProfile
};

async function updateProfile(profileData, wallet) {
  let identity;
  let actor;
  if(wallet == 'Stoic') {
    identity = await onSignInStoic();
    actor = await wPActor(identity);
  } else {
    identity = await verifyConnectionAndAgent();
    actor = await wPActorPlug();
  }
  
  let result = await actor.updateProfile(profileData);
  
  if(result.ok) {
    return true;
  } else {
    return false;
  }
};

async function createProfile(profileData, wallet) {
  let identity;
  let actor;
  if(wallet == 'Stoic') {
    identity = await onSignInStoic();
    actor = await wPActor(identity);
  } else {
    identity = await verifyConnectionAndAgent();
    actor = await wPActorPlug();
  }
  let result = await actor.createProfile(profileData);
  
  if(result.ok) {
    return true;
  } else {
    return false;
  }
}

async function wPActor(identity){
  return await wPCreateActor('wrcb3-5qaaa-aaaal-qaahq-cai', {
    agentOptions: {
      host: 'https://' + 'wrcb3-5qaaa-aaaal-qaahq-cai' + '.ic0.app',
      identity: identity
    }
  })
};

async function wPActorPlug(){
  return await window.ic.plug.createActor({
    canisterId: 'wrcb3-5qaaa-aaaal-qaahq-cai',
    interfaceFactory: idlFactory
  })
};

async function getProfile(wallet) {
  let identity;
  let actor;
  if(wallet == 'Stoic') {
    identity = onSignInStoic();
    actor = await wPActor(identity);
  } else {
    identity = await verifyConnectionAndAgent();
    actor = await wPActorPlug();
  }

  return await actor.readProfile();

};

async function isAuth(){
    StoicIdentity.load().then(async identity => {
      if (identity != false) {
        return true;
      } else {
        return false;
      }
    });
};

async function onSignInStoic() {
    const identity = await StoicIdentity.load();
    if (identity !== false) {
      return identity;
    } else {
      const identity = await StoicIdentity.connect();
      return identity;
    }
  };

async function onSignOutStoic() {
  const identity = await StoicIdentity.load();
  if (identity !== false) {
    StoicIdentity.disconnect();
    return true;
  } else {
    return false;
  }
};

async function onSignInPlug() {
  console.log(whitelist);
  const isConnected = await window.ic.plug.requestConnect({
    whitelist: whitelist
  });
  if(isConnected) {
    // Get the user principal id
    return isConnected;
  } else {
    return false;
  }
};

async function verifyConnectionAndAgent() {
  const connected = await window.ic.plug.isConnected();
  if (!connected) window.ic.plug.requestConnect({ whitelist: whitelist });
  if (connected && !window.ic.plug.agent) {
    await window.ic.plug.createAgent({ whitelist })
  }
};