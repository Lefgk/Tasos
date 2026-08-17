import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import SplashCursor from "./SplashCursor";
import "./App.css";

/* Adds .is-visible to any element with a ref from this hook
   the first time it scrolls into view. */
function useReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const targets = root.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}

const SCHEDULE = [
  { season: "1 Mar — 31 May", times: "10:00 AM & 03:00 PM" },
  { season: "1 Jun — 30 Jun", times: "10:00 AM & 04:30 PM" },
  { season: "1 Sep — 30 Sep", times: "10:00 AM & 04:30 PM" },
  { season: "1 Oct — 31 Oct", times: "10:00 AM & 03:00 PM" },
];

const ROUTE = [
  {
    icon: "🏨",
    title: "The Benches at Adams Hotel",
    text: "We meet, we say hello, the story begins. Thalou 2 — arrive 10 minutes early.",
  },
  {
    icon: "🏛️",
    title: "Plaka — Neighborhood of the Gods",
    text: "The oldest continuously inhabited neighborhood in Europe, awake for 5,000 years.",
  },
  {
    icon: "🏝️",
    title: "Anafiotika — An Island Under the Rock",
    text: "Whitewashed Cycladic houses built by island craftsmen in the 1800s. Athens' best-kept secret.",
  },
  {
    icon: "⛰️",
    title: "The Acropolis Slopes",
    text: "Silent marble paths beneath the Parthenon — history and philosophy where they actually happened.",
  },
  {
    icon: "🌅",
    title: "The Secret Viewpoint Finale",
    text: "A panorama over the whole city — plus my written guide of spots for the rest of your trip.",
  },
];

/* Next tour: Mar–May & Oct at 10:00/15:00, Jun & Sep at 10:00/16:30 */
function getNextTour(now) {
  const timesFor = (month) => {
    if ((month >= 3 && month <= 5) || month === 10)
      return [
        [10, 0],
        [15, 0],
      ];
    if (month === 6 || month === 9)
      return [
        [10, 0],
        [16, 30],
      ];
    return [];
  };
  for (let d = 0; d < 400; d++) {
    const day = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + d
    );
    for (const [h, m] of timesFor(day.getMonth() + 1)) {
      const t = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        h,
        m
      );
      if (t > now) return t;
    }
  }
  return null;
}

