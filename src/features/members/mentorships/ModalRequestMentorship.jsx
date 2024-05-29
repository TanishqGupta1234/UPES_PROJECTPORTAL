import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import validateEmail from "../../../helpers/emailValidate";
import useMembers from "../useMembers";
import useRequestMembership from "../useRequestMembership";

function ModalRequestMentorship({ setShowModal }) {
  const [faculty, setFaculty] = useState("");
  const [facultyMail, setFacultyMail] = useState("");

  const { requestMentorship, isLoading } = useRequestMembership();

  function handleSubmit(e) {
    e.preventDefault();
    if (faculty === "" ||!validateEmail(facultyMail)) {
      console.log("INVALID EMAILS or TEAM-NAME");
      return;
    }

    // EmailJS service ID, template ID, and Public Key from Code 2
    const serviceId = 'service_d1ft5sf';
    const templateId = 'template_wuvxxce';
    const publicKey = 'zz9GAazyVVKLJs85c';

    // Create a new object that contains dynamic template params
    const templateParams = {
      from_name: faculty,
      from_email: facultyMail,
      to_name: 'UPES', // Assuming you want to send to 'Web Wizard'
      message: `You have been requested for mentorship by ${faculty}.`,
    };

    // Send the email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, publicKey)
     .then((response) => {
        console.log('Email sent successfully!', response);
        requestMentorship({ faculty, facultyMail }); // Assuming this sends the mentorship request
        setFaculty("");
        setFacultyMail("");
        setShowModal("");
      })
     .catch((error) => {
        console.error('Error sending email:', error);
      });
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
        <h3>MENTORSHIP DETAILS</h3>
        <div className="full-length-input">
          <label htmlFor="faculty">FACULTY NAME</label>
          <input
            type="text"
            name="faculty"
            id="faculty"
            placeholder="FACULTY NAME"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
          />
        </div>
        <div className="full-length-input">
          <label htmlFor="facultyMail">FACULTY MAIL ID</label>
          <input
            type="text"
            name="facultyMail"
            id="facultyMail"
            placeholder="FACULTY MAIL ID"
            value={facultyMail}
            onChange={(e) => setFacultyMail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-black" disabled={isLoading}>
          {isLoading? "SENDING..." : "SEND"}
        </button>
      </form>
    </div>
  );
}

export default ModalRequestMentorship;
