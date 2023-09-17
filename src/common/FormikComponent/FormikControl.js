/** @format */

import { useField } from "formik";

import styles from "./Formik.module.css";

const FormikControl = ({ label, children, control = "input", ...props }) => {
	const [field, meta] = useField(props);

	const FormikField = {
		input: "input",
		textarea: "textarea",
		select: "select",
		datalist: "datalist",
		meter: "meter",
		output: "output",
		progress: "progress",
	} [control];

	return (
		<fieldset className={styles.fieldset}>
			<legend style={{ marginBottom: "5px", color: "gray" }}>{label}</legend>
			<label htmlFor={props.id || props.name}>
				{FormikField === "select" ? (
					<FormikField
						{...field}
						{...props}
					>
						{children}
					</FormikField>
				) : (
					<>
						<FormikField
							{...field}
							{...props}
						/>
						{children}
					</>
				)}
			</label>
			{meta.error && meta.touched && (
				<div className={styles.error}>{meta.error}</div>
			)}
		</fieldset>
	);
};

export default FormikControl;
