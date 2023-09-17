/** @format */

import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, IconButton, Stack, Typography } from "@mui/material";

import Modal from "components/Modal/Modal";
import CONSTANTS from "config/constants";

import { TaskValidationSchema } from "config/TaskValidationSchema";

const CardHeader = ({ panelData, handleDeletePanel, handleAddTask, handleSortTask, sortOrder }) => {
	const [open, setOpen] = useState(false);

	const { id, title, backgroundColor, color, isDefault } = panelData;

	const buttonTitleStyle = {
		color,
		backgroundColor,
		borderRadius: "10px",
		boxShadow: "none",
		fontWeight: "bold",
		padding: "2px 6px",
		minWidth: "0",
		fontSize: "12px",
	};
	const buttonSubHeaderStyle = {
		backgroundColor: "#EDF2F7",
		color: "#718096",
		boxShadow: "none",
		padding: "2.5px",
	};

	const initialValues = {
		id: uuidv4(),
		name: "",
		description: "",
		createdTime: new Date(),
		status: id,
		favorite: false,
		bgColor: CONSTANTS.cardBgColor[Math.floor(Math.random() * 10)],
		deadline: "YYYY-MM-DDTHH:mm",
		image: [],
	};

	return (
		<>
			<Stack
				direction="row"
				alignItems="baseline"
				justifyContent="space-between"
			>
				<Typography style={buttonTitleStyle}>{title}</Typography>
				<span>
					{!isDefault && (
						<IconButton
							aria-label="delete"
							size="small"
							onClick={() => handleDeletePanel(panelData)}
						>
							<DeleteIcon sx={{ fontSize: "18px" }} />
						</IconButton>
					)}
					<Button
						sx={{ background: "#EDF2F7", color: "#718096", borderRadius: "10px", padding: "2px 6px", fontSize: "12px" }}
						endIcon={sortOrder === "asc" ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						onClick={handleSortTask}
					>
						Sort
					</Button>
				</span>
			</Stack>

			<Button
				variant="contained"
				style={buttonSubHeaderStyle}
				fullWidth
				onClick={() => setOpen(true)}
			>
				<AddIcon sx={{ fontSize: "20px" }} />
			</Button>

			<Modal
				open={open}
				onClose={() => setOpen(false)}
				handleAddTask={handleAddTask}
				initialValues={initialValues}
				validationSchema={TaskValidationSchema}
				isEdit={false}
			/>
		</>
	);
};

export default CardHeader;
