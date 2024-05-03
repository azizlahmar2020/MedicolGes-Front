/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Institution.css';
import Sidebar from '../backend/sidebar'; // Importez le composant Sidebar
import institutionImage from '../../assets/images/institutionImage.jpg'; // Importez votre image

const CreateInstitutionForm = () => {
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/subcategories');
        setSubcategories(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des sous-catégories:', error);
      }
    };

    fetchSubcategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3001/institutions', {
        address: address,
        category: category,
        subcategory: subcategory
      });
  
      console.log('Institution créée avec succès:', response.data);
      // Afficher l'alerte
      alert('Institution créée avec succès!');
      // Rafraîchir la page après la création réussie
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la création de l\'institution:', error);
      // Traitez les erreurs comme nécessaire
    }
  };
  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9 mt-5">
          <div className="row">
            <div className="col-md-6 mt-5">
              <img src={institutionImage} alt="Institution" className="img-fluid mt-5" />
            </div>
            <div className="col-md-6 mt-5">
              <h2 className=" mt-5">Créer une nouvelle institution</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-5">
                  <label>Adresse:</label>
                  <input  className="form-control mt-5" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="form-group mt-5">
                  <label>Catégorie:</label>
                  <select className="form-control mt-5" value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.category_name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group mt-5">
                  <label>Sous-catégorie:</label>
                  <select className="form-control mt-5" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} required>
                    <option value="">Sélectionner une sous-catégorie</option>
                    {subcategories.map(subcat => (
                      <option key={subcat._id} value={subcat._id}>{subcat.subcategory_name}</option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-primary d-flex  align-items-center mt-5" type="submit">Créer Institution</button>
                <div className="mt-3 d-inline-flex align-items-center">
                <Link to="/updateInstitution" className="btn btn-secondary d-flex  align-items-center mt-5">Aller à la mise à jour</Link>
                <Link to="/dashboard" className="btn btn-secondary mt-5">Retourner à Dashboard</Link>
                </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInstitutionForm;
*/
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Institution.css';
import Sidebar from '../backend/sidebar';
import institutionImage from '../../assets/images/institutionImage.jpg';
import markerImage from '../../assets/images/marker.png';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';



import Webcam from 'react-webcam';


const CreateInstitutionForm = () => {
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [mapPosition, setMapPosition] = useState([28.0339, 1.6596]);
  const [mapVisible, setMapVisible] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const mapRef = useRef(null);
  const webcamRef = useRef(null);
  const [hospitals, setHospitals] = useState([
    { id: 1, name: 'Hôpital Mustapha Pacha', lat: 36.7556, lng: 3.0577 },
    { id: 2, name: 'Hôpital de Bab El Oued', lat: 36.7843, lng: 3.0582 },
    { id: 3, name: 'Hôpital Beni Messous', lat: 36.7548, lng: 2.9517 },
    { id: 4, name: 'Hôpital de Kouba', lat: 36.7304, lng: 3.0995 },
    { id: 5, name: 'Hôpital de Birtraria', lat: 36.7593, lng: 3.0684 },
    { id: 6, name: 'Hôpital El Kettar', lat: 36.7396, lng: 3.1004 },
    { id: 7, name: 'Hôpital Che Guevara', lat: 36.7254, lng: 3.1722 },
    { id: 8, name: 'Hôpital de Hussein Dey', lat: 36.7488, lng: 3.1071 },
    { id: 9, name: 'Hôpital de Birkhadem', lat: 36.7343, lng: 2.9776 },
    { id: 10, name: 'Hôpital de Kouba (CHU)', lat: 36.7379, lng: 3.1001 },
    { id: 11, name: 'Hôpital de Rouiba', lat: 36.7002, lng: 3.2357 },
    { id: 12, name: 'Hôpital de Baraki', lat: 36.6689, lng: 3.0886 },
    { id: 13, name: 'Hôpital de Chéraga', lat: 36.7334, lng: 2.9598 },
    { id: 14, name: 'Hôpital de Staouéli', lat: 36.7857, lng: 2.8791 },
    { id: 15, name: 'Hôpital de Bordj El Kiffan', lat: 36.7377, lng: 3.1844 },
    { id: 16, name: 'Hôpital de Béni Mered', lat: 36.6708, lng: 3.1074 },
    { id: 17, name: 'Hôpital de Douéra', lat: 36.6916, lng: 2.9014 },
    { id: 18, name: 'Hôpital d\'El Harrach', lat: 36.7267, lng: 3.1127 },
    { id: 19, name: 'Hôpital de Birtouta', lat: 36.6882, lng: 2.8909 },
    { id: 20, name: 'Hôpital de Boudouaou', lat: 36.7328, lng: 3.2078 },
    { id: 21, name: 'Hôpital de Bir Mourad Raïs', lat: 36.7326, lng: 3.0934 },
    { id: 22, name: 'Hôpital d\'El Madania', lat: 36.7584, lng: 3.0641 },
    { id: 23, name: 'Hôpital de Dar El Beïda', lat: 36.7376, lng: 3.1782 },
    { id: 24, name: 'Hôpital d\'El Magharia', lat: 36.7656, lng: 3.1094 },
    { id: 25, name: 'Hôpital d\'El Mouradia', lat: 36.7418, lng: 3.0558 },
    { id: 26, name: 'Hôpital d\'El Biar', lat: 36.7587, lng: 3.0463 },
    { id: 27, name: 'Hôpital de Garidi', lat: 36.7126, lng: 3.1974 },
    { id: 28, name: 'Hôpital de Hussein Dey', lat: 36.7488, lng: 3.1071 },
    { id: 29, name: 'Hôpital de Haï El Badr', lat: 36.6813, lng: 3.0986 },
    { id: 30, name: 'Hôpital de Haï El Moudjahidine', lat: 36.7173, lng: 3.0665 },
    { id: 31, name: 'Hôpital de Kouba', lat: 36.7304, lng: 3.0995 },
    { id: 32, name: 'Hôpital de Khraicia', lat: 36.7858, lng: 2.9823 },
    { id: 33, name: 'Hôpital de Maouche', lat: 36.6579, lng: 3.1034 },
    { id: 34, name: 'Hôpital de Reghaïa', lat: 36.6928, lng: 3.2692 },
    { id: 35, name: 'Hôpital de Rahmania', lat: 36.6215, lng: 3.0641 },
    { id: 36, name: 'Hôpital de Réghaïa', lat: 36.6928, lng: 3.2692 },
    { id: 37, name: 'Hôpital de Saoula', lat: 36.6401, lng: 3.0363 },
    { id: 38, name: 'Hôpital de Souidania', lat: 36.7129, lng: 2.9528 },
    { id: 39, name: 'Hôpital de Zeralda', lat: 36.7324, lng: 2.9184 },
    { id: 40, name: 'Hôpital de Ain Benian', lat: 36.7372, lng: 2.9386 },
    { id: 41, name: 'Hôpital de Khemis El Khechna', lat: 36.6528, lng: 3.2257 },
    { id: 42, name: 'Hôpital de Blida', lat: 36.4897, lng: 2.8466 },
    { id: 43, name: 'Hôpital de Boufarik', lat: 36.5666, lng: 2.9118 },
    { id: 44, name: 'Hôpital de Oued El Alleug', lat: 36.5235, lng: 2.8275 },
    { id: 45, name: 'Hôpital de Bouira', lat: 36.3728, lng: 3.8912 },
    { id: 46, name: 'Hôpital de Médéa', lat: 36.2676, lng: 2.7589 },
    { id: 47, name: 'Hôpital de Djelfa', lat: 34.6862, lng: 3.2597 },
    { id: 48, name: 'Hôpital de Tiaret', lat: 35.3831, lng: 1.3187 },
    { id: 49, name: 'Hôpital de Sidi Bel Abbès', lat: 35.2004, lng: -0.6356 },
    { id: 50, name: 'Hôpital de Tlemcen', lat: 34.8747, lng: -1.3149 },
    { id: 51, name: 'Hôpital de Batna', lat: 35.5523, lng: 6.1798 },
    { id: 52, name: 'Hôpital de Biskra', lat: 34.8604, lng: 5.7312 },
    { id: 53, name: 'Hôpital de Tizi Ouzou', lat: 36.7191, lng: 4.0526 },
    { id: 54, name: 'Hôpital de Béjaïa', lat: 36.7335, lng: 5.0542 },
    { id: 55, name: 'Hôpital de Constantine', lat: 36.3624, lng: 6.6141 },
    { id: 56, name: 'Hôpital de Annaba', lat: 36.9113, lng: 7.7619 },
    { id: 57, name: 'Hôpital de Skikda', lat: 36.8719, lng: 6.9066 },
    { id: 58, name: 'Hôpital de Sétif', lat: 36.1980, lng: 5.4145 },
    { id: 59, name: 'Hôpital de Guelma', lat: 36.4623, lng: 7.4378 },
    { id: 60, name: 'Hôpital de Oran', lat: 35.6969, lng: -0.6331 },
    { id: 61, name: 'Hôpital de Mostaganem', lat: 35.9443, lng: 0.0906 },
    { id: 62, name: 'Hôpital de Mascara', lat: 35.4021, lng: 0.1400 },
    { id: 63, name: 'Hôpital de Tlemcen', lat: 34.8747, lng: -1.3149 },
    { id: 64, name: 'Hôpital de Tindouf', lat: 27.6742, lng: -8.1516 },
    { id: 65, name: 'Hôpital de Ouargla', lat: 31.9539, lng: 5.3297 },
    { id: 66, name: 'Hôpital de Béchar', lat: 31.6229, lng: -2.2164 },
    { id: 67, name: 'Hôpital de Adrar', lat: 27.8759, lng: -0.2864 },
    { id: 68, name: 'Hôpital de Laghouat', lat: 33.8000, lng: 2.8651 },
    { id: 69, name: 'Hôpital de El Oued', lat: 33.3553, lng: 6.8630 },
    { id: 70, name: 'Hôpital de El Bayadh', lat: 33.6936, lng: 1.0254 },
    { id: 71, name: 'Hôpital de Ghardaïa', lat: 32.4894, lng: 3.6785 },
    { id: 72, name: 'Hôpital de Relizane', lat: 35.7376, lng: 0.5450 },
    { id: 73, name: 'Hôpital de Chlef', lat: 36.1645, lng: 1.3341 },
    { id: 74, name: 'Hôpital de Djelfa', lat: 34.6862, lng: 3.2597 },
    { id: 75, name: 'Hôpital de m"sila', lat: 35.7143, lng: 4.5404 },
    { id: 76, name: 'Hôpital de Souk Ahras', lat: 36.2908, lng: 7.9513 },
    { id: 77, name: 'Hôpital de Mila', lat: 36.4600, lng: 6.2642 },
    { id: 78, name: 'Hôpital de Naâma', lat: 33.2707, lng: -0.3109 },
    { id: 79, name: 'Hôpital de Sidi Bel Abbès', lat: 35.2004, lng: -0.6356 },
    { id: 80, name: 'Hôpital de Relizane', lat: 35.7376, lng: 0.5450 },
    { id: 81, name: 'Hôpital de Tissemsilt', lat: 35.6079, lng: 1.8107 },
    { id: 82, name: 'Hôpital de Khenchela', lat: 35.4329, lng: 7.1404 },
    { id: 83, name: 'Hôpital de El Tarf', lat: 36.7702, lng: 8.3130 },
    { id: 84, name: 'Hôpital de Tamanrasset', lat: 22.7834, lng: 5.5263 },
    { id: 85, name: 'Hôpital de Tébessa', lat: 35.3992, lng: 8.1194 },
    { id: 86, name: 'Hôpital de Illizi', lat: 26.4979, lng: 8.4744 },
    { id: 87, name: 'Hôpital de Bordj Bou Arréridj', lat: 36.0715, lng: 4.7564 },
    { id: 88, name: 'Hôpital de Boumerdès', lat: 36.7585, lng: 3.4717 },
    { id: 89, name: 'Hôpital de El Taref', lat: 36.7582, lng: 8.2842 },
    { id: 90, name: 'Hôpital de Médéa', lat: 36.2676, lng: 2.7589 },
    { id: 91, name: 'Hôpital de Souk Ahras', lat: 36.2908, lng: 7.9513 },
    { id: 92, name: 'Hôpital de Aïn Témouchent', lat: 35.3073, lng: -1.1408 },
    { id: 93, name: 'Hôpital de Ghardaïa', lat: 32.4894, lng: 3.6785 },
    { id: 94, name: 'Hôpital de Laghouat', lat: 33.8000, lng: 2.8651 },
    { id: 95, name: 'Hôpital de Tamanrasset', lat: 22.7834, lng: 5.5263 },
    { id: 96, name: 'Hôpital de Tipaza', lat: 36.5734, lng: 2.4754 },
    { id: 97, name: 'Hôpital de Ouargla', lat: 31.9539, lng: 5.3297 },
    { id: 98, name: 'Hôpital de El Oued', lat: 33.3553, lng: 6.8630 },
    { id: 99, name: 'Hôpital de Boumerdès', lat: 36.7585, lng: 3.4717 },
    { id: 100, name: 'Hôpital de Saida', lat: 34.8405, lng: 0.1435 },
    { id: 101, name: 'Hôpital de Tiaret', lat: 35.3831, lng: 1.3187 },
    { id: 102, name: 'Hôpital de Jijel', lat: 36.8028, lng: 5.7606 },
    { id: 103, name: 'Hôpital de Tlemcen', lat: 34.8747, lng: -1.3149 },
    { id: 104, name: 'Hôpital de Jijel', lat: 36.8028, lng: 5.7606 },
    { id: 105, name: 'Hôpital de Skikda', lat: 36.8719, lng: 6.9066 },
    { id: 106, name: 'Hôpital de Mila', lat: 36.4600, lng: 6.2642 },
    { id: 107, name: 'Hôpital de Tissemsilt', lat: 35.6079, lng: 1.8107 },
    { id: 108, name: 'Hôpital de El Oued', lat: 33.3553, lng: 6.8630 },
    { id: 109, name: 'Hôpital de Khenchela', lat: 35.4329, lng: 7.1404 },
    { id: 110, name: 'Hôpital de Illizi', lat: 26.4979, lng: 8.4744 },
    { id: 111, name: 'Hôpital de Béchar', lat: 31.6229, lng: -2.2164 },
    { id: 112, name: 'Hôpital de Laghouat', lat: 33.8000, lng: 2.8651 },
    { id: 113, name: 'Hôpital de Béjaïa', lat: 36.7335, lng: 5.0542 },
    { id: 114, name: 'Hôpital de Adrar', lat: 27.8759, lng: -0.2864 },
    { id: 115, name: 'Hôpital de Biskra', lat: 34.8604, lng: 5.7312 },
    { id: 116, name: 'Hôpital de Naâma', lat: 33.2707, lng: -0.3109 },
    { id: 117, name: 'Hôpital de Ghardaïa', lat: 32.4894, lng: 3.6785 },
    { id: 118, name: 'Hôpital de Tébessa', lat: 35.3992, lng: 8.1194 },
    { id: 119, name: 'Hôpital de Ain Temouchent', lat: 35.3073, lng: -1.1408 },
    { id: 120, name: 'Hôpital de Oued El Alleug', lat: 36.5235, lng: 2.8275 },
    { id: 121, name: 'Hôpital de Bordj Bou Arréridj', lat: 36.0715, lng: 4.7564 },
    { id: 122, name: 'Hôpital de Guelma', lat: 36.4623, lng: 7.4378 },
    { id: 123, name: 'Hôpital de Bouira', lat: 36.3728, lng: 3.8912 },
    { id: 124, name: 'Hôpital de Tindouf', lat: 27.6742, lng: -8.1516 },
    { id: 125, name: 'Hôpital de Tébessa', lat: 35.3992, lng: 8.1194 },
    { id: 126, name: 'Hôpital de Batna', lat: 35.5523, lng: 6.1798 },
    { id: 127, name: 'Hôpital de Tamanrasset', lat: 22.7834, lng: 5.5263 },
    { id: 128, name: 'Hôpital de Relizane', lat: 35.7376, lng: 0.5450 },
    { id: 129, name: 'Hôpital de Boumerdès', lat: 36.7585, lng: 3.4717 },
    { id: 130, name: 'Hôpital de Saida', lat: 34.8405, lng: 0.1435 },
    { id: 131, name: 'Hôpital de Ain El Hammam', lat: 36.5542, lng: 4.5933 },
    { id: 132, name: 'Hôpital de Bou Ismaïl', lat: 36.5921, lng: 2.8514 },
    { id: 133, name: 'Hôpital de Sour El Ghozlane', lat: 36.1563, lng: 3.6816 },
    { id: 134, name: 'Hôpital de Sidi Aïssa', lat: 36.2069, lng: 2.9363 },
    { id: 135, name: 'Hôpital de El Achir', lat: 36.0522, lng: 6.7112 },
    { id: 136, name: 'Hôpital de Bouzeguene', lat: 36.5665, lng: 4.7466 },
    { id: 137, name: 'Hôpital de Bir El Ater', lat: 35.6461, lng: 7.4165 },
    { id: 138, name: 'Hôpital de Boudjima', lat: 36.7474, lng: 4.0693 },
    { id: 139, name: 'Hôpital de Bir Kasdali', lat: 36.5917, lng: 3.1352 },
    { id: 140, name: 'Hôpital de Barika', lat: 35.3839, lng: 5.3725 },
    { id: 141, name: 'Hôpital de Tamalous', lat: 36.6024, lng: 7.8379 },
    { id: 142, name: 'Hôpital de Seddouk', lat: 36.6823, lng: 4.7988 },
    { id: 143, name: 'Hôpital de Boufarik', lat: 36.5666, lng: 2.9118 },
    { id: 144, name: 'Hôpital de Tamalous', lat: 36.6024, lng: 7.8379 },
    { id: 145, name: 'Hôpital de Tinerkouk', lat: 34.7633, lng: -0.7795 },
    { id: 146, name: 'Hôpital de Ben Aknoun', lat: 36.7482, lng: 2.9855 },
    { id: 147, name: 'Hôpital de Khroub', lat: 36.2084, lng: 6.7003 },
    { id: 148, name: 'Hôpital de Ksar Chellala', lat: 35.1693, lng: 2.3143 },
    { id: 149, name: 'Hôpital de M"Sila', lat: 35.7114, lng: 4.5453 },
    { id: 150, name: 'Hôpital de Ain Oussera', lat: 35.4519, lng: 2.9118 },
    { id: 151, name: 'Hôpital de Mecheria', lat: 32.2667, lng: -0.2500 },
  { id: 152, name: 'Hôpital de Bougaa', lat: 36.4574, lng: 4.7532 },
  { id: 153, name: 'Hôpital de Bir Mourad Raïs', lat: 36.7326, lng: 3.0934 },
  { id: 154, name: 'Hôpital de Frenda', lat: 35.0617, lng: 1.1075 },
  { id: 155, name: 'Hôpital de Maghnia', lat: 35.0617, lng: -1.3240 },
  { id: 156, name: 'Hôpital de El Affroun', lat: 36.4657, lng: 2.6341 },
  { id: 157, name: 'Hôpital de Aïn Deheb', lat: 36.2516, lng: 0.8840 },
  { id: 158, name: 'Hôpital de El Hadjar', lat: 36.7775, lng: 7.7232 },
  { id: 159, name: 'Hôpital de El Kseur', lat: 36.8010, lng: 4.4241 },
  { id: 160, name: 'Hôpital de El Kala', lat: 36.9049, lng: 8.5436 },
  { id: 161, name: 'Hôpital de El Khroub', lat: 36.2084, lng: 6.7003 },
  { id: 162, name: 'Hôpital de El Menia', lat: 33.7555, lng: 1.3445 },
  { id: 163, name: 'Hôpital de El Tarf', lat: 36.7589, lng: 8.3170 },
  { id: 164, name: 'Hôpital de Hassi El Euch', lat: 35.5170, lng: -0.5470 },
  { id: 165, name: 'Hôpital de Khemis Miliana', lat: 36.2574, lng: 2.2344 },
  { id: 166, name: 'Hôpital de Lakhdaria', lat: 36.5613, lng: 3.5906 },
  { id: 167, name: 'Hôpital de Mers El Hadjaj', lat: 36.7945, lng: 4.1323 },
  { id: 168, name: 'Hôpital de Mostaganem', lat: 35.9310, lng: 0.0894 },
  { id: 169, name: 'Hôpital de M"Sila', lat: 35.7114, lng: 4.5453 },
  { id: 170, name: 'Hôpital de Oued Zenati', lat: 36.1049, lng: 6.1106 },
  { id: 171, name: 'Hôpital de Ras El Oued', lat: 35.9563, lng: 5.0347 },
  { id: 172, name: 'Hôpital de Sidi Ammar', lat: 35.3467, lng: -0.2561 },
  { id: 173, name: 'Hôpital de Sidi Aïssa', lat: 36.2069, lng: 2.9363 },
  { id: 174, name: 'Hôpital de Sidi Bel Abbès', lat: 35.2004, lng: -0.6356 },
  { id: 175, name: 'Hôpital de Sidi Daoud', lat: 36.4592, lng: 2.8224 },
  { id: 176, name: 'Hôpital de Sidi Fredj', lat: 36.7618, lng: 2.9753 },
  { id: 177, name: 'Hôpital de Sidi Ghiles', lat: 36.2977, lng: 1.8735 },
  { id: 178, name: 'Hôpital de Sougueur', lat: 35.1802, lng: 1.5019 },
  { id: 179, name: 'Hôpital de Souk El Tenine', lat: 36.6184, lng: 4.8510 },
  { id: 180, name: 'Hôpital de Soumaâ', lat: 36.1170, lng: 0.2284 },
  { id: 181, name: 'Hôpital de Tadmait', lat: 36.4667, lng: 4.2833 },
  { id: 182, name: 'Hôpital de Tafraoui', lat: 35.5401, lng: -0.5108 },
  { id: 183, name: 'Hôpital de Takhemaret', lat: 36.4667, lng: 3.9000 },
  { id: 184, name: 'Hôpital de Tala Ifacène', lat: 36.4219, lng: 4.3106 },
  { id: 185, name: 'Hôpital de Tamacine', lat: 32.2381, lng: 3.0197 },
  { id: 186, name: 'Hôpital de Tamalous', lat: 36.6024, lng: 7.8379 },
  { id: 187, name: 'Hôpital de Tazmalt', lat: 36.5219, lng: 4.5344 },
  { id: 188, name: 'Hôpital de Tazoult', lat: 35.6164, lng: 6.3720 },
  { id: 189, name: 'Hôpital de Ténès', lat: 36.5498, lng: 1.3093 },
  { id: 190, name: 'Hôpital de Tessala', lat: 35.1701, lng: 0.3797 },
  { id: 191, name: 'Hôpital de Tichy', lat: 36.7581, lng: 4.0425 },
  { id: 192, name: 'Hôpital de Timimoun', lat: 29.2415, lng: 0.2735 },
  { id: 193, name: 'Hôpital de Tirmitine', lat: 36.4797, lng: 4.2647 },
  { id: 194, name: 'Hôpital de Tizi N"Tleta', lat: 36.5486, lng: 2.7910 },
  { id: 195, name: 'Hôpital de Tlemcen', lat: 34.8747, lng: -1.3149 },
  { id: 196, name: 'Hôpital de Tlidjène', lat: 35.7012, lng: 5.2933 },
  { id: 197, name: 'Hôpital de Tougourt', lat: 33.1091, lng: 6.0664 },
  { id: 198, name: 'Hôpital de Tébessa', lat: 35.4108, lng: 8.1241 },
  { id: 199, name: 'Hôpital de Zéralda', lat: 36.7324, lng: 2.9184 },
  { id: 200, name: 'Hôpital de Zighoud Youcef', lat: 36.1607, lng: 6.3478 },
  { id: 201, name: 'Hôpital de Ziama Mansouriah', lat: 36.5833, lng: 6.3333 },
  { id: 202, name: 'Hôpital de Zinat', lat: 34.7333, lng: 3.2167 },
  { id: 203, name: 'Hôpital de Zitouna', lat: 35.6746, lng: 6.1289 },
  { id: 204, name: 'Hôpital de Ain Beida', lat: 35.7964, lng: 7.3928 },
  { id: 205, name: 'Hôpital de Ain Boucif', lat: 36.4667, lng: 2.9667 },
  { id: 206, name: 'Hôpital de Ain Debagh', lat: 34.6892, lng: 4.0453 },
  { id: 207, name: 'Hôpital de Ain El Hadjar', lat: 36.4451, lng: 1.1934 },
  { id: 208, name: 'Hôpital de Ain El Kebira', lat: 35.6991, lng: 6.2926 },
  { id: 209, name: 'Hôpital de Ain El Melh', lat: 36.4153, lng: 1.3044 },
  { id: 210, name: 'Hôpital de Ain El Turck', lat: 35.7080, lng: -0.6202 },
  { id: 211, name: 'Hôpital de Ain El Turk', lat: 35.6969, lng: -0.6622 },
  { id: 212, name: 'Hôpital de Ain Fakroun', lat: 35.9708, lng: 6.8422 },
  { id: 213, name: 'Hôpital de Ain Kercha', lat: 35.8167, lng: 7.8000 },
  { id: 214, name: 'Hôpital de Ain Kermes', lat: 35.4653, lng: 2.9053 },
  { id: 215, name: 'Hôpital de Ain Oulmène', lat: 36.2667, lng: 3.6833 },
  { id: 216, name: 'Hôpital de Ain Romana', lat: 36.5061, lng: 7.9144 },
  { id: 217, name: 'Hôpital de Ain Taya', lat: 36.7608, lng: 3.3358 },
  { id: 218, name: 'Hôpital de Ain Témouchent', lat: 35.3109, lng: -1.1395 },
  { id: 219, name: 'Hôpital de Ain Touta', lat: 35.7017, lng: 5.9083 },
  { id: 220, name: 'Hôpital de Aïn Turk', lat: 36.7778, lng: 3.4694 },
  { id: 221, name: 'Hôpital de Akbou', lat: 36.4633, lng: 4.5231 },
  { id: 222, name: 'Hôpital de Aïn Témouchent', lat: 35.3058, lng: -1.1411 },
  { id: 223, name: 'Hôpital de Ammi Moussa', lat: 36.0707, lng: 2.8543 },
  { id: 224, name: 'Hôpital de Annaba', lat: 36.9060, lng: 7.7479 },
  { id: 225, name: 'Hôpital de Arzew', lat: 35.8394, lng: -0.1861 },
  { id: 226, name: 'Hôpital de Arris', lat: 35.3748, lng: 5.1941 },
  { id: 227, name: 'Hôpital de Barbacha', lat: 36.5425, lng: 4.7650 },
  { id: 228, name: 'Hôpital de Batna', lat: 35.5550, lng: 6.1744 },
  { id: 229, name: 'Hôpital de Béchar', lat: 31.6279, lng: -2.2164 },
  { id: 230, name: 'Hôpital de Béjaïa', lat: 36.7515, lng: 5.0570 },
  { id: 231, name: 'Hôpital de Beni Amrane', lat: 36.4866, lng: 2.7521 },
  { id: 232, name: 'Hôpital de Beni Chougrane', lat: 36.1754, lng: 3.4066 },
  { id: 233, name: 'Hôpital de Beni Saf', lat: 35.3197, lng: -1.3880 },
  { id: 234, name: 'Hôpital de Beni Yenni', lat: 36.6272, lng: 4.0272 },
  { id: 235, name: 'Hôpital de Bensekrane', lat: 35.8933, lng: -0.9969 },
  { id: 236, name: 'Hôpital de Berrouaghia', lat: 36.1384, lng: 2.9244 },
  { id: 237, name: 'Hôpital de Berrahal', lat: 36.6971, lng: 7.8242 },
  { id: 238, name: 'Hôpital de Besbes', lat: 35.6113, lng: 7.5180 },
  { id: 239, name: 'Hôpital de Bir El Ater', lat: 35.6285, lng: 8.0821 },
  { id: 240, name: 'Hôpital de Bir El Djir', lat: 35.7235, lng: -0.5429 },
  { id: 241, name: 'Hôpital de Bir El Ksar', lat: 36.0750, lng: 4.7580 },
  { id: 242, name: 'Hôpital de Bir El Hafey', lat: 36.3069, lng: 3.2158 },
  { id: 243, name: 'Hôpital de Bir Ghbalou', lat: 36.5040, lng: 3.7831 },
  { id: 244, name: 'Hôpital de Bir Mourad Raïs', lat: 36.7326, lng: 3.0934 },
  { id: 245, name: 'Hôpital de Birine', lat: 35.7257, lng: 3.8257 },
  { id: 246, name: 'Hôpital de Birine El Salam', lat: 36.1000, lng: 6.8500 },
  { id: 247, name: 'Hôpital de Birtouta', lat: 36.6882, lng: 2.8909 },
  { id: 248, name: 'Hôpital de Birtouta El Djedida', lat: 36.6677, lng: 2.8773 },
  { id: 249, name: 'Hôpital de Biskra', lat: 34.8572, lng: 5.7261 },
  { id: 250, name: 'Hôpital de Blida', lat: 36.4689, lng: 2.8282 },
  { id: 251, name: 'Hôpital de Boghni', lat: 36.5440, lng: 3.9725 },
  { id: 252, name: 'Hôpital de Bordj Bou Arreridj', lat: 36.0720, lng: 4.7614 },
  { id: 253, name: 'Hôpital de Bordj El Bahri', lat: 36.7397, lng: 3.2169 },
  { id: 254, name: 'Hôpital de Bordj El Kiffan', lat: 36.7340, lng: 3.1850 },
  { id: 255, name: 'Hôpital de Bordj Menaiel', lat: 36.6614, lng: 3.8923 },
  { id: 256, name: 'Hôpital de Bougaa', lat: 36.0799, lng: 4.9021 },
  { id: 257, name: 'Hôpital de Bouinan', lat: 36.6267, lng: 2.9899 },
  { id: 258, name: 'Hôpital de Bouira', lat: 36.3728, lng: 3.8912 },
  { id: 259, name: 'Hôpital de Boumahra Ahmed', lat: 35.8658, lng: 0.1471 },
  { id: 260, name: 'Hôpital de Boumerdès', lat: 36.7613, lng: 3.4690 },
  { id: 261, name: 'Hôpital de Bou Saâda', lat: 35.3185, lng: 4.2085 },
  { id: 262, name: 'Hôpital de Bousselam', lat: 36.5608, lng: 7.9080 },
  { id: 263, name: 'Hôpital de Boudouaou', lat: 36.7328, lng: 3.2078 },
  { id: 264, name: 'Hôpital de Boudouaou El Bahri', lat: 36.7242, lng: 3.2106 },
  { id: 265, name: 'Hôpital de Boufarik', lat: 36.5666, lng: 2.9118 },
  { id: 266, name: 'Hôpital de Bougaa', lat: 36.0799, lng: 4.9021 },
  { id: 267, name: 'Hôpital de Bouira', lat: 36.3728, lng: 3.8912 },
  { id: 268, name: 'Hôpital de Bouinan', lat: 36.6267, lng: 2.9899 },
  { id: 269, name: 'Hôpital de Boukadir', lat: 36.1505, lng: 2.4954 },
  { id: 270, name: 'Hopital Ibn Badis',lat :36.372292862574376, lng:6.618042227416365 },
  { id: 271, name: 'Hôpital Gastro-Entérologie', lat: 36.37278103293834, lng:6.616878180014667 },
  { id: 272, name: 'cac', lat: 36.37459522171843,lng: 6.616210160084795 },
  { id: 273, name: 'Centre Hôspitalo-Universitaire DrAbdesselam', lat: 36.372616117686164,lng: 6.617780551555929 },
  { id: 274, name: 'Hopital Constantine', lat: 36.372412910366755, lng :6.618252694943004 },
  { id: 275, name: ' Hôpital pédiatrique Mansourah', lat: 36.36901620983333,lng: 6.635648951298956 },
  { id: 276, name: 'Clinique El Anouar', lat: 36.36576969136436,lng: 6.628070219809577 },
  { id: 277, name: 'Hôpital pédiatrique Mansourah', lat: 36.36901620980631,lng: 6.636286891729894 },
  { id: 278, name: 'Hôpital ben badis', lat: 36.360787857065, lng:6.64235988043162 },
  { id: 279, name: 'Clinique Rénal Constantine', lat:36.356492501598616, lng: 6.639504147295518 },
  { id: 280, name: 'مستشفى المسالك البولية و الكلى', lat: 36.35659942108808, lng:6.6399289875002685 },
  { id: 281, name: 'hopital du cœur benchiko', lat: 36.1505, lng: 2.4954 },
  { id: 282, name: 'Hôpital de Boukadir', lat: 36.35582679985908,lng: 6.652299201464494 },
  { id: 283, name: 'Clinique Du Coeur EHS De Cardiologie Erriad (Benchicou)', lat: 36.355839019341246,lng: 6.6538316607744905 },
  { id: 284, name: 'Hopital Cardiovasculaire', lat: 36.355912904692104,lng: 6.653271429226273 },
  { id: 285, name: 'Clinique Médicale Athena', lat: 36.31300915994332,lng: 6.6227668756796065 },
  { id: 286, name: 'E.P.H Dr Abdelkader Bencharif, Nouvelle Ville Ali Mendjeli', lat: 36.260022824598465,lng: 6.581784777498532 },
  { id: 287, name: '  Maternidade Constantine', lat: 36.24714587698734,lng: 6.580966496571403 }
  ]);
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Faites quelque chose avec l'image capturée, comme l'envoyer à un serveur
  };




  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/subcategories');
        setSubcategories(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des sous-catégories:', error);
      }
    };

    fetchSubcategories();
  }, []);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setMapPosition([lat, lng]);
    setAddress(`${lat}, ${lng}`);
    setMapVisible(false);
  };

  const handleAddressClick = () => {
    setMapVisible(true);
  };

  const handleMarkerClick = (hospital) => {
    const updatedAddress = `${hospital.name}, ${hospital.region}`; // Ajouter le nom de la région à l'adresse
    setAddress(updatedAddress);
    setSelectedMarkerId(hospital.id);
  };
  

  const handleDragEnd = () => {
    const map = mapRef.current;
    if (map != null) {
      const newCenter = map.getCenter();
      setMapPosition([newCenter.lat, newCenter.lng]);
      setAddress(`${newCenter.lat}, ${newCenter.lng}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/institutions', {
        address: address,
        category: category,
        subcategory: subcategory
      });

      console.log('Institution créée avec succès:', response.data);
      alert('Institution créée avec succès!');
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la création de l\'institution:', error);
    }
  };

  // Définissez les icônes pour le marqueur sélectionné et le marqueur par défaut
  const selectedMarkerIcon = new L.Icon({
    iconUrl: markerImage,
    iconSize: [20, 20],
    iconAnchor: [10, 26],
  });

  const defaultMarkerIcon = new L.Icon({
    iconUrl: markerImage,
    iconSize: [20, 20],
    iconAnchor: [10, 26],
  });

  return (
    
    <div className="container-fluid">
       
       
       
       
       <div>
        <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture</button>
    </div>
    




      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9 mt-5">
          <div className="row">
            <div className="col-md-6 mt-5">
              <img src={institutionImage} alt="Institution" className="img-fluid mt-5" />
            </div>
            <div className="col-md-6 mt-5">
              <h2 className=" mt-5">Créer une nouvelle institution</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-5">
                  <label>Adresse:</label>
                  <input className="form-control mt-5" type="text" value={address} onChange={(e) => setAddress(e.target.value)} onClick={handleAddressClick} required />
                </div>
                {mapVisible && (
                  <MapContainer
                    center={mapPosition}
                    zoom={6}
                    style={{ height: '300px', width: '100%', marginBottom: '20px' }}
                    onClick={handleMapClick}
                    onDragEnd={handleDragEnd}
                    ref={mapRef}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {hospitals.map(hospital => (
                      <Marker key={hospital.id} position={[hospital.lat, hospital.lng]} onClick={() => handleMarkerClick(hospital)} icon={selectedMarkerId === hospital.id ? selectedMarkerIcon : defaultMarkerIcon}>
                        <Popup>{hospital.name}</Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                )}
                <div className="form-group mt-5">
                  <label>Catégorie:</label>
                  <select className="form-control mt-5" value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.category_name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group mt-5">
                  <label>Sous-catégorie:</label>
                  <select className="form-control mt-5" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} required>
                    <option value="">Sélectionner une sous-catégorie</option>
                    {subcategories.map(subcat => (
                      <option key={subcat._id} value={subcat._id}>{subcat.subcategory_name}</option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-primary d-flex align-items-center mt-5" type="submit">Créer Institution</button>
                <div className="mt-3 d-inline-flex align-items-center">
                  <Link to="/updateInstitution" className="btn btn-secondary d-flex align-items-center mt-5">Aller à la mise à jour</Link>
                  <Link to="/dashboard" className="btn btn-secondary mt-5">Retourner à Dashboard</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInstitutionForm;
