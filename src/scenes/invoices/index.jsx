import { Box, Typography, useTheme, Button, Chip, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import { gridViLocaleText } from "../../data/gridLocale";
import Header from "../../components/Header";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isWide = useMediaQuery("(min-width:1100px)");
  const [selectionModel, setSelectionModel] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const selectedId = selectionModel && selectionModel.length > 0 ? selectionModel[0] : null;
  const selectedRow = selectedId ? mockDataInvoices.find((r) => r.id === selectedId) : null;
  const getMissionStatusChipSx = (status) => {
    if (status === "Hoàn thành") {
      return { backgroundColor: colors.greenAccent[600], color: "#fff" };
    }
    if (status === "Đang thực hiện") {
      return { backgroundColor: colors.blueAccent[500], color: "#fff" };
    }
    return { backgroundColor: "#f59e0b", color: "#111827" };
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "mission",
      headerName: "Nhiệm vụ",
      flex: 1,
      minWidth: 180,
      cellClassName: "name-column--cell",
    },
    {
      field: "drone",
      headerName: "Drone",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "operator",
      headerName: "Người thiết lập lộ trình",
      flex: 1,
      minWidth: 160,
    },
    {
      field: "duration",
      headerName: "Thời lượng",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      minWidth: 150,
      renderCell: ({ value }) => (
        <Chip
          size="small"
          label={value}
          sx={{ ...getMissionStatusChipSx(value), fontWeight: 700 }}
        />
      ),
    },
    {
      field: "date",
      headerName: "Ngày",
      flex: 1,
      minWidth: 120,
    },
  ];

  return (
    <Box m="20px">
      <Header title="NHIỆM VỤ BAY" subtitle="Lịch trình nhiệm vụ và trạng thái hoạt động" />
      <Box
        m="40px 0 0 0"
        height={{ xs: "auto", lg: "75vh" }}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            borderRadius: "8px",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: `${colors.primary[500]} !important`,
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <Box
          display="flex"
          flexDirection={isWide ? "row" : "column"}
          gap="20px"
          minHeight={{ xs: "auto", lg: "100%" }}
        >
          <Box flex="1 1 0" display="flex" flexDirection="column">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems={{ xs: "stretch", md: "center" }}
              flexDirection={{ xs: "column", md: "row" }}
              gap="10px"
              mb="10px"
            >
              <Box display="flex" flexWrap="wrap" gap="10px">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (!selectionModel || selectionModel.length === 0) return;
                    const id = selectionModel[0];
                    const row = mockDataInvoices.find((r) => r.id === id);
                    setStatusMessage(`Yêu cầu quay về đã gửi cho nhiệm vụ ${row.mission} (${row.drone})`);
                    console.log("Yêu cầu quay về:", row);
                  }}
                  disabled={!selectionModel || selectionModel.length === 0}
                >
                  Gửi yêu cầu quay về
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    if (!selectionModel || selectionModel.length === 0) return;
                    const id = selectionModel[0];
                    const row = mockDataInvoices.find((r) => r.id === id);
                    setStatusMessage(`Đã hủy nhiệm vụ ${row.mission} (${row.drone})`);
                    console.log("Hủy nhiệm vụ:", row);
                  }}
                  disabled={!selectionModel || selectionModel.length === 0}
                >
                  Hủy nhiệm vụ
                </Button>
              </Box>
              <Box color={colors.grey[100]}>
                {statusMessage && <Typography>{statusMessage}</Typography>}
              </Box>
            </Box>

            <Box flex="1 1 0" height={{ xs: "60vh", lg: "auto" }}>
              <DataGrid
                checkboxSelection
                rows={mockDataInvoices}
                columns={columns}
                localeText={gridViLocaleText}
                onSelectionModelChange={(newSelection) => setSelectionModel(newSelection)}
                selectionModel={selectionModel}
              />
            </Box>
          </Box>

          <Box
            width={isWide ? "320px" : "100%"}
            p={2}
            sx={{
              backgroundColor: colors.primary[400],
              border: `1px solid ${colors.primary[300]}`,
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>Chi tiết nhiệm vụ</Typography>
            {!selectedRow ? (
              <Typography>Chọn 1 nhiệm vụ để xem chi tiết</Typography>
            ) : (
              <Box>
                <Typography><strong>Nhiệm vụ:</strong> {selectedRow.mission}</Typography>
                <Typography><strong>Drone:</strong> {selectedRow.drone}</Typography>
                <Typography><strong>Người thiết lập lộ trình:</strong> {selectedRow.operator}</Typography>
                <Typography><strong>Thời lượng:</strong> {selectedRow.duration}</Typography>
                <Box display="flex" alignItems="center" gap="8px" mt="4px">
                  <Typography component="strong">Trạng thái:</Typography>
                  <Chip
                    size="small"
                    label={selectedRow.status}
                    sx={{ ...getMissionStatusChipSx(selectedRow.status), fontWeight: 700 }}
                  />
                </Box>
                <Typography><strong>Ngày:</strong> {selectedRow.date}</Typography>

                <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setStatusMessage(`Yêu cầu quay về đã gửi cho nhiệm vụ ${selectedRow.mission} (${selectedRow.drone})`);
                      console.log("Yêu cầu quay về:", selectedRow);
                    }}
                  >
                    Gửi yêu cầu quay về
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setStatusMessage(`Đã hủy nhiệm vụ ${selectedRow.mission} (${selectedRow.drone})`);
                      console.log("Hủy nhiệm vụ:", selectedRow);
                    }}
                  >
                    Hủy nhiệm vụ
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Invoices;
