import React, { useEffect, useState } from "react";
import { date } from "zod";

const test = () => {
  const [data, setData] = useState<string | null>("");
  useEffect(() => {
    async function getData() {
      //bank runs on http://localhost:3001
      const resp = await fetch("http://localhost:3001/api/test");
      const presp = await resp.json();
      setData(presp.data);
    }
    getData();
  }, []);
  return <div>{data}</div>;
};

export default test;
