import React from 'react';
import { StatusBar } from './components/StatusBar';
import { useEffect } from 'react';
import { Proxy } from './screens/proxy/Proxy';

export default function App() {

  useEffect(() => {
    // window.backend.onMessage((msg) => {
    //   if (msg.type === "intercept_state") {
    //     console.log("INTERCEPT STATE", msg)
    //   }
    // })
    // console.log("LOADED", window.backend.onMessage().)
    window.backend.onMessage((msg) => {
      // if (msg.type === "intercept_state") {
      // }
      console.log("Intercept state:", msg);
    });
  }, [])

  return (
    <>
      {/* <StatusBar /> */}
      <Proxy />
    </>
  );
}
