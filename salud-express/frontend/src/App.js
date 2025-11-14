import React, { useState, useEffect } from 'react';
import PatientForm from './components/PatientForm';
import GlucoseChart from './components/GlucoseChart';
import { getPatients, getResults, getAlerts, addResult } from './services/api';
import './styles/tailwind.css';

function App() {
  const [patients, setPatients] = useState([]);
  const [results, setResults] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const patientsRes = await getPatients();
      setPatients(patientsRes.data);
      const resultsRes = await getResults();
      setResults(resultsRes.data);
      const alertsRes = await getAlerts();
      setAlerts(alertsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePatientAdded = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  const handleAddResult = async (patientId, testType, value) => {
    const resultData = {
      patient_id: patientId,
      test_type: testType,
      value,
      date: new Date().toISOString(),
      notes: 'Resultado de prueba'
    };
    try {
      await addResult(resultData);
      fetchData(); // Refetch all data to update UI
    } catch (error) {
      console.error("Error adding result:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800">SaludExpress Dashboard</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Columna Izquierda: Pacientes y Formulario */}
          <div className="md:col-span-1 space-y-8">
            <PatientForm onPatientAdded={handlePatientAdded} />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-700">Pacientes</h2>
              <ul className="space-y-3">
                {patients.map(p => (
                  <li key={p.id}
                      className={`p-3 rounded-md cursor-pointer ${selectedPatient?.id === p.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      onClick={() => setSelectedPatient(p)}>
                    {p.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Columna Derecha: Resultados y Alertas */}
          <div className="md:col-span-2 space-y-8">
            {selectedPatient && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Resultados de {selectedPatient.name}</h2>
                <GlucoseChart results={results.filter(r => r.patient_id === selectedPatient.id)} />

                {/* Formulario para añadir resultado de glucosa */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-2">Registrar Nivel de Glucosa</h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const value = e.target.elements.glucose.value;
                    if (value) handleAddResult(selectedPatient.id, 'glucosa', parseFloat(value));
                    e.target.reset();
                  }}>
                    <input type="number" name="glucose" className="w-full px-3 py-2 border rounded-md" placeholder="Nivel de Glucosa (e.g., 120)"/>
                    <button type="submit" className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md">
                      Añadir Resultado
                    </button>
                  </form>
                </div>
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-red-600">Alertas Recientes</h2>
              <ul className="space-y-3">
                {alerts.map(a => (
                  <li key={a.id} className="p-3 bg-red-100 rounded-md text-red-700">
                    {a.message} - Paciente ID: {a.patient_id}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
