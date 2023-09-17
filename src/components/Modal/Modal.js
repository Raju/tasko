/** @format */

import moment from "moment";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";
import { Box, Button, IconButton, Typography, Modal as MuiModal, Stack } from "@mui/material";

import styles from "./Modal.module.css";

import FormikControl from "common/FormikComponent/FormikControl";
import FormikContainer from "common/FormikComponent/FormikContainer";

const Modal = ({ open, onClose, initialValues, validationSchema, handleAddTask, isEdit }) => {
	const [isEditActive, setIsEditActive] = useState(isEdit);

	const handleDeleteImage = () => {
		setIsEditActive(false);
		initialValues.image = "";
	};

	const handleSubmit = async values => {
		const currentTime = moment().format("YYYY-MM-DDTHH:mm");
		const updatedValues = {
			...values,
			createdTime: currentTime,
			image: values.image,
		};

		handleAddTask(updatedValues);
		onClose();
	};

	return (
		<MuiModal
			open={open}
			onClose={onClose}
		>
			<Box className={styles.modal}>
				<Stack
					direction="row"
					alignItems="baseline"
					justifyContent="space-between"
					sx={{ mb: "15px" }}
				>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						{isEdit ? "Edit task" : "Add new task"}
					</Typography>

					<IconButton
						aria-label="close"
						onClick={onClose}
					>
						<CloseIcon />
					</IconButton>
				</Stack>

				<FormikContainer
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					<Stack spacing={2}>
						<FormikControl
							type="text"
							id="name"
							name="name"
							placeholder="Enter task name"
							className={styles.input}
						/>
						<FormikControl
							control="textarea"
							type="text"
							id="description"
							name="description"
							placeholder="Enter task description"
							rows={5}
							className={styles.input}
						/>
						<FormikControl
							label="Select task deadline data/time"
							type="datetime-local"
							id="deadline"
							name="deadline"
							className={styles.input}
						/>
						{isEditActive ? (
							<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
								<img
									src={initialValues.image}
									alt={`Task Image - ${initialValues.image}`}
								/>
								<IconButton
									aria-label="delete"
									onClick={handleDeleteImage}
								>
									<DeleteIcon />
								</IconButton>
							</div>
						) : (
							<FormikControl
								label="Select task image"
								type="file"
								id="image"
								name="image"
								className={styles.input}
								multiple={true}
							/>
						)}
					</Stack>
					<Stack
						direction="row"
						justifyContent="space-between"
						spacing={3}
						sx={{ m: "15px 0 10px 0" }}
					>
						<Button
							variant="contained"
							fullWidth
							type="submit"
						>
							{isEdit ? "Update Task" : "ADD Task"}
						</Button>
						<Button
							variant="contained"
							fullWidth
							type="button"
							onClick={onClose}
						>
							Cancel Task
						</Button>
					</Stack>
				</FormikContainer>
			</Box>
		</MuiModal>
	);
};

export default Modal;
