import React from "react";

export default function Hero() {
  const styles = {
    hero: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      color: "white",
      padding: "20px",
      fontFamily: "Segoe UI, sans-serif",
    },
    title: {
      fontSize: "3rem",
      fontWeight: "700",
      marginBottom: "10px",
      letterSpacing: "1px",
    },
    subtitle: {
      fontSize: "1.3rem",
      color: "#cbd5f5",
      marginBottom: "25px",
    },
    button: {
      padding: "12px 28px",
      fontSize: "1rem",
      borderRadius: "30px",
      border: "none",
      background: "linear-gradient(90deg, #6366f1, #22c55e)",
      color: "white",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    },
  };

  return (
    <div style={styles.hero}>
      <h1 style={styles.title}>Developer Shreyansh Pandey</h1>
      <p style={styles.subtitle}>Frontend & Full Stack Developer</p>
      <button
        style={styles.button}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.08)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
      >
        View My Projects
      </button>
    </div>
  );
}