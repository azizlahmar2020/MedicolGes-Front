import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Sidebar from '../backend/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const UpdateInstitutionForm = () => {
  const [institutions, setInstitutions] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showList, setShowList] = useState(true); // Afficher la liste par défaut
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Ajout d'un état de recherche
  const [editingInstitutionId, setEditingInstitutionId] = useState(null); // État pour gérer le mode de modification
  const [editValues, setEditValues] = useState({}); // Stocker les valeurs modifiées


  // Charger les institutions
  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/institutions');
        setInstitutions(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des institutions:', error);
      }
    };
    
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/subcategories');
        setSubcategories(response.data); // Stocke les sous-catégories
      } catch (error) {
        console.error('Erreur lors de la récupération des sous-catégories:', error);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/categories');
        setCategories(response.data); // Stocke les sous-catégories
      } catch (error) {
        console.error('Erreur lors de la récupération des sous-catégories:', error);
      }
    };
    const fetchData = async () => {
      const [institutionsResponse, subcategoriesResponse, categoriesResponse] = await Promise.all([
        axios.get('http://localhost:3001/institutions'),
        axios.get('http://localhost:3001/subcategories'),
        axios.get('http://localhost:3001/categories'),
      ]);
      setInstitutions(institutionsResponse.data);
      setSubcategories(subcategoriesResponse.data);
      setCategories(categoriesResponse.data);
    };

    fetchData();
  

    fetchInstitutions();
    fetchSubcategories(); // Récupérer les sous-catégories
    fetchCategories(); // Récupérer les catégories

  }, []);
  // Fonction pour obtenir le nom de la sous-catégorie à partir de l'ID
  const getSubcategoryName = (subcategoryId) => {
    const subcategory = subcategories.find((sc) => sc._id === subcategoryId);
    return subcategory ? subcategory.subcategory_name : 'Inconnu'; // Retourne le nom de la sous-catégorie
  };
  const getCategoryName = (categoryId) => {
    const category = categories.find((sc) => sc._id === categoryId);
    return category ? category.category_name : 'Inconnu'; // Retourne le nom de la sous-catégorie
  };
   // Fonction pour gérer le mode de modification
   const handleEdit = (institution) => {
    setEditingInstitutionId(institution._id);
    setEditValues({
      address: institution.address,
      category: institution.category,
      subcategory: institution.subcategory,
    });
  };

  // Gestion des modifications dans les champs
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues({ ...editValues, [name]: value });
  };

  // Sauvegarde des modifications
  const handleSave = async () => {
    try {
      // Exemple de sauvegarde avec axios
      await axios.patch(`http://localhost:3001/institutions/${editingInstitutionId}`, editValues);

      // Mettre à jour la liste des institutions avec les nouvelles valeurs
      const updatedInstitutions = institutions.map((institution) =>
        institution._id === editingInstitutionId
          ? { ...institution, ...editValues }
          : institution
      );
      setInstitutions(updatedInstitutions);

      setEditingInstitutionId(null); // Sortir du mode de modification
      alert('Les modifications ont été enregistrées.');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  // Fonction pour exporter vers Excel
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const data = institutions.map((institution) => ({
      Adresse: institution.address,
      Catégorie: institution.category,
      "Sous-catégorie": institution.subcategory,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Institutions');
    XLSX.writeFile(workbook, 'institutions.xlsx');
  };

  // Fonction pour importer depuis Excel
  const importFromExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      // Traitez les données importées ici
      console.log(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      importFromExcel(file);
    }
  };

  const handleDelete = async (institutionId) => {
    try {
      await axios.delete(`http://localhost:3001/institutions/${institutionId}`);
      setInstitutions(institutions.filter((inst) => inst._id !== institutionId));
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'institution:", error);
    }
  };

  // Filtrer les institutions en fonction du terme de recherche
  const filteredInstitutions = institutions.filter(
    (institution) =>
      institution.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      institution.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 p-0">
          <Sidebar />
        </div>
        <div className="col-md-9 mt-5">
          <h2 className="col-md-9 mt-5">Liste des institutions :</h2>

          {/* Recherche */}
          <Form.Group controlId="searchInstitutions">
            <Form.Label>Rechercher:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Rechercher par adresse, catégorie, ou sous-catégorie"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>

          {/* Boutons d'exportation et d'importation */}
          <div className="d-flex mb-3">
            <Button className="btn btn-success" onClick={exportToExcel}>
              Exporter vers Excel
            </Button>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="ml-3" />
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Adresse</th>
                <th>Catégorie</th>
                <th>Sous-catégorie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstitutions.map((institution) => (
                <tr key={institution._id}>
                  {editingInstitutionId === institution._id ? (
                    <>
                      {/* Affichage en mode édition */}
                      <td>
                        <Form.Control
                          type="text"
                          name="address"
                          value={editValues.address}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          name="category"
                          value={editValues.category}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          name="subcategory"
                          value={editValues.subcategory}
                          onChange={handleEditChange}
                        />
                      </td>
                      <td>
                        <Button variant="success" onClick={handleSave}>
                          <FontAwesomeIcon icon={faEdit} /> Sauvegarder
                        </Button>
                      </td>
                    </>
                  ) : (
                    <>
                      {/* Affichage en mode normal */}
                      <td>{institution.address}</td>
                      <td>{getCategoryName(institution.category)}</td>
                      <td>{getSubcategoryName(institution.subcategory)}</td>
                      <td>
                      <Button
  variant="danger"
  onClick={() => {
    setSelectedInstitution(institution); // Définit l'institution à supprimer
    setShowDeleteConfirmation(true);   // Affiche la confirmation de suppression
  }}
>
  <FontAwesomeIcon icon={faTrash} /> Supprimer
</Button>

                        <Button variant="success" onClick={() => handleEdit(institution)}>
                          <FontAwesomeIcon icon={faEdit} /> Mettre à jour
                        </Button>
                        <Link to={`/singleInstitution/${institution._id}`}>
  <Button variant="info">
    <FontAwesomeIcon icon={faInfoCircle} /> Détails
  </Button>
</Link>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>


          {/* Confirmation de suppression */}
          <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation de suppression</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Êtes-vous sûr de vouloir supprimer {selectedInstitution?.address} ?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>
                Annuler
              </Button>
              <Button variant="danger" onClick={()=> handleDelete(selectedInstitution._id)}>
                Supprimer
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default UpdateInstitutionForm;


