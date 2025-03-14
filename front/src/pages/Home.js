import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [artisansDuMois, setArtisansDuMois] = useState([]);
  
  useEffect(() => {
    const fetchArtisansDuMois = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/artisans/mois');
        setArtisansDuMois(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des artisans du mois:', error);
      }
    };
    
    fetchArtisansDuMois();
  }, []);

  return (
    <div>
      <section className="jumbotron text-center bg-light p-5 rounded-3 mb-4">
        <h1 className="display-4">Trouve ton artisan !</h1>
        <p className="lead">La plateforme qui vous met en relation avec les meilleurs artisans d'Auvergne-Rhône-Alpes</p>
      </section>

      <section className="mb-5">
        <h2 className="mb-4">Comment trouver mon artisan ?</h2>
        <div className="row">
          <div className="col-md-3">
            <div className="card h-100">
              <div className="card-body text-center">
                <h3 className="card-title">1</h3>
                <p className="card-text">Choisir la catégorie d'artisanat dans le menu.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100">
              <div className="card-body text-center">
                <h3 className="card-title">2</h3>
                <p className="card-text">Choisir un artisan.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100">
              <div className="card-body text-center">
                <h3 className="card-title">3</h3>
                <p className="card-text">Le contacter via le formulaire de contact.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100">
              <div className="card-body text-center">
                <h3 className="card-title">4</h3>
                <p className="card-text">Une réponse sera apportée sous 48h.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4">Les artisans du mois</h2>
        <div className="row">
          {artisansDuMois.map(artisan => (
            <div className="col-md-4 mb-4" key={artisan.id}>
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
      </section>
    </div>
  );
};

export default Home;