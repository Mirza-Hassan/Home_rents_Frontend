import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FormPage2 from '../components/FormPage2';

test('FormPage2 handles input changes and validation', () => {
  const formData = {
    phoneNumber: '',
    salary: '',
  };
  const handleInputChange = jest.fn();
  const { getByLabelText, getByText, queryByText } = render(
    <MemoryRouter>
      <FormPage2 formData={formData} handleInputChange={handleInputChange} />
    </MemoryRouter>
  );

  const phoneNumberInput = getByLabelText('Phone Number:');
  fireEvent.change(phoneNumberInput, { target: { name: 'phoneNumber', value: '1234567890' } });
  fireEvent.click(getByLabelText('0 - 1.000', { exact: false }));
  const submitButton = getByText('Submit');
  fireEvent.click(submitButton);
});
