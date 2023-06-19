import { RegistrationForm } from '@/types/RegistrationForm';
import transformRegistrationForm from '../utils/transformRegistrationForm';

export default async function saveRegistrationForm(registrationForm: RegistrationForm) {
  let registrationData = transformRegistrationForm(registrationForm)

  const response = await fetch('/api/registrations', {
    method: 'POST',
    body: JSON.stringify(registrationData)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}
