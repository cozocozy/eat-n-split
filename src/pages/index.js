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
  function handleShowAddFriend() {
    setShowForm((show) => !show);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <h1>Friends List</h1>
        <FriendList friends={initialFriends} />
        {showForm && <FormAddFriend />}
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
          you owes{friend.name} ${Math.abs(friend.balance)}
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

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>🎎 Friend Name</label>
      <input type="text" />
      <label>🧧 Image URL</label>
      <input type="text" />
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
