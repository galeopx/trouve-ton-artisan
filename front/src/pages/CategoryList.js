import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArtisansByCategorie } from '../services/artisanService';
import { getCategorieById } from '../services/categorieService';

const CategoryList = () => {
  const { id } = useParams();
  const [artisans, setArtisans] = useState([]);
  const [categorie, setCategorie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [artisansData, categorieData] = await Promise.all([
          getArtisansByCategorie(id),
          getCategorieById(id)
        ]);
        
        setArtisans(artisansData);
        setCategorie(categorieData);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Impossible de charger les artisans pour cette catégorie');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"></div></div>;
  
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2 className="mb-4">{categorie?.nom || 'Artisans'}</h2>
      
      {artisans.length === 0 ? (
        <p>Aucun artisan trouvé dans cette catégorie.</p>
      ) : (
        <div className="row">
          {artisans.map(artisan => (
            <div className="col-md-4 col-sm-6 mb-4" key={artisan.id}>
              <div className="card h-100 artisan-card">
                <div className="card-body">
                  <h5 className="card-title">{artisan.nom}</h5>
                  <div className="mb-2">
                    {Array(5).fill().map((_, i) => (
                      <span key={i} className="text-warning">
                        {i < Math.floor(artisan.note) ? '★' : '☆'}
                      </span>
                    ))}
                    <span className="ms-1">({artisan.note})</span>
                  </div>
                  <p className="card-text">{artisan.specialite?.nom}</p>
                  <p className="card-text"><small className="text-muted">{artisan.localisation}</small></p>
                  <Link to={`/artisan/${artisan.id}`} className="btn btn-primary">Voir détails</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;