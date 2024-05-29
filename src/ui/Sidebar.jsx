import Whitehat from "../../public/images/svg/Whitehat";
import Rectangles from "../../public/images/svg/Rectangles";
import Pen from "../../public/images/svg/Pen";
import People from "../../public/images/svg/People";
import Messages from "../../public/images/svg/Messages";
import Meeting from "../../public/images/svg/Meeting";
import Logout from "../../public/images/svg/Logout";
import Alphabet from "../../public/images/svg/Alphabet";
import { useLocation } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
import ModalAddStudents from "../features/members/ModalAddStudents";
import ModalRequestMentorship from "../features/members/mentorships/ModalRequestMentorship";

function Sidebar() {
  const location = useLocation();
  const isStudent = location.pathname === "/student";
  const [showModal, setShowModal] = useState("");

  // function handleAddMembers(id) {
  //   setShowModal(id);
  // }

  return (
    <div className="sidebar">
      {/*---------MODAL WINDOW--------- */}
      {showModal === "add-students" && (
        <Modal setShowModal={setShowModal}>
          <ModalAddStudents setShowModal={setShowModal} />
        </Modal>
      )}

      {showModal === "request-mentorship" && (
        <Modal setShowModal={setShowModal}>
          <ModalRequestMentorship setShowModal={setShowModal} />
        </Modal>
      )}
      {/*---------MODAL WINDOW--------- */}

      <div className="sidebar-options">
        {isStudent ? <Whitehat /> : <Alphabet />}
        <ul className="options-list">
          <li
            className="option"
            onClick={() => setShowModal("request-mentorship")}
          >
            <div>
              <span className="option-icon">
                <Rectangles />
              </span>
              <span>Request For Mentorship</span>
            </div>
          </li>
          <li className="option" onClick={() => setShowModal("add-students")}>
            <div>
              <span className="option-icon">
                <Pen />
              </span>
              <span>Add Members</span>
            </div>
          </li>
          <li className="option">
            <div>
              <span className="option-icon">
                <People />
              </span>
              <span>Group Initiation</span>
            </div>
          </li>
          <li className="option">
            <div>
              <span className="option-icon">
                <Messages />
              </span>
              <span>Technical Support</span>
            </div>
          </li>
          <li className="option">
            <div>
              <span className="option-icon">
                <Meeting />
              </span>
              <span>Schedule a Meeting</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="logout-div">
        <button className="logout-btn">
          <Logout />
          Logout
        </button>
        <span className="logout-text">
          Last Login : 01/02/2024, 02:05:03 PM
        </span>
      </div>
    </div>
  );
}

export default Sidebar;
