import { render, fireEvent  } from '@testing-library/react';
import FormPage1 from '../components/FormPage1';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => () => {},
}));

test('FormPage1 handles input changes and validation', () => {
  const formData = {
    fullName: '',
    email: '',
  };
  const handleInputChange = jest.fn();
  const { getByLabelText, getByText } = render(
    <FormPage1 formData={formData} handleInputChange={handleInputChange} />
  );

  const fullNameInput = getByLabelText('Full Name:');
  const emailInput = getByLabelText('Email:');
  fireEvent.change(fullNameInput, { target: { name: 'fullName', value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { name: 'email', value: 'john@example.com' } });
  expect(handleInputChange).toHaveBeenCalledTimes(2);
  const nextButton = getByText('Next');
  fireEvent.click(nextButton);
});
