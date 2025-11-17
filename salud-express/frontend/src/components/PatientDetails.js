import React from 'react';
import GlucoseChart from './GlucoseChart';

const PatientDetails = ({ patient, results, onAddResult }) => {
  if (!patient) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-700">Seleccione un paciente</h2>
        <p className="mt-2 text-gray-500">Elija un paciente de la lista para ver sus detalles y resultados.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Resultados de {patient.name}</h2>
      <GlucoseChart results={results.filter(r => r.patient_id === patient.id)} />

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-2">Registrar Nivel de Glucosa</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const value = e.target.elements.glucose.value;
            if (value) onAddResult(patient.id, 'glucosa', parseFloat(value));
            e.target.reset();
          }}
        >
          <input
            type="number"
            name="glucose"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Nivel de Glucosa (e.g., 120)"
          />
          <button
            type="submit"
            className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md"
          >
            Añadir Resultado
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientDetails;
