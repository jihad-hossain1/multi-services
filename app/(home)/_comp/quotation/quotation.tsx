"use client";
import React, { useState } from "react";

const Quotation: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectDetails: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    company: "",
    projectDetails: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "", company: "", projectDetails: "" };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required";
      isValid = false;
    }
    if (!formData.company) {
      newErrors.company = "Company is required";
      isValid = false;
    }
    if (!formData.projectDetails) {
      newErrors.projectDetails = "Project details are required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission logic
      console.log("Form submitted", formData);
    }
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Request a Quotation
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-6 rounded shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="company"
              className="block text-sm font-semibold mb-2"
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.company && (
              <p className="text-red-500 text-sm">{errors.company}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="projectDetails"
              className="block text-sm font-semibold mb-2"
            >
              Project Details
            </label>
            <textarea
              id="projectDetails"
              name="projectDetails"
              value={formData.projectDetails}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.projectDetails && (
              <p className="text-red-500 text-sm">{errors.projectDetails}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Request Quotation
          </button>
        </form>
      </div>
    </section>
  );
};

export default Quotation;
