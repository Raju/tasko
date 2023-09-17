/** @format */

import moment from "moment";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

import { Card, CardContent, CardHeader, Divider, IconButton, Stack, Typography } from "@mui/material";

const CardData = ({ taskData, handleDeleteTask, handleAddToFavorite, handleCardClick }) => {
	const handleDragStart = (event, data) => {
    event.dataTransfer.setData("text/plain", data);
  };

	return (
		<>
			{taskData?.length > 0 ? (
				taskData.map(data => {
					const { name, description, createdTime, id, favorite, bgColor, deadline } = data;
					const showDeadline = deadline => {
						const daysDifference = moment(deadline).diff(moment(), "days");
						const hoursDifference = moment(deadline).diff(moment(), "hours");

						let deadlineText = "";

						if (daysDifference === 0) {
							if (hoursDifference === 0) {
								const minutesDifference = moment(deadline).diff(moment(), "minutes") % 60;
								const secondsDifference = moment(deadline).diff(moment(), "seconds") % 60;

								if (minutesDifference === 0) {
									deadlineText = `Deadline in ${secondsDifference} ${
										secondsDifference === 1 ? "second" : "seconds"
									}...`;
								} else if (secondsDifference < 0) {
									deadlineText = "Time Up!!!";
								} else {
									deadlineText = `Deadline in ${minutesDifference} ${
										minutesDifference === 1 ? "minute" : "minutes"
									}...`;
								}
							} else {
								deadlineText = `Deadline in ${hoursDifference} ${hoursDifference === 1 ? "hour" : "hours"}...`;
							}
						} else {
							deadlineText = `Deadline in ${daysDifference} ${daysDifference === 1 ? "day" : "days"}...`;
						}

						return deadlineText;
					};

					const showTimeDifference = time => {
						const hoursDifference = moment().diff(time, "hours");
						const daysDifference = moment().diff(time, "days");

						let timeDifferenceText = "";

						if (daysDifference === 0) {
							if (hoursDifference === 0) {
								const minutesRemaining = moment().diff(time, "minutes") % 60;
								const secondsRemaining = moment().diff(time, "seconds") % 60;

								if (minutesRemaining === 0) {
									timeDifferenceText = `Created ${secondsRemaining} ${
										secondsRemaining < 10 ? "second" : "seconds"
									} ago...`;
								} else {
									timeDifferenceText = `Created ${minutesRemaining} ${
										minutesRemaining === 1 ? "minute" : "minutes"
									} ago...`;
								}
							} else {
								timeDifferenceText = `Created ${hoursDifference} ${hoursDifference === 1 ? "hour" : "hours"} ago...`;
							}
						} else {
							timeDifferenceText = `Created ${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago...`;
						}

						return timeDifferenceText;
					};

					return (
						<Card
							key={id}
							sx={{
								marginBottom: "18px",
								boxShadow: "none",
								border: "1px solid #88909D20",
								borderRadius: "5px",
								backgroundColor: bgColor,
								cursor: "pointer",
							}}
              draggable
              onDragStart={(event) => handleDragStart(event, JSON.stringify(data))}
						>
							<CardHeader
								title={
									<Stack
										direction="row"
										alignItems="center"
										justifyContent="space-between"
										sx={{ margin: "-12px -10px -15px -5px" }}
									>
										<Typography
											sx={{
												fontWeight: "500",
											}}
										>
											{name}
										</Typography>
										<span>
											<IconButton
												aria-label="favorite"
												size="small"
												onClick={() => handleAddToFavorite(id)}
											>
												{favorite ? (
													<StarIcon sx={{ fontSize: "18px", color: "#0000008A" }} />
												) : (
													<StarOutlineIcon sx={{ fontSize: "18px", color: "#0000008A" }} />
												)}
											</IconButton>

											<IconButton
												aria-label="edit"
												size="small"
												onClick={() => handleCardClick(id)}
											>
												<EditIcon sx={{ fontSize: "18px" }} />
											</IconButton>

											<IconButton
												aria-label="delete"
												size="small"
												onClick={() => handleDeleteTask(id)}
											>
												<DeleteIcon sx={{ fontSize: "18px" }} />
											</IconButton>
										</span>
									</Stack>
								}
							/>
							<CardContent sx={{ margin: "-15px -10px -15px -5px" }}>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ fontSize: "13px", marginBottom: "5px" }}
								>
									{description}
								</Typography>

								<Divider sx={{ mt: "10px", mb: "10px" }} />

								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ fontSize: "12px", display: "flex", justifyContent: "flex-end" }}
								>
									{showDeadline(deadline)}
								</Typography>

								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ fontSize: "12px", display: "flex", justifyContent: "flex-end" }}
								>
									{showTimeDifference(createdTime)}
								</Typography>
							</CardContent>
						</Card>
					);
				})
			) : (
				<Card
					sx={{
						marginBottom: "18px",
						boxShadow: "none",
						border: "1px solid #88909D20",
						borderRadius: "5px",
					}}
				>
					<CardHeader
						title={
							<Typography sx={{ color: "gray", textAlign: "center", fontSize: "14px" }}>No task added!</Typography>
						}
					/>
				</Card>
			)}
		</>
	);
};

export default CardData;
