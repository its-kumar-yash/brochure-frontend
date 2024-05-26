// src/BrochureForm.js
import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const BrochureForm = () => {
  const [tone, setTone] = useState("Casual");
  const [length, setLength] = useState("Short");
  const [features, setFeatures] = useState("");
  const [positioning, setPositioning] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleGenerate = async () => {
    setError("");
    setSuccess("");
    try {
      const response = await axios.post("http://localhost:5000/generate", {
        tone,
        length,
        features,
        positioning,
      });
      setOutput(response.data.generatedCopy);
      setSuccess("Generated successfully!");
    } catch (error) {
      setError("Error generating brochure copy");
    }
  };

  const handleInsert = async () => {
    setError("");
    setSuccess("");
    try {
      const response = await axios.post("http://localhost:5000/insert", {
        tone,
        length,
        features,
        positioning,
        output,
      });
      setSuccess("Inserted successfully!");
    } catch (error) {
      setError("Error inserting data");
    }
  };

  return (
    <Container className="mt-5">
      <h1>Brochure Generator</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formTone">
              <Form.Label>Tone</Form.Label>
              <Form.Control
                as="select"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option value="Casual">Casual</option>
                <option value="Formal">Formal</option>
                <option value="Grandiose">Grandiose</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formLength">
              <Form.Label>Length of the Copy</Form.Label>
              <Form.Control
                as="select"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              >
                <option value="Short">Short</option>
                <option value="Medium">Medium</option>
                <option value="Long">Long</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="formFeatures" className="mb-3">
          <Form.Label>Features of the Building</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter features"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPositioning" className="mb-3">
          <Form.Label>Brand Positioning</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter brand positioning"
            value={positioning}
            onChange={(e) => setPositioning(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleGenerate}>
          Generate
        </Button>{" "}
        <Button variant="success" onClick={handleInsert}>
          Insert in DB
        </Button>
      </Form>
      <Form.Group controlId="formOutput" className="mt-3">
        <Form.Label>Generated Output</Form.Label>
        <Form.Control
          as="textarea"
          rows="8"
          value={output}
          onChange={(e) => setOutput(e.target.value)}
        />
      </Form.Group>
    </Container>
  );
};

export default BrochureForm;
