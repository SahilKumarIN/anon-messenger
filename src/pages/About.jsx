import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4 sm:px-6 md:px-10 lg:px-20 py-10">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl p-6 sm:p-10 md:p-12 lg:p-16">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          About Anon-Messenger
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed text-center md:text-left">
          Welcome to <span className="font-bold">Anon-Messenger</span> – a safe
          space for anonymous communication. Whether you want to create a
          private room for open discussions, share a secure link for feedback,
          or communicate without revealing your identity, Anon-Messenger makes
          it easy and secure. Users can sign up, create rooms, and share the
          link with anyone. The person with the link can post messages without
          fear of tracking or identification.
        </p>

        {/* How It Works */}
        <div className="mt-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center md:text-left">
            How It Works
          </h2>
          <ul className="list-disc list-inside space-y-3 text-sm sm:text-base md:text-lg text-gray-600">
            <li>
              <span className="font-bold">Sign Up:</span> Create an account to
              start using the platform.
            </li>
            <li>
              <span className="font-bold">Create a Room:</span> Once logged in,
              you can create a room and receive a unique link.
            </li>
            <li>
              <span className="font-bold">Share the Link:</span> Share the link
              with anyone you want to communicate with. They can send messages
              anonymously.
            </li>
            <li>
              <span className="font-bold">Privacy & Anonymity:</span> All
              messages sent through Anon-Messenger are anonymous and secure.
            </li>
          </ul>
        </div>

        {/* Privacy Section */}
        <div className="mt-10 text-center md:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Your Privacy Matters
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            At Anon-Messenger, your privacy and security are our top priorities.
            We ensure that your identity remains confidential and that all
            messages sent are not traceable back to the sender.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm sm:text-base px-6 py-2 sm:py-3 rounded-lg transition transform hover:scale-105 shadow-md">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
