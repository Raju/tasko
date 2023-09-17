/** @format */

import { Formik, Form } from "formik";

const FormikContainer = ({ initialValues, validate, validationSchema, onSubmit, children }) => (
	<Formik
		initialValues={initialValues}
		validate={validate}
		validationSchema={validationSchema}
		onSubmit={onSubmit}
	>
		<Form>{children}</Form>
	</Formik>
);

export default FormikContainer;
