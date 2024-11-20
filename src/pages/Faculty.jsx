import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Faculty/Sidebar';
import DataTable from '../components/Faculty/Table';

const Faculty = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const response = await fetch('http://localhost:8000/faculty/get-faculty');
        const result = await response.json();
        setFacultyData(result.faculties || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching faculty data:', error);
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Faculty Dashboard</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataTable data={facultyData} />
        )}
      </div>
    </div>
  );
};

export default Faculty;
