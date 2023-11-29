import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  IconButton,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Checkbox,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TaskList = ({
  tasks,
  setTasks,
  setShowNewTask,
  setShowEditTask,
  setIndice,
}) => {
  const handleDone = (id, bool) => {
    fetch(`http://localhost:8080/tasks/done/${id}/${bool}`, {
      method: "DELETE",
    }).then((res) => res.json());

    const newTaskArray = tasks.map((task) =>
      task._id === id ? (task = { ...task, done: !bool }) : (task = { ...task })
    );

    const indice = tasks.findIndex((task) => task._id === id);
    const splicedTask = newTaskArray.splice(indice, 1)[0];

    if (bool === false) {
      newTaskArray.push(splicedTask);
    } else {
      newTaskArray.unshift(splicedTask);
    }
    setTasks(newTaskArray);
  };

  const handleDelete = (id, bool) => {
    fetch(`http://localhost:8080/tasks/cancel/${id}/${bool}`, {
      method: "DELETE",
    }).then((res) => res.json());

    const newTaskArray = tasks.filter((task) => task._id !== id);
    setTasks(newTaskArray);
  };

  const handleEdit = (id) => {
    const indice = tasks.findIndex((task) => task._id === id);
    setIndice(indice);
    setShowEditTask(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginTop: "1.5rem",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            textDecoration: "underline",
            textDecorationThickness: "3px",
            flexGrow: "1",
          }}
        >
          Lista de Tareas
        </Typography>
        <Button
          variant="contained"
          sx={{ height: "3rem" }}
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setShowNewTask(true)}
        >
          Nueva Tarea
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ margin: "2rem", border: "1px solid black" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" padding="checkbox">
                <Checkbox disabled />
              </TableCell>
              <TableCell align="center">Fecha Límite</TableCell>
              <TableCell align="center">Descripción</TableCell>
              <TableCell align="center">Cliente</TableCell>
              <TableCell align="center">Presupuesto</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks?.map(
              ({
                _id,
                limitDate,
                description,
                client,
                budget,
                canceled,
                done,
              }) => (
                <TableRow key={_id} className={done ? "done" : ""}>
                  <TableCell align="center" padding="checkbox">
                    <Checkbox
                      checked={done ? true : false}
                      onClick={() => handleDone(_id, done)}
                    />
                  </TableCell>
                  <TableCell align="center">{limitDate}</TableCell>
                  <TableCell align="center">{description}</TableCell>
                  <TableCell align="center">{client}</TableCell>
                  <TableCell align="center">$ {budget}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleDelete(_id, canceled)}>
                      <DeleteIcon color="error"></DeleteIcon>
                    </IconButton>
                    <IconButton onClick={() => handleEdit(_id)}>
                      <EditIcon color="primary"></EditIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskList;
