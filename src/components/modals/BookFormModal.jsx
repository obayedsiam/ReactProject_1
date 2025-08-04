import React, { useEffect, useState } from 'react';
import {
  CModal, CModalHeader, CModalTitle,
  CModalBody, CModalFooter, CButton, CForm, CFormInput,
  CFormSelect, CFormCheck
} from '@coreui/react';
import Select from 'react-select';
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
      const options = response.data.map(genre => ({
        label: genre.name,
        value: genre.id
      }));
      setGenres(options);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  useEffect(() => {
    if (isEdit && visible && writers.length > 0 && formData.writerId) {
      const exists = writers.some(w => String(w.id) === String(formData.writerId));
      if (!exists) {
        console.warn('Writer not found in fetched list');
      }
    }
  }, [writers, formData.writerId, isEdit, visible]);

  useEffect(() => {
    if (
      visible &&
      !isEdit &&
      (!formData.writerId || !writers.some(w => String(w.id) === String(formData.writerId))) &&
      writers.length > 0
    ) {
      setFormData(prev => ({
        ...prev,
        writerId: String(writers[0].id)
      }));
    }
  }, [visible, isEdit, writers]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenreChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map(option => option.value);
    setFormData(prev => ({ ...prev, genreIds: selectedIds }));
  };

  return (
    <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
      <CModalHeader>
        <CModalTitle>{isEdit ? 'Edit Book' : 'Add New Book'}</CModalTitle>
      </CModalHeader>

      <CForm onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <CModalBody>
          <div className="d-flex flex-column gap-3">

            {/* Basic Info */}
            <CFormInput
              placeholder="Book Name"
              name="name"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />

            {writers.length > 0 ? (
              <CFormSelect
                value={formData.writerId ? String(formData.writerId) : ''}
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

            {/* Genre */}
            <div>
              <label htmlFor="genre-select" className="mb-1">Genres</label>
              <Select
                id="genre-select"
                isMulti
                options={genres}
                value={genres.filter(g => formData.genreIds?.includes(g.value))}
                onChange={handleGenreChange}
                placeholder="Select genres..."
              />
            </div>

            {/* Additional Fields */}
            <div className="row">
              <div className="col-md-4">
                <CFormInput
                  label="Rating (0-5)"
                  type="number"
                  min={0}
                  max={5}
                  step={0.1}
                  value={formData.rating || ''}
                  onChange={(e) => handleChange('rating', parseFloat(e.target.value))}
                />
              </div>

              <div className="col-md-4">
                <CFormInput
                  label="Reading %"
                  type="number"
                  min={0}
                  max={100}
                  value={formData.readingPercentage || ''}
                  onChange={(e) => handleChange('readingPercentage', parseInt(e.target.value))}
                />
              </div>

              <div className="col-md-4 d-flex align-items-end">
                <CFormCheck
                  label="IsRead?"
                  checked={formData.read || false}
                  onChange={(e) => handleChange('IsRead', e.target.checked)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <CFormInput
                  label="Gifted By"
                  value={formData.giftedBy || ''}
                  onChange={(e) => handleChange('giftedBy', e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  label="Buying Date"
                  type="date"
                  value={formData.buyingDate || ''}
                  onChange={(e) => handleChange('buyingDate', e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <CFormInput
                  label="Buying Location"
                  value={formData.buyingLocation || ''}
                  onChange={(e) => handleChange('buyingLocation', e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <CFormInput
                  label="Current Book Location"
                  value={formData.currentBookLocation || ''}
                  onChange={(e) => handleChange('currentBookLocation', e.target.value)}
                />
              </div>
            </div>

            <hr />

            <div className="row">
              <div className="col-md-4 d-flex align-items-end">
                <CFormCheck
                  label="Borrowed?"
                  checked={formData.borrowed || false}
                  onChange={(e) => handleChange('borrowed', e.target.checked)}
                />
              </div>

              {formData.borrowed && (
                <>
                  <div className="col-md-4">
                    <CFormInput
                      label="Borrower Name"
                      value={formData.borrowerName || ''}
                      onChange={(e) => handleChange('borrowerName', e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <CFormInput
                      label="Borrower Phone"
                      value={formData.borrowerPhone || ''}
                      onChange={(e) => handleChange('borrowerPhone', e.target.value)}
                    />
                  </div>
                </>
              )}
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
