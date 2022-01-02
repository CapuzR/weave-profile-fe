    import React from 'react';

  import Login from './login';
  import  Profile from './profile';
  import {
    Routes,
    Route,
  } from "react-router-dom";

export default function AppRouter(props) {
    return (
            <div>
                <Routes>
                    <Route path="/profile" element={<Profile identity={props.identity} setLoading={props.setLoading} loading={props.loading}/>} />
                    <Route path="/" element={<Login identity={props.identity} setLoading={props.setLoading} loading={props.loading} setIdentity={props.setIdentity} />} />
                </Routes>
            </div>
    );
};