  import React, { useState } from 'react';
  import { motion } from 'framer-motion';
  import styled from 'styled-components';
  import { useNavigate } from 'react-router-dom';

  interface FormPage1Props {
    formData: FormData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

  interface FormData {
    fullName: string;
    email: string;
  }

  const FormPage1: React.FC<FormPage1Props> = ({ formData, handleInputChange }) => {
    const [errors, setErrors] = useState({
      fullName: '',
      email: '',
    });
    const navigate = useNavigate();

    const validateForm = () => {
      let valid = true;
      const newErrors = { fullName: '', email: '' };
      if (!formData.fullName) {
        newErrors.fullName = 'Full Name is required';
        valid = false;
      }
      if (!formData.email) {
        newErrors.email = 'Email is required';
        valid = false;
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = 'Invalid email format';
        valid = false;
      }
      setErrors(newErrors);
      return valid;
    };

    const isValidEmail = (email: string) => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
    };

    const formVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const handleNextClick = () => {
      const isValid = validateForm();
      if (isValid) {
        navigate('/page2');
      } else {
        //Form has validation errors. Please check the fields.
      }
    };

    return (  
      <CenteredForm>
        <Container initial="hidden" animate="visible" variants={formVariants}>
          <Heading>Tenant Application Form</Heading>
          <InputLabel>
            Full Name:
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              placeholder="Enter your full name"
              onChange={handleInputChange}
              required
            />
            {errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}
          </InputLabel>
          <InputLabel>
            Email:
            <Input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              onChange={handleInputChange}
              required
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputLabel>
          <NextButton onClick={handleNextClick}>Next</NextButton>
        </Container>
      </CenteredForm>
    );
  };

  const CenteredForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 600px;
    background-color: #f2f2f2;
    @media (max-width: 768px) {
      padding: 20px;
    }
  `;

  const Container = styled(motion.div)`
    opacity: 0;
    y: 20px;
    &.visible {
      opacity: 1;
      y: 0;
      transition: all 0.5s;
    }
    background-color: #fff;
    padding: 150px;
    border-radius: 8px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    @media (max-width: 768px) {
      padding: 80px;
    }
  `;

  const Heading = styled.h2`
    font-size: 28px;
    margin-bottom: 20px;
    color: #333;
  `;

  const InputLabel = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-size: 16px;
    color: #555;
  `;

  const Input = styled.input`
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease-in-out;

    &:focus {
      border-color: #007BFF;
    }
  `;

  const NextButton = styled.button`
    font-size: 18px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #0056b3;
    }
  `;

  const ErrorMessage = styled.span`
    color: red;
    font-size: 14px;
    margin-top: 5px;
  `;

  export default FormPage1;
