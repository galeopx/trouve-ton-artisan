import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center my-5">
      <h2>Page non trouvée</h2>
      <p>La page que vous avez demandée n'existe pas.</p>
      <img 
        src="/404.png" 
        alt="Page non trouvée" 
        className="img-fluid my-4" 
        style={{ maxHeight: '300px' }} 
      />
      <div>
        <Link to="/" className="btn btn-primary mt-3">Retour à l'accueil</Link>
      </div>
    </div>
  );
};

export default NotFound;