import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { CityMap, Student } from 'models';
import React, { useState } from 'react';
import { capitalize, getMarkColor } from 'utils';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '60vh',
  },
  edit: {
    marginRight: theme.spacing(1),
  },
}));

export interface StudentTableProps {
  studentList: Student[];
  cityMap: CityMap;
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

export default function StudentTable(props: StudentTableProps) {
  const { studentList, cityMap, onEdit, onRemove } = props;

  const classes = useStyles();

  const [selectedStudent, setSelectedStudent] = useState({} as Student);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveStudent = (student: Student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleRemoveConfirm = () => {
    if (!onRemove) return;

    onRemove(selectedStudent);
    setOpen(false);
  };

  return (
    <>
      <TableContainer className={classes.root}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{capitalize(student.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(student.mark)} fontWeight="bold">
                    {student.mark}
                  </Box>
                </TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    color="primary"
                    className={classes.edit}
                    onClick={() => onEdit?.(student)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleRemoveStudent(student)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Remove this student?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this student named "{selectedStudent?.name}"? <br />
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="default" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="secondary" autoFocus onClick={handleRemoveConfirm}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
