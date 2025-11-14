import React, { useState } from 'react';
import { createPatient } from '../services/api';

const PatientForm = ({ onPatientAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [conditions, setConditions] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Nombre y email son requeridos');
      return;
    }
    try {
      const newPatient = { name, email, conditions };
      const response = await createPatient(newPatient);
      onPatientAdded(response.data); // Notify parent component
      setName('');
      setEmail('');
      setConditions('');
    } catch (error) {
      console.error('Error creating patient:', error);
      alert('Error al crear el paciente');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Registrar Nuevo Paciente</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">Nombre Completo</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="conditions" className="block text-sm font-medium text-gray-600">Condiciones Médicas</label>
          <input
            type="text"
            id="conditions"
            value={conditions}
            onChange={(e) => setConditions(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Guardar Paciente
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
