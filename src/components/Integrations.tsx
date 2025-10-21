import { Mail, HardDrive, MessageSquare } from "lucide-react";

const integrations = [
  {
    icon: Mail,
    name: "Gmail",
    description: "Deep integration with Gmail to analyze attachments and storage usage",
  },
  {
    icon: HardDrive,
    name: "Google Drive",
    description: "Comprehensive Drive scanning for duplicates and large files",
  },
  {
    icon: MessageSquare,
    name: "Slack",
    description: "Seamless approval workflows through Slack notifications",
  },
];

const Integrations = () => {
  return (
    <section id="integrations" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Seamless Integrations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with the tools you already use every day
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border hover:border-primary transition-all duration-300"
            >
              <div className="inline-flex p-4 rounded-full bg-primary/20 mb-4">
                <integration.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{integration.name}</h3>
              <p className="text-muted-foreground">{integration.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Integrations;
