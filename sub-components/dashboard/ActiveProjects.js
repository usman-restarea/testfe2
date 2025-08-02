// import node module libraries
import { useState, useEffect } from 'react';
// import Link from 'next.js/link';
import { ProgressBar, Col, Row, Card, Table, Image } from 'react-bootstrap';

const ActiveProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch projects:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Card className="mt-6">
        <Card.Body>
          <div className="text-center">Loading...</div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <Card.Header>
        <h4 className="mb-0">ALL Products</h4>
      </Card.Header>
      <Card.Body className="p-0">
        <Table responsive className="text-nowrap mb-0">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((item) => (
              <tr key={item.product_id}>
                <td>{item.product_id}</td>
                <td>{item.product_name}</td>
                <td>{item.product_brand}</td>
                <td>{item.created_date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ActiveProjects;