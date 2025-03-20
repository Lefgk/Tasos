import React, { useState } from "react";

function App() {
  const backgroundStyle = {
    backgroundImage: `url('/greece1.jpg')`, // Path to the image in the public folder
    backgroundSize: "cover", // Ensures the image covers the entire element
    backgroundPosition: "center", // Centers the image
    backgroundRepeat: "no-repeat", // Prevents the image from repeating
    // minHeight: '100vh', // Ensures the background covers the full viewport height
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    // color: '#fff', // Text color for better contrast
    // textAlign: 'center',
    // padding: '20px',
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    tourType: "Classical Tasos Tour",
    participants: 1,
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend service
    // For demonstration, we'll just show a success message
    console.log("Form submitted:", formData);
    setIsSubmitted(true);

    // Reset form after submission
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        date: "",
        tourType: "Classical Tasos Tour",
        participants: 1,
        message: "",
      });
    }, 5000);
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
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <h1 style={{ margin: 0, fontSize: "32px" }}>The original ‘’Hidden Gem Tour’’ </h1>
          <p style={{ margin: "10px 0 0" }}>Free Walking Tour around Acropolis</p>
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
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", justifyContent: "center" }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex" }}>
            <li style={{ margin: "0 15px" }}>
              <a href="#home" style={{ color: "#0072bb", textDecoration: "none", fontWeight: "bold" }}>
                Home
              </a>
            </li>
            <li style={{ margin: "0 15px" }}>
              <a href="#tour" style={{ color: "#0072bb", textDecoration: "none", fontWeight: "bold" }}>
                Tour
              </a>
            </li>
            {/* <li style={{ margin: "0 15px" }}>
              <a href="#about" style={{ color: "#0072bb", textDecoration: "none", fontWeight: "bold" }}>
                About Us
              </a>
            </li> */}
            <li style={{ margin: "0 15px" }}>
              <a href="#booking" style={{ color: "#0072bb", textDecoration: "none", fontWeight: "bold" }}>
                Book Now
              </a>
            </li>
            <li style={{ margin: "0 15px" }}>
              <a href="#contact" style={{ color: "#0072bb", textDecoration: "none", fontWeight: "bold" }}>
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
          // backgroundImage: 'url("https://via.placeholder.com/1600x800")',
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
          backgroundImage: `url('/greece1.jpg')`, // Path to the image in the public folder
          backgroundSize: "cover", // Ensures the image covers the entire element
          backgroundPosition: "center", // Centers the image
          // backgroundRepeat: 'no-repeat', // Prevents the image from repeating
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
        <div style={{ backgroundColor: "rgba(0,0,0,0.5)", position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}></div>
        <div style={{ position: "relative", maxWidth: "800px", padding: "0 20px" }}>
          {/* <div style={backgroundStyle}> */}

          <h2 style={{ fontSize: "48px", margin: "0 0 20px" }}>
            Experience Athens like a friend with me Alex a local Athenian who loves ancient Greek history/philosophy and Admires Beauty & esthetics
          </h2>
          <p style={{ fontSize: "20px", margin: "0 0 30px" }}>Join our free walking tours led by passionate local guides</p>
        </div>

        {/* </div> */}
      </section>

      {/* Tours Section */}
      {/* <section id="tours" style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', margin: '0 0 50px', fontSize: '36px', color: '#333' }}>Our Tours</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
          
          <div style={{ width: '300px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ height: '200px', backgroundImage: 'url("https://via.placeholder.com/300x200")', backgroundSize: 'cover' }}></div>
            <div style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 15px', color: '#0072bb' }}>Classical Tasos Tour</h3>
              <p style={{ margin: '0 0 15px', color: '#666', lineHeight: '1.6' }}>Explore the rich history of ancient Athens, including the Acropolis, Ancient Agora, and more.</p>
              <p style={{ margin: '0 0 15px', fontWeight: 'bold' }}><span style={{ color: '#0072bb' }}>Duration:</span> 3 hours</p>
              <a href="#booking" style={{
                display: 'inline-block',
                backgroundColor: '#0072bb',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '5px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}>Book Now</a>
            </div>
          </div>
          
          
          <div style={{ width: '300px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ height: '200px', backgroundImage: 'url("https://via.placeholder.com/300x200")', backgroundSize: 'cover' }}></div>
            <div style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 15px', color: '#0072bb' }}>Athens Street Art Tour</h3>
              <p style={{ margin: '0 0 15px', color: '#666', lineHeight: '1.6' }}>Discover the vibrant street art scene in Athens' hip neighborhoods of Psiri and Exarchia.</p>
              <p style={{ margin: '0 0 15px', fontWeight: 'bold' }}><span style={{ color: '#0072bb' }}>Duration:</span> 2.5 hours</p>
              <a href="#booking" style={{
                display: 'inline-block',
                backgroundColor: '#0072bb',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '5px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}>Book Now</a>
            </div>
          </div>
          
          
          <div style={{ width: '300px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ height: '200px', backgroundImage: 'url("https://via.placeholder.com/300x200")', backgroundSize: 'cover' }}></div>
            <div style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 15px', color: '#0072bb' }}>Food & Culture Tour</h3>
              <p style={{ margin: '0 0 15px', color: '#666', lineHeight: '1.6' }}>Taste authentic Greek cuisine while learning about Athens' culinary traditions and culture.</p>
              <p style={{ margin: '0 0 15px', fontWeight: 'bold' }}><span style={{ color: '#0072bb' }}>Duration:</span> 4 hours</p>
              <a href="#booking" style={{
                display: 'inline-block',
                backgroundColor: '#0072bb',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '5px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}>Book Now</a>
            </div>
          </div>
        </div>
      </section> */}

      {/* About Section */}
      <section id="tour" style={{ padding: "80px 20px", backgroundColor: "#f8f9fa" }} href="#tour">
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", margin: "0 0 30px", fontSize: "36px", color: "#333" }}> Tour description</h2>
          <p style={{ margin: "0 0 20px", lineHeight: "1.8", color: "#666", fontSize: "18px" }}>
            A beautiful and natural route around the Acropolis with 'high-quality' History and philosophy, the Route is entirely free from car/city
            noise If you love ancient history and philosophy, beautiful esthetic neighborhoods, and panoramic views that tour is for you During the
            itinerary, I'll be happy to share some of our best-kept secrets and be pleased to answer all your questions and curiosities. Tips in
            written form and Google Spots will be given for your next days here in Athens (e.g where to eat, what to do, hidden gems places to visit)
            <br />
            *Not comfortable for baby strollers{" "}
          </p>
          <p style={{ margin: "0 0 15px", fontWeight: "bold" }}>
            <span style={{ color: "#0072bb" }}>Duration:</span> 3 hours
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
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" style={{ padding: "80px 20px", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", margin: "0 0 50px", fontSize: "36px", color: "#333" }}>Book Your Tour</h2>

        {isSubmitted ? (
          <div
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "20px",
              borderRadius: "5px",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            <p style={{ margin: 0, fontSize: "18px" }}>Thank you for your booking! We will contact you shortly to confirm your tour.</p>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 300px" }}>
              <label htmlFor="name" style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>
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
              <label htmlFor="email" style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>
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
                  width: "100%",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 300px" }}>
              <label htmlFor="date" style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>
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
              <label htmlFor="tourType" style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>
                Tour Type *
              </label>
              <select
                id="tourType"
                name="tourType"
                required
                value={formData.tourType}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                }}
              >
                <option value="Classical Tasos Tour">Classical Tasos Tour</option>
                <option value="Athens Street Art Tour">Athens Street Art Tour</option>
                <option value="Food & Culture Tour">Food & Culture Tour</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="participants" style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>
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
                width: "100%",
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />
          </div>

          <div>
            <label htmlFor="message" style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>
              Additional Information
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "16px",
                resize: "vertical",
              }}
            ></textarea>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#0072bb",
              color: "white",
              padding: "15px",
              border: "none",
              borderRadius: "5px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Book Now
          </button>
        </form>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: "80px 20px", backgroundColor: "#f8f9fa" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", margin: "0 0 50px", fontSize: "36px", color: "#333" }}>What Our Visitors Say</h2>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
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
              <p style={{ fontSize: "18px", fontStyle: "italic", marginBottom: "20px", color: "#666" }}>
                "The Classical Athens Tour was absolutely amazing! Our guide Maria was knowledgeable, funny, and made the history come alive. Highly
                recommended!"
              </p>
              <p style={{ fontWeight: "bold", color: "#333" }}>- Sarah from USA</p>
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
              <p style={{ fontSize: "18px", fontStyle: "italic", marginBottom: "20px", color: "#666" }}>
                "The Street Art Tour showed us a completely different side of Athens that we would have missed otherwise. Dimitris was passionate and
                engaging throughout."
              </p>
              <p style={{ fontWeight: "bold", color: "#333" }}>- James from UK</p>
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
              <p style={{ fontSize: "18px", fontStyle: "italic", marginBottom: "20px", color: "#666" }}>
                "The Food & Culture Tour was the highlight of our trip to Athens! We tried so many delicious foods and learned about Greek traditions.
                Worth every penny!"
              </p>
              <p style={{ fontWeight: "bold", color: "#333" }}>- Akiko from Japan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 30px", fontSize: "36px", color: "#333" }}>Contact Us</h2>
          <p style={{ margin: "0 0 30px", fontSize: "18px", color: "#666" }}>
            If you have any questions or special requests, feel free to reach out to us!
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "30px", flexWrap: "wrap", marginBottom: "40px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", color: "#0072bb", marginBottom: "10px" }}>📧</div>
              <p style={{ margin: 0, fontWeight: "bold" }}>Email</p>
              <p style={{ margin: "5px 0 0", color: "#666" }}>athens-free-walking-tour@proton.me</p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", color: "#0072bb", marginBottom: "10px" }}>📱</div>
              <p style={{ margin: 0, fontWeight: "bold" }}>Phone</p>
              <p style={{ margin: "5px 0 0", color: "#666" }}>+30 210 1234567</p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", color: "#0072bb", marginBottom: "10px" }}>📍</div>
              <p style={{ margin: 0, fontWeight: "bold" }}>Meeting Point</p>
              <p style={{ margin: "5px 0 0", color: "#666" }}>
                Pl. Lisikrati 1, Athina 105 58, Greece Monument of Lycicrates
                <br /> "In front of the Diogenis restaurant there are some wooden benches"
                <br /> Pl. Lisikrati 1, Athina 105 58
              </p>
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            <h3 style={{ margin: "0 0 20px", color: "#333" }}>Follow Us</h3>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
              <a href="#" style={{ color: "#0072bb", fontSize: "24px", textDecoration: "none" }}>
                Facebook
              </a>
              <a href="#" style={{ color: "#0072bb", fontSize: "24px", textDecoration: "none" }}>
                Instagram
              </a>
              <a href="#" style={{ color: "#0072bb", fontSize: "24px", textDecoration: "none" }}>
                TripAdvisor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#333", color: "white", padding: "40px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ margin: "0 0 20px" }}>© {new Date().getFullYear()} Tasos Tour. All rights reserved.</p>
          <p style={{ margin: 0, fontSize: "14px", color: "#aaa" }}>
            Tours operate rain or shine. Please arrive 15 minutes before the scheduled departure time.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
