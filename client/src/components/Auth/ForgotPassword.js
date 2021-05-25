import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <div className="signup">
      <div class="context">
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ marginTop: "10%" }}
        >
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Password Reset</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>
                    Email<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Button
                  disabled={loading}
                  className="w-100 mt-2 btn-signup"
                  type="submit"
                >
                  Reset Password
                </Button>
              </Form>
              <div className="w-100 text-center mt-3 forgotpassword">
                <Link to="/login">Login</Link>
              </div>
            </Card.Body>
          </Card>
        </Container>
        <div className="w-100 text-center mt-2 text">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
      <div class="area">
        <ul class="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}
