import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

import {
  createAlbum,
  deleteAlbum,
  updateAlbum,
  getAllAlbums,
  getSingleAlbum,
} from "./db.js";
import { addPhotoToAlbum, removePhotoFromAlbum } from "./routes-photos.js";

app.use(bodyParser.json());

function updatePath(req, res, next) {
  updateStats(req.method + " " + req.path);
  next();
}
app.use(updatePath);

app.post("/albums", createAlbum);
app.get("/albums", getAllAlbums);
app.get("/albums/:id", getSingleAlbum);
app.put("/albums/:id", updateAlbum);
app.delete("/albums/:id", deleteAlbum);

app.post("/albums/:albumId/photos/:photoId", addPhotoToAlbum);
app.delete("/albums/:albumId/photos/:photoId", removePhotoFromAlbum);

app.listen(port, () => {
  deleteTasks();
  console.log(`Server listening on port ${port}`);
});
