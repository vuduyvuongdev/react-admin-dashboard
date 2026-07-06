import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import { gridViLocaleText } from "../../data/gridLocale";
import Header from "../../components/Header";

const emptyDrone = {
  droneId: "",
  name: "",
  model: "",
  battery: "100%",
  status: "Sẵn sàng",
  location: "",
  operator: "",
  mission: "",
};

const statusOptions = ["Đang bay", "Sẵn sàng", "Đang sạc", "Cần bảo trì"];

const normalizeBattery = (value) => {
  const numericValue = Number.parseInt(String(value).replace("%", ""), 10);
  if (Number.isNaN(numericValue)) return "0%";
  return `${Math.min(100, Math.max(0, numericValue))}%`;
};

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState(mockDataContacts);
  const [selectionModel, setSelectionModel] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [formValues, setFormValues] = useState(emptyDrone);

  const selectedId = selectionModel.length > 0 ? selectionModel[0] : null;
  const selectedRow = rows.find((row) => row.id === selectedId);

  const getStatusChipSx = (status) => {
    if (status === "Đang bay") {
      return { backgroundColor: colors.greenAccent[600], color: "#fff" };
    }
    if (status === "Sẵn sàng") {
      return { backgroundColor: colors.blueAccent[500], color: "#fff" };
    }
    if (status === "Đang sạc") {
      return { backgroundColor: "#f59e0b", color: "#111827" };
    }
    return { backgroundColor: colors.redAccent[500], color: "#fff" };
  };

  const getBatteryColor = (battery) => {
    const value = Number.parseInt(battery, 10);
    if (value >= 80) return colors.greenAccent[500];
    if (value >= 60) return "#f59e0b";
    return colors.redAccent[500];
  };

  const openAddDialog = () => {
    setDialogMode("add");
    setFormValues(emptyDrone);
    setDialogOpen(true);
  };

  const openEditDialog = (row = selectedRow) => {
    if (!row) return;
    setDialogMode("edit");
    setSelectionModel([row.id]);
    setFormValues({
      droneId: row.droneId,
      name: row.name,
      model: row.model,
      battery: row.battery,
      status: row.status,
      location: row.location,
      operator: row.operator,
      mission: row.mission,
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleFieldChange = (field) => (event) => {
    setFormValues((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSave = () => {
    const normalizedValues = {
      ...formValues,
      battery: normalizeBattery(formValues.battery),
    };

    if (dialogMode === "add") {
      const nextId = rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
      const newRow = { id: nextId, ...normalizedValues };
      setRows((current) => [...current, newRow]);
      setSelectionModel([nextId]);
    } else if (selectedId) {
      setRows((current) =>
        current.map((row) =>
          row.id === selectedId ? { ...row, ...normalizedValues } : row
        )
      );
    }

    closeDialog();
  };

  const handleDelete = (row = selectedRow) => {
    if (!row) return;
    const shouldDelete = window.confirm(`Xóa ${row.name} (${row.droneId}) khỏi danh sách?`);
    if (!shouldDelete) return;
    setRows((current) => current.filter((item) => item.id !== row.id));
    setSelectionModel((current) => current.filter((id) => id !== row.id));
  };

  const canSave = Object.values(formValues).every((value) => String(value).trim());

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", flex: 0.45, minWidth: 70 },
      {
        field: "droneId",
        headerName: "Mã drone",
        flex: 1,
        minWidth: 110,
      },
      {
        field: "name",
        headerName: "Tên drone",
        flex: 1,
        minWidth: 130,
        cellClassName: "name-column--cell",
      },
      {
        field: "model",
        headerName: "Mẫu",
        flex: 1,
        minWidth: 130,
      },
      {
        field: "battery",
        headerName: "Pin",
        flex: 1,
        minWidth: 130,
        renderCell: ({ value }) => (
          <Box width="100%" pr="12px">
            <Typography variant="body2" fontWeight={700}>
              {value}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Number.parseInt(value, 10)}
              sx={{
                height: 7,
                borderRadius: "999px",
                backgroundColor: colors.primary[500],
                "& .MuiLinearProgress-bar": {
                  backgroundColor: getBatteryColor(value),
                  borderRadius: "999px",
                },
              }}
            />
          </Box>
        ),
      },
      {
        field: "status",
        headerName: "Trạng thái",
        flex: 1,
        minWidth: 130,
        renderCell: ({ value }) => (
          <Chip
            size="small"
            label={value}
            sx={{ ...getStatusChipSx(value), fontWeight: 700 }}
          />
        ),
      },
      {
        field: "location",
        headerName: "Vị trí",
        flex: 1,
        minWidth: 130,
      },
      {
        field: "operator",
        headerName: "Người thiết lập lộ trình",
        flex: 1,
        minWidth: 160,
      },
      {
        field: "mission",
        headerName: "Nhiệm vụ",
        flex: 1,
        minWidth: 180,
      },
      {
        field: "actions",
        headerName: "Thao tác",
        sortable: false,
        filterable: false,
        minWidth: 110,
        renderCell: ({ row }) => (
          <Box display="flex" gap="4px">
            <Tooltip title="Sửa drone">
              <IconButton size="small" onClick={() => openEditDialog(row)}>
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa drone">
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDelete(row)}
              >
                <DeleteOutlineOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colors]
  );

  return (
    <Box m={{ xs: "12px", md: "20px" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        flexDirection={{ xs: "column", md: "row" }}
        gap="12px"
      >
        <Header
          title="DANH SÁCH DRONE"
          subtitle="Danh sách drone đang hoạt động và trạng thái nhiệm vụ"
        />
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddOutlinedIcon />}
            onClick={openAddDialog}
          >
            Thêm drone
          </Button>
          <Button
            variant="contained"
            startIcon={<EditOutlinedIcon />}
            disabled={!selectedRow}
            onClick={() => openEditDialog()}
          >
            Cập nhật
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineOutlinedIcon />}
            disabled={!selectedRow}
            onClick={() => handleDelete()}
          >
            Xóa
          </Button>
        </Stack>
      </Box>

      <Box
        m="20px 0 0 0"
        height={{ xs: "68vh", md: "75vh" }}
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          disableSelectionOnClick
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          localeText={gridViLocaleText}
          selectionModel={selectionModel}
          onSelectionModelChange={(newSelection) =>
            setSelectionModel(newSelection.slice(-1))
          }
        />
      </Box>

      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="md">
        <DialogTitle>
          {dialogMode === "add" ? "Thêm drone mới" : "Cập nhật drone"}
        </DialogTitle>
        <DialogContent>
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", md: "repeat(2, 1fr)" }}
            gap="16px"
            pt="8px"
          >
            <TextField
              label="Mã drone"
              value={formValues.droneId}
              onChange={handleFieldChange("droneId")}
              fullWidth
              required
            />
            <TextField
              label="Tên drone"
              value={formValues.name}
              onChange={handleFieldChange("name")}
              fullWidth
              required
            />
            <TextField
              label="Mẫu"
              value={formValues.model}
              onChange={handleFieldChange("model")}
              fullWidth
              required
            />
            <TextField
              label="Pin (%)"
              type="number"
              value={String(formValues.battery).replace("%", "")}
              onChange={handleFieldChange("battery")}
              inputProps={{ min: 0, max: 100 }}
              fullWidth
              required
            />
            <TextField
              select
              label="Trạng thái"
              value={formValues.status}
              onChange={handleFieldChange("status")}
              fullWidth
              required
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Vị trí"
              value={formValues.location}
              onChange={handleFieldChange("location")}
              fullWidth
              required
            />
            <TextField
              label="Người thiết lập lộ trình"
              value={formValues.operator}
              onChange={handleFieldChange("operator")}
              fullWidth
              required
            />
            <TextField
              label="Nhiệm vụ"
              value={formValues.mission}
              onChange={handleFieldChange("mission")}
              fullWidth
              required
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={closeDialog}>Hủy</Button>
          <Button
            variant="contained"
            color="secondary"
            disabled={!canSave}
            onClick={handleSave}
          >
            {dialogMode === "add" ? "Thêm" : "Lưu cập nhật"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Contacts;
