import "./App.css";
import React from "react";
import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData(() => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      alert(data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      alert("something went wrong");
      console.error(err);
    }
  };
  return (
    <>
      <form id="form" onSubmit={handleSubmit}>
        <h1>Contact Us</h1>
        <input
          type="text"
          name="name"
          placeholder="Your Name......."
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your mail....."
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Send Your message........"
          value={formData.message}
          onChange={handleChange}
          rows={7}
          required
        />

        <button type="submit">send message</button>
      </form>
    </>
  );
}

export default App;
