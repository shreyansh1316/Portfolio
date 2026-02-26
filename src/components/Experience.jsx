import React from "react";
import { experiences } from "../data";

export default function Experience() {
  return (
    <div className="container">
      <h2 className="section-title">Experience</h2>
      {experiences.map((exp) => (
        <div key={exp.role} className="card">
          <h3>{exp.role}</h3>
          <p>
            {exp.company} | {exp.period}
          </p>
          <ul>
            {exp.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
