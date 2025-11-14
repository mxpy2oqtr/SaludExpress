import React from 'react';

const GlucoseChart = ({ results }) => {
  const glucoseReadings = results.filter(r => r.test_type === 'glucosa');

  // Simple visualization without a charting library
  const renderReadings = () => {
    if (glucoseReadings.length === 0) {
      return <p className="text-gray-500">No hay lecturas de glucosa para mostrar.</p>;
    }

    return (
      <div className="space-y-2">
        {glucoseReadings.map(reading => {
          const isCritical = reading.value > 180;
          return (
            <div key={reading.id} className={`flex justify-between items-center p-3 rounded-lg ${isCritical ? 'bg-red-100' : 'bg-green-100'}`}>
              <span className="font-medium">{new Date(reading.date).toLocaleDateString()}</span>
              <span className={`font-bold ${isCritical ? 'text-red-600' : 'text-green-700'}`}>
                {reading.value} mg/dL
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Historial de Glucosa</h2>
      {renderReadings()}
    </div>
  );
};

export default GlucoseChart;
