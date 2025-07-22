import React, { useEffect, useState } from 'react';
import {
  CModal, CModalHeader, CModalTitle,
  CModalBody, CModalFooter, CButton, CForm, CFormInput,
  CFormSelect
} from '@coreui/react';
import AuthorAPI from '../../api/AuthorAPI';
import GenreAPI from '../../api/GenreAPI';

const BookFormModal = ({ visible, setVisible, isEdit, formData, setFormData, onSubmit }) => {
  const [writers, setWriters] = useState([]);
  const [genres, setGenres] = useState([]);

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
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
      <CFormSelect
        value={formData.writerId || ''}
        onChange={(e) => handleChange('writerId', e.target.value)}
        options={[
          { label: 'Select Author', value: '' },
          ...writers.map(writer => ({
            label: writer.name,
            value: writer.id
          }))
        ]}
        required
      />
      <CFormSelect
        value={formData.genreId || ''}
        onChange={(e) => handleChange('genreId', e.target.value)}
        options={[
          { label: 'Select Genre', value: '' },
          ...genres.map(genre => ({
            label: genre.name,
            value: genre.id
          }))
        ]}
        required
      />
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
