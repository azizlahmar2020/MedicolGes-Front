import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Col} from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input'
import Navbar from '../template/navbarGeneral';
import Table from 'react-bootstrap/Table';

function Submissions() {
    const allEntries = JSON.parse(localStorage.getItem("allEntries"));
    const [displayDetail, setDisplay] = useState(false);
    const [singleEntry, setSingleEntry] = useState({'name': '', 'email': '','phone': '', 'checkbox_values':[]})
    

    useEffect(() => {
        var id,entry;
        if (!window.location.pathname.includes('submissions')){
            setDisplay(true)
            id = window.location.pathname.split('/').pop()
            entry = allEntries.filter(item => parseInt(item['id']) === parseInt(id))[0]
            // console.log(entry)
            setSingleEntry(entry)
        }
    },[]);

    const handleCheckVal = (ty,entry) =>{
        var val =''
        if (entry['checkbox_values'].length >0 ){
            val = entry['checkbox_values'].filter(item => item.split('_')[0] === ty)[0]
            val = val.split('_')[1]
        }
        return val
    }
    const singleEntryForm = ()=>{
        return(
            <Container>
                            <Navbar/>

                <Card>
                    <Card.Header>
                        <cite title="Source Title">Feedback Details
                        </cite>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col>Patient Name</Col>
                            <Col>{singleEntry['name']}</Col>
                        </Row>
                        <Row>
                            <Col>Email</Col>
                            <Col>{singleEntry['email']}</Col>
                        </Row>
                        <Row>
                            <Col>Phone</Col>
                            <Col>{singleEntry['phone']}</Col>
                        </Row>
                        {Object.keys(feedback_type).map((ty)=>(
                            <Row>
                                <Col>{feedback_type[ty]}</Col>
                                <Col>{handleCheckVal(ty,singleEntry)}</Col>
                            </Row>
                        ))}
                    </Card.Body>
                </Card>
            </Container>
        )
    }
    
    const feedback_type = {
        'qos': 'The quality of the service you received from your healthcare provider.', 
        'qob': 'The quality of the medical information provided on our website.',
        'roc': 'Did you find our website user-friendly and informative?',
        'exp': 'The overall experience with our medical research platform and the accuracy of the diagnoses provided.'
    }    
    return (
        <>
        {displayDetail?
            (singleEntryForm())
            :
            (<div className='padding30px'>
                <Table striped hover responsive>
                    <thead>
                        <tr>
                            <th>Form Details</th>
                            <th>Patient Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            {Object.keys(feedback_type).map((ty)=>(<th>{feedback_type[ty]}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {allEntries.map(entry=>(
                            <tr>
                                <td><a href={`/submission/${entry['id']}`} target="_blank" rel="noopener noreferrer">View Details</a></td>
                                <td>{entry['name']}</td>
                                <td>{entry['email']}</td>
                                <td>{entry['phone']}</td>

                                {Object.keys(feedback_type).map((ty)=>(
                                    <td>{handleCheckVal(ty,entry)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>)
        }
        </>
    );
}

export default Submissions;
