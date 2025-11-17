import React from 'react';

const PatientList = ({ patients, selectedPatient, onSelectPatient }) => (
  <div className="card">
    <h2 className="text-2xl font-bold mb-4 text-gray-700">Pacientes</h2>
    <ul className="space-y-3">
      {patients.map(p => (
        <li
          key={p.id}
          className={`p-3 rounded-md cursor-pointer transition-all duration-200 ${
            selectedPatient?.id === p.id
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-200 hover:bg-blue-100'
          }`}
          onClick={() => onSelectPatient(p)}
        >
          {p.name}
        </li>
      ))}
    </ul>
  </div>
);

export default PatientList;
