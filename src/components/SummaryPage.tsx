import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

interface SummaryPageProps {
  formData: FormData;
}

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  salary: string;
}

const SummaryPage: React.FC<SummaryPageProps> = ({ formData }) => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.3, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <CenteredSummary>
      <SummaryContainer initial="hidden" animate="visible" variants={containerVariants}>
        <Title>Tenant Summary</Title>
        <SummaryItem variants={itemVariants}>Full Name: {formData.fullName}</SummaryItem>
        <SummaryItem variants={itemVariants}>Email: {formData.email}</SummaryItem>
        <SummaryItem variants={itemVariants}>Phone Number: {formData.phoneNumber}</SummaryItem>
        <SummaryItem variants={itemVariants}>Salary: {formData.salary}</SummaryItem>
      </SummaryContainer>
    </CenteredSummary>
  );
};

const CenteredSummary = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
  background-color: #f5f5f5;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SummaryContainer = styled(motion.div)`
  opacity: 0;
  &.visible {
    opacity: 1;
    transition: all 0.5s;
  }
  text-align: center;
  background-color: #fff;
  padding: 150px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    /* Adjust styles for smaller screens (e.g., mobile) */
    padding: 80px; /* Modify padding for smaller screens */
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const SummaryItem = styled(motion.p)`
  font-size: 16px;
  margin-bottom: 10px;
  color: #555;
`;

export default SummaryPage;
