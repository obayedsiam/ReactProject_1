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

  const [showNewWriter, setShowNewWriter] = useState(false);
  const [showNewGenre, setShowNewGenre] = useState(false);

  const [newWriterName, setNewWriterName] = useState('');
  const [newGenreName, setNewGenreName] = useState('');

  const [selectedAuthor, setSelectedAuthor] = useState()

  useEffect(() => {
    if (visible) {
      fetchWriters();
      fetchGenres();
      setSelectedAuthor();
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

  const handleAddWriter = async () => {
    if (!newWriterName.trim()) return;

    try {
      const response = await AuthorAPI.addAuthor({ name: newWriterName });
      const newAuthor = response.data.data;

      console.log('Return result ', newAuthor)

      await fetchWriters(); // Make sure this updates the writers state
      setFormData(prev => ({ ...prev, writerId: newAuthor.id }));
      setSelectedAuthor(newAuthor.id);
      console.log('Selected Author after : ', selectedAuthor);

      setNewWriterName('');
      setShowNewWriter(false);
    } catch (error) {
      console.error('Error adding new writer:', error);
    }
  };

  const handleAddGenre = async () => {
    if (!newGenreName.trim()) return;

    try {
      const response = await GenreAPI.addGenre({ name: newGenreName });
      const newGenre = response.data.data;
      // setGenres(prev => ({ ...prev, genreId: newGenre.id }));

      console.log('Return result ', newGenre)

      await fetchGenres(); // Make sure this updates the writers state
      setFormData(prev => ({
        ...prev,
        genreIds: [...(prev.genreIds || []), newGenre.id] // assuming .value is the ID
      }));

      setNewGenreName('');
      setShowNewGenre(false);
    } catch (error) {
      console.error('Error adding new writer:', error);
    }
  };

  return (
    <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
      <CModalHeader>
        <CModalTitle>{isEdit ? 'Edit Book' : 'Add New Book'}</CModalTitle>
      </CModalHeader>

      <CForm onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <CModalBody>
          <div className="d-flex flex-column gap-3">
            <CFormInput
              placeholder="Book Name"
              name="name"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />

            {/* Author Dropdown + Add Writer */}
            <div className="d-flex align-items-center gap-2">
              <CFormSelect
                className="flex-grow-1"
                value={selectedAuthor}
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
              <CButton type="button" size="sm" color="info" onClick={() => setShowNewWriter(prev => !prev)}>
                {showNewWriter ? 'Cancel' : '+'}
              </CButton>
            </div>

            {showNewWriter && (
              <div className="d-flex gap-2">
                <CFormInput
                  placeholder="New Writer Name"
                  value={newWriterName}
                  onChange={(e) => setNewWriterName(e.target.value)}
                />
                <CButton type="button" color="success" onClick={handleAddWriter}>
                  Save
                </CButton>
              </div>
            )}

            {/* Genres */}
            <div className="d-flex align-items-center gap-2">
              {/* <label htmlFor="genre-select" className="mb-1">Genres</label> */}
              <Select
                className="flex-grow-1"
                id="genre-select"
                isMulti
                options={genres}
                value={genres.filter(g => formData.genreIds?.includes(g.value))}
                onChange={handleGenreChange}
                placeholder="Select genres..."
              />
              <CButton type="button" size="sm" color="info" onClick={() => setShowNewGenre(prev => !prev)}>
                {showNewGenre ? 'Cancel' : '+'}
              </CButton>

            </div>

            {showNewGenre && (
              <div className="d-flex gap-2">
                <CFormInput
                  placeholder="New Writer Name"
                  value={newGenreName}
                  onChange={(e) => setNewGenreName(e.target.value)}
                />
                <CButton type="button" color="success" onClick={handleAddGenre}>
                  Save
                </CButton>
              </div>
            )}

            {/* Other Fields */}
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
