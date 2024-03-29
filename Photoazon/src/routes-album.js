import {
  getAllAlbums,
  getSingleAlbum,
  deleteAlbum,
  updateAlbum,
  createAlbum,
} from "./db.js";

export const getAll = async (req, res) => {
  const [success, albums] = await getAllAlbums();
  if (success) {
    res.json({ status: "ok", albums: albums });
  } else {
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch albums" });
  }
};

export const getSingle = async (req, res) => {
  const albumId = req.params.id;
  const [success, album] = await getSingleAlbum(albumId);
  if (success && album) {
    res.json({ status: "ok", album: album });
  } else {
    res.status(404).json({ status: "error", message: "Album not found" });
  }
};

export const deleteSingle = async (req, res) => {
  const albumId = req.params.id;
  const [success, deletedCount] = await deleteAlbum(albumId);
  if (success && deletedCount > 0) {
    res.json({ status: "ok", message: "Album deleted successfully" });
  } else {
    res
      .status(500)
      .json({ status: "error", message: "Failed to delete album" });
  }
};

export const updateSingle = async (req, res) => {
  const albumId = req.params.id;
  const newAlbumData = req.body;
  newAlbumData._id = albumId;
  const [success, modifiedCount] = await updateAlbum(newAlbumData);
  if (success && modifiedCount > 0) {
    res.json({ status: "ok", message: "Album updated successfully" });
  } else {
    res
      .status(500)
      .json({ status: "error", message: "Failed to update album" });
  }
};

export const create = async (req, res) => {
  const newAlbum = req.body;
  const [success, insertedId] = await createAlbum(newAlbum);
  if (success) {
    res.status(201).json({
      status: "ok",
      message: "Album created successfully",
      id: insertedId,
    });
  } else {
    res
      .status(500)
      .json({ status: "error", message: "Failed to create album" });
  }
};
