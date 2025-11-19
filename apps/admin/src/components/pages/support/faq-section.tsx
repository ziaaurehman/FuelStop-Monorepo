"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/components";


const faqs = [
  {
    question: "How is fuel usage calculated?",
    answer:
      "Fuel usage is calculated based on distance traveled, fuel tank data, and telematics inputs from the vehicle tracking system.",
  },
  {
    question: "How can I track fuel efficiency?",
    answer:
      "You can track fuel efficiency through the dashboard analytics page, which shows real-time consumption data, historical trends, and efficiency metrics per vehicle or fleet.",
  },
  {
    question: "How do I export fuel reports?",
    answer:
      "Navigate to the Reports section, select your desired date range and filters, then click the 'Export' button to download reports in CSV or PDF format.",
  },
  {
    question: "Can I set fuel budget limits?",
    answer:
      "Yes, you can set monthly or annual fuel budget limits in the Settings page. The system will notify you when approaching or exceeding these limits.",
  },
  {
    question: "How to detect abnormal fuel usage?",
    answer:
      "The system automatically flags abnormal usage based on historical averages and sends real-time alerts. You can view these alerts in the Efficiency & Emission Insights section.",
  },
  {
    question: "How to assign fuel cards to drivers?",
    answer:
      "Go to the Drivers section, select a driver, and use the 'Assign Fuel Card' option. You can also manage card limits and restrictions from this interface.",
  },
  {
    question: "How can I track fuel cost per trip?",
    answer:
      "Each trip in the Orders section includes detailed cost breakdowns. You can also generate cost-per-trip reports from the Analytics dashboard with custom date ranges.",
  },
];

export function FAQSection() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
