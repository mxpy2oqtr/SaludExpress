import React from 'react';

const Alerts = ({ alerts }) => (
  <div className="card">
    <h2 className="text-2xl font-bold mb-4 text-red-600">Alertas Recientes</h2>
    {alerts.length > 0 ? (
      <ul className="space-y-3">
        {alerts.map(a => (
          <li key={a.id} className="p-3 bg-red-100 rounded-md text-red-700 font-semibold">
            {a.message} - Paciente ID: {a.patient_id}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No hay alertas recientes.</p>
    )}
  </div>
);

export default Alerts;
