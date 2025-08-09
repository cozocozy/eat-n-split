import { useState } from "react";
import Image from "next/image";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  function handleShowAddFriend() {
    setShowForm((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((prevFriends) => [...prevFriends, friend]);
    setShowForm(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <h1>Friends List</h1>
        <FriendList friends={friends} />
        {showForm && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showForm ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  );
}
function Friend({ friend }) {
  return (
    <li>
      <Image src={friend.image} alt={friend.name} width={48} height={48} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe{friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>you and {friend.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    if (!name || !image) return;

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48?u=499476");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🎎 Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🧧 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setName(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with a friend</h2>

      <label>💰 Bill Value</label>
      <input type="number" />

      <label>💰 Your expense</label>
      <input type="number" />

      <label>💰 X's expense</label>
      <input type="number" disabled />

      <label>💰 Who's paying bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">Select a friend</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
