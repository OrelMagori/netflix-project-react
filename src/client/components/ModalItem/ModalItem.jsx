import React from "react";
// import { FiTrash2 } from "react-icons/fi";
import { Modal /* Rate,  Button */ } from "antd";

import "./ModalItem.css";

// import { deleteItem } from "../../pages/Favorite/Favorite.jsx";

// const desc = ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"];

const ModalItem = ({ visible, onCancel, content, movie, serie }) => {
  if (!content) return;

  const { name, synopsis, director, actors, country, date } = content;

  // const handleButtonClick = (e) => {
     // deleteItem(movie ? movie : serie, e);
  // };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={name}
      width={1000}
      bodyStyle={{
        overflowY: "auto",
        maxHeight: '70vh',
      }}
      className="custom-modal"
      footer={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <Button
            key="back"
            onClick={handleButtonClick}
            className="delete-button-modal"
          >
            <FiTrash2 className="delete-icon-modal" />
          </Button>
          <div>
            <Rate tooltips={desc} />
          </div> */}
        </div>
      }
    >
      {synopsis !== undefined ? (
        <>
          <span className="modal-label">Synopsis</span>
          <p>{synopsis}</p>
        </>
      ) : null}

      {director.length > 0 ? (
        <>
          <span className="modal-label">Director</span>
          <p>{director}</p>
        </>
      ) : null}

      {actors.length > 0 ? (
        <>
          <span className="modal-label">Actors</span>
          <p>{actors}</p>
        </>
      ) : null}

      {country !== undefined ? (
        <>
          <span className="modal-label">Country</span>
          <p>{country}</p>
        </>
      ) : null}

      {date !== undefined ? (
        <>
          <span className="modal-label">Date</span>
          {console.log(date)}
          <p>{date}</p>
        </>
      ) : null}
    </Modal>
  );
};

export default ModalItem;
