// 📄 src/components/DownloadModal.jsx
import React from 'react';

const DownloadModal = ({ 
  isOpen, 
  onClose, 
  onDownload, 
  downloading, 
  groomCount, 
  brideCount, 
  totalCount 
}) => {
  if (!isOpen) return null;

  const downloadOptions = [
    {
      type: 'groom',
      label: "Groom's Family",
      count: groomCount,
      icon: "👦",
      color: "blue",
      disabled: groomCount === 0
    },
    {
      type: 'bride',
      label: "Bride's Family",
      count: brideCount,
      icon: "👰",
      color: "pink",
      disabled: brideCount === 0
    },
    {
      type: 'complete',
      label: "Complete Tree",
      count: totalCount,
      icon: "💍",
      color: "purple",
      disabled: totalCount === 0
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto transform animate-modal-enter">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">📥</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Download Family Tree</h3>
          <p className="text-gray-600">Choose which section to download</p>
        </div>

        <div className="space-y-4">
          {downloadOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => onDownload(option.type)}
              disabled={option.disabled || downloading}
              className={`w-full flex items-center justify-between p-4 bg-gradient-to-r from-${option.color}-50 to-${option.color}-100 hover:from-${option.color}-100 hover:to-${option.color}-200 border-2 border-${option.color}-200 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-${option.color}-500 rounded-full flex items-center justify-center`}>
                  <span className="text-white text-lg">{option.icon}</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-800">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.count} members</div>
                </div>
              </div>
              <div className={`text-${option.color}-500 group-hover:scale-110 transition-transform`}>
                ⬇️
              </div>
            </button>
          ))}
        </div>

        {downloading && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 text-blue-500">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              <span>Generating PDF...</span>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          disabled={downloading}
          className="w-full mt-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-300 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DownloadModal;