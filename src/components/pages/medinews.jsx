import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../template/navbarGeneral'; // Update import
import Footer from "../template/footer";
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import './medinews.css'; // Import the CSS file
import { useParams, Link } from 'react-router-dom';

const MediNews = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(9);
    const [totalResults, setTotalResults] = useState(0);
    const API_KEY = '4841e75f7f3d432fb2b3f90e3565aed3'; // Your NewsAPI key
    const { pageNumber } = useParams();

    useEffect(() => {
        setCurrentPage(Number(pageNumber)); // Convert the pageNumber to a number and set it as the current page
    }, [pageNumber]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/everything', {
                    params: {
                        q: 'medicine AND medical treatment',
                        sortBy: 'popularity', // Sort by popularity to get the most interesting news
                        apiKey: API_KEY,
                        page: currentPage,
                        pageSize: articlesPerPage
                    },
                });
                setArticles(response.data.articles);
                setTotalResults(response.data.totalResults);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, [currentPage, articlesPerPage]);

    // Pagination logic
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); // Scroll to the top of the page
        window.location.reload(); // Reload the page
    };

    const pageNumbers = Math.ceil(totalResults / articlesPerPage);

    return (
        <div>
            <Navbar /> {/* Updated Navbar component */}
            <div className="container">
                <h2 className="mt-4 mb-4">
                    <span className="coMedic">CoMedic</span><span className="news">News</span>
                </h2>
                <div className="row">
                    {articles.map((article, index) => (
                        <div className="col-md-4" key={index}>
                            <a href={article.url} target="_blank" rel="noopener noreferrer" className="card-link">
                                <Card className="mb-3">
                                    {article.urlToImage && (
                                        <Card.Img variant="top" src={article.urlToImage} />
                                    )}
                                    <Card.Body>
                                        <Card.Title>{article.title}</Card.Title>
                                        <div className="card-text-divider"></div>
                                        <Card.Text>{article.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </a>
                        </div>
                    ))}
                </div>
                <div className="pagination-container">
                    <Pagination>
                        {currentPage > 1 && (
                            <>
                                <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
                                <Pagination.Item>
                                    <Link to={`/medinews/${currentPage - 1}`}>
                                        {currentPage - 1}
                                    </Link>
                                </Pagination.Item>
                            </>
                        )}
                        <Pagination.Item active>{currentPage}</Pagination.Item>
                        {currentPage < pageNumbers && (
                            <>
                                <Pagination.Item>
                                    <Link to={`/medinews/${currentPage + 1}`}>
                                        {currentPage + 1}
                                    </Link>
                                </Pagination.Item>
                                <Pagination.Next onClick={() => paginate(currentPage + 1)} />
                            </>
                        )}
                    </Pagination>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MediNews;
