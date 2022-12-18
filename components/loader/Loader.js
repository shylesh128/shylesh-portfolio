import Head from "next/head";
import React from "react";

const Loader = () => {
  return (
    <div>
      <Head>
        <title>Loading</title>
      </Head>

      <div className="loader">
        <div className="pacman">
          <span className="top"></span>
          <span className="bottom"></span>
          <span className="left"></span>
          <div className="eye"></div>
        </div>
      </div>

      <div className="loader2">
        <div className="pacman pacman2">
          <span className="top"></span>
          <span className="bottom"></span>
          <span className="left"></span>
          <div className="eye"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
