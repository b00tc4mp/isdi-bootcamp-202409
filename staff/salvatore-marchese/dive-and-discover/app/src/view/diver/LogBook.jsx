import React, { useState } from 'react';
import logic from '../../logic/log/index.js';
import { Label, Button, Form, Field } from '../library/index.js';
/* import { formatDate } from '../../util'; */

export default function LogBook({ onCreated }) {
  console.log('LogBook -> render');

  const handleSubmit = event => {
    event.preventDefault();

    const { target: form } = event;

    const {
      date: { value: date },
      depth: { value: depth },
      time: { value: time },
      weather: { value: weather },
      temperature: { value: temperature },
      visibility: { value: visibility },
      waves: { value: waves },
      wetSuit: { value: wetSuit },
      weight: { value: weight },
      tankSize: { value: tankSize },
      tankBar: { value: tankBar },
      feeling: { value: feeling },
      diveCenter: { value: diveCenter },
      divingSite: { value: divingSite },
      notes: { value: notes },
    } = form;

console.log(date, depth)
    try {
      logic.createLog(
        divingSite, date, depth, Number(time), weather, temperature,
        visibility, waves, wetSuit, weight, tankSize,
        tankBar, feeling, diveCenter, notes
      ) 
      .then(alert('Log created successfully'))
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
};

  return (
    <main className="LogBook">
    <form
      id="diveLogForm"
      className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md max-w-full sm:max-w-7xl md:max-w-8xl lg:max-w-9xl xl:max-w-full mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6">Dive Log Form</h2>
  
      <div>
        <label htmlFor="divingSite" className="block text-sm font-medium">Diving Site:</label>
        <input
          type="text"
          id="divingSite"
          name="divingSite"
          placeholder="Enter diving site"
          className="w-full border rounded-md p-2"
          required
        />
      </div>
  
      <div>
        <label htmlFor="date" className="block text-sm font-medium">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          className="w-full border rounded-md p-2"
          required
        />
      </div>
  
      <div>
        <label htmlFor="depth" className="block text-sm font-medium">Depth (m):</label>
        <input
          type="number"
          id="depth"
          name="depth"
          placeholder="i.e. 18"
          className="w-full border rounded-md p-2"
          required
        />
      </div>
  
      <div>
        <label htmlFor="time" className="block text-sm font-medium">Time (mins):</label>
        <input
          type="number"
          id="time"
          name="time"
          placeholder="i.e. 45"
          className="w-full border rounded-md p-2"
          required
        />
      </div>
  
      <div>
        <label htmlFor="weather" className="block text-sm font-medium">Weather:</label>
        <input
          type="text"
          id="weather"
          name="weather"
          placeholder="i.e. Sunny, Cloudy, Rainy"
          className="w-full border rounded-md p-2"
        />
      </div>
  
      <div>
        <label htmlFor="temperature" className="block text-sm font-medium">Temperature (°C):</label>
        <input
          type="number"
          id="temperature"
          name="temperature"
          placeholder="i.e. 22"
          className="w-full border rounded-md p-2"
        />
      </div>
  
      <div>
        <label htmlFor="visibility" className="block text-sm font-medium">Visibility:</label>
        <input
          type="text"
          id="visibility"
          name="visibility"
          placeholder="i.e. Great, Good, Acceptable, Bad"
          className="w-full border rounded-md p-2"
        />
      </div>
  
      <div>
        <label htmlFor="waves" className="block text-sm font-medium">Waves:</label>
        <input
          type="text"
          id="waves"
          name="waves"
          placeholder="i.e. Calm, Choppy ..."
          className="w-full border rounded-md p-2"
        />
      </div>
  
      <div>
        <label htmlFor="wetSuit" className="block text-sm font-medium">Wet Suit (mm):</label>
        <input
          type="number"
          id="wetSuit"
          name="wetSuit"
          placeholder="i.e. 0, 3, 5, 7"
          className="w-full border rounded-md p-2"
        />
      </div>
  
      <div>
        <label htmlFor="weight" className="block text-sm font-medium">Weight (Kg):</label>
        <input
          type="number"
          id="weight"
          name="weight"
          placeholder="i.e. 6"
          className="w-full border rounded-md p-2"
        />
      </div>
  
      <div>
        <label htmlFor="tankSize" className="block text-sm font-medium">Tank Size (Lt):</label>
        <input
          type="number"
          id="tankSize"
          name="tankSize"
          placeholder="i.e. 8, 10, 12"
          className="w-full border rounded-md p-2"
        />
      </div>
  
      <div>
        <label htmlFor="tankBar" className="block text-sm font-medium">Tank Bar:</label>
        <input
          type="number"
          id="tankBar"
          name="tankBar"
          placeholder="i.e. 200"
          className="w-full border rounded-md p-2"
        />
      </div>
  
      <div>
        <label htmlFor="feeling" className="block text-sm font-medium">Feeling:</label>
        <input
          type="text"
          id="feeling"
          name="feeling"
          placeholder="Max 200 characters"
          className="w-full border rounded-md p-2"
        />
      </div>
  
      <div>
        <label htmlFor="diveCenter" className="block text-sm font-medium">Dive Center:</label>
        <input
          type="text"
          id="diveCenter"
          name="diveCenter"
          placeholder="Center's Name"
          className="w-full border rounded-md p-2"
        />
      </div>
  
      <div>
        <label htmlFor="notes" className="block text-sm font-medium">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          className="w-full border rounded-md p-2 h-40"
          placeholder="Max 400 characters..."
          maxLength="400"
        ></textarea>
      </div>
  
      <button type="submit" className="bg-blue-600 text-yellow-400 py-2 px-4 rounded-md hover:bg-blue-600">
        Submit
      </button>
    </form>
  </main>
  );
}