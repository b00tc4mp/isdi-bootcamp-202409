import React, { useState } from 'react';
import logic from '../logic/log/index.js'
import { Label, Input, Button, Form, Field } from './library'


export default function LogBook({ onCreated }) {
  console.log('LogBook -> render')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const { target: form } = event

    const {
      date: { value: date }, depth: { value: depth }, time: { value: time }, weather: { value: weather }, temperature: { value: temperature }, visibility: { value: visibility }, waves: { value: waves }, wetSuit: { value: wetSuit }, weight: { value: weight }, tankSize: { value: tankSize }, tankBar: { value: tankBar }, feeling: { value: feeling }, diveCenter: { value: diveCenter }, divingSite: { value: divingSite }, notes: { value: notes }
    } = form

    try {
      await logic.createLog(date, depth, time, weather, temperature, visibility, waves, wetSuit, weight, tankSize, tankBar, feeling, diveCenter, divingSite, notes)
      alert("Log created successfully!")
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  return  <main className="LogBook">
    
    <h2 className="text-2xl font-bold mb-4">Dive Log Form</h2>

    <Form id="diveLogForm" className="space-y-4">

      <Field className="flex flex-col">
        <Label htmlFor="divingSite" className="font-semibold">Diving Site:</Label>
        <Input type="text" id="divingSite" name="divingSite" placeholder="Enter diving site" className="input" />  
      </Field>

      <Field className="flex flex-col">
        <Label htmlFor="date" className="font-semibold">Date:</Label>
        <Input type="date" id="date" name="date" placeholder="01/01/2024" className="input" />
      </Field>

      <Field className="flex flex-col">
        <Label htmlFor="depth" className="font-semibold">Depth (m):</Label>
        <Input type="text" id="depth" name="depth" placeholder="18m" className="input" />
      </Field>

      <Field className="flex flex-col">
        <Label htmlFor="time" className="font-semibold">Time (mins):</Label>
        <Input type="text" id="time" name="time" placeholder="45 mins" className="input" />
      </Field>

      <Field className="flex flex-col">
        <Label htmlFor="weather" className="font-semibold">Weather:</Label>
        <Input type="text" id="weather" name="weather" placeholder="Sunny, Cloudy, Rainy" className="input" />
      </Field>

      <Field className="flex flex-col">
        <Label htmlFor="temperature" className="font-semibold">Temperature (°C):</Label>
        <Input type="number" id="temperature" name="temperature" placeholder="22°" className="input" />
      </Field>

      <Field className="flex flex-col">
        <Label htmlFor="visibility" className="font-semibold">Visibility :</Label>
        <Input type="text" id="visibility" name="visibility" placeholder="Great, Good, Acceptable, Bad" className="input" />
      </Field>

      <Field className="flex flex-col">
        <Label htmlFor="waves" className="font-semibold">Waves:</Label>
        <Input type="text" id="waves" name="waves" placeholder="Calm, Choppy ... " className="input" />
      </Field>

      <Field className="flex flex-col">
        <Label htmlFor="wetSuit" className="font-semibold">Wet Suit (mm):</Label>
        <Input type="text" id="wetSuit" name="wetSuit" placeholder="3mm, 5mm, 7mm, none" className="input" />
      </Field>

      <Field className="flex flex-col">
        <Label htmlFor="weight" className="font-semibold">Weight (Kg):</Label>
        <Input type="text" id="weight" name="weight" placeholder="6Kg" className="input" />
      </Field>

      <Field className="flex flex-col">
        <Label htmlFor="tankType" className="font-semibold">Tank Size (Lt):</Label>
        <Input type="text" id="tankType" name="tankType" placeholder="10L" className="input" />
      </Field>

      <Field className="flex flex-col">
        <Label htmlFor="tankBar" className="font-semibold">Tank Bar:</Label>
        <Input type="number" id="tankBar" name="tankBar" placeholder="200" className="input" />
      </Field>

      <Field className="flex flex-col">
        <Label htmlFor="feeling" className="font-semibold">Feeling:</Label>
        <Input type="text" id="feeling" name="feeling" placeholder="Good" className="input" />
      </Field>

      <Field className="flex flex-col">
        <Label htmlFor="diveCenter" className="font-semibold">Dive Center:</Label>
        <Input type="text" id="diveCenter" name="diveCenter" placeholder="Center's Name" className="input" />
      </Field>

      <Field className="flex flex-col">
        <Label htmlFor="note" className="font-semibold">Notes:</Label>
        <Input as="textarea" id="note" name="note" className="input h-24" />
      </Field>

      <Button type="submit" className="btn-primary mt-4" onClick={handleSubmit}>Submit</Button>
    </Form>
  </main>
}



/* const LogBook = () => {
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
      const response = await fetch(`http://${import.meta.env.VITE_API_URL}/log-book`, {
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

 */