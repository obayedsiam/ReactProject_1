import React, { useEffect, useState } from 'react';
import {
  CModal, CModalHeader, CModalTitle,
  CModalBody, CModalFooter, CButton, CForm, CFormInput,
  CFormSelect
} from '@coreui/react';
import Select from 'react-select';
import AuthorAPI from '../../api/AuthorAPI';
import GenreAPI from '../../api/GenreAPI';

const BookFormModal = ({ visible, setVisible, isEdit, formData, setFormData, onSubmit }) => {
  const [writers, setWriters] = useState([]);
  const [genres, setGenres] = useState([]);

  // Fetch data when modal becomes visible
  useEffect(() => {
    if (visible) {
      fetchWriters();
      fetchGenres();
    }
  }, [visible]);

  const fetchWriters = async () => {
    try {
      const response = await AuthorAPI.getAllAuthors();
      setWriters(response.data);
    } catch (error) {
      console.error('Error fetching writers:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await GenreAPI.getAllGenres();
      const options = response.data.map(genre => ({
        label: genre.name,
        value: genre.id
      }));
      setGenres(options);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenreChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map(option => option.value);
    setFormData(prev => ({ ...prev, genreIds: selectedIds }));
  };

  // Optional: Auto-select first writer if not selected in add mode
  useEffect(() => {
    if (
      visible &&
      !isEdit &&
      (!formData.writerId || !writers.some(w => String(w.id) === formData.writerId)) &&
      writers.length > 0
    ) {
      setFormData(prev => ({
        ...prev,
        writerId: String(writers[0].id)
      }));
    }
  }, [visible, isEdit, writers]);

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>{isEdit ? 'Edit Book' : 'Add New Book'}</CModalTitle>
      </CModalHeader>

      <CForm onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <CModalBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '0.5rem 0.25rem' }}>
            <CFormInput
              placeholder="Book Name"
              name="name"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />

    {console.log(formData)}
            {/* Conditionally render the CFormSelect only when writers data is available */}
            {writers.length > 0 ? (
                <CFormSelect
                  value={
                    formData.writerId !== undefined && formData.writerId !== null
                      ? String(formData.writerId)
                      : ''
                  }
                  onChange={(e) => handleChange('writerId', parseInt(e.target.value))}
                  required
                >
                  <option value="">Select Author</option>
                  {writers.map(writer => (
                    <option key={writer.id} value={String(writer.id)}>
                      {writer.name}
                    </option>
                  ))}
                </CFormSelect>
            ) : (
                <CFormSelect value="" disabled>
                    <option>Loading authors...</option>
                </CFormSelect>
            )}

            <div>
              <label htmlFor="genre-select" style={{ marginBottom: '0.5rem', display: 'block' }}>Genres</label>
              <Select
                id="genre-select"
                isMulti
                options={genres}
                value={genres.filter(g => formData.genreIds?.includes(g.value))}
                onChange={handleGenreChange}
                placeholder="Select genres..."
              />
            </div>
          </div> 
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>Cancel</CButton>
          <CButton type="submit" color="primary">Save</CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  );
};

export default BookFormModal;