import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc)

const TableGrid = ({ columns, data, ...props }) => {
  const columnHeaderStyle = {
    backgroundColor: "lightsteelblue",
    fontSize: 16,
  };

  // Use destructuring and reduce to create the columnVisibilityModel object
  const columnVisibilityModel = columns
    .filter((item) => item.hide === true)
    .reduce((result, column) => {
      return {
        ...result,
        [column.field]: false,
      };
    }, {});

  // Apply the value formatting function to relevant columns
  const formattedColumns = columns.map((column) => ({
    ...column,
    valueFormatter: ({ value }) => {
      if (column.type === "currency") {
        // Apply currency formatting
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: column.format || "USD",
        }).format(value);
      } else if (column.type === "date") {
        // Apply date formatting
        return (column.utc ? dayjs.utc(value) : dayjs(value)).format(column.format ?? "MM/DD/YYYY");
      } else if (column.valueFormatter) {
        // Custom value formatter for numbers
        return column.valueFormatter(value);
      }
      return value; // Default to no formatting
    },
  }));

  return (
    <Box sx={{ height: 630, width: "100%" }}>
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnSeparator": { display: "none" },
          "& .MuiDataGrid-columnHeaders": columnHeaderStyle,
        }}
        rows={data}
        columns={formattedColumns}
        initialState={{
          columns: {
            columnVisibilityModel: columnVisibilityModel,
          },
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 15, 20, 25]}
        checkboxSelection
        {...props}
      />
    </Box>
  );
};

export default TableGrid;
