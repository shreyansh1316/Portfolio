import React from "react";
import { projects } from "../data";

export default function Projects() {
  return (
    <div className="container" id="projects">
      <h2 className="section-title">Projects</h2>
      <div className="grid">
        {projects.map((p) => (
          <a key={p.title} href={p.link} target="_blank" className="card">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}