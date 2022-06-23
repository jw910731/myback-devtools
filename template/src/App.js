import React, { useEffect } from "react";
import "./App.css";
import SDK from 'myback-sdk';

function App (){
  const sdk = new SDK();

  const fetchData = async () => {
    console.log(await sdk.getResources());
  };
  useEffect(() => {
    fetchData();
  }, []);

  return(
    <div className="App">
      <h1> Hello, World! </h1>
    </div>
  );
}

export default App;
