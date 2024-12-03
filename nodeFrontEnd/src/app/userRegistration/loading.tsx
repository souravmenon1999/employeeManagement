'use client';
import { useState, CSSProperties } from "react";
import MoonLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading"  style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
      
     <MoonLoader/>
    </div>
  );
    
  }