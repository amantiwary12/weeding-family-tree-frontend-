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

      // Handle parent IDs
      try {
        const parentIds = parentIDsRaw.trim() === '' ? [] : JSON.parse(parentIDsRaw);
        if (Array.isArray(parentIds)) form.append('parent_ids', JSON.stringify(parentIds));
        else form.append('parent_ids', '[]');
      } catch (err) {
        form.append('parent_ids', '[]');
      }

      if (photo) form.append('photo', photo);

      await axios.post(`${BACKEND}/api/people`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000,
      });

      setStatus('Submitted successfully! Thank you for joining our family story!');
      setName('');
      setPhoto(null);
      setPhotoPreview(null);
      setParentIDsRaw('[]');

      setTimeout(() => window.location.href = '/tree', 2000);
    } catch (err) {
      console.error('Submission error:', err);
      if (err.response) setStatus(`Error: ${err.response.data?.message || 'Server error. Please try again.'}`);
      else if (err.request) setStatus('Network error. Please check your connection and try again.');
      else setStatus('Error while submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setPhoto(null);
      setPhotoPreview(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setStatus('File size too large. Max 5MB.');
      e.target.value = '';
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setStatus('Please select a valid image file (JPEG, PNG, GIF, WebP).');
      e.target.value = '';
      return;
    }

    setPhoto(file);
    setStatus(null);

    const reader = new FileReader();
    reader.onload = (e) => setPhotoPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    const fileInput = document.getElementById('photo-upload');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-rose-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-12">
          <Link to="/" className="px-6 py-3 bg-white rounded-2xl border border-rose-200 font-medium shadow-lg hover:bg-rose-50 transition-all">Home</Link>
          <Link to="/tree" className="px-6 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all">View Family Tree</Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Join Our Family Story</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">Become part of our cherished family tapestry</p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="bg-white rounded-3xl shadow-2xl border border-rose-100 p-8 space-y-8">
          {/* Side */}
          <div>
            <label className="block text-lg font-semibold mb-4">Family Side *</label>
            <div className="flex gap-4">
              {['groom', 'bride', 'other'].map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSide(opt)}
                  className={`px-6 py-3 rounded-2xl font-medium border-2 ${
                    side === opt ? 'bg-rose-500 text-white border-transparent' : 'bg-white border-rose-200 text-gray-700'
                  }`}
                >
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Relation & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold mb-3">Your Relation *</label>
              <select value={relation} onChange={e => setRelation(e.target.value)} className="w-full p-4 border rounded-2xl">
                {relationOptions.map(r => <option key={r.code} value={r.code}>{r.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-lg font-semibold mb-3">Gender</label>
              <select value={gender} onChange={e => setGender(e.target.value)} className="w-full p-4 border rounded-2xl">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="nonbinary">Non-binary</option>
                <option value="unknown">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-lg font-semibold mb-3">Full Name *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" className="w-full p-4 border rounded-2xl" required />
          </div>

          {/* Photo */}
          <div>
            <label className="block text-lg font-semibold mb-3">Profile Photo (optional)</label>
            {photoPreview ? (
              <div className="relative">
                <img src={photoPreview} alt="Preview" className="w-40 h-40 object-cover rounded-2xl" />
                <button type="button" onClick={removePhoto} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6">×</button>
              </div>
            ) : (
              <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoChange} />
            )}
          </div>

          {/* Parent IDs */}
          <div>
            <label className="block text-lg font-semibold mb-3">Parent Connections (optional)</label>
            <input type="text" value={parentIDsRaw} onChange={e => setParentIDsRaw(e.target.value)} placeholder='["parent_id_1","parent_id_2"]' className="w-full p-4 border rounded-2xl font-mono" />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button type="submit" disabled={isSubmitting} className="px-12 py-4 bg-rose-500 text-white rounded-2xl font-bold">
              {isSubmitting ? 'Submitting...' : 'Join Our Family'}
            </button>
          </div>

          {/* Status */}
          {status && <div className="mt-4 text-center text-gray-700">{status}</div>}
        </form>
      </div>
    </div>
  );
}
