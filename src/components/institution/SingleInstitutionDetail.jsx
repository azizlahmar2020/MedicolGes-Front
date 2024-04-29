import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

const SingleInstitutionDetail = () => {
  const { id } = useParams();
  const [institution, setInstitution] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchInstitutionDetails = async () => {
      try {
        const institutionResponse = await axios.get(`http://localhost:3001/institutions/${id}`);
        setInstitution(institutionResponse.data);

        const categoriesResponse = await axios.get('http://localhost:3001/categories');
        setCategories(categoriesResponse.data);

        const subcategoriesResponse = await axios.get('http://localhost:3001/subcategories');
        setSubcategories(subcategoriesResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'institution:", error);
      }
    };

    fetchInstitutionDetails();
  }, [id]);

  // Trouvez le nom de la catégorie et de la sous-catégorie
  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c._id === categoryId);
    return category ? category.category_name : "Inconnu";
  };

  const getSubcategoryName = (subcategoryId) => {
    const subcategory = subcategories.find((sc) => sc._id === subcategoryId);
    return subcategory ? subcategory.subcategory_name : "Inconnu";
  };

  if (!institution) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <Container className="mt-4">
      <Row>
        {/* Ajout du bouton de retour */}
        <Col md={12}>
          <Link to="/updateinstitution">
            <Button variant="primary">Retourner à la liste des institutions</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md={9}>
          <Card>
            <Card.Body>
              <Card.Title>{institution.name}</Card.Title>
              <Card.Text>
                <strong>Adresse:</strong> {institution.address}
              </Card.Text>
              <Card.Text>
                <strong>Catégorie:</strong> {getCategoryName(institution.category)}
              </Card.Text>
              <Card.Text>
                <strong>Sous-catégorie:</strong> {getSubcategoryName(institution.subcategory)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleInstitutionDetail;
