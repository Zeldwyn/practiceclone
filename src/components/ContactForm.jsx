// src/components/ContactForm.jsx
import { useEffect, useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function ContactForm() {
  const [phone, setPhone] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleCaptcha = (token) => {
    console.log("Captcha verified:", token);
    setCaptchaVerified(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.grecaptcha && window.grecaptcha.render) {
        try {
          window.grecaptcha.render("recaptcha-container", {
            sitekey: "6LdZewUsAAAAALr-Q1eg2fdrDyKJ89eYodazPjHx", 
            callback: handleCaptcha,
          });
          clearInterval(interval);
        } catch (error) {
          console.error("reCAPTCHA render error:", error);
          clearInterval(interval);
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert("Please complete the reCAPTCHA verification");
      return;
    }
    // Your form submission logic here
    console.log("Form submitted");
  };

  return (
    <section className="w-full flex justify-center lg:py-20 py-14 px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-10">Contact Us!</h1>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}> 
          
          <div className="flex flex-col gap-1">
            <label className="font-medium lg:text-md text-sm">Full Name *</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="border border-gray-200 rounded-md lg:px-4 lg:py-3 px-3 py-2 lg:text-md text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          
          <div className="flex flex-col gap-1">
            <label className="font-medium lg:text-md text-sm">Email *</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border border-gray-200 rounded-md lg:px-4 lg:py-3 px-3 py-2 lg:text-md text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium lg:text-md text-sm">Phone *</label>
            <PhoneInput
              country={'ph'} 
              value={phone}
              onChange={setPhone}
              enableSearch={true}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              containerStyle={{
                width: '100%',
              }}
              inputStyle={{
                width: '100%',
                height: 'auto',
                paddingTop: window.innerWidth >= 1024 ? '9px' : '6px',
                paddingBottom: window.innerWidth >= 1024 ? '9px' : '6px',
                paddingLeft: '48px',
                fontSize: window.innerWidth >= 1024 ? '16px' : '14px',
                backgroundColor: '#f9fafb',
                boxShadow: isFocused ? '0 0 0 2px #fb923c' : 'none',
                borderRadius: '0.375rem',
                outline: 'none',
              }}
              buttonStyle={{
                backgroundColor: '#f9fafb',
                boxShadow: isFocused ? '0 0 0 2px #fb923c' : 'none',
                borderRight: 'none',
                borderRadius: '0.375rem 0 0 0.375rem',
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium lg:text-md text-sm">How can we help you? *</label>
            <select
              name="helpType"
              className="border border-gray-200 rounded-md lg:px-4 lg:py-3 px-3 py-2 lg:text-md text-sm bg-gray-50 text-gray-400 invalid:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              defaultValue=""
            >
              <option value="" disabled hidden>How can we help you?</option>
              <option value="sales">Sales</option>
              <option value="support">Support</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium lg:text-md text-sm">Current or Previous CRM?</label>
            <input
              type="text"
              name="crm"
              placeholder="Keap, HubSpot, Active Campaign, etc."
              className="border border-gray-200 rounded-md lg:px-4 lg:py-3 px-3 py-2 lg:text-md text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium lg:text-md text-sm">Message *</label>
            <textarea
              name="message"
              placeholder="Description"
              className="border border-gray-200 rounded-md lg:px-4 lg:py-3 px-3 py-2 lg:text-md text-sm bg-gray-50 h-28 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            ></textarea>
          </div>

          <label className="flex gap-2 text-sm text-gray-600 items-start">
            <input type="checkbox" className="mt-1" />
            <span>
              I consent to receive marketing text messages from LeadConnector at the phone number provided. Frequency may vary. Message & data rates may apply. Text HELP for assistance, reply STOP to opt out.
            </span>
          </label>

          <label className="flex gap-2 text-sm text-gray-600 items-start">
            <input type="checkbox" className="mt-1" />
            <span>
              I consent to receive non-marketing text messages from LeadConnector about my order updates, appointment reminders etc. Frequency may vary. Message & data rates may apply, Text HELP for assistance, reply STOP to opt out.
            </span>
          </label>    

          <div id="recaptcha-container"></div>

          <button
            type="submit"
            disabled={!captchaVerified}
            className="bg-orange-500 text-white font-semibold lg:py-3 py-2 lg:text-md text-sm rounded-md hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}