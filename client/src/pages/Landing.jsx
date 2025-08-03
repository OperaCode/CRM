import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaTasks, FaChartLine, FaChevronDown, FaChevronUp } from "react-icons/fa";

const Landing = () => {
  const features = [
    {
      icon: <FaUsers className="text-4xl text-blue-600 mb-3" />,
      title: "Contact Management",
      description: "Add, edit, and organize all your customer data in one place.",
    },
    {
      icon: <FaTasks className="text-4xl text-blue-600 mb-3" />,
      title: "Task Tracking",
      description: "Assign and manage follow-up tasks to never miss an opportunity.",
    },
    {
      icon: <FaChartLine className="text-4xl text-blue-600 mb-3" />,
      title: "Simple Dashboard",
      description: "Get a quick overview of your CRM activities.",
    },
  ];

  const faqs = [
    {
      question: "Do I need to create an account to use the app?",
      answer: "No sign-up is required. Just launch the app and start managing your CRM data locally.",
    },
    {
      question: "Is my data saved permanently?",
      answer: "Yes, your data is stored locally in your browser using Local Storage. It persists unless manually cleared.",
    },
    {
      question: "Can I assign tasks to contacts?",
      answer: "Yes, the task manager lets you create and assign follow-ups to existing contacts easily.",
    },
    {
      question: "Is CoreCRM mobile-friendly?",
      answer: "Absolutely! The interface is responsive and works well on mobile, tablet, and desktop devices.",
    },
  ];

  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Header/Nav */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-blue-600">
            CoreCRM
          </Link>
          <nav className="hidden md:flex gap-6 items-center">
            <a href="#top" className="text-gray-700 hover:text-blue-600">Home</a>
            <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600">FAQ</a>
          </nav>
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition md:inline-block hidden"
          >
            Launch App
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section id="top" className="bg-blue-50 text-center py-24 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          CoreCRM for Growing Teams
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Manage your contacts, track tasks, and grow your customer base with ease.
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-100 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why CoreCRM?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg text-center transition"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-white py-20 px-6 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left text-lg font-medium text-gray-800 hover:text-blue-600 transition"
                >
                  {faq.question}
                  {openFAQ === index ? (
                    <FaChevronUp className="text-blue-600" />
                  ) : (
                    <FaChevronDown className="text-blue-600" />
                  )}
                </button>
                {openFAQ === index && (
                  <p className="mt-3 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Ready to streamline your workflow?</h2>
        <p className="mb-6 text-lg">
          Start managing your customers in seconds – no sign-up required.
        </p>
        <Link
          to="/dashboard"
          className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
        >
          Launch App
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 text-sm">
        <p>© {new Date().getFullYear()} CoreCRM. Built for simplicity.</p>
      </footer>
    </div>
  );
};

export default Landing;
