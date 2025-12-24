// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   Box,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// function EditPhoto({ currentUser }) {
//   const { photoId } = useParams();
//   const navigate = useNavigate();

//   const [photo, setPhoto] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [openConfirm, setOpenConfirm] = useState(false);

//   // Load thông tin ảnh
//   useEffect(() => {
//     const fetchPhoto = async () => {
//       try {
//         // Lấy thông tin ảnh (cần API mới để lấy chi tiết ảnh)
//         const response = await axios.get(
//           `https://zld62n-8082.csb.app/photosOfUser/${currentUser._id}`,
//           { withCredentials: true }
//         );

//         const foundPhoto = response.data.find((p) => p._id === photoId);
//         if (!foundPhoto) {
//           setError("Photo not found");
//           setLoading(false);
//           return;
//         }

//         setPhoto(foundPhoto);
//         setPreviewUrl(
//           `https://zld62n-8082.csb.app/images/${foundPhoto.file_name}`
//         );
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to load photo");
//         setLoading(false);
//       }
//     };

//     fetchPhoto();
//   }, [photoId, currentUser._id]);

//   // Xử lý chọn file
//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   // Xử lý submit
//   const handleSubmit = async () => {
//     if (!selectedFile) {
//       setError("Please select a new image file");
//       return;
//     }

//     setOpenConfirm(false);
//     setError("");
//     setSuccess("");

//     try {
//       const formData = new FormData();
//       formData.append("file", selectedFile);

//       await axios.put(
//         `https://zld62n-8082.csb.app/photos/${photoId}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );

//       setSuccess("Photo updated successfully!");

//       setTimeout(() => {
//         navigate(`/photos/${photo.user_id}`);
//       }, 1500);
//     } catch (err) {
//       setError(err.response?.data || "Failed to update photo");
//     }
//   };

//   // Kiểm tra quyền truy cập
//   if (!currentUser) {
//     return (
//       <Typography variant="h6" style={{ padding: "20px" }}>
//         Please login to edit photos.
//       </Typography>
//     );
//   }

//   if (loading) {
//     return (
//       <Typography variant="h6" style={{ padding: "20px" }}>
//         Loading...
//       </Typography>
//     );
//   }

//   if (error && !photo) {
//     return (
//       <Typography variant="h6" style={{ padding: "20px", color: "red" }}>
//         {error}
//       </Typography>
//     );
//   }

//   return (
//     <Card style={{ margin: "20px", maxWidth: "800px" }}>
//       <CardContent>
//         <Typography variant="h4" gutterBottom>
//           Edit Photo
//         </Typography>

//         {error && (
//           <Alert severity="error" style={{ marginBottom: "20px" }}>
//             {error}
//           </Alert>
//         )}
//         {success && (
//           <Alert severity="success" style={{ marginBottom: "20px" }}>
//             {success}
//           </Alert>
//         )}

//         <Box sx={{ mb: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Current Photo:
//           </Typography>
//           <CardMedia
//             component="img"
//             image={previewUrl}
//             alt="Current photo"
//             style={{
//               maxHeight: "400px",
//               objectFit: "contain",
//               backgroundColor: "#f0f0f0",
//             }}
//           />
//         </Box>

//         <Box sx={{ mb: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Select New Image:
//           </Typography>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileSelect}
//             style={{ marginBottom: "10px" }}
//           />
//           {selectedFile && (
//             <Typography variant="body2" color="textSecondary">
//               Selected: {selectedFile.name}
//             </Typography>
//           )}
//         </Box>

//         <Box sx={{ display: "flex", gap: 2 }}>
//           <Button
//             variant="contained"
//             color="primary"
//             size="large"
//             onClick={() => setOpenConfirm(true)}
//             disabled={!selectedFile}
//           >
//             Update Photo
//           </Button>

//           <Button
//             variant="outlined"
//             size="large"
//             onClick={() => navigate(`/photos/${photo.user_id}`)}
//           >
//             Cancel
//           </Button>
//         </Box>

//         {/* Confirmation Dialog */}
//         <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
//           <DialogTitle>Confirm Update</DialogTitle>
//           <DialogContent>
//             <Typography>
//               Are you sure you want to update this photo? This will replace the
//               current image.
//             </Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
//             <Button onClick={handleSubmit} color="primary" variant="contained">
//               Update
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </CardContent>
//     </Card>
//   );
// }

// export default EditPhoto;
// git add .
//git commit -m "Backend: Fix upload photo, comments and session bug"
// git push
