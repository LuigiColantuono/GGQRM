import React, { useState } from 'react';
import QrCodePreview from './QrCodePreview.jsx';
import Modal from './Modal.jsx';

const Dashboard = ({ savedQRCodes, onEdit, onDelete }) => {
    const [codeToDelete, setCodeToDelete] = useState(null);
    
    const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" /></svg>;
    const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
    const ScanIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

    const handleConfirmDelete = () => {
        if (codeToDelete) {
            onDelete(codeToDelete.id);
            setCodeToDelete(null);
        }
    };

    return (
        <main className="flex-1 flex flex-col p-6 overflow-y-auto">
            <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
            {savedQRCodes.length === 0 ? (
                <div className="flex-grow flex items-center justify-center text-center text-gray-400 rounded-lg border-2 border-dashed border-[#2a2a2a]">
                    <div>
                        <p className="text-lg">Your dashboard is empty.</p>
                        <p className="text-sm">Create and save a QR code to see it here.</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {savedQRCodes.slice().reverse().map(code => (
                        <div key={code.id} className="bg-[#1c1c1c] rounded-lg border border-[#2a2a2a] p-4 flex flex-col justify-between transition-shadow hover:shadow-lg hover:shadow-[#00f0a0]/10">
                            <div>
                                <div className="flex justify-between items-start mb-3">
                                    <h2 className="font-bold text-white pr-2 break-all">{code.name}</h2>
                                    <span className="text-xs text-gray-500 flex-shrink-0">{new Date(code.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <QrCodePreview 
                                            options={{...code.options, data: code.trackingUrl, width: 120, height: 120, margin: 4}} 
                                            showDownloads={false} 
                                        />
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                       <div className="flex items-center text-lg font-bold text-white">
                                            <ScanIcon />
                                            <span>{code.scans}</span>
                                       </div>
                                       <p className="text-sm text-gray-400">Scans</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-[#2a2a2a]">
                                <button onClick={() => onEdit(code)} className="p-2 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded-md transition-colors" aria-label="Edit QR Code"><EditIcon /></button>
                                <button onClick={() => setCodeToDelete(code)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-[#2a2a2a] rounded-md transition-colors" aria-label="Delete QR Code"><DeleteIcon /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Modal isOpen={!!codeToDelete} onClose={() => setCodeToDelete(null)} title="Confirm Deletion">
                {codeToDelete && (
                    <div className="space-y-6">
                        <p className="text-gray-300">
                            Are you sure you want to delete the QR code named <strong className="text-white break-all">{codeToDelete.name}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3 pt-2">
                            <button type="button" onClick={() => setCodeToDelete(null)} className="py-2 px-4 rounded-lg bg-[#3a3a3a] text-gray-300 hover:bg-[#4a4a4a] transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleConfirmDelete} className="py-2 px-4 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-colors">
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </main>
    );
};
export default Dashboard;
