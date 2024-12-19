import React, { useState } from 'react';
import logic from '../../logic/log/index.js';
import { Label, Button, Form, Field } from '../library/index.js';
/* import { formatDate } from '../../util'; */

export default function LogBook({ onCreated }) {
  console.log('LogBook -> render');

  const handleSubmit = async (event) => {
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


    try {
      await logic.createLog(
        divingSite, date, depth, Number(time), weather, temperature,
        visibility, waves, wetSuit, weight, tankSize,
        tankBar, feeling, diveCenter, notes
      );
      alert('Log created successfully!');
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
};

  return (
    <main className="LogBook">
      <Form id="diveLogForm" className="space-y-6" onSubmit={handleSubmit}>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-full sm:max-w-7xl md:max-w-8xl lg:max-w-9xl xl:max-w-full mx-auto">
          <h2 className="text-2xl font-bold mb-6">Dive Log Form</h2>

          <Field className="flex flex-col">
            <Label htmlFor="divingSite" className="font-semibold">Diving Site:</Label>
            <input type="text" id="divingSite" name="divingSite" placeholder="Enter diving site" className="input" />
          </Field>

          <Field className="flex flex-col">
            <Label htmlFor="date" className="font-semibold">Date:</Label>
            <input type="date" id="date" name="date" className="input" />
          </Field>

          <Field className="flex flex-col">
            <Label htmlFor="depth" className="font-semibold">Depth (m):</Label>
            <input type="number" id="depth" name="depth" placeholder="i.e. 18" className="input" />
          </Field>

          <Field className="flex flex-col">
            <Label htmlFor="time" className="font-semibold">Time (mins):</Label>
            <input type="number" id="time" name="time" placeholder="i.e. 45" className="input" />
          </Field>

          <Field className="flex flex-col">
            <Label htmlFor="weather" className="font-semibold">Weather:</Label>
            <input type="text" id="weather" name="weather" placeholder="i.e. Sunny, Cloudy, Rainy" className="input" />
          </Field>

          <Field className="flex flex-col">
            <Label htmlFor="temperature" className="font-semibold">Temperature (°C):</Label>
            <input type="number" id="temperature" name="temperature" placeholder="i.e. 22" className="input" />
          </Field>

          <Field className="flex flex-col">
            <Label htmlFor="visibility" className="font-semibold">Visibility:</Label>
            <input type="text" id="visibility" name="visibility" placeholder="i.e. Great, Good, Acceptable, Bad" className="input" />
          </Field>

          <Field className="flex flex-col">
            <Label htmlFor="waves" className="font-semibold">Waves:</Label>
            <input type="text" id="waves" name="waves" placeholder="i.e. Calm, Choppy ..." className="input" />
          </Field>

          <Field className="flex flex-col">
            <Label htmlFor="wetSuit" className="font-semibold">Wet Suit (mm):</Label>
            <input type="number" id="wetSuit" name="wetSuit" placeholder="i.e. 0, 3, 5, 7" className="input" />
          </Field>

          <Field className="flex flex-col">
            <Label htmlFor="weight" className="font-semibold">Weight (Kg):</Label>
            <input type="number" id="weight" name="weight" placeholder="i.e. 6" className="input" />
          </Field>

          <Field className="flex flex-col">
            <Label htmlFor="tankSize" className="font-semibold">Tank Size (Lt):</Label>
            <input type="number" id="tankSize" name="tankSize" placeholder="i.e. 8, 10, 12" className="input" />
          </Field>

          <Field className="flex flex-col">
            <Label htmlFor="tankBar" className="font-semibold">Tank Bar:</Label>
            <input type="number" id="tankBar" name="tankBar" placeholder="i.e. 200" className="input" />
          </Field>

          <Field className="flex flex-col">
            <Label htmlFor="feeling" className="font-semibold">Feeling:</Label>
            <input type="text" id="feeling" name="feeling" placeholder="i.e. Good time today" className="input" />
          </Field>

          <Field className="flex flex-col">
            <Label htmlFor="diveCenter" className="font-semibold">Dive Center:</Label>
            <input type="text" id="diveCenter" name="diveCenter" placeholder="Center's Name" className="input" />
          </Field>

          <Field className="flex flex-col">
            <Label htmlFor="notes" className="font-semibold">Notes:</Label>
            <input
              as="textarea"
              id="notes"
              name="notes"
              className="input h-40"
              placeholder="Max 400 characters..."
              maxLength="400"
            />
          </Field>

          <Button type="submit" className="btn-primary mt-6">Submit</Button>
        </div>
      </Form>
    </main>
  );
}