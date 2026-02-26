import React from "react";
import { skills } from "../data";

export default function Skills() {
  return (
    <div className="container">
      <h2 className="section-title">Technical Skills</h2>
      <div className="grid">
        {Object.entries(skills).map(([key, list]) => (
          <div key={key} className="card">
            <h3>{key}</h3>
            <ul>
              {list.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}