import { Prisma } from "@prisma/client";
import * as yup from 'yup'

const shape = {
    firstName: yup.string().required('First name is a required field'),
};

const formSchema = yup.object().shape(shape);

export const validateRegistrationForm = (requestBody: Prisma.RegistrationCreateInput) => formSchema.validate(requestBody, {
    abortEarly: false,
    stripUnknown: true,
});

export default validateRegistrationForm;
