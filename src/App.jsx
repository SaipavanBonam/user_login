import React, { useState } from 'react';
import './App.css';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const countries = {
  India: { code: "+91", cities: ["Delhi", "Kolkata", "Hyderabad", "Mumbai", "Bangalore", "Pune", "Others"] },
  America: { code: "+1", cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"] },
  China: { code: "+86", cities: ["Beijing", "Shanghai", "Chengdu", "Nanjing", "Wuhan"] },
  Canada: { code: "+1", cities: ["Victoria", "Toronto", "St. Johns", "Edmonton", "Calgary"] },
  UAE: { code: "+971", cities: ["Dubai", "Abu Dhabi", "Sharjah", "Khor Fakkan", "Al Ain"] }
};

const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: ''
  });

  const [countryCode, setCountryCode] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    switch (name) {
      case 'firstName':
        if (value.length < 3) {
          newErrors.firstName = 'At least 3 characters required.';
        } else {
          delete newErrors.firstName;
        }
        break;
      case 'lastName':
        if (value.length < 3) {
          newErrors.lastName = 'At least 3 characters required.';
        } else {
          delete newErrors.lastName;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email address.';
        } else {
          delete newErrors.email;
        }
        break;
      case 'aadharNo':
        if (!/^\d{12}$/.test(value)) {
          newErrors.aadharNo = 'Please enter a valid 12-digit Aadhar number.';
        } else {
          delete newErrors.aadharNo;
        }
        break;
      case 'panNo':
        if (!/^\d{10}$/.test(value)) {
          newErrors.panNo = 'Please enter a valid 10-digit PAN number.';
        } else {
          delete newErrors.panNo;
        }
        break;
      case 'phone':
        if (!/^\d{10}$/.test(value)) {
          newErrors.phone = 'Please enter a valid 10-digit phone number.';
        } else {
          delete newErrors.phone;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setFormData({
      ...formData,
      country: country,
      city: ''
    });
    setCountryCode(countries[country].code);
    validateField('country', country);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = Object.keys(errors).length === 0;
    if (isValid) {
      setIsSubmitted(true);
      console.log(formData);
    } else {
      console.log('Form has some errors:', errors);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="app-container">
      <h2>Registration Form</h2>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group password-group">
            <label>Password:</label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span onClick={togglePasswordVisibility} className="password-toggle-icon">
              {passwordVisible ? <IoMdEyeOff /> : <IoMdEye />}
            </span>
          </div>
          <div className="form-group">
            <label>Country:</label>
            <select name="country" value={formData.country} onChange={handleCountryChange} required>
              <option value="" disabled>Select Country</option>
              {Object.keys(countries).map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {errors.country && <span className="error">{errors.country}</span>}
          </div>
          <div className="form-group">
            <label>City:</label>
            <select name="city" value={formData.city} onChange={handleChange} required>
              <option value="" disabled>Select City</option>
              {formData.country && countries[formData.country].cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Phone No.:</label>
            <div className="phone-input-container">
              <span className="phone-code">{countryCode}</span>
              <input
                className="phone-input"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label>Pan No.:</label>
            <input type="text" name="panNo" value={formData.panNo} onChange={handleChange} required />
            {errors.panNo && <span className="error">{errors.panNo}</span>}
          </div>
          <div className="form-group">
            <label>Aadhar No.:</label>
            <input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} required />
            {errors.aadharNo && <span className="error">{errors.aadharNo}</span>}
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="form-details">
          <h3>Form Details</h3>
          <p><strong>First Name:</strong> {formData.firstName}</p>
          <p><strong>Last Name:</strong> {formData.lastName}</p>
          <p><strong>Username:</strong> {formData.username}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Password:</strong> {formData.password}</p>
          <p><strong>Country:</strong> {formData.country}</p>
          <p><strong>City:</strong> {formData.city}</p>
          <p><strong>Phone No.:</strong> {formData.phone}</p>
          <p><strong>Pan No.:</strong> {formData.panNo}</p>
          <p><strong>Aadhar No.:</strong> {formData.aadharNo}</p>
        </div>
      )}
    </div>
  );
};

export default App;
