import { Box, Chip, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const alertSx = (level) => ({
    backgroundColor: colors.primary[400],
    borderLeft: `5px solid ${
      level === "Cấp 3"
        ? colors.redAccent[500]
        : level === "Cấp 2"
        ? "#f59e0b"
        : colors.blueAccent[400]
    }`,
    borderRadius: "8px",
    mb: "12px",
    overflow: "hidden",
    "&:before": { display: "none" },
  });
  const chipSx = (level) => {
    if (level === "Cấp 3") return { backgroundColor: colors.redAccent[500], color: "#fff" };
    if (level === "Cấp 2") return { backgroundColor: "#f59e0b", color: "#111827" };
    return { backgroundColor: colors.blueAccent[500], color: "#fff" };
  };
  return (
    <Box m="20px">
      <Header
        title="CẢNH BÁO KHẨN CẤP"
        subtitle="Các cảnh báo quan trọng và phản ứng sự cố"
      />

      <Accordion defaultExpanded sx={alertSx("Cấp 2")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" gap="12px">
          <Typography color={colors.greenAccent[500]} variant="h5">
            Pin yếu Drone-07
          </Typography>
            <Chip size="small" label="Cấp 2" sx={{ ...chipSx("Cấp 2"), fontWeight: 700 }} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Pin của drone đã xuống dưới mức an toàn. Vui lòng chỉ định trạm hạ
            cánh gần nhất và chuẩn bị hỗ trợ kỹ thuật.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded sx={alertSx("Cấp 3")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" gap="12px">
          <Typography color={colors.greenAccent[500]} variant="h5">
            Mất tín hiệu gần khu B
          </Typography>
            <Chip size="small" label="Cấp 3" sx={{ ...chipSx("Cấp 3"), fontWeight: 700 }} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Tín hiệu nhận lệnh không ổn định trong khu vực B. Hệ thống cần gửi
            lệnh quay về tự động và kiểm tra lại vùng phủ sóng.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded sx={alertSx("Cấp 1")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" gap="12px">
          <Typography color={colors.greenAccent[500]} variant="h5">
            Trì hoãn tuần tra ven biển do thời tiết
          </Typography>
            <Chip size="small" label="Cấp 1" sx={{ ...chipSx("Cấp 1"), fontWeight: 700 }} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Gió mạnh và mưa lớn làm giảm độ an toàn của nhiệm vụ. Tạm hoãn lịch
            bay và cập nhật lại khung thời gian phù hợp.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded sx={alertSx("Cấp 2")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" gap="12px">
          <Typography color={colors.greenAccent[500]} variant="h5">
            Cần xác nhận lại lộ trình
          </Typography>
            <Chip size="small" label="Cấp 2" sx={{ ...chipSx("Cấp 2"), fontWeight: 700 }} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Hệ thống tự động không thể tiếp tục tuyến bay hiện tại. Người thiết
            lập lộ trình cần xác nhận phương án bay hoặc gửi lệnh quay về.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded sx={alertSx("Cấp 3")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" gap="12px">
          <Typography color={colors.greenAccent[500]} variant="h5">
            Quy trình hạ cánh khẩn cấp
          </Typography>
            <Chip size="small" label="Cấp 3" sx={{ ...chipSx("Cấp 3"), fontWeight: 700 }} />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Kích hoạt điểm hạ cánh an toàn gần nhất, thông báo cho đội kỹ thuật
            và theo dõi trạng thái pin đến khi drone dừng hoàn toàn.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
