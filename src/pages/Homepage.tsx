import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Video, FileText, Instagram, Plus, Sparkles, Zap, Target, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import CampaignModal from '@/components/Campaign/CampaignModal';
import CampaignDashboard from '@/components/Campaign/CampaignDashboard';

export default function Homepage() {
  const { user, loading, signOut } = useAuth();
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<{ id: string; type: string } | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto bg-primary rounded-full animate-pulse" />
          <p className="text-muted-foreground">Loading Framestorm...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (currentCampaign) {
    return (
      <CampaignDashboard
        campaignId={currentCampaign.id}
        campaignType={currentCampaign.type}
        onBack={() => setCurrentCampaign(null)}
      />
    );
  }

  const handleCampaignCreated = (campaignId: string, campaignType: string) => {
    setCurrentCampaign({ id: campaignId, type: campaignType });
  };

  const handleNewCampaignClick = () => {
    setShowCampaignModal(true);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gradient">Framestorm</h1>
              <Badge variant="outline" className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Welcome, <span className="font-medium text-foreground">{user.email}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-gradient">
              Create Amazing Content with AI
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your ideas into engaging videos, compelling blog posts, and stunning Instagram ads. 
              All powered by cutting-edge AI technology.
            </p>
          </div>

          <Button 
            onClick={handleNewCampaignClick}
            size="lg"
            className="btn-hero text-lg px-8 py-6 shadow-glow"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create New Campaign
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">What You Can Create</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from multiple content types and let our AI help you create professional-quality content in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Video Campaigns */}
          <Card className="glass shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-video/20 rounded-lg">
                  <Video className="h-6 w-6 text-video" />
                </div>
                <CardTitle>Video Campaigns</CardTitle>
              </div>
              <CardDescription>
                Create engaging video content with AI-generated scripts, scenes, and production guidance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-video" />
                  <span>Auto-generated scripts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-video" />
                  <span>Scene-by-scene direction</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-video" />
                  <span>Multiple formats & durations</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Blog Posts */}
          <Card className="glass shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blog/20 rounded-lg">
                  <FileText className="h-6 w-6 text-blog" />
                </div>
                <CardTitle>Blog Posts</CardTitle>
              </div>
              <CardDescription>
                Generate well-structured, SEO-optimized blog content for your website or LinkedIn.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-blog" />
                  <span>SEO-optimized content</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-blog" />
                  <span>Audience targeting</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-blog" />
                  <span>Multiple formats & styles</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Instagram Ads */}
          <Card className="glass shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-instagram/20 rounded-lg">
                  <Instagram className="h-6 w-6 text-instagram" />
                </div>
                <CardTitle>Instagram Ads</CardTitle>
              </div>
              <CardDescription>
                Design eye-catching Instagram ads with AI-generated visuals and compelling copy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-instagram" />
                  <span>AI-generated visuals</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-instagram" />
                  <span>Conversion-focused copy</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-instagram" />
                  <span>Multiple ad formats</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">Ready to Transform Your Content Strategy?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of creators and marketers who are already using Framestorm to create amazing content.
            </p>
          </div>

          <Button 
            onClick={handleNewCampaignClick}
            size="lg"
            className="btn-hero text-lg px-8 py-6"
          >
            <Plus className="mr-2 h-5 w-5" />
            Start Your First Campaign
          </Button>
        </div>
      </section>

      <CampaignModal
        open={showCampaignModal}
        onOpenChange={setShowCampaignModal}
        onCampaignCreated={handleCampaignCreated}
      />
    </div>
  );
}