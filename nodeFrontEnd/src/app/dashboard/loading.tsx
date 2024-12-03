'use client';
import { useState, CSSProperties } from "react";
import MoonLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Loading() {
  const [loading] = useState(true);
  const [color] = useState("#ffffff");

  return (
    <div className="sweet-loading"  style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }} >
      <MoonLoader />
    </div>
  );
}
