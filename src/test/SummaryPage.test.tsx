import { render } from '@testing-library/react';
import SummaryPage from '../components/SummaryPage';

const mockFormData = {
  fullName: 'John Doe',
  email: 'johndoe@example.com',
  phoneNumber: '123-456-7890',
  salary: '2.000 - 3.000',
};

test('renders summary page with correct data', () => {
  const { getByText } = render(<SummaryPage formData={mockFormData} />);
  expect(getByText('Tenant Summary')).toBeInTheDocument();
  expect(getByText('Full Name: John Doe')).toBeInTheDocument();
  expect(getByText('Email: johndoe@example.com')).toBeInTheDocument();
  expect(getByText('Phone Number: 123-456-7890')).toBeInTheDocument();
  expect(getByText('Salary: 2.000 - 3.000')).toBeInTheDocument();
});
