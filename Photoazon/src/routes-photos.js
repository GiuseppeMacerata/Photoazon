export const addPhotoToAlbum = async (req, res) => {
  const albumId = req.params.albumId;
  const photoId = req.params.photoId;

  const [success] = await addPhotoToAlbum(albumId, photoId);
  if (success) {
    res.json({ status: "ok", message: "Photo added to album successfully" });
  } else {
    res
      .status(500)
      .json({ status: "error", message: "Failed to add photo to album" });
  }
};

export const removePhotoFromAlbum = async (req, res) => {
  const albumId = req.params.albumId;
  const photoId = req.params.photoId;

  const [success] = await removePhotoFromAlbum(albumId, photoId);
  if (success) {
    res.json({
      status: "ok",
      message: "Photo removed from album successfully",
    });
  } else {
    res
      .status(500)
      .json({ status: "error", message: "Failed to remove photo from album" });
  }
};
