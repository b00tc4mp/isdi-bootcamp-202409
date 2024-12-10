import React, { useState } from 'react';

const LogBook = () => {
  const [formData, setFormData] = useState({
    divingSite: '',
    date: '',
    depth: '',
    time: '',
    weather: '',
    temperature: '',
    visibility: '',
    waves: '',
    wetSuit: '',
    weight: '',
    tankType: '',
    tankBar: '',
    feeling: '',
    diveCenter: '',
    note: ''
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://${import.meta.env.VITE_API_URL}/logbook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('LogBook entry saved:', result);

      // Reset form after submission
      setFormData({
        divingSite: '',
        date: '',
        depth: '',
        time: '',
        weather: '',
        temperature: '',
        visibility: '',
        waves: '',
        wetSuit: '',
        weight: '',
        tankType: '',
        tankBar: '',
        feeling: '',
        diveCenter: '',
        note: ''
      });
    } catch (error) {
      console.error('Error saving logbook entry:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map((key) => (
        <div key={key} className="form-group">
          <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
          <input
            type={key === 'date' ? 'date' : 'text'}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button type="submit">Save Log Entry</button>
    </form>
  );
};

export default LogBook;