// ModalAddStudents.js
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import validateEmail from '../../helpers/emailValidate';
import useMembers from './useMembers';
function ModalAddStudents({ setShowModal }) {
  const [team, setTeam] = useState("");
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [member3, setMember3] = useState("");
  const { addTeam, isLoading } = useMembers();

  function handleSubmit(e) {
    e.preventDefault();
    if (
      team === "" ||
      !validateEmail(member1) ||
      !validateEmail(member2) ||
      !validateEmail(member3)
    ) {
      console.log("INVALID EMAILS or TEAM-NAME");
      return;
    }

    // Send invitation emails using EmailJS
    const serviceId = 'service_tvvt5sc';
    const templateId = 'template_si7vq27';
    const publicKey = 'zz9GAazyVVKLJs85c';

    const templateParams = {
      from_name: team,
      to_name: 'User',
      message: `You have been invited to join the team ${team} for a new project.`,
    };

    const members = [member1, member2, member3];
    members.forEach(memberEmail => {
      templateParams.to_email = memberEmail;
      emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
          console.log('Email sent successfully!', response);
        })
        .catch((error) => {
          console.error('Error sending email:', error);
        });
    });

    // Add team using the existing addTeam function
    addTeam({ team, member1, member2, member3 });

    // Reset form fields
    setTeam("");
    setMember1("");
    setMember2("");
    setMember3("");
    setShowModal("");
  }

  return (
    <div className="add-students">
      <form className="add-students-form" onSubmit={handleSubmit}>
        <button
          className="btn-close"
          onClick={(e) => {
            e.preventDefault();
            setShowModal("");
          }}
        >
          &times;
        </button>
        <h3>STUDENTS DETAILS</h3>
        <div className="centered-input">
          <label htmlFor="teamName">TEAM NAME</label>
          <input
            type="text"
            name="teamName"
            id="teamName"
            placeholder="TEAM NAME"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />
        </div>
        <div className="full-length-input">
          <label htmlFor="member1">PARTICIPANT 1</label>
          <input
            type="text"
            name="member1"
            id="member1"
            placeholder="PARTICIPANT 1 MAIL ID"
            value={member1}
            onChange={(e) => setMember1(e.target.value)}
          />
        </div>
        <div className="full-length-input">
          <label htmlFor="member2">PARTICIPANT 2</label>
          <input
            type="text"
            name="member2"
            id="member2"
            placeholder="PARTICIPANT 2 MAIL ID"
            value={member2}
            onChange={(e) => setMember2(e.target.value)}
          />
        </div>
        <div className="full-length-input">
          <label htmlFor="member3">PARTICIPANT 3</label>
          <input
            type="text"
            name="member3"
            id="member3"
            placeholder="PARTICIPANT 3 MAIL ID"
            value={member3}
            onChange={(e) => setMember3(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-black" disabled={isLoading}>
          {isLoading ? "SENDING..." : "SEND"}
        </button>
      </form>
    </div>
  );
}

export default ModalAddStudents;
