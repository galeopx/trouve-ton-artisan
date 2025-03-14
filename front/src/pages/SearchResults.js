import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { searchArtisans } from '../services/artisanService';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setArtisans([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const data = await searchArtisans(query);
        setArtisans(data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors de la recherche:', err);
        setError('Impossible de charger les résultats de recherche');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"></div></div>;
  
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2 className="mb-4">Résultats de recherche pour "{query}"</h2>
      
      {artisans.length === 0 ? (
        <div className="alert alert-info">
          Aucun artisan trouvé pour cette recherche. Essayez d'autres termes.
        </div>
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

export default SearchResults;