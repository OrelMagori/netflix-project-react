import React from "react";
import { FiTrash2 } from "react-icons/fi";

const DeleteItem = ({ item, user, onDelete }) => {
  const handleDelete = () => {
    onDelete(item);
  };

  return (
    <button className="delete-button" onClick={handleDelete}>
      <FiTrash2 className="delete-icon" />
    </button>
  );
};

export default DeleteItem;
