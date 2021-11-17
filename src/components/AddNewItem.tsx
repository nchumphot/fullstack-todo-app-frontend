import DbItemWithId from "./DbItemWithId";
import { useState } from "react";
import axios from "axios";
import { fetchData } from "../utils/fetchData";

export function AddNewItem(props: {
  url: string;
  data: DbItemWithId[];
  setData: React.Dispatch<React.SetStateAction<DbItemWithId[]>>;
}): JSX.Element {
  const [myDescription, setMyDescription] = useState<string>("");
  const [myDueDate, setMyDueDate] = useState<string>("");

  const handleAddNewItem = () => {
    if (myDescription === "" && myDueDate === "") {
      alert("Please enter what you want to do and a due date");
    } else if (myDescription === "") {
      alert("Please enter what you want to do");
    } else if (myDueDate === "") {
      alert("Please enter a due date");
    } else {
      const today = new Date();
      const todaysDate =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      axios
        .post(props.url, {
          description: myDescription,
          isComplete: false,
          creationDate: todaysDate,
          dueDate: myDueDate,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      setMyDescription("");
      setMyDueDate("");
      fetchData(props.url, props.setData);
      alert("New to-do item added successfully!");
    }
  };

  return (
    <>
      <h2>Add a new item</h2>
      <input
        required
        type="text"
        placeholder="What do I have to do?"
        value={myDescription}
        onChange={(e) => {
          setMyDescription(e.target.value);
          //   console.log("My new description is:", e.target.value);
        }}
      />
      <br />
      <br />
      <label>Due date:</label>
      <input
        required
        type="date"
        value={myDueDate}
        onChange={(e) => {
          setMyDueDate(e.target.value);
        }}
      />
      <br />
      <br />
      <button onClick={handleAddNewItem}>Add item</button>
    </>
  );
}