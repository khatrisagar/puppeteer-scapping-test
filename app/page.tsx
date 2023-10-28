"use client";

import Image from "next/image";

export default function Home() {
  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/api/cheerio");
    const data = await res.json();

    console.log(data);
  };

  return (
    <div>
      <div>
        <button onClick={fetchData}> Call APi</button>
      </div>
    </div>
  );
}
