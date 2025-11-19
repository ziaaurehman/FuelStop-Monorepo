"use client";

import { AppHeader, HeaderActions } from "@/components";
import {
  AIChatBot,
  ContactForm,
  ContactInfo,
  FAQSection,
} from "@/components/pages/support";

const Page = () => {
  return (
    <>
      <AppHeader headerActions={<HeaderActions />} />
      <div className="md:p-8 p-4 space-y-8">
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
      </div>
    </>
  );
};
export default Page;
