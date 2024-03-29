import { MongoClient, ObjectId } from "mongodb";
import "dotenv/config";

const uri = process.env.MONGODB_CONNECTION_STRING;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

export async function connect() {
  try {
    await client.connect();
    db = client.db("photoazon");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

export async function close() {
  try {
    await client.close();
    console.log("Connection to MongoDB closed");
  } catch (error) {
    console.error("Failed to close connection to MongoDB", error);
    throw error;
  }
}

export async function getAllAlbums() {
  try {
    const albums = await db.collection("albums").find().toArray();
    return [true, albums];
  } catch (error) {
    console.error("Failed to fetch albums", error);
    return [false, null];
  }
}

export async function getSingleAlbum(albumId) {
  try {
    const album = await db
      .collection("albums")
      .findOne({ _id: new ObjectId(albumId) });
    return [true, album];
  } catch (error) {
    console.error("Failed to fetch album", error);
    return [false, null];
  }
}

export async function createAlbum(album) {
  try {
    const result = await db.collection("albums").insertOne(album);
    return [true, result.insertedId];
  } catch (error) {
    console.error("Failed to create album", error);
    return [false, null];
  }
}

export async function updateAlbum(album) {
  try {
    const result = await db
      .collection("albums")
      .updateOne({ _id: new ObjectId(album._id) }, { $set: album });
    return [true, result.modifiedCount];
  } catch (error) {
    console.error("Failed to update album", error);
    return [false, null];
  }
}

export async function deleteAlbum(albumId) {
  try {
    const result = await db
      .collection("albums")
      .deleteOne({ _id: new ObjectId(albumId) });
    return [true, result.deletedCount];
  } catch (error) {
    console.error("Failed to delete album", error);
    return [false, null];
  }
}

export async function addPhotoToAlbum(albumId, photoId) {
  try {
    const result = await db
      .collection("albums")
      .updateOne(
        { _id: new ObjectId(albumId) },
        { $push: { photos: photoId } }
      );
    return [true, result.modifiedCount];
  } catch (error) {
    console.error("Failed to add photo to album", error);
    return [false, null];
  }
}

export async function removePhotoFromAlbum(albumId, photoId) {
  try {
    const result = await db
      .collection("albums")
      .updateOne(
        { _id: new ObjectId(albumId) },
        { $pull: { photos: photoId } }
      );
    return [true, result.modifiedCount];
  } catch (error) {
    console.error("Failed to remove photo from album", error);
    return [false, null];
  }
}
