import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/"); // dossier monté via Docker
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Aucun fichier reçu" });

  res.json({
    originalName: req.file.originalname,
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`
  });
});

export default router;
