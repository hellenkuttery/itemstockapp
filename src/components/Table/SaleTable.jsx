import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import useStockCall from "../../hook/useStockCall";
import { ContentCutOutlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";


function getRowId(row) {
  return row._id;
}

export default function SaleTable({setInitialState,handleOpen}) {
  const { sales } = useSelector((state) => state.stock);
  const { getDeleteData } = useStockCall();
  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      width: 240,
      renderCell: ({ row }) => {
        return new Date(row.createdAt).toLocaleString("de-DE");
      },
    },

    {
      field: "brandId",
      headerName: "Brand",
      width: 200,
      // editable: true,
      renderCell: ({ row }) => {
        return row?.brandId?.name ?? "-No Brand-";
      },
    },
    {
      field: "productId",
      headerName: "Product",
      width: 200,
      // editable: true,
      renderCell: ({ row }) => {
        return row?.productId?.name ?? "-No Product-";
      },
    },
    {
      field: "quantity",
      headerName: "Stock",
      type: "number",
      width: 150,
      // editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 150,
      // editable: true,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 150,
      // editable: true,
    },
    {
      headerName: "Actions",
      description: "This column includes actions about products",
      // sortable: false,
      align: "center",
      headerAlign: "center",
      width: 170,
      renderCell: ({
        row: { brandId, productId, quantity, price, firmId, _id },
      }) => {
        return [
          <GridActionsCellItem
            key={"edit"}
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              handleOpen();
              setInitialState({
                _id,
                brandId,
                productId,
                quantity,
                price,
                firmId,
              });
            }}
           
          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => getDeleteData("sales", _id)}
         
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={sales}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={getRowId}
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}
