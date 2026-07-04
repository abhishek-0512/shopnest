import React from "react";

const About = () => {
  return (
    <div style={containerStyle}>
      <img
        src="/dp.jpg"
        alt="profile"
        style={profileImg}
      />

      <h2 style={title}>About Me</h2>
      <h3 style={subtitle}>Shivansh Vasu (@theshivanshvasu)</h3>

      <p style={text}>
        <strong>Join the community and grow together!</strong> Welcome to my
        platform where we build, deploy, and scale modern full-stack systems.
      </p>

      <div style={linksContainer}>
        <a href="https://theshivanshvasu.com" target="_blank" rel="noreferrer" style={btn}>
          🌐 Website
        </a>

        <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ ...btn, borderColor: "#ef4444", color: "#ef4444" }}>
          📺 YouTube
        </a>

        <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ ...btn, borderColor: "#ec4899", color: "#ec4899" }}>
          📸 Instagram
        </a>

        <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ ...btn, borderColor: "#3b82f6", color: "#3b82f6" }}>
          💼 LinkedIn
        </a>

        <a href="https://x.com" target="_blank" rel="noreferrer" style={btn}>
          ✖️ X
        </a>
      </div>
    </div>
  );
};

const containerStyle = {
  maxWidth: "900px",
  margin: "50px auto",
  padding: "40px",
  background: "#18181b",
  borderRadius: "16px",
  textAlign: "center",
  border: "1px solid rgba(255,255,255,0.05)",
};

const profileImg = {
  width: "170px",
  height: "170px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "4px solid #f97316",
  marginBottom: "20px",
};

const title = {
  fontSize: "2.2rem",
  color: "#fff",
};

const subtitle = {
  color: "#f97316",
  marginBottom: "15px",
};

const text = {
  color: "#a1a1aa",
  fontSize: "1.1rem",
  lineHeight: "1.7",
  maxWidth: "600px",
  margin: "0 auto 30px",
};

const linksContainer = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "12px",
};

const btn = {
  padding: "10px 18px",
  background: "#27272a",
  color: "#fff",
  borderRadius: "8px",
  textDecoration: "none",
  border: "1px solid rgba(255,255,255,0.1)",
};

export default About;