function formatCountdown(ms) {
  const s = Math.floor(ms / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  if (days > 0) return `${days}d ${hours}h ${mins}m ${secs}s`;
  if (hours > 0) return `${hours}h ${mins}m ${secs}s`;
  return `${mins}m ${secs}s`;
}

function weatherEmoji(code) {
  if (code === 0) return "☀️";
  if (code <= 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌦️";
  if (code <= 77) return "🌨️";
  if (code <= 82) return "🌧️";
  return "⛈️";
}

const HIGHLIGHTS = [
  {
    img: "/greece1.jpg",
    title: "Anafiotika",
    text: "A tiny Cycladic-island village hiding right under the Acropolis rock — whitewashed steps, painted shutters, and absolute calm.",
  },
  {
    img: "/users.jpg",
    title: "The Streets of Plaka",
    text: "Bougainvillea-covered lanes in the oldest neighborhood of Athens, where every corner has a story older than most countries.",
  },
  {
    img: "/book.jpg",
    title: "Alleys Nobody Finds Alone",
    text: "Silent marble paths a few meters from the crowds. This is the Athens locals keep for themselves — and the heart of this tour.",
  },
  {
    img: "/cat.jpg",
    title: "Local Life (Cats Included)",
    text: "Courtyards, quiet cafés, and the unofficial residents of the old town. Slow travel, the Greek way — siga siga.",
  },
];

const WHY = [
  {
    icon: "🏛️",
    title: "A True Local Athenian",
    text: "Born and raised in Athens — you're not following a script, you're walking with a friend who lives here.",
  },
  {
    icon: "📜",
    title: "History & Philosophy That Breathe",
    text: "From Socrates to street art — 2,500 years of ideas told as stories, not dates.",
  },
  {
    icon: "🤝",
    title: "Small, Friendly Groups",
    text: "Never a flag-and-megaphone crowd. Everyone gets to ask, laugh, and linger.",
  },
  {
    icon: "🎁",
    title: "Free Tips for Your Whole Trip",
    text: "After the tour you receive a written guide with Google Maps spots — where to eat, swim, and wander next.",
  },
];

const FAQ = [
  {
    q: "Is the tour really free?",
    a: "Yes. There is no ticket and no fixed price — the tour is tip-based. At the end, you give what you feel the experience was worth. That keeps the tour honest: my only job is to make it unforgettable.",
  },
  {
    q: "Where exactly do we meet?",
    a: "In front of ADAMS HOTEL, Thalou 2, Athens 105 58 — look for the wooden benches. It's a 3-minute walk from Syntagma or Acropolis metro stations. Please arrive 10 minutes early.",
  },
  {
    q: "How long is the walk, and is it difficult?",
    a: "About 2 hours 15 minutes at a relaxed pace, entirely away from car traffic and city noise. There are some steps and old marble paths, so comfortable shoes are a must. It's not suitable for baby strollers.",
  },
  {
    q: "Do I need to book in advance?",
    a: "Yes, please — groups are kept deliberately small so everyone can hear, ask questions, and enjoy the walk. Use the booking form above and you'll receive a confirmation by email.",
  },
  {
    q: "What should I bring?",
    a: "Comfortable shoes, water, a hat and sunscreen in summer — and your curiosity. Tours run rain or shine, so bring a light jacket if the forecast looks moody.",
  },
];

const TESTIMONIALS = [
  {
    text: "Alex was a great guide! The tour was super interesting and with a deeper level of information! He showed us a bit of history, philosophy, architecture, and curiosities about Athens that made us fall in love with the city! He also gave us some precious extra tips that defined the success and happiness of our following days in Greece! Thank you!!",
    author: "Kelly from Australia",
  },
  {
    text: "Alex really wanted to explain the fundamental interconnectedness of things and describe the currents of history while keeping it grounded. This was very nice, at least for someone like me. It was a lovely and relaxed wander.",
    author: "Caroline from Canada",
  },
  {
    text: "Alex was an outstanding tour guide! His vast knowledge of Greek history and philosophy was fascinating. He managed to turn the tour into a journey through time while incorporating personal stories and humor that made every moment enjoyable. The personal relationship he created with each of the participants was exciting. Furthermore, at the end of the tour, Alex sent us a detailed list of recommendations for other places in Athens that simply must not be missed, including hidden local restaurants and authentic corners.",
    author: "Bhavna from India",
  },
];

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    tourType: "The hidden gem Tour",
    participants: 1,
    message: "",
    time: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [weather, setWeather] = useState(null);
  const [routeProgress, setRouteProgress] = useState(0);
  const routeRef = useRef(null);
  const revealRef = useReveal();

  useEffect(() => {
    const onScroll = () => {
      setNavScrolled(window.scrollY > 40);
      const el = routeRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const passed = Math.min(
          Math.max(window.innerHeight * 0.75 - rect.top, 0),
          rect.height
        );
        setRouteProgress(rect.height ? passed / rect.height : 0);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=37.9755&longitude=23.7348&current=temperature_2m,weather_code"
    )
      .then((r) => r.json())
      .then((d) => {
        if (d && d.current) setWeather(d.current);
      })
      .catch(() => {});
  }, []);

  const nextTour = getNextTour(now);

  const handleTilt = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${(x * 8).toFixed(2)}deg`);
  };

  const resetTilt = (e) => {
    e.currentTarget.style.setProperty("--tilt-x", "0deg");
    e.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        "service_bk4w4rj",
        "template_fmcoxlc",
        {
          name: formData.name,
          email: formData.email,
          date: formData.date,
          time: formData.time,
          participants: formData.participants,
          info: formData.message || "No additional information provided",
          tour_type: formData.tourType,
        },
        "hVn6nKOOssKTpbazj"
      );

      setSubmitStatus("success");
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
      console.error("Email send failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAvailableTimes = (date) => {
    const month = new Date(date).getMonth() + 1;
    if ((month >= 3 && month <= 5) || month === 10) {
      return ["10:00 AM", "03:00 PM"];
    } else if (month === 6 || month === 9) {
      return ["10:00 AM", "04:30 PM"];
    }
    return [];
  };

  return (
    <div className="app" ref={revealRef}>
      <SplashCursor />
      {/* Navigation */}
      <nav className={`nav${navScrolled ? " nav--scrolled" : ""}`}>
        <a href="#home" className="nav__brand">
          The <em>Hidden Gem</em> Tour
        </a>
        <ul className="nav__links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#tour">Tour</a>
          </li>
          <li>
            <a href="#route">Route</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <a href="#booking" className="nav__cta">
              Book Now
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero */}
      <header id="home" className="hero">
        <div
          className="hero__bg"
          style={{ backgroundImage: "url('/greece1.jpg')" }}
        />
        <div className="hero__overlay" />
        <div className="hero__content">
          <span className="hero__eyebrow">
            Free Walking Tour · Acropolis · Athens
          </span>
          <h1 className="hero__title">
            The original <em>“Hidden Gem Tour”</em>
          </h1>
          <p className="hero__sub">
            Skip the crowds. Walk the secret side of the Acropolis with me,
            Alex — a born-and-raised Athenian in love with ancient history,
            philosophy, and the beautiful corners tourists never find.
          </p>
          <div className="hero__actions">
            <a href="#booking" className="btn btn--gold">
              Book Your Free Tour
            </a>
            <a href="#tour" className="btn btn--ghost">
              Discover the Route
            </a>
          </div>
          <div className="hero__trust">
            <span className="hero__stars">★★★★★</span>
            <span>Rated 5.0 by guests</span>
            <span className="hero__trust-dot">·</span>
            <span>Travelers from 40+ countries</span>
            <span className="hero__trust-dot">·</span>
            <span>Small groups only</span>
          </div>
          <div className="hero__live">
            {nextTour && (
              <span className="live-pill">
                <span className="live-pill__dot" />
                Next free tour:{" "}
                {nextTour.toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}{" "}
                {nextTour.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                — in {formatCountdown(nextTour - now)}
              </span>
            )}
            {weather && (
              <span className="live-pill">
                {weatherEmoji(weather.weather_code)}{" "}
                {Math.round(weather.temperature_2m)}°C in Athens right now
              </span>
            )}
          </div>
        </div>
        <a href="#tour" className="hero__scroll">
          Scroll
          <span />
        </a>
      </header>

      {/* Tour description */}
      <section id="tour" className="section tour">
        <div className="section__inner">
          <span className="section__eyebrow reveal">The Experience</span>
          <h2 className="section__title reveal">Tour Description</h2>
          <div className="greek-key reveal" />
          <div className="tour__grid">
            <div className="tour__text">
              <p className="reveal reveal--left">
                A beautiful and natural route around the Acropolis with
                high-quality history and philosophy. The route is entirely free
                from car and city noise.
              </p>
              <p className="reveal reveal--left" style={{ "--reveal-delay": "0.1s" }}>
                If you love ancient history and philosophy, beautiful aesthetic
                neighborhoods, and panoramic views, this tour is for you.
                During the itinerary, I'll be happy to share some of our
                best-kept secrets and answer all your questions and
                curiosities.
              </p>
              <p className="reveal reveal--left" style={{ "--reveal-delay": "0.2s" }}>
                Tips in written form and Google Spots will be provided for your
                next days in Athens — where to eat, what to do, and hidden gem
                places to visit.
              </p>
              <div className="tour__stats">
                <div className="stat reveal" style={{ "--reveal-delay": "0.1s" }}>
                  <div className="stat__value">2:15</div>
                  <div className="stat__label">Hours</div>
                </div>
                <div className="stat reveal" style={{ "--reveal-delay": "0.2s" }}>
                  <div className="stat__value">Free</div>
                  <div className="stat__label">Tip-based</div>
                </div>
                <div className="stat reveal" style={{ "--reveal-delay": "0.3s" }}>
                  <div className="stat__value">0</div>
                  <div className="stat__label">Car Noise</div>
                </div>
              </div>
              <p className="tour__note reveal">
                * Not comfortable for baby strollers.
              </p>
            </div>
            <div className="tour__figure reveal reveal--right">
              <img
                src="/acropolis.jpg"
                alt="The Acropolis of Athens"
                className="tour__img"
              />
              <div className="tour__badge">
                <strong>Ⓐ</strong> Around the Acropolis
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Route timeline */}
      <section id="route" className="section route">
        <div className="section__inner">
          <span className="section__eyebrow reveal">Step By Step</span>
          <h2 className="section__title reveal">The Route</h2>
          <div className="greek-key reveal" />
          <div
            className="route__timeline"
            ref={routeRef}
            style={{ "--route-progress": routeProgress }}
          >
            <div className="route__line">
              <div className="route__line-fill" />
            </div>
            {ROUTE.map((stop, i) => (
              <div
                key={stop.title}
                className={`rstop reveal ${
                  i % 2 ? "rstop--right" : "rstop--left"
                }`}
                style={{ "--reveal-delay": `${(i % 2) * 0.08}s` }}
              >
                <div className="rstop__marker">
                  <span className="rstop__num">{i + 1}</span>
                </div>
                <div className="rstop__card">
                  <span className="rstop__icon">{stop.icon}</span>
                  <h3 className="rstop__title">{stop.title}</h3>
                  <p className="rstop__text">{stop.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section highlights">
        <div className="section__inner">
          <span className="section__eyebrow reveal">Hidden Gems</span>
          <h2 className="section__title reveal">What You&rsquo;ll Discover</h2>
          <div className="greek-key reveal" />
          <div className="highlights__grid">
            {HIGHLIGHTS.map((h, i) => (
              <div
                key={h.title}
                className="hcard reveal reveal--zoom"
                style={{ "--reveal-delay": `${i * 0.12}s` }}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
              >
                <div className="hcard__imgwrap">
                  <img src={h.img} alt={h.title} className="hcard__img" />
                </div>
                <div className="hcard__body">
                  <h3 className="hcard__title">{h.title}</h3>
                  <p className="hcard__text">{h.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why walk with Alex */}
      <section className="section why">
        <div className="section__inner">
          <span className="section__eyebrow reveal">The Difference</span>
          <h2 className="section__title reveal">Why Walk With Alex</h2>
          <div className="greek-key reveal" />
          <div className="why__grid">
            {WHY.map((w, i) => (
              <div
                key={w.title}
                className="wcard reveal"
                style={{ "--reveal-delay": `${i * 0.1}s` }}
              >
                <span className="wcard__icon">{w.icon}</span>
                <h3 className="wcard__title">{w.title}</h3>
                <p className="wcard__text">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="section schedule section--dark">
        <div
          className="schedule__bg"
          style={{ backgroundImage: "url('/acropolis.jpg')" }}
        />
        <div className="section__inner schedule__inner">
          <span className="section__eyebrow reveal">Plan Ahead</span>
          <h2 className="section__title reveal">Schedule — 2025 Period</h2>
          <div className="greek-key reveal" />
          <div className="schedule__grid">
            {SCHEDULE.map((s, i) => (
              <div
                key={s.season}
                className="schedule-card reveal reveal--zoom"
                style={{ "--reveal-delay": `${i * 0.12}s` }}
              >
                <div className="schedule-card__season">{s.season}</div>
                <div className="schedule-card__times">{s.times}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="section booking section--dark">
        <div
          className="booking__bg"
          style={{ backgroundImage: "url('/book.jpg')" }}
        />
        <div className="section__inner">
          <span className="section__eyebrow reveal">Reserve Your Spot</span>
          <h2 className="section__title reveal">Book Your Tour</h2>
          <div className="greek-key reveal" />

          {submitStatus === "success" && (
            <div className="form-status form-status--success">
              Thank you for your booking! We will contact you shortly to
              confirm your tour.
            </div>
          )}
          {submitStatus === "error" && (
            <div className="form-status form-status--error">
              Oops! There was a problem submitting your booking. Please try
              again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="booking-form reveal">
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="date">Preferred Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="time">Preferred Time *</label>
                <select
                  id="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                >
                  <option value="">Select Time</option>
                  {formData.date &&
                    getAvailableTimes(formData.date).map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="participants">Number of Participants *</label>
              <input
                type="number"
                id="participants"
                name="participants"
                min="1"
                required
                value={formData.participants}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label htmlFor="message">Additional Information</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn--gold" disabled={isSubmitting}>
              {isSubmitting && <span className="spinner" />}
              {isSubmitting ? "Submitting..." : "Book Now"}
            </button>
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials">
        <div className="section__inner">
          <span className="section__eyebrow reveal">Reviews</span>
          <h2 className="section__title reveal">What Our Visitors Say</h2>
          <div className="greek-key reveal" />
          <div className="testimonials__grid">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.author}
                className="tcard reveal"
                style={{ "--reveal-delay": `${i * 0.15}s` }}
              >
                <div className="tcard__quote">“</div>
                <p className="tcard__text">{t.text}</p>
                <div className="tcard__author">{t.author}</div>
                <div className="tcard__stars">★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <div className="section__inner faq__inner">
          <span className="section__eyebrow reveal">Good To Know</span>
          <h2 className="section__title reveal">Questions, Answered</h2>
          <div className="greek-key reveal" />
          <div className="faq__list">
            {FAQ.map((item, i) => (
              <details
                key={item.q}
                className="faq-item reveal"
                style={{ "--reveal-delay": `${i * 0.08}s` }}
              >
                <summary className="faq-item__q">
                  {item.q}
                  <span className="faq-item__chevron">▾</span>
                </summary>
                <p className="faq-item__a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section contact">
        <div className="section__inner">
          <span className="section__eyebrow reveal">Get In Touch</span>
          <h2 className="section__title reveal">Contact Us</h2>
          <div className="greek-key reveal" />
          <div className="contact__grid">
            <a
              href="mailto:hidden.gem.walking.tour@gmail.com"
              className="contact-card reveal"
            >
              <span className="contact-card__icon">📧</span>
              <h3>Email</h3>
              <p>hidden.gem.walking.tour@gmail.com</p>
            </a>
            <a
              href="https://g.co/kgs/QMBmsjx"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card reveal"
              style={{ "--reveal-delay": "0.15s" }}
            >
              <span className="contact-card__icon">📍</span>
              <h3>Meeting Point</h3>
              <p>
                ADAMS HOTEL
                <br />
                Thalou 2, Athens 105 58
                <br />
                (There are a few wooden benches in front of ADAMS HOTEL.)
              </p>
            </a>
          </div>
          <div className="map reveal">
            <iframe
              title="Meeting point — Adams Hotel, Thalou 2, Athens"
              className="map__iframe"
              src="https://www.google.com/maps?q=Adams%20Hotel%2C%20Thalou%202%2C%20Athens%20105%2058%2C%20Greece&z=17&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://g.co/kgs/QMBmsjx"
              target="_blank"
              rel="noopener noreferrer"
              className="map__badge"
            >
              📍 We start here — look for the wooden benches. Open in Google
              Maps →
            </a>
          </div>
          <div className="contact__socials reveal">
            <a href="#home" className="social-pill">
              Instagram
            </a>
            <a href="#home" className="social-pill">
              TripAdvisor
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__brand">
          The <em>Hidden Gem</em> Tour
        </div>
        <p>
          © {new Date().getFullYear()} The Hidden Gem Tour. All rights
          reserved.
          <br />
          Tours operate rain or shine. Please arrive 10 minutes before the
          scheduled departure time.
        </p>
      </footer>

      {/* Sticky mobile CTA */}
      <a href="#booking" className="mobile-cta">
        Book Your Free Tour →
      </a>
    </div>
  );
}

export default App;
