import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Transactiontable = ({ columns, rows }) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell sx={{ fontWeight: "bold" }} key={column.id}>
                  {column.value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover key={row.id}>
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
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Transactiontable;
