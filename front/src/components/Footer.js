import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Pages légales</h5>
            <ul className="list-unstyled">
              <li><Link to="/mentions-legales" className="text-white">Mentions légales</Link></li>
              <li><Link to="/donnees-personnelles" className="text-white">Données personnelles</Link></li>
              <li><Link to="/accessibilite" className="text-white">Accessibilité</Link></li>
              <li><Link to="/cookies" className="text-white">Cookies</Link></li>
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Contact</h5>
            <address className="text-white">
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France<br />
              <a href="tel:+33426734000" className="text-white">+33 (0)4 26 73 40 00</a>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;