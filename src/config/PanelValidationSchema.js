/** @format */

import * as Yup from "yup";
import moment from "moment";

const PanelValidationSchema = Yup.object({
	id: Yup.string(),
	title: Yup.string()
		.matches(/^[A-Za-z\s]*$/, "Panel title can only contain letters")
		.min(5, "Too Short!")
		.max(10, "Must be 10 characters or less")
		.required("Panel title is required"),
	backgroundColor: Yup.string().required("Panel background color is required"),
	color: Yup.string().required("Panel color is required"),
	isDefault: Yup.boolean(),
});

export { PanelValidationSchema };
