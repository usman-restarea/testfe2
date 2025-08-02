'use client'

import { useState } from 'react';
import { Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import useMounted from 'hooks/useMounted';

const SignUp = () => {
  const hasMounted = useMounted();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: ''
  });

  // Ganti dengan token asli yang kamu punya
  const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN_DI_SINI';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setProfile(null);

    try {
      // 1. Hit refresh token API
      const tokenRes = await fetch('https://api.escuelajs.co/api/v1/auth/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ refreshToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY3Mjc2NjAyOCwiZXhwIjoxNjc0NDk0MDI4fQ.kCak9sLJr74frSRVQp0_27BY4iBCgQSmoT3vQVWKzJg",
 })
      });

      if (!tokenRes.ok) throw new Error('Gagal mendapatkan access token');

      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;

      // 2. Hit profile API
      const profileRes = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!profileRes.ok) throw new Error('Gagal mengambil profil');

      const profileData = await profileRes.json();
      setProfile(profileData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        <Card className="smooth-shadow-md">
          <Card.Body className="p-6">
            <div className="mb-4">
              <Link href="/"><Image src="/images/brand/logo/logo-primary.svg" className="mb-2" alt="" /></Link>
              <p className="mb-6">Please enter your user information.</p>
            </div>

            {hasMounted &&
              <Form onSubmit={handleSubmit}>
                {/* Username */}
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name="username" placeholder="User Name" required onChange={handleChange} />
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Enter address here" required onChange={handleChange} />
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="**************" required onChange={handleChange} />
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-3" controlId="confirm-password">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" name="confirmPassword" placeholder="**************" required onChange={handleChange} />
                </Form.Group>

                {/* Checkbox */}
                <div className="mb-3">
                  <Form.Check type="checkbox" id="check-api-checkbox">
                    <Form.Check.Input type="checkbox" />
                    <Form.Check.Label>
                      I agree to the <Link href="#"> Terms of Service </Link> and <Link href="#"> Privacy Policy.</Link>
                    </Form.Check.Label>
                  </Form.Check>
                </div>

                {/* Submit */}
                <div className="d-grid">
                  <Button variant="primary" type="submit">Create Free Account</Button>
                </div>

                <div className="d-md-flex justify-content-between mt-4">
                  <div className="mb-2 mb-md-0">
                    <Link href="/authentication/sign-in" className="fs-5">Already member? Login </Link>
                  </div>
                  <div>
                    <Link href="/authentication/forget-password" className="text-inherit fs-5">Forgot your password?</Link>
                  </div>
                </div>

                {/* Feedback */}
                {error && <div className="mt-3 text-danger">{error}</div>}
                {profile && (
                  <div className="mt-3">
                    <pre>{JSON.stringify(profile, null, 2)}</pre>
                  </div>
                )}
              </Form>
            }
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SignUp;
