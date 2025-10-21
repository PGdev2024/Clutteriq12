import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCurrentUser, signOut, type User } from "@/lib/auth";
import { toast } from "sonner";
import { Mail, HardDrive, MessageSquare, LogOut } from "lucide-react";

const Connect = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [connections, setConnections] = useState({
    gmail: false,
    drive: false,
    slack: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        navigate("/signin");
      } else {
        setUser(currentUser);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    signOut();
    toast.success("Logged out successfully");
    navigate("/signin");
  };

  const handleConnect = (service: "gmail" | "drive" | "slack") => {
    setConnections((prev) => ({ ...prev, [service]: !prev[service] }));
    toast.success(
      connections[service]
        ? `${service.charAt(0).toUpperCase() + service.slice(1)} disconnected`
        : `${service.charAt(0).toUpperCase() + service.slice(1)} connected successfully`
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            ClutterIQ
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, <span className="text-foreground font-medium">{user?.name}</span>
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Connect Your Apps
            </h2>
            <p className="text-lg text-muted-foreground">
              Link your storage services to start organizing with AI
            </p>
          </div>

          {/* Connection Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Gmail Card */}
            <Card className="p-6 backdrop-blur-sm bg-card/80 border-border/50 hover:border-primary/50 transition-all duration-300 animate-fade-in hover:shadow-lg hover:shadow-primary/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Gmail</h3>
                    <p className="text-sm text-muted-foreground">
                      Organize your emails
                    </p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleConnect("gmail")}
                className="w-full"
                variant={connections.gmail ? "secondary" : "default"}
              >
                {connections.gmail ? "✓ Connected" : "Connect Gmail"}
              </Button>
            </Card>

            {/* Google Drive Card */}
            <Card className="p-6 backdrop-blur-sm bg-card/80 border-border/50 hover:border-primary/50 transition-all duration-300 animate-fade-in hover:shadow-lg hover:shadow-primary/10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <HardDrive className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Google Drive</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your files
                    </p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleConnect("drive")}
                className="w-full"
                variant={connections.drive ? "secondary" : "default"}
              >
                {connections.drive ? "✓ Connected" : "Connect Drive"}
              </Button>
            </Card>

            {/* Slack Card */}
            <Card className="p-6 backdrop-blur-sm bg-card/80 border-border/50 hover:border-primary/50 transition-all duration-300 animate-fade-in hover:shadow-lg hover:shadow-primary/10 md:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Slack (Optional)</h3>
                    <p className="text-sm text-muted-foreground">
                      Get notifications and updates
                    </p>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleConnect("slack")}
                className="w-full"
                variant={connections.slack ? "secondary" : "outline"}
              >
                {connections.slack ? "✓ Connected" : "Connect Slack"}
              </Button>
            </Card>
          </div>

          {/* Info Card */}
          <Card className="mt-8 p-6 backdrop-blur-sm bg-primary/5 border-primary/20">
            <p className="text-sm text-muted-foreground text-center">
              Your connections are secure and encrypted. You can disconnect at any time.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Connect;
