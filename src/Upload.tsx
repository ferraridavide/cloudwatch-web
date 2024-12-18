import React, {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Box,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Container, Stack, styled, useTheme } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const DropZone = styled(Paper)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: "center",
  cursor: "pointer",
  transition: "background-color 0.3s, border-color 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function Component() {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget != e.target) return;
    setIsDragging(false);
    console.log("drop");

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFile(droppedFiles[0]);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFile(selectedFiles[0]);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleCancel = () => {
    setFile(null);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          bgcolor: "background.default",
          marginTop: "2rem",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "80%" }}>
          {file
            ? (
              <>
                <Typography variant="h4" gutterBottom>
                  Upload Video
                </Typography>
                <Box component="form" noValidate autoComplete="off">
                  <TextField
                    fullWidth
                    label="Video Title"
                    variant="outlined"
                    margin="normal"
                    value={title}
                    onChange={handleTitleChange}
                  />
                  <TextField
                    fullWidth
                    label="Video Description"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    value={description}
                    onChange={handleDescriptionChange}
                  />

                  <Stack
                    spacing={{ xs: 1, sm: 2 }}
                    direction="row"
                    useFlexGap
                    sx={{ flexWrap: "wrap" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={file != null}
                    >
                      Publish
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!file}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Stack>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Upload Progress
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={uploadProgress}
                    />
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Processing Progress
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={processingProgress}
                    />
                  </Box>
                </Box>
              </>
            )
            : (
              <DropZone
                onDrop={handleDrop}
                onClick={openFileDialog}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInput}
                  style={{ display: "none" }}
                  multiple
                />
                <CloudUploadIcon
                  sx={{ fontSize: 48, color: "textSecondary", mb: 2 }}
                />
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Drag and drop video here, or click to select video
                </Typography>
              </DropZone>
            )}
        </Paper>
      </Box>
    </Container>
  );
}
