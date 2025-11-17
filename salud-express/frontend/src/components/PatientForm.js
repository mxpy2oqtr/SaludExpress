import React, { useState } from 'react';
import { createPatient } from '../services/api';

const PatientForm = ({ onPatientAdded }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !dob) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    try {
      const newPatient = { name, dob };
      const response = await createPatient(newPatient);
      onPatientAdded(response.data);
      setName('');
      setDob('');
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Registrar Nuevo Paciente</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">Nombre</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre completo"
          />
        </div>
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-600">Fecha de Nacimiento</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Registrar Paciente
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
