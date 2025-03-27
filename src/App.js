import React, { useState } from "react";
import emailjs from "@emailjs/browser";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    tourType: "The hidden gem Tour",
    participants: 1,
    message: "",
    time: "", // Added time field
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS configuration
      const response = await emailjs.send(
        "service_bk4w4rj", // Replace with your EmailJS Service ID
        "template_hqvjmer", // Replace with your EmailJS Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          tour_date: formData.date,
          tour_time: formData.time,
          participants: formData.participants,
          additional_info:
            formData.message || "No additional information provided",
          tour_type: formData.tourType,
        },
        "hVn6nKOOssKTpbazj" // Replace with your EmailJS Public Key
      );

      // Success handling
      setSubmitStatus("success");

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          date: "",
          tourType: "The hidden gem Tour",
          participants: 1,
          message: "",
          time: "",
        });
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      // Error handling
      console.error("Email send failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to get available times based on the selected date
  const getAvailableTimes = (date) => {
    console.log(date);
    const selectedDate = new Date(date);
    const month = selectedDate.getMonth() + 1; // Months are 0-indexed
    console.log(selectedDate, month);
    if (month >= 3 && month <= 5) {
      return ["10:00 AM", "03:00 PM"];
    } else if (month === 6) {
      return ["10:00 AM", "04:30 PM"];
    } else {
      return [];
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "#0072bb",
          color: "white",
          padding: "20px 0",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
        >
          <h1 style={{ margin: 0, fontSize: "32px" }}>
            The original ‘’Hidden Gem Tour’’{" "}
          </h1>
          <p style={{ margin: "10px 0 0" }}>
            Free Walking Tour around Acropolis
          </p>
        </div>
      </header>

      {/* Navigation */}
      <nav
        style={{
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #ddd",
          padding: "15px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
            }}
          >
            <li style={{ margin: "0 15px" }}>
              <a
                href="#home"
                style={{
                  color: "#0072bb",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Home
              </a>
            </li>
            <li style={{ margin: "0 15px" }}>
              <a
                href="#tour"
                style={{
                  color: "#0072bb",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Tour
              </a>
            </li>
            <li style={{ margin: "0 15px" }}>
              <a
                href="#booking"
                style={{
                  color: "#0072bb",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Book Now
              </a>
            </li>
            <li style={{ margin: "0 15px" }}>
              <a
                href="#contact"
                style={{
                  color: "#0072bb",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        style={{
          backgroundImage: `url('/greece1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          position: "relative",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></div>
        <div
          style={{ position: "relative", maxWidth: "800px", padding: "0 20px" }}
        >
          <h2
            style={{ fontSize: "48px", margin: "0 0 20px", fontWeight: "bold" }}
          >
            Experience Athens like a friend with me Alex, a local Athenian who
            loves ancient Greek history/philosophy and admires beauty &
            aesthetics.
          </h2>
          <p
            style={{ fontSize: "20px", margin: "0 0 30px", fontWeight: "bold" }}
          >
            Join our free walking tours led by passionate local guides.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section
        id="tour"
        style={{
          marginTop: "80px",
          marginBottom: "80px",
          padding: "80px 20px",
          backgroundColor: "#f8f9fa",
          backgroundImage: `url('/acropolis.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              margin: "0 0 30px",
              fontSize: "36px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Tour Description
          </h2>
          <p
            style={{
              margin: "0 0 20px",
              lineHeight: "1.8",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            A beautiful and natural route around the Acropolis with high-quality
            history and philosophy. The route is entirely free from car/city
            noise.
            <br /> <br /> If you love ancient history and philosophy, beautiful
            aesthetic neighborhoods, and panoramic views, this tour is for you.
            <br /> <br /> During the itinerary, I'll be happy to share some of
            our best-kept secrets and answer all your questions and curiosities.
            <br /> <br /> Tips in written form and Google Spots will be provided
            for your next days in Athens (e.g., where to eat, what to do, hidden
            gem places to visit).
            <br /> <br />
            *Not comfortable for baby strollers.
          </p>
          <p style={{ margin: "0 0 15px", fontWeight: "bold", color: "white" }}>
            <span style={{}}>Duration:</span> 2:15 hours
          </p>
          <a
            href="#booking"
            style={{
              backgroundColor: "#0072bb",
              color: "white",
              padding: "12px 30px",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Book Your Tour Now
          </a>
          <p style={{ margin: "20px 0 0", color: "white", fontWeight: "bold" }}>
            SCHEDULE 2025 PERIOD:
            <br />
            FROM 1/MARCH --- 31/MAY: 10:00 AM & 03:00 PM
            <br />
            FROM 1/JUNE --- 30/JUNE: 10:00 AM & 04:30 PM
            <br />
            FROM 1/SEPT --- 30/SEPT 10:00AM & 04:30PM
            <br />
            FROM 1/OCT --- 31/OCT 10:00AM & 03:00PM
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section
        id="booking"
        style={{
          padding: "80px 20px", // Adjust padding as needed
          width: "100%", // Ensure the container takes full width
          backgroundImage: `url('/book.jpg')`, // Path to your image
          backgroundSize: "cover", // Ensures the image covers the entire container
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
        }}
      >
        <h2
          style={{
            textAlign: "center",
            margin: "0 0 50px",
            fontSize: "36px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Book Your Tour
        </h2>

        {submitStatus === "success" && (
          <div
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "20px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Thank you for your booking! We will contact you shortly to confirm
            your tour.
          </div>
        )}
        {submitStatus === "error" && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "20px",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Oops! There was a problem submitting your booking. Please try again.
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginLeft: "20%",
              flexWrap: "wrap",
              maxWidth: "1000px",
            }}
          >
            <div style={{ flex: "1 1 300px" }}>
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "white", // Changed color for better visibility
                }}
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                }}
              />
            </div>

            <div style={{ flex: "1 1 300px" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  width: "80%",
                  marginLeft: "20px",
                  fontWeight: "bold",
                  color: "white", // Changed color for better visibility
                }}
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "80%",
                  marginLeft: "20px",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginLeft: "20%",
              maxWidth: "1000px",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "1 1 300px" }}>
              <label
                htmlFor="date"
                style={{
                  display: "block",

                  marginBottom: "8px",
                  fontWeight: "bold",
                  color: "white", // Changed color for better visibility
                }}
              >
                Preferred Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                }}
              />
            </div>

            <div style={{ flex: "1 1 300px" }}>
              <label
                htmlFor="time"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  width: "80%",
                  marginLeft: "20px",
                  fontWeight: "bold",
                  color: "white", // Changed color for better visibility
                }}
              >
                Preferred Time *
              </label>
              <select
                id="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                style={{
                  width: "80%",
                  marginLeft: "20px",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                }}
              >
                <option value="">Select Time</option>
                {formData.date &&
                  getAvailableTimes(formData.date).map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="participants"
              style={{
                display: "block",
                maxWidth: "1000px",
                marginLeft: "20%",
                marginBottom: "8px",
                fontWeight: "bold",

                color: "white", // Changed color for better visibility
              }}
            >
              Number of Participants *
            </label>
            <input
              type="number"
              id="participants"
              name="participants"
              min="1"
              required
              value={formData.participants}
              onChange={handleChange}
              style={{
                maxWidth: "1000px",

                padding: "12px",
                marginLeft: "20%",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
                marginLeft: "20%",
                color: "white",
              }}
            >
              Additional Information
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              style={{
                width: "50%",
                padding: "12px",
                borderRadius: "4px",
                marginLeft: "20%",
                border: "1px solid #ddd",
                fontSize: "16px",
                resize: "vertical",
              }}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              backgroundColor: isSubmitting ? "#cccccc" : "#0072bb",
              color: "white",
              maxWidth: "200px",
              marginLeft: "20%",
              padding: "15px",
              border: "none",
              borderRadius: "5px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              marginTop: "10px",
            }}
          >
            {isSubmitting ? "Submitting..." : "Book Now"}
          </button>
        </form>
      </section>

      {/* Testimonials Section */}
      <section
        style={{
          padding: "80px 20px",
          backgroundColor: "#f8f9fa",

          backgroundImage: `url('/greece1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginTop: "80px",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              margin: "0 0 50px",
              fontSize: "36px",
              // color: "white",
              fontWeight: "bold",
            }}
          >
            What Our Visitors Say
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "30px",
            }}
          >
            {/* Testimonial 1 */}
            <div
              style={{
                flex: "1 1 300px",
                maxWidth: "350px",
                padding: "30px",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  fontStyle: "italic",
                  marginBottom: "20px",
                  color: "#666",
                }}
              >
                Alex was a great guide! The tour was super interesting and with
                a deeper level of information! He showed us a bit of history,
                philosophy, architecture, and curiosities about Athens that made
                us fall in love with the city! He also gave us some precious
                extra tips that defined the success and happiness of our
                following days in Greece! Thank you!!
              </p>
              <p style={{ fontWeight: "bold" }}>- Sarah from USA</p>
            </div>

            {/* Testimonial 2 */}
            <div
              style={{
                flex: "1 1 300px",
                maxWidth: "350px",
                padding: "30px",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  fontStyle: "italic",
                  marginBottom: "20px",
                  color: "#666",
                }}
              >
                Alex really wanted to explain the fundamental interconnectedness
                of things and describe the currents of history while keeping it
                grounded. This was very nice, at least for someone like me. It
                was a lovely and relaxed wander.
              </p>
              <p style={{ fontWeight: "bold" }}>- James from UK</p>
            </div>

            {/* Testimonial 3 */}
            <div
              style={{
                flex: "1 1 300px",
                maxWidth: "350px",
                padding: "30px",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <p
                style={{
                  fontSize: "18px",
                  fontStyle: "italic",
                  marginBottom: "20px",
                  color: "#666",
                }}
              >
                Alex was an outstanding tour guide! His vast knowledge of Greek
                history and philosophy was fascinating. He managed to turn the
                tour into a journey through time while incorporating personal
                stories and humor that made every moment enjoyable. The personal
                relationship he created with each of the participants was
                exciting. Furthermore, at the end of the tour, Alex sent us a
                detailed list of recommendations for other places in Athens that
                simply must not be missed, including hidden local restaurants
                and authentic corners.
              </p>
              <p style={{ fontWeight: "bold" }}>- Akiko from Japan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: "80px 20px" }}>
        <div
          style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
        >
          <h2
            style={{
              margin: "0 0 30px",
              fontSize: "36px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Contact Us
          </h2>
          <p
            style={{
              margin: "0 0 30px",
              fontSize: "18px",
              color: "#666",
              fontWeight: "bold",
            }}
          >
            If you have any questions or special requests, feel free to reach
            out to us!
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              flexWrap: "wrap",
              marginBottom: "40px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "24px",
                  color: "#0072bb",
                  marginBottom: "10px",
                }}
              >
                📧
              </div>
              <p style={{ margin: 0, fontWeight: "bold" }}>Email</p>
              <p style={{ margin: "5px 0 0", color: "#666" }}>
                hidden.gem.walking.tour@gmail.com
              </p>
            </div>
            <br />
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "24px",
                  color: "#0072bb",
                  marginBottom: "10px",
                }}
              >
                📍
              </div>
              <a
                style={{ margin: 0, fontWeight: "bold" }}
                href="https://g.co/kgs/33w9FCC"
                target="_blank"
                rel="noopener noreferrer"
              >
                Meeting Point
              </a>
              <a
                href="https://g.co/kgs/33w9FCC"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#0072bb",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                <p style={{ margin: "5px 0 0", color: "#666" }}>
                  ADAMS HOTEL
                  <br />
                  THALOU 1, Athens 105 58 <br />
                  (There are a few wooden benches in front of ADAMS HOTELS.)
                </p>
              </a>
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <h3
              style={{ margin: "0 0 20px", color: "white", fontWeight: "bold" }}
            >
              Follow Us
            </h3>
            <div
              style={{ display: "flex", justifyContent: "center", gap: "20px" }}
            >
              <a
                href="#"
                style={{
                  color: "#0072bb",
                  fontSize: "24px",
                  textDecoration: "none",
                }}
              >
                Instagram
              </a>
              <a
                href="#"
                style={{
                  color: "#0072bb",
                  fontSize: "24px",
                  textDecoration: "none",
                }}
              >
                TripAdvisor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "white",
          color: "white",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ margin: "0 0 20px", fontWeight: "bold", color: "black" }}>
            © {new Date().getFullYear()} The Hidden Gem Tour. All rights
            reserved.
          </p>
          <p style={{ margin: 0, fontSize: "14px", color: "#aaa" }}>
            Tours operate rain or shine. Please arrive 10 minutes before the
            scheduled departure time.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
