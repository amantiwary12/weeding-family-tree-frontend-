import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BACKEND = 'https://wedding-family-tree-backend.onrender.com';

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
  const [relation, setRelation] = useState('self');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('unknown');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [parentIDsRaw, setParentIDsRaw] = useState('[]');
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setStatus('File size too large (max 5MB)');
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setStatus('Invalid file type');
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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setStatus('Please enter your name');
      return;
    }

    setIsSubmitting(true);
    setStatus('Uploading...');

    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('relation_code', relation);
      formData.append('relation_label', relationOptions.find(r => r.code === relation)?.label || relation);
      formData.append('side', side);
      formData.append('gender', gender);

      let parentIds = [];
      try {
        parentIds = parentIDsRaw.trim() ? JSON.parse(parentIDsRaw) : [];
      } catch {
        parentIds = [];
      }
      formData.append('parent_ids', JSON.stringify(parentIds));

      if (photo) formData.append('photo', photo);

      const res = await axios.post(`${BACKEND}/api/people`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setStatus('Submitted successfully!');
      setName('');
      setPhoto(null);
      setPhotoPreview(null);
      setParentIDsRaw('[]');

      setTimeout(() => window.location.href = '/tree', 1500);
    } catch (err) {
      console.error(err);
      setStatus('Error submitting data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-rose-600">Join Our Family Story</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Full Name *</label>
            <input
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border border-rose-200 rounded-lg p-3"
              placeholder="Enter your name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Relation *</label>
              <select
                value={relation}
                onChange={e => setRelation(e.target.value)}
                className="w-full border border-rose-200 rounded-lg p-3"
              >
                {relationOptions.map(r => (
                  <option key={r.code} value={r.code}>{r.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Gender</label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value)}
                className="w-full border border-rose-200 rounded-lg p-3"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="nonbinary">Non-binary</option>
                <option value="unknown">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Profile Photo</label>
            {photoPreview ? (
              <div className="relative w-40 h-40">
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute top-1 right-1 bg-red-500 text-white px-2 rounded-full"
                >
                  ×
                </button>
              </div>
            ) : (
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full"
              />
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Parent IDs (optional)</label>
            <input
              value={parentIDsRaw}
              onChange={e => setParentIDsRaw(e.target.value)}
              placeholder='["parent_id_1", "parent_id_2"]'
              className="w-full border border-rose-200 rounded-lg p-3 font-mono text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-rose-500 text-white p-3 rounded-lg font-semibold"
          >
            {isSubmitting ? "Submitting..." : "Join Family Tree"}
          </button>

          {status && <p className="mt-2 text-center text-sm text-gray-600">{status}</p>}
        </form>

        <div className="text-center mt-4">
          <Link to="/tree" className="text-rose-600 font-semibold hover:underline">View Family Tree</Link>
        </div>
      </div>
    </div>
  );
}
