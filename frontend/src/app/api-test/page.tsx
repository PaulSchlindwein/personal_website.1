"use client";
import { useEffect, useState } from "react";

export default function ApiTest() {
  const [message, setMessage] = useState("Loading...");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Attempting to fetch from backend...");
    fetch("/api/ping", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Received data:", data);
        setMessage(data.message);
        setError("");
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setMessage("Error connecting to backend");
        setError(err.message);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>API Test</h1>
      <p>Backend says: {message}</p>
      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <strong>Error details:</strong> {error}
        </div>
      )}
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>Make sure your Flask backend is running on port 5000</p>
        <p>Check the browser console (F12) for more details</p>
      </div>
    </div>
  );
} 