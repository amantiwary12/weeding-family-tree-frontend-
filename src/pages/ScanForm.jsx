import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'https://wedding-family-tree-backend.onrender.com';

const relationOptions = [
  { code: 'self', label: "Self (Groom/Bride)" },
  { code: 'groom', label: "Groom" },
  { code: 'bride', label: "Bride" },
  { code: 'mother', label: "Mother" },
  { code: 'father', label: "Father" },
  { code: 'paternal_grandfather', label: "Paternal Grandfather" },
  { code: 'paternal_grandmother', label: "Paternal Grandmother" },
  { code: 'maternal_grandfather', label: "Maternal Grandfather" },
  { code: 'maternal_grandmother', label: "Maternal Grandmother" },
  { code: 'paternal_uncle', label: "Father's Brother (Paternal Uncle)" },
  { code: 'maternal_uncle', label: "Mother's Brother (Maternal Uncle)" },
  { code: 'spouse', label: "Spouse" },
  { code: 'son', label: "Son" },
  { code: 'daughter', label: "Daughter" },
  { code: 'other', label: "Other / Specify" }
];

export default function ScanForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const assumedSide = urlParams.get('side') || 'groom';

  const [side, setSide] = useState(assumedSide);
  const [relation, setRelation] = useState(relationOptions[0].code);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('unknown');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [parentIDsRaw, setParentIDsRaw] = useState('[]');
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim()) {
      setStatus('Please enter your name');
      return;
    }

    setIsSubmitting(true);
    setStatus('Uploading...');
    
    try {
      const form = new FormData();
      form.append('name', name.trim());
      form.append('relation_code', relation);
      form.append('relation_label', relationOptions.find(r => r.code === relation)?.label || relation);
      form.append('side', side);
      form.append('gender', gender);
      
      // Validate and parse parent IDs
      try {
        const parentIds = parentIDsRaw.trim() === '' ? [] : JSON.parse(parentIDsRaw);
        if (Array.isArray(parentIds)) {
          form.append('parent_ids', JSON.stringify(parentIds));
        } else {
          form.append('parent_ids', '[]');
        }
      } catch (err) {
        form.append('parent_ids', '[]');
      }

      // Add photo only if it exists and is valid
      if (photo) {
        form.append('photo', photo);
      }

      const response = await axios.post(`${BACKEND}/api/people`, form, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000, // 30 second timeout
      });
      
      setStatus('Submitted successfully! Thank you for joining our family story!');
      
      // Clear form
      setName('');
      setPhoto(null);
      setPhotoPreview(null);
      setParentIDsRaw('[]');
      
      setTimeout(() => window.location.href = '/tree', 2000);
    } catch (err) {
      console.error('Submission error:', err);
      
      if (err.response) {
        // Server responded with error status
        setStatus(`Error: ${err.response.data?.message || 'Server error. Please try again.'}`);
      } else if (err.request) {
        // Request was made but no response received
        setStatus('Network error. Please check your connection and try again.');
      } else {
        // Something else happened
        setStatus('Error while submitting. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setStatus('File size too large. Please choose a file smaller than 5MB.');
        e.target.value = '';
        return;
      }

      // Check file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setStatus('Please select a valid image file (JPEG, PNG, GIF, WebP).');
        e.target.value = '';
        return;
      }

      setPhoto(file);
      setStatus(null); // Clear any previous errors

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhoto(null);
      setPhotoPreview(null);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    // Reset file input
    const fileInput = document.getElementById('photo-upload');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-rose-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-12">
          <Link 
            to="/"
            className="flex items-center gap-3 px-6 py-3 bg-white text-gray-700 rounded-2xl border border-rose-200 hover:bg-rose-50 hover:border-rose-300 font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          
          <Link 
            to="/tree"
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            View Family Tree
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-rose-400 to-amber-500 rounded-full mb-6 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            {/* Decorative elements */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-rose-300 rounded-full opacity-80"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-amber-300 rounded-full opacity-80"></div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent font-serif">
            Join Our Family Story
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-rose-400 to-amber-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-light">
            Become part of our cherished family tapestry for this beautiful celebration
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden transform hover:shadow-3xl transition-all duration-500">
          {/* Elegant Header */}
          <div className="relative bg-gradient-to-r from-rose-500 to-amber-500 px-8 py-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full translate-y-16 -translate-x-16"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold text-white font-serif mb-3">Your Family Details</h2>
              <p className="text-rose-100 text-lg font-light">Help us weave your story into our family tapestry</p>
            </div>
            
            {/* Decorative floral elements */}
            <div className="absolute bottom-4 right-8 text-white opacity-20">
              <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21.9 11.5C21.6 11.2 21.2 11 20.8 11H20.7C20.4 11 20.1 11.1 19.9 11.3C19.7 11.5 19.6 11.7 19.5 12C19.4 12.3 19.3 12.6 19.3 13C19.3 13.8 19.6 14.6 20.1 15.1C20.6 15.6 21.3 16 22 16C22.7 16 23.4 15.6 23.9 15.1C24.4 14.6 24.7 13.8 24.7 13C24.7 12.2 24.4 11.4 23.9 10.9C23.4 10.4 22.7 10 22 10C21.7 10 21.4 10.1 21.1 10.2C21 10.1 20.9 10 20.8 10C20.4 10 20 9.8 19.7 9.5C19.4 9.2 19.2 8.8 19.2 8.4C19.2 8 19.4 7.6 19.7 7.3C20 7 20.4 6.8 20.8 6.8C21.2 6.8 21.6 7 21.9 7.3C22.2 7.6 22.4 8 22.4 8.4C22.4 9.1 22 9.7 21.5 10.1C21.8 10.4 22 10.8 22 11.2C22 11.6 21.8 12 21.5 12.3C21.2 12.6 20.8 12.8 20.4 12.8C20 12.8 19.6 12.6 19.3 12.3C19 12 18.8 11.6 18.8 11.2C18.8 10.8 19 10.4 19.3 10.1C19.6 9.8 20 9.6 20.4 9.6C20.8 9.6 21.2 9.8 21.5 10.1C21.8 10.4 22 10.8 22 11.2C22 11.6 21.8 12 21.5 12.3C21.2 12.6 20.8 12.8 20.4 12.8C20 12.8 19.6 12.6 19.3 12.3C19 12 18.8 11.6 18.8 11.2C18.8 10.8 19 10.4 19.3 10.1C19.6 9.8 20 9.6 20.4 9.6C20.8 9.6 21.2 9.8 21.5 10.1Z"/>
              </svg>
            </div>
          </div>
          
          <form onSubmit={onSubmit} className="p-8 space-y-8">
            {/* Side Selection */}
            <div className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl p-6 border border-rose-200">
              <label className="block text-lg font-semibold text-gray-900 mb-4 font-serif">
                Family Side <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'groom', label: 'Groom', icon: '🤵', color: 'from-blue-400 to-blue-600' },
                  { value: 'bride', label: 'Bride', icon: '👰', color: 'from-rose-400 to-pink-600' },
                  { value: 'other', label: 'Other', icon: '👥', color: 'from-amber-400 to-orange-500' }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSide(option.value)}
                    className={`p-4 text-sm font-semibold rounded-2xl border-2 transition-all duration-300 transform ${
                      side === option.value
                        ? `bg-gradient-to-r ${option.color} border-transparent text-white shadow-2xl scale-105`
                        : 'bg-white border-rose-200 text-gray-700 hover:border-rose-300 hover:bg-rose-50 hover:scale-102'
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Two Column Layout for Relation and Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Relation */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3 font-serif">
                  Your Relation <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select 
                    className="w-full px-5 py-4 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 bg-white shadow-lg hover:shadow-xl font-medium"
                    value={relation} 
                    onChange={e => setRelation(e.target.value)}
                    required
                  >
                    {relationOptions.map(r => (
                      <option key={r.code} value={r.code}>{r.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-rose-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3 font-serif">
                  Gender
                </label>
                <select 
                  className="w-full px-5 py-4 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 bg-white shadow-lg hover:shadow-xl font-medium"
                  value={gender} 
                  onChange={e => setGender(e.target.value)}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="nonbinary">Non-binary</option>
                  <option value="unknown">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3 font-serif">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input 
                required 
                className="w-full px-5 py-4 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 bg-white shadow-lg hover:shadow-xl placeholder-gray-400 font-medium"
                value={name} 
                onChange={e => setName(e.target.value)}
                placeholder="Enter your beautiful name"
              />
            </div>

            {/* Photo Upload */}
            <div className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl p-6 border border-rose-200">
              <label className="block text-lg font-semibold text-gray-900 mb-4 font-serif">
                Profile Photo <span className="text-amber-600 font-normal text-base">(optional, but cherished)</span>
              </label>
              
              {photoPreview ? (
                <div className="relative text-center">
                  <div className="relative inline-block">
                    <img 
                      src={photoPreview} 
                      alt="Preview" 
                      className="w-40 h-40 rounded-2xl object-cover mx-auto border-4 border-rose-300 shadow-2xl"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-3 -right-3 bg-rose-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-rose-600 transition-all duration-300 shadow-lg hover:scale-110"
                    >
                      ×
                    </button>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-3 font-medium">
                    {photo.name} ({(photo.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                </div>
              ) : (
                <div className="border-3 border-dashed border-rose-300 rounded-2xl p-8 text-center hover:border-rose-400 transition-all duration-300 group bg-white hover:bg-rose-50 cursor-pointer">
                  <input 
                    className="hidden" 
                    id="photo-upload"
                    type="file" 
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp" 
                    onChange={handlePhotoChange} 
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-rose-100 to-amber-100 rounded-2xl flex items-center justify-center group-hover:from-rose-200 group-hover:to-amber-200 transition-all duration-300 mb-4 shadow-lg group-hover:shadow-xl">
                        <svg className="w-8 h-8 text-rose-500 group-hover:text-rose-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-lg text-gray-700 font-semibold group-hover:text-gray-900 transition-colors">
                        Add Your Smile
                      </span>
                      <span className="text-sm text-gray-500 mt-2">JPG, PNG, WebP up to 5MB</span>
                    </div>
                  </label>
                </div>
              )}
            </div>

            {/* Parent IDs */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3 font-serif">
                Parent Connections <span className="text-amber-600 font-normal text-base">(optional)</span>
              </label>
              <input 
                className="w-full px-5 py-4 border border-rose-200 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 bg-white shadow-lg hover:shadow-xl font-mono text-sm"
                value={parentIDsRaw} 
                onChange={e => setParentIDsRaw(e.target.value)}
                placeholder='["parent_id_1", "parent_id_2"]'
              />
              <p className="text-sm text-gray-600 mt-3 font-medium">
                If you know your parents' IDs in our family tree, please enter them as a JSON array above.
              </p>
            </div>

            {/* Submit Section */}
            <div className="pt-6 border-t border-rose-200">
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button 
                  type="submit"
                  disabled={isSubmitting || !name.trim()}
                  className={`w-full sm:w-auto px-12 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting || !name.trim()
                      ? 'bg-gray-400 cursor-not-allowed transform scale-95'
                      : 'bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105'
                  } text-white text-lg`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Weaving Your Story...
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Join Our Family Tapestry
                    </>
                  )}
                </button>
              </div>

              {/* Status Message */}
              {status && (
                <div className={`mt-6 p-5 rounded-2xl text-base font-semibold border-2 transition-all duration-300 ${
                  status.includes('Error') || status.includes('error') || status.includes('Please enter')
                    ? 'bg-red-50 text-red-700 border-red-200 shadow-lg'
                    : status.includes('successfully')
                    ? 'bg-green-50 text-green-700 border-green-200 shadow-lg'
                    : 'bg-blue-50 text-blue-700 border-blue-200 shadow-lg'
                }`}>
                  <div className="flex items-center gap-3">
                    {status.includes('Error') || status.includes('error') || status.includes('Please enter') ? (
                      <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : status.includes('successfully') ? (
                      <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 flex-shrink-0 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 12v4m8-10h-4M6 12H2" />
                      </svg>
                    )}
                    <span>{status}</span>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 font-light mb-3">
            Your story becomes part of our forever family memory
          </p>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Every detail you share helps us create a beautiful, lasting tapestry of love and connection 
            that we'll cherish for generations to come.
          </p>
          <div className="flex justify-center mt-4">
            <div className="w-24 h-1 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}