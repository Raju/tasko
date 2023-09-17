/** @format */

import * as Yup from "yup";
import moment from "moment";

const TaskValidationSchema = Yup.object({
	name: Yup.string()
		.matches(/^[A-Za-z\s]*$/, "Task name can only contain letters")
		.min(5, "Too Short!")
		.max(10, "Must be 10 characters or less")
		.required("Task name is required"),
	description: Yup.string()
		.min(5, "Too Short!")
		.max(100, "Must be 100 characters or less")
		.required("Task description is required"),
	createdTime: Yup.date(),
	status: Yup.string().oneOf(["todo", "progress", "blocked", "completed"]),
	favorite: Yup.boolean(),
	deadline: Yup.date()
		.required("Task deadline date/time is required")
		.transform(currentValue => {
			const currentDateTime = moment().format("YYYY-MM-DDTHH:mm");
			const selectedDateTimeMoment = moment(currentValue).format("YYYY-MM-DDTHH:mm");

			if (moment(selectedDateTimeMoment).isSameOrAfter(currentDateTime)) {
				return currentValue;
			} else {
				return Yup.mixed().notOneOf([currentValue], "Deadline data/time must be in the future");
			}
		})
		.typeError("Deadline data/time must be in the future"),
	image: Yup.mixed().required("Image is required"),
});

export { TaskValidationSchema };
