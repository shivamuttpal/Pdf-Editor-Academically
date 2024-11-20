import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DataTable = ({ data }) => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isPdf, setIsPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  const openModal = (faculty) => {
    setSelectedFaculty(faculty);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFaculty(null);
    setIsModalOpen(false);
  };

  const handleViewImage = async (fileId) => {
    setIsViewing(true); // Start loading
    const fileExtension = fileId.split('.').pop();
    const isPdfFile = fileExtension === 'pdf';
    setIsPdf(isPdfFile);

    try {
      const response = await axios.get(`http://localhost:8000/sales/assets/preview?key=${fileId}`, {
        responseType: 'blob',
        headers: {
          Accept: isPdfFile ? 'application/pdf' : 'image/*', // Set expected file type
        },
      });

      const blob = new Blob([response.data], { type: isPdfFile ? 'application/pdf' : 'image/*' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setIsPdfModalOpen(true); // Open the modal
    } catch (error) {
      console.error('Error loading file:', error);
      toast.error('Failed to load file.');
    } finally {
      setIsViewing(false); // End loading
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Topic</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item._id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } hover:bg-blue-50`}
              >
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.topic}</td>
                <td className="border px-4 py-2">{item.status}</td>
                <td className="border px-4 py-2 flex space-x-4">
                  <button
                    onClick={() => openModal(item)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleViewImage(item.file)}
                    className={`px-4 py-2 rounded ${
                      isViewing
                        ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                    disabled={isViewing}
                  >
                    {isViewing ? 'Loading...' : 'View File'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Faculty Details */}
      {isModalOpen && selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4">
            <h2 className="text-xl font-bold mb-4">Faculty Details</h2>
            <p><strong>ID:</strong> {selectedFaculty._id}</p>
            <p><strong>Name:</strong> {selectedFaculty.name}</p>
            <p><strong>Topic:</strong> {selectedFaculty.topic}</p>
            <p><strong>Status:</strong> {selectedFaculty.status}</p>
            <p><strong>Faculty Email:</strong> {selectedFaculty.faculty}</p>
            <p><strong>Created By:</strong> {selectedFaculty.createdBy}</p>
            <p><strong>Created At:</strong> {new Date(selectedFaculty.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(selectedFaculty.updatedAt).toLocaleString()}</p>
            <div className="mt-4 text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for File Preview */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4">
            <h2 className="text-xl font-bold mb-4">File Preview</h2>
            {isPdf ? (
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0`}
                title="PDF Preview"
                className="w-full h-96"
                frameBorder="0"
              ></iframe>
            ) : (
              <img src={pdfUrl} alt="File Preview" className="w-full h-auto" />
            )}
            <div className="mt-4 text-right">
              <button
                onClick={() => setIsPdfModalOpen(false)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
