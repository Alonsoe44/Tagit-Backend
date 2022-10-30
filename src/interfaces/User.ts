import Note from "./Notes";

interface UserInterface {
  name: string;
  email: string;
  password: string;
  notes: Note[];
}

export default UserInterface;
