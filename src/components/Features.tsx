import { Database, FileSearch, Slack, TrendingUp } from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Smart Audit",
    description: "Automatically scan Gmail and Google Drive to identify large files, duplicates, and storage hogs.",
  },
  {
    icon: TrendingUp,
    title: "Usage Analytics",
    description: "Get detailed insights into storage patterns, growth trends, and optimization opportunities.",
  },
  {
    icon: Database,
    title: "Intelligent Cleanup",
    description: "AI-powered recommendations for archiving, deleting, or compressing files based on usage patterns.",
  },
  {
    icon: Slack,
    title: "Slack Integration",
    description: "Review and approve retention actions directly in Slack with one-click approval workflows.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Intelligent Storage Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powered by AI to keep your digital workspace clean and efficient
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
