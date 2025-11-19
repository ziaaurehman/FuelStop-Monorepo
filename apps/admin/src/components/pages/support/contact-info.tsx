"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/components";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    text: "+62 465 233 123",
    href: "tel:+62465233123",
  },
  {
    icon: Mail,
    text: "example@gmail.com",
    href: "mailto:example@gmail.com",
  },
  {
    icon: Clock,
    text: "Mon to Fri, 9 AM - 12 PM (GMT)",
    href: null,
  },
  {
    icon: MapPin,
    text: "127 Mercer Street, SoHo, New York, USA",
    href: "https://maps.google.com/?q=127+Mercer+Street+SoHo+New+York+USA",
  },
];

export function ContactInfo() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">Prefer a direct approach?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {contactDetails.map((detail, index) => {
          const Icon = detail.icon;
          const content = (
            <div className="flex items-start gap-4 group">
              <div className="p-2 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-base text-foreground group-hover:text-primary transition-colors pt-2">
                {detail.text}
              </p>
            </div>
          );

          return detail.href ? (
            <a
              key={index}
              href={detail.href}
              target={detail.icon === MapPin ? "_blank" : undefined}
              rel={detail.icon === MapPin ? "noopener noreferrer" : undefined}
              className="block"
            >
              {content}
            </a>
          ) : (
            <div key={index}>{content}</div>
          );
        })}
      </CardContent>
    </Card>
  );
}
