import NoteModel from "../../database/models/NoteModel";
import User from "../../database/models/UserModel";
import NoteInterface from "../../interfaces/Notes";

const getUserData = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundedUser = await User.findById(id);
    await foundedUser.populate("notes");
    const userData = {
      notes: foundedUser.notes,
      name: foundedUser.name,
      // eslint-disable-next-line no-underscore-dangle
      _id: foundedUser._id,
    };

    res.status(200).json(userData);
  } catch (error) {
    error.status(404);
    next(error);
  }
};

const createUserNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newNote = req.body;
    const createdNote = await NoteModel.create(newNote as NoteInterface);
    const foundedUser = await User.findByIdAndUpdate(
      id,
      // eslint-disable-next-line no-underscore-dangle
      { $push: { notes: createdNote._id } },
      { new: true }
    );
    res.status(203).json(foundedUser);
  } catch {
    const newError = new Error("No note was created this day");
    next(newError);
  }
};

export { createUserNote, getUserData };
