import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

interface FormPage2Props {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormData {
  phoneNumber: string;
  salary: string;
}

const FormPage2: React.FC<FormPage2Props> = ({ formData, handleInputChange }) => {
  const [errors, setErrors] = useState({
    phoneNumber: '',
    salary: '',
  });
  const navigate = useNavigate();
  const salaryRange = ['0 - 1.000', '1.000 - 2.000', '2.000 - 3.000', '3.000 - 4.000', 'Mehr als 4.000'];

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { phoneNumber: '', salary: '' };
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Please enter a valid phone number.';
      valid = false;
    }
    if ('salary' in formData) {
      if (!formData.salary) {
        newErrors.salary = 'Please select a salary option.';
        valid = false;
      }
    }
    setErrors(newErrors);
    return valid;
  };

  const handleNextClick = () => {
    const isValid = validateForm();
    if (isValid) {
      navigate('/summary');
    } else {
      //Form has validation errors. Please check the fields
    }
  };

  return (
    <CenteredForm>
      <FormContainer
        initial="hidden"
        animate="visible"
        variants={formVariants}
      >
        <Title>Tenant Details</Title>
        <FormGroup>
          Phone Number:
          <Input
            type="text"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          Salary:
          {salaryRange.map((value) => (
            <RadioGroup key={value}>
              <input
                type="radio"
                name="salary"
                value={value}
                checked={formData.salary === value}
                onChange={handleInputChange}
              />
              {value}
            </RadioGroup>
          ))}
          <br/>
          {errors.salary && <ErrorMessage>{errors.salary}</ErrorMessage>}
        </FormGroup>
        <NavigationLinks initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Link to="/">Previous</Link>
          <SubmitButton onClick={handleNextClick}>Submit</SubmitButton>
        </NavigationLinks>
      </FormContainer>
    </CenteredForm>
  );
};

const CenteredForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
  background-color: #f5f5f5;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const FormContainer = styled(motion.div)`
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

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
`;

const FormGroup = styled.label`
  display: block;
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

const RadioGroup = styled.span`
  margin-right: 5px;

  input[type='radio'] {
    margin-right: 5px;
  }
`;

const SubmitButton = styled.button`
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

const NavigationLinks = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  a {
    font-size: 18px;
    text-decoration: none;
    color: #007BFF;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #0056b3;
    }
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

export default FormPage2;
