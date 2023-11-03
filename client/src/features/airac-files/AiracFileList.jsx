import React, { useState } from "react";
import TableGrid from "../../app/common/TableGrid";
import { GridToolbarContainer } from "@mui/x-data-grid";
import GridToolbarSearchMenu from "./GridToolbarSearchMenu";
import { Button } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { airacFiles } from "../../app/api/services";
import saveAs from "file-saver";
import { toast } from "react-toastify";
import { useEnv } from "./AiracFile";

const columns = [
  { field: "id", hideable: false, hide: true },
  {
    field: "name",
    headerName: "Name",
    hideable: false,
    disableColumnSelector: true,
    flex: 1.5,
  },
  {
    field: "sizeKb",
    headerName: "Size (KB)",
    hideable: false,
    flex: 0.75,
  },
  {
    field: "type",
    headerName: "Type",
    hideable: false,
    flex: 0.75,
  },
  {
    field: "parameters",
    headerName: "Parameters",
    hideable: false,
    flex: 0.75,
  },
  {
    field: "createdBy",
    headerName: "Created By",
    hideable: false,
    flex: 0.75,
  },
  {
    field: "effectiveDtUtc",
    headerName: "Effective Date (UTC)",
    type: "date",
    utc: true,
    hideable: false,
    flex: 0.75,
  },
  {
    field: "expirationDtUtc",
    headerName: "Expiration Date (UTC)",
    type: "date",
    utc: true,
    hideable: false,
    flex: 0.75,
  },
  {
    field: "creationDtUtc",
    headerName: "Creation Date (UTC)",
    type: "date",
    utc: true,
    hideable: false,
    flex: 0.75,
  },
];

const AiracFileList = () => {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const { env, setLoading, data } = useEnv();

  const handleDownload = async () => {
    setLoading(true);

    try {
      const { data, headers } = await airacFiles.download(env, {
        ids: rowSelectionModel,
      });

      if (data) {
        // Extract the filename from the response headers
        const contentDisposition = headers["content-disposition"];
        const match = /filename="(.*?)"/.exec(contentDisposition);

        // Use FileSaver.js to save the Blob as a file
        saveAs(new Blob([data]), match[1] ?? "example.zip");
      } else {
        toast.error("No Blob data received from the server.");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setRowSelectionModel([]);
      setLoading(false);
    }
  };

  const onRowSelectionChange = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
  };

  return (
    <TableGrid
      columns={columns}
      data={data}
      disableColumnSelector={true}
      onRowSelectionModelChange={onRowSelectionChange}
      rowSelectionModel={rowSelectionModel}
      slots={{
        toolbar: () => (
          <GridToolbarContainer>
            <GridToolbarSearchMenu />
            <Button
              onClick={handleDownload}
              startIcon={<FileDownloadOutlinedIcon />}
              disabled={rowSelectionModel.length <= 0}
            >
              Download
            </Button>
          </GridToolbarContainer>
        ),
      }}
    />
  );
};

export default AiracFileList;
