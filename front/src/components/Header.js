import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/images/logo.png';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Rediriger vers la page de recherche
    window.location.href = `/search?query=${searchTerm}`;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Trouve ton artisan" height="50" />
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {categories.map(category => (
                <li className="nav-item" key={category.id}>
                  <Link 
                    className="nav-link" 
                    to={`/category/${category.id}`}
                  >
                    {category.nom}
                  </Link>
                </li>
              ))}
            </ul>
            
            <form className="d-flex" onSubmit={handleSearch}>
              <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Rechercher un artisan..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-primary" type="submit">
                Rechercher
              </button>
            </form>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;