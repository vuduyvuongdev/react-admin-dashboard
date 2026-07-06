import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { mockDataContacts } from "../../data/mockData";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [statusMessage, setStatusMessage] = useState("");

  const handleFormSubmit = (values) => {
    setStatusMessage(`Đã gửi nhiệm vụ đến ${values.droneId}: ${values.mission}`);
    console.log("Gửi nhiệm vụ:", values);
  };

  return (
    <Box m="20px">
      <Header
        title="BỐ TRÍ NHIỆM VỤ"
        subtitle="Thiết lập lộ trình, điểm hạ cánh và gửi lệnh quay về/hủy nhiệm vụ"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={missionSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="drone-label">Drone</InputLabel>
                <Select
                  labelId="drone-label"
                  id="droneId"
                  name="droneId"
                  value={values.droneId}
                  label="Drone"
                  onChange={handleChange}
                >
                  {mockDataContacts.map((drone) => (
                    <MenuItem key={drone.droneId} value={drone.droneId}>
                      {drone.name} ({drone.droneId})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nhiệm vụ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.mission}
                name="mission"
                error={!!touched.mission && !!errors.mission}
                helperText={touched.mission && errors.mission}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Lộ trình bay"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.route}
                name="route"
                error={!!touched.route && !!errors.route}
                helperText={touched.route && errors.route}
                sx={{ gridColumn: "span 4" }}
              />

              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="landing-label">Địa điểm hạ cánh</InputLabel>
                <Select
                  labelId="landing-label"
                  id="landingLocation"
                  name="landingLocation"
                  value={values.landingLocation}
                  label="Địa điểm hạ cánh"
                  onChange={handleChange}
                >
                  <MenuItem value="Đường băng A">Đường băng A</MenuItem>
                  <MenuItem value="Trạm hạ cánh Bắc">Trạm hạ cánh Bắc</MenuItem>
                  <MenuItem value="Cổng căn cứ">Cổng căn cứ</MenuItem>
                  <MenuItem value="Khu vực hạ cánh khẩn cấp">Khu vực hạ cánh khẩn cấp</MenuItem>
                </Select>
              </FormControl>

              {/* Ghi chú/Quay về đã được chuyển sang trang Nhiệm vụ bay */}
            </Box>

            <Box display="flex" justifyContent="flex-end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Gửi nhiệm vụ
              </Button>
            </Box>

            {statusMessage && (
              <Box mt="20px" p="15px" bgcolor="#233044" borderRadius="8px">
                <Typography color="#fff">{statusMessage}</Typography>
              </Box>
            )}
          </form>
        )}
      </Formik>
    </Box>
  );
};

  const missionSchema = yup.object().shape({
  droneId: yup.string().required("Chọn drone"),
  mission: yup.string().required("Nhập nhiệm vụ"),
  route: yup.string().required("Nhập lộ trình bay"),
  landingLocation: yup.string().required("Chọn địa điểm hạ cánh"),
});

const initialValues = {
  droneId: "",
  mission: "",
  route: "",
  landingLocation: "",
  // notes removed from planner; return/cancel actions moved to Nhiệm vụ bay
};

export default Form;
