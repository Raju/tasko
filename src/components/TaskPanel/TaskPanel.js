/** @format */

import { useEffect, useState } from "react";
import { Card, CardContent, Stack } from "@mui/material";

import Modal from "components/Modal/Modal";
import CardData from "components/TaskPanel/CardData/CardData";
import CardHeader from "components/TaskPanel/CardHeader/CardHeader";

import { useTasks } from "components/TaskContext/TaskContext";
import { TaskValidationSchema } from "config/TaskValidationSchema";

const TaskPanel = ({ panelData, handleDeletePanel }) => {
	const { tasks, updateTasks } = useTasks();
	const [sortOrder, setSortOrder] = useState("asc");
	const [selectedTaskToEdit, setSelectedTaskToEdit] = useState(null);

	const handleDragOver = event => {
		event.preventDefault();
	};

	const handleDrop = event => {
		event.preventDefault();
		const response = event.dataTransfer.getData("text/plain");
		const data = JSON.parse(response);

		if (data.status === panelData.id) {
			return;
		}
		const updatedOriginalPanelTasks = tasks.filter(task => task.id !== data.id);
		const updatedTasks = {...data, status: panelData.id}
		updateTasks([...updatedOriginalPanelTasks, updatedTasks]);
	};

	const handleAddTask = task => {
		const taskIndex = tasks.findIndex(t => t.id === task.id);

		if (taskIndex !== -1) {
			const updatedTasks = [...tasks];
			updatedTasks[taskIndex] = task;
			updateTasks(updatedTasks);
		} else {
			updateTasks([...tasks, task]);
		}

		setSelectedTaskToEdit(null);
	};

	const handleDeleteTask = id => {
		const updatedTasks = tasks.filter(task => task.id !== id);

		updateTasks(updatedTasks);
	};

	const handleAddToFavorite = taskId => {
		const updatedTasks = tasks.map(task => (task.id === taskId ? { ...task, favorite: !task.favorite } : task));

		updateTasks(updatedTasks);
	};

	const handleSortTask = () => {
		const updatedTasks = [...tasks];
		const filteredAndSortedTasks = updatedTasks
			.filter(task => task.status === panelData.id && !task.favorite)
			.sort((a, b) => {
				const sortA = a.name.toLowerCase();
				const sortB = b.name.toLowerCase();

				return sortOrder === "asc" ? sortA.localeCompare(sortB) : sortB.localeCompare(sortA);
			});

		updatedTasks.splice(
			updatedTasks.findIndex(task => task.status === panelData.id && !task.favorite),
			filteredAndSortedTasks.length,
			...filteredAndSortedTasks,
		);

		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		updateTasks(updatedTasks);
	};

	const filteredTasks = tasks.filter(task => task.status === panelData.id);

	const handleCardClick = id => {
		const taskToEdit = tasks.find(task => task.id === id);
		setSelectedTaskToEdit(taskToEdit);
	};

	useEffect(() => {
		// console.log(`file: index.js:28 🔥 TaskPanel 🔥 tasks:`, tasks);
	}, [tasks]);

	return (
		<Stack
			direction="column"
			spacing={2}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			<CardHeader
				panelData={panelData}
				handleDeletePanel={handleDeletePanel}
				handleAddTask={handleAddTask}
				handleSortTask={handleSortTask}
				sortOrder={sortOrder}
			/>

			<Card
				sx={{
					backgroundColor: "#F7FAFC",
					boxShadow: "none",
					border: "1px solid #88909D20",
					width: "250px",
					height: "500px",
				}}
			>
				<CardContent
					sx={{
						marginBottom: "-25px",
						overflowY: "auto",
						maxHeight: "70vh",
					}}
				>
					<CardData
						taskData={filteredTasks}
						handleCardClick={handleCardClick}
						handleDeleteTask={handleDeleteTask}
						handleAddToFavorite={handleAddToFavorite}
					/>
				</CardContent>
			</Card>
			{selectedTaskToEdit && (
				<Modal
					open={true}
					onClose={() => setSelectedTaskToEdit(null)}
					handleAddTask={handleAddTask}
					initialValues={selectedTaskToEdit}
					validationSchema={TaskValidationSchema}
					isEdit={true}
				/>
			)}
		</Stack>
	);
};

export default TaskPanel;
