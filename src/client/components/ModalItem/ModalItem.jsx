import React from "react";
import { Modal } from "antd";

import "./ModalItem.css";

const ModalItem = ({ visible, onCancel, content }) => {
  if (!content) {
    return null;
  }

  const { name, synopsis, director, actors, country, date } = content;

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={name}
      footer={null}
      width={1000}
      bodyStyle={{ maxHeight: 600 }}
      className="custom-modal"
    >
      {synopsis ? (
        <>
          <span className="modal-label">Synopsis</span>
          <p>{synopsis}</p>
        </>
      ) : null}

      {director ? (
        <>
          <span className="modal-label">Director</span>
          <p>{director}</p>
        </>
      ) : null}

      {actors ? (
        <>
          <span className="modal-label">Actors</span>
          <p>{actors}</p>
        </>
      ) : null}

      {country ? (
        <>
          <span className="modal-label">Country</span>
          <p>{country}</p>
        </>
      ) : null}

      {date ? (
        <>
          <span className="modal-label">Date</span>
          <p>{date}</p>
        </>
      ) : null}
    </Modal>
  );
};

export default ModalItem;
