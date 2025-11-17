import React, { useState, useEffect } from 'react';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import Alerts from './components/Alerts';
import MainLayout from './components/layouts/MainLayout';
import { getPatients, getResults, getAlerts, addResult } from './services/api';
import './styles/tailwind.css';

function App() {
  const [patients, setPatients] = useState([]);
  const [results, setResults] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const patientsRes = await getPatients();
      setPatients(patientsRes.data);
      const resultsRes = await getResults();
      setResults(resultsRes.data);
      const alertsRes = await getAlerts();
      setAlerts(alertsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Cargando datos...</p>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
          <PatientForm onPatientAdded={handlePatientAdded} />
          <PatientList
            patients={patients}
            selectedPatient={selectedPatient}
            onSelectPatient={setSelectedPatient}
          />
        </div>
        <div className="md:col-span-2 space-y-8">
          <PatientDetails
            patient={selectedPatient}
            results={results}
            onAddResult={handleAddResult}
          />
          <Alerts alerts={alerts} />
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
