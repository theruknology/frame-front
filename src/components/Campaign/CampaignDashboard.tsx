import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, FileText, Instagram, ArrowLeft, Upload as UploadIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import ChatInterface from './ChatInterface';
import ContentDisplay from './ContentDisplay';
import SocialConnectModal from './SocialConnectModal';

interface Campaign {
  id: string;
  title: string;
  description: string;
  campaign_type: string;
  created_at: string;
}

interface CampaignDashboardProps {
  campaignId?: string;
  campaignType?: string;
  onBack: () => void;
}

export default function CampaignDashboard({ campaignId, campaignType, onBack }: CampaignDashboardProps) {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  const [activeTab, setActiveTab] = useState(campaignType || 'video');
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [socialModalOpen, setSocialModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');

  useEffect(() => {
    if (user) {
      loadCampaigns();
    }
  }, [user]);

  useEffect(() => {
    if (campaignId && campaigns.length > 0) {
      const campaign = campaigns.find(c => c.id === campaignId);
      if (campaign) {
        setActiveCampaign(campaign);
        setActiveTab(campaign.campaign_type);
      }
    }
  }, [campaignId, campaigns]);

  const loadCampaigns = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setCampaigns(data);
      if (!activeCampaign && data.length > 0) {
        setActiveCampaign(data[0]);
        setActiveTab(data[0].campaign_type);
      }
    }
  };

  const handleContentGenerated = (content: any) => {
    setGeneratedContent(content);
    setIsGenerating(false);
  };

  const handleGenerationStart = () => {
    setIsGenerating(true);
    setGeneratedContent(null);
  };

  const handleUploadToSocial = (platform: string) => {
    setSelectedPlatform(platform);
    setSocialModalOpen(true);
  };

  const getTabIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'blog':
        return <FileText className="h-4 w-4" />;
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTabBadgeClass = (type: string) => {
    switch (type) {
      case 'video':
        return 'badge-video';
      case 'blog':
        return 'badge-blog';
      case 'instagram':
        return 'badge-instagram';
      default:
        return '';
    }
  };

  if (!activeCampaign) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md glass">
          <CardHeader>
            <CardTitle>No Campaigns</CardTitle>
            <CardDescription>
              Create your first campaign to get started with content generation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onBack} className="w-full btn-hero">
              Create New Campaign
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{activeCampaign.title}</h1>
                <p className="text-muted-foreground">{activeCampaign.description}</p>
              </div>
            </div>
            <Badge className={getTabBadgeClass(activeCampaign.campaign_type)}>
              {getTabIcon(activeCampaign.campaign_type)}
              <span className="ml-1 capitalize">{activeCampaign.campaign_type}</span>
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="video" className="flex items-center space-x-2">
              <Video className="h-4 w-4" />
              <span>Video Campaign</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Blog Posts</span>
            </TabsTrigger>
            <TabsTrigger value="instagram" className="flex items-center space-x-2">
              <Instagram className="h-4 w-4" />
              <span>Instagram Ads</span>
            </TabsTrigger>
          </TabsList>

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-240px)]">
            {/* Content Display - Left Side */}
            <div className="lg:col-span-2">
              <ContentDisplay
                contentType={activeTab}
                content={generatedContent}
                isGenerating={isGenerating}
                onUploadToSocial={handleUploadToSocial}
              />
            </div>

            {/* Chat Interface - Right Side */}
            <div className="lg:col-span-1">
              <TabsContent value="video" className="h-full">
                <ChatInterface
                  campaignId={activeCampaign.id}
                  contentType="video"
                  onContentGenerated={handleContentGenerated}
                  onGenerationStart={handleGenerationStart}
                />
              </TabsContent>
              
              <TabsContent value="blog" className="h-full">
                <ChatInterface
                  campaignId={activeCampaign.id}
                  contentType="blog"
                  onContentGenerated={handleContentGenerated}
                  onGenerationStart={handleGenerationStart}
                />
              </TabsContent>
              
              <TabsContent value="instagram" className="h-full">
                <ChatInterface
                  campaignId={activeCampaign.id}
                  contentType="instagram"
                  onContentGenerated={handleContentGenerated}
                  onGenerationStart={handleGenerationStart}
                />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>

      <SocialConnectModal
        open={socialModalOpen}
        onOpenChange={setSocialModalOpen}
        platform={selectedPlatform}
      />
    </div>
  );
}