import {
  TextField,
  InputAdornment,
  Button,
  Typography,
  Box,
  Modal,
} from "@mui/material";

import { useState } from "react";

const initialState = {
  limitDate: "",
  description: "",
  client: "",
  budget: 0,
  done: false,
  canceled: false,
};

const NewTask = ({ tasks, setTasks, showNewTask, setShowNewTask }) => {
  const [newTask, setNewTask] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks([...tasks, data.task]);
      })
      .catch((err) => console.log(err));

    setNewTask(initialState);
  };

  return (
    <>
      <div>
        <Modal
          open={showNewTask}
          onClose={() => setShowNewTask(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "85%",
              bgcolor: "background.paper",
              border: "2px solid #000",
              borderRadius: "10px",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h3"
              component="h2"
              sx={{
                margin: "0 0 1.5rem 0",
                textDecoration: "underline",
                textDecorationThickness: "3px",
                textAlign: "center",
              }}
            >
              Crear Nueva Tarea
            </Typography>

            <form id="modal-modal-description" onSubmit={handleSubmit}>
              <TextField
                name="limitDate"
                label="Fecha Límite"
                value={newTask.limitDate}
                variant="outlined"
                onChange={handleChange}
                sx={{ margin: "0.5rem" }}
              />
              <TextField
                name="description"
                label="Descripción"
                value={newTask.description}
                variant="outlined"
                required
                onChange={handleChange}
                sx={{ margin: "0.5rem" }}
              />
              <TextField
                name="client"
                label="Cliente"
                value={newTask.client}
                variant="outlined"
                onChange={handleChange}
                sx={{ margin: "0.5rem" }}
              />
              <TextField
                name="budget"
                label="Presupuesto"
                value={newTask.budget}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                type="number"
                variant="outlined"
                onChange={handleChange}
                sx={{ margin: "0.5rem" }}
              />
              <Button type="submit" fullWidth variant="contained">
                Agregar Tarea
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default NewTask;
