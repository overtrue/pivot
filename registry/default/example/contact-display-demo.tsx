import { ContactDisplay } from "@/registry/default/ui/contact-display";

export default function ContactDisplayDemo() {
  const contact = {
    name: "API Support Team",
    email: "support@example.com",
    url: "https://example.com/support",
  };

  return (
    <div className="space-y-4 min-w-md">
      <ContactDisplay contact={contact} />
    </div>
  );
}
