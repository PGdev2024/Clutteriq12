import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Book, Zap, Shield, Settings } from "lucide-react";

const docSections = [
  {
    icon: Book,
    title: "Getting Started",
    description: "Learn how to set up Clutter IQ and connect your Gmail and Drive accounts.",
    topics: [
      "Initial Setup",
      "Connecting Gmail",
      "Connecting Google Drive",
      "First Audit",
    ],
  },
  {
    icon: Zap,
    title: "Features",
    description: "Explore all the powerful features Clutter IQ has to offer.",
    topics: [
      "Smart Auditing",
      "Usage Analytics",
      "AI Recommendations",
      "Slack Integration",
    ],
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Understanding how we protect your data and maintain privacy.",
    topics: [
      "Data Encryption",
      "OAuth Security",
      "Data Retention",
      "Compliance",
    ],
  },
  {
    icon: Settings,
    title: "Configuration",
    description: "Customize Clutter IQ to match your workflow and preferences.",
    topics: [
      "Retention Policies",
      "Notification Settings",
      "Team Management",
      "API Integration",
    ],
  },
];

const Docs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">Documentation</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about using Clutter IQ
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {docSections.map((section, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <section.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                    <p className="text-muted-foreground">{section.description}</p>
                  </div>
                </div>
                
                <ul className="space-y-2 mt-6">
                  {section.topics.map((topic, topicIndex) => (
                    <li key={topicIndex}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        {topic}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block p-8 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border">
              <h3 className="text-2xl font-bold mb-2">Need more help?</h3>
              <p className="text-muted-foreground mb-4">
                Our support team is here to assist you
              </p>
              <a
                href="mailto:support@clutteriq.com"
                className="text-primary hover:underline font-medium"
              >
                Contact Support →
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Docs;
