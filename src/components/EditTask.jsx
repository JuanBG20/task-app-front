import {
  TextField,
  InputAdornment,
  Button,
  Typography,
  Box,
  Modal,
} from "@mui/material";

import { useState } from "react";

const EditTask = ({ indice, tasks, showEditTask, setShowEditTask }) => {
  const [editTask, setEditTask] = useState(tasks[indice]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setEditTask({ ...editTask, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    tasks[indice] = editTask;
    setShowEditTask(false);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/tasks/${editTask._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editTask),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    setEditTask({});
  };

  return (
    <>
      <div>
        <Modal
          open={showEditTask}
          onClose={() => setShowEditTask(false)}
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
              Editar Tarea
            </Typography>

            <form id="modal-modal-description" onSubmit={handleSubmit}>
              <TextField
                name="limitDate"
                label="Fecha Límite"
                value={editTask.limitDate}
                variant="outlined"
                onChange={handleChange}
                sx={{ margin: "0.5rem" }}
              />
              <TextField
                name="description"
                label="Descripción"
                value={editTask.description}
                variant="outlined"
                required
                onChange={handleChange}
                sx={{ margin: "0.5rem" }}
              />
              <TextField
                name="client"
                label="Cliente"
                value={editTask.client}
                variant="outlined"
                onChange={handleChange}
                sx={{ margin: "0.5rem" }}
              />
              <TextField
                name="budget"
                label="Presupuesto"
                value={editTask.budget}
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
                Guardar Tarea
              </Button>
            </form>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default EditTask;
