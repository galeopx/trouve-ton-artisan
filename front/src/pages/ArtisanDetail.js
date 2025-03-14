import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArtisanById, contactArtisan } from '../services/artisanService';

const ArtisanDetail = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // État pour le formulaire de contact
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    objet: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        setLoading(true);
        const data = await getArtisanById(id);
        setArtisan(data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement de l\'artisan:', err);
        setError('Impossible de charger les informations de cet artisan');
      } finally {
        setLoading(false);
      }
    };

    fetchArtisan();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.email || !formData.objet || !formData.message) {
      setFormStatus({
        ...formStatus,
        error: 'Tous les champs sont obligatoires'
      });
      return;
    }

    try {
      setFormStatus({
        submitting: true,
        success: false,
        error: null
      });
      
      await contactArtisan(id, formData);
      
      setFormStatus({
        submitting: false,
        success: true,
        error: null
      });
      
      // Réinitialiser le formulaire
      setFormData({
        nom: '',
        email: '',
        objet: '',
        message: ''
      });
    } catch (err) {
      console.error('Erreur lors de l\'envoi du message:', err);
      setFormStatus({
        submitting: false,
        success: false,
        error: 'Une erreur est survenue lors de l\'envoi du message'
      });
    }
  };

  if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"></div></div>;
  
  if (error) return <div className="alert alert-danger">{error}</div>;
  
  if (!artisan) return <div className="alert alert-warning">Artisan non trouvé</div>;

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="card mb-4">
          <div className="card-body">
            <h2 className="card-title">{artisan.nom}</h2>
            
            <div className="mb-3">
              {Array(5).fill().map((_, i) => (
                <span key={i} className="text-warning fs-4">
                  {i < Math.floor(artisan.note) ? '★' : '☆'}
                </span>
              ))}
              <span className="ms-2">({artisan.note})</span>
            </div>
            
            <div className="mb-3">
              <strong>Spécialité:</strong> {artisan.specialite?.nom}
            </div>
            
            <div className="mb-3">
              <strong>Localisation:</strong> {artisan.localisation}
            </div>
            
            {artisan.site_web && (
              <div className="mb-3">
                <strong>Site web:</strong>{' '}
                <a href={artisan.site_web.startsWith('http') ? artisan.site_web : `https://${artisan.site_web}`} 
                   target="_blank" 
                   rel="noopener noreferrer">
                  {artisan.site_web}
                </a>
              </div>
            )}
            
            <div className="mt-4">
              <h4>À propos</h4>
              <p>{artisan.a_propos || "Aucune information disponible."}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Contacter cet artisan</h3>
            
            {formStatus.success && (
              <div className="alert alert-success">
                Votre message a été envoyé avec succès ! L'artisan vous répondra dans les 48h.
              </div>
            )}
            
            {formStatus.error && (
              <div className="alert alert-danger">{formStatus.error}</div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">Nom</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="nom" 
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="objet" className="form-label">Objet</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="objet" 
                  name="objet"
                  value={formData.objet}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea 
                  className="form-control" 
                  id="message" 
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={formStatus.submitting}
              >
                {formStatus.submitting ? 'Envoi en cours...' : 'Envoyer'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDetail;