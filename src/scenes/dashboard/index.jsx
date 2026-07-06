import { Box, Button, Chip, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import BatteryChargingFullOutlinedIcon from "@mui/icons-material/BatteryChargingFullOutlined";
import AltRouteOutlinedIcon from "@mui/icons-material/AltRouteOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const panelSx = {
    backgroundColor: colors.primary[400],
    borderRadius: "8px",
    border: `1px solid ${colors.primary[300]}`,
    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
  };
  const getAlertChipSx = (level) => {
    if (level === "Cấp 3") {
      return { backgroundColor: colors.redAccent[500], color: "#fff" };
    }
    if (level === "Cấp 2") {
      return { backgroundColor: "#f59e0b", color: "#111827" };
    }
    return { backgroundColor: colors.greenAccent[600], color: "#fff" };
  };

  return (
    <Box m={{ xs: "12px", md: "20px" }}>
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
        gap="12px"
      >
        <Header title="BẢNG ĐIỀU KHIỂN DRONE" subtitle="Tổng quan thời gian thực về đội bay, nhiệm vụ và cảnh báo" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Tải báo cáo
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows={{ xs: "auto", md: "140px" }}
        gap={{ xs: "14px", md: "20px" }}
      >
        {/* ROW 1 */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6", lg: "span 3" }}
          sx={panelSx}
          minHeight="140px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="18"
            subtitle="Số drone đang bay"
            progress="0.72"
            increase="+6%"
            icon={
              <FlightTakeoffOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6", lg: "span 3" }}
          sx={panelSx}
          minHeight="140px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="82%"
            subtitle="Pin trung bình"
            progress="0.82"
            increase="+4%"
            icon={
              <BatteryChargingFullOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6", lg: "span 3" }}
          sx={panelSx}
          minHeight="140px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="24"
            subtitle="Số chuyến bay theo ngày"
            progress="0.60"
            increase="+8%"
            icon={
              <AltRouteOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6", lg: "span 3" }}
          sx={panelSx}
          minHeight="140px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="9"
            subtitle="Số lần cảnh báo"
            progress="0.45"
            increase="+2%"
            icon={
              <WarningAmberOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn={{ xs: "span 12", lg: "span 8" }}
          gridRow={{ xs: "span 3", md: "span 2" }}
          sx={panelSx}
          minHeight={{ xs: "360px", md: "280px" }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Chuyến bay hôm nay
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                124 nhiệm vụ đã ghi nhận
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn={{ xs: "span 12", lg: "span 4" }}
          gridRow="span 2"
          sx={panelSx}
          overflow="auto"
          minHeight="280px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Cảnh báo gần đây
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Chip
                size="small"
                label={transaction.cost}
                sx={{ ...getAlertChipSx(transaction.cost), fontWeight: 700 }}
              />
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn={{ xs: "span 12", md: "span 4" }}
          gridRow="span 2"
          sx={panelSx}
          p="30px"
          minHeight="280px"
        >
          <Typography variant="h5" fontWeight="600">
            Phân bố trạng thái drone
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              94% đội bay sẵn sàng
            </Typography>
            <Typography>Trạng thái vận hành của toàn bộ drone và pin</Typography>
          </Box>
        </Box>
        <Box
          gridColumn={{ xs: "span 12", md: "span 4" }}
          gridRow="span 2"
          sx={panelSx}
          minHeight="280px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Số chuyến bay theo ngày
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn={{ xs: "span 12", md: "span 4" }}
          gridRow="span 2"
          sx={panelSx}
          padding="30px"
          minHeight="280px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Số lần cảnh báo
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
