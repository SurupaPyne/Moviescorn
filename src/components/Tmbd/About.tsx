import React from "react";

const About: React.FC = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "100%", margin: "auto", color: "#fff", backgroundColor: "#272727", boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)" }}>
      <h1 style={{ color: "#F5AD42", textAlign: "center" }}>About MoviesCron</h1>
      <p style={{ textAlign: "center", fontSize: "18px", marginBottom: "20px" }}>
        Welcome to <strong>MoviesCron</strong>, your one-stop destination for discovering trending, top-rated, and latest movies.
      </p>
      <h2 style={{ color: "#F5AD42" }}>🎬 What We Offer:</h2>
      <ul style={{ lineHeight: "1.8" }}>
        <li>🚀 Discover **Trending** movies updated daily.</li>
        <li>⭐ Browse **Top Rated** films from around the world.</li>
        <li>🔥 Watch **Latest Trailers** without leaving our site.</li>
        <li>🔍 Search for your favorite movies instantly.</li>
      </ul>
      <h2 style={{ color: "#F5AD42", marginTop: "20px" }}>📡 Data Source:</h2>
      <p>
        We use the **TMDb API** to fetch the latest movie details, ratings, and trailers.
      </p>
      <h2 style={{ color: "#F5AD42", marginTop: "20px" }}>👨‍💻 Contact Us:</h2>
      <p>
        Have feedback or suggestions? Reach out to us at:  
        <strong style={{ color: "#F5AD42" }}> support@moviescron.com</strong>
      </p>
    </div>
  );
};

export default About;
