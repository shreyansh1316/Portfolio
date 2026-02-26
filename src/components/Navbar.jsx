import React from "react";

export default function Navbar() {
  const styles = {
    navbar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 40px",
      background: "rgba(15, 23, 42, 0.8)",
      backdropFilter: "blur(10px)",
      color: "white",
      fontFamily: "Segoe UI, sans-serif",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      zIndex: 1000,
    },
    logo: {
      fontSize: "1.4rem",
      fontWeight: "700",
      letterSpacing: "1px",
      cursor: "pointer",
    },
    links: {
      display: "flex",
      gap: "25px",
    },
    link: {
      textDecoration: "none",
      color: "#e2e8f0",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      position: "relative",
    },
  };

  const hoverIn = (e) => {
    e.target.style.color = "#22c55e";
    e.target.style.transform = "translateY(-2px)";
  };

  const hoverOut = (e) => {
    e.target.style.color = "#e2e8f0";
    e.target.style.transform = "translateY(0)";
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>Shreyansh Pandey</div>

      <div style={styles.links}>
        <a
          href="#about"
          style={styles.link}
          onMouseOver={hoverIn}
          onMouseOut={hoverOut}
        >
          About
        </a>
        <a
          href="#projects"
          style={styles.link}
          onMouseOver={hoverIn}
          onMouseOut={hoverOut}
        >
          Projects
        </a>
        <a
          href="#contact"
          style={styles.link}
          onMouseOver={hoverIn}
          onMouseOut={hoverOut}
        >
          Contact
        </a>
      </div>
    </div>
  );
}