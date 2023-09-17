/** @format */

import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";
import { Box, Button, IconButton, Typography, Modal as MuiModal, Stack } from "@mui/material";

import styles from "./Panel.module.css";

import FormikControl from "common/FormikComponent/FormikControl";
import FormikContainer from "common/FormikComponent/FormikContainer";

const PanelInputModal = ({ open, onClose, initialValues, validationSchema, onAddPanel }) => {
	const handleSubmit = async values => {
		const updatedValues = {
			...values,
			id: values.title.toLowerCase(),
			title: values.title.toUpperCase(),
		};

		onAddPanel(updatedValues);
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
						Add a New Panel (Max of 5 panels)
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
							id="title"
							name="title"
							placeholder="Enter panel title"
							className={styles.input}
						/>

						<FormikControl
							label="Set panel background"
							type="color"
							id="backgroundColor"
							name="backgroundColor"
							className={styles.color}
						/>

						<FormikControl
							label="Set panel color"
							type="color"
							id="color"
							name="color"
							className={styles.color}
						/>
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
							ADD Panel
						</Button>
						<Button
							variant="contained"
							fullWidth
							type="button"
							onClick={onClose}
						>
							Cancel Panel
						</Button>
					</Stack>
				</FormikContainer>
			</Box>
		</MuiModal>
	);
};

export default PanelInputModal;
