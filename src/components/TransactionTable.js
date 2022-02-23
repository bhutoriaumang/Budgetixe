import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Collapse } from "@mui/material";

const Row = ({ columns, row }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow hover>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </IconButton>
        </TableCell>
        {columns.map((column) => {
          let value = row[column.id];
          let color = "black";
          let fontWeight = "normal";
          if (column.id === "amount") {
            fontWeight = "bold";
            if (value < 0.0) color = "red";
            else {
              value = `+${value}`;
              color = "green";
            }
          }
          return (
            <TableCell key={column.id} sx={{ color, fontWeight }}>
              {value}
            </TableCell>
          );
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open}>
            <p>eugdjewdwjdh</p>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const Transactiontable = ({ columns, rows }) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ whiteSpace: "nowrap", width: "1%" }} />
              {columns.map((column) => (
                <TableCell sx={{ fontWeight: "bold" }} key={column.id}>
                  {column.value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row columns={columns} row={row} key={row.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Transactiontable;
