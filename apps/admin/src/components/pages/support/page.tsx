"use client";

import {
  AIChatBot,
  ContactForm,
  ContactInfo,
  FAQSection,
} from "@/components/pages/support";

export default function SupportPage() {
  return (
    <>
      {/* Top Grid - FAQ and AI Chatbot */}
      <div className="grid gap-6 lg:grid-cols-2 grid-cols-1">
        {/* FAQ Section */}
        <FAQSection />

        {/* AI Chatbot */}
        <AIChatBot />
      </div>

      {/* Bottom Grid - Contact Form and Info */}
      <div className="grid gap-6 lg:grid-cols-2 grid-cols-1">
        {/* Contact Form */}
        <ContactForm />

        {/* Contact Info */}
        <ContactInfo />
      </div>
    </>
  );
}
