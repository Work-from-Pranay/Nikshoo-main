import React, { useState } from 'react';
import "../pages/Contact.css"
import heroMain from "../assets/hero-main.png"
import contactImg from "../assets/contact-img.png"
import navimg from "../assets/Frame.png"
import location from "../assets/location.png"
import lefty from "../assets/lefty.png"
import righty from "../assets/righty.png"
import { Thanks } from '../components/Thanks'; // Import the Thanks component

const Contact = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    location: '',
    message: '',
    email: ''
  });

  // State to handle popup
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState({
    title: '',
    body: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://nikshoo-backend.vercel.app/contact/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        // If successful, show the thank you popup
        setPopupMessage({
          title: 'Thank you for taking out your time!',
          body: 'Our team shall get back to you within 24hrs.'
        });
        setPopupVisible(true);
      } else {
        // Show error message
        setPopupMessage({
          title: 'Something went wrong',
          body: 'Try again later.'
        });
        setPopupVisible(true);
      }

      // Clear form
      setFormData({
        fullName: '',
        phoneNumber: '',
        location: '',
        message: '',
        email: ''
      });
      
    } catch (error) {
      // Show error message on exception
      setPopupMessage({
        title: 'Something went wrong',
        body: 'Try again later.'
      });
      setPopupVisible(true);
    }
  };

  const handleClosePopup = () => {
    setPopupVisible(false); // Close the popup
  };

  return (
    <div className='contact-wrap'>
      <img src={heroMain} alt="" />
      <img src={lefty} alt="" id='leftyy' />
      <img src={righty} alt="" id='rightyy' />

      <div className="contact-hero">
        <div className="contact-hero-left">
          <h1>Contact Us</h1>
          <p>Drop us a note and we’ll get back to you as quickly as possible</p>
          <a href="">Write Us Your Query</a>
        </div>
        <div className="contact-hero-right">
          <img src={contactImg} alt="" />
        </div>
      </div>

      <div className="contact2">
        {/* Contact Info Section */}
        <div className="contact-top">
          <div className="contact-ways">
            <img src="" alt="" />
            <h3>Call Us</h3>
            <p>+91 9123 456789</p>
          </div>
          <div className="contact-ways">
            <img src="" alt="" />
            <h3>Email Us</h3>
            <p>contact@nikshoo.com</p>
          </div>
          <div className="contact-ways">
            <img src="" alt="" />
            <h3>WhatsApp Us</h3>
            <p>+91 9123 456789</p>
          </div>
        </div>
        <div className="contact-bottom">
          <div className="contact-b-l">
            <img src={navimg} alt="" />
            <h3>Visit Us</h3>
          </div>
          <div className="contact-b-r">
            <div className="location">
              <img src={location} alt="" />
              <h3>Indore:</h3>
              <p>123 Innovation Drive, Tech City, Indore</p>
            </div>
            <h4>123 Innovation Drive, Tech City, Indore</h4>
            <h4>123 Innovation Drive, Tech City, Gurugram</h4>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact3">
        <h1>Get In Touch</h1>
        <p>Ready to transform your workspace? Contact us today to explore how we can help you create a space that inspires success.</p>
        <div className="contactus-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Your Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your Full Name"
                required
              />
            </div>
            <div className="half-row">
              <div>
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  required
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  required
                />
              </div>
            </div>
            <div>
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Your Location"
                required
              />
            </div>
            <div>
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type Your Message"
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      {/* Popup Component */}
      {popupVisible && (
        <Thanks
          message={popupMessage}
          onClose={handleClosePopup}
          buttonText="Explore More"
        />
      )}
    </div>
  );
}

export default Contact;
