/** @format */

import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";
import { Button, IconButton, Stack, Typography } from "@mui/material";

import "./App.css";

import CONSTANTS from "config/constants";
import TaskPanel from "components/TaskPanel/TaskPanel";
import PanelInputModal from "components/Panel/PanelInputModal";
import { PanelValidationSchema } from "config/PanelValidationSchema";

const App = () => {
	const [panels, setPanels] = useState([]);
	const [open, setOpen] = useState(false);

	const addPanel = (values) => {
    if (panels.length < 5) {
      const updatedPanels = [...panels, values];
      setPanels(updatedPanels);
      localStorage.setItem("panels", JSON.stringify(updatedPanels));
    } else {
      console.log("Maximum 5 panels allowed");
    }
	};

	const deletePanel = (data) => {
		const updatedPanels = panels.filter(p => p.id !== data.id);

		setPanels(updatedPanels);
		localStorage.setItem("panels", JSON.stringify(updatedPanels));
	}

	useEffect(() => {
    const storedPanels = JSON.parse(localStorage.getItem("panels")) || CONSTANTS.cardLists;
		setPanels(storedPanels);
  }, []);

	return (
		<>
			<Typography
				align="center"
				variant="h3"
				sx={{
					fontWeight: "bold",
					margin: "20px",
					background: "linear-gradient(to bottom, rgb(121, 40, 202), rgb(255, 0, 128))",
					backgroundClip: "text",
					color: "transparent",
				}}
			>
				Welcome to Tasko
			</Typography>

			<Button
				sx={{ background: "#C6F6D5", color: "#22543D", borderRadius: "10px", padding: "2px 6px", fontSize: "13px", position: "fixed", top: "0", left: "50%", transform: "translateX(-50%)" }}
				endIcon={<AddIcon sx={{ fontSize: "6px" }} />}
				onClick={() => setOpen(true)}
			>
				Add Panel
			</Button>

			<PanelInputModal
				open={open}
				onClose={() => setOpen(false)}
				onAddPanel={addPanel}
				initialValues={{
					id: "",
					title: "",
					backgroundColor: "",
					color: "",
					isDefault: false,
				}}
				validationSchema={PanelValidationSchema}
			/>

			<Stack
				direction="row"
				justifyContent="center"
				spacing={3}
				sx={{ m: "20px" }}
			>
				{panels.map(card => (
					<TaskPanel
						key={card.id}
						id={card.id}
						panelData={card}
						handleDeletePanel={deletePanel}
					/>
				))}
			</Stack>
		</>
	);
};

export default App;
