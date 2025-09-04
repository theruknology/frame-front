import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Upload, Paperclip, Loader2, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatInterfaceProps {
  campaignId: string;
  contentType: 'video' | 'blog' | 'instagram';
  onContentGenerated: (content: any) => void;
  onGenerationStart: () => void;
}

export default function ChatInterface({ 
  campaignId, 
  contentType, 
  onContentGenerated, 
  onGenerationStart 
}: ChatInterfaceProps) {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedAssets, setUploadedAssets] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const helperPrompts = {
    video: [
      "Create a 30-second product demo video",
      "Generate a tutorial video script",
      "Make an engaging social media video",
      "Create a brand story video"
    ],
    blog: [
      "Write a how-to blog post",
      "Create a thought leadership article",
      "Generate a product announcement post",
      "Write an industry insights article"
    ],
    instagram: [
      "Design a product showcase ad",
      "Create a brand awareness carousel",
      "Make a story ad template",
      "Generate a promotional post"
    ]
  };

  const handleAssetUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    
    const newAssets = Array.from(files);
    setUploadedAssets(prev => [...prev, ...newAssets]);
    
    toast({
      title: "Assets uploaded",
      description: `${newAssets.length} file(s) added to your campaign`
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    onGenerationStart();

    // Simulate different generation times based on content type
    const generationTime = contentType === 'video' ? 6000 : contentType === 'instagram' ? 4000 : 3000;

    try {
      // Simulate content generation
      await new Promise(resolve => setTimeout(resolve, generationTime));

      let generatedContent;
      
      switch (contentType) {
        case 'video':
          generatedContent = {
            type: 'video',
            title: 'Generated Video Content',
            description: `Video generated for: ${prompt}`,
            videoUrl: '/sample-video.mp4', // This would be a real video file
            thumbnail: '/sample-thumbnail.jpg',
            duration: '00:30',
            script: `Here's your video script based on the prompt: "${prompt}"\n\nThis would contain the actual video content, scenes, and dialogue.`
          };
          break;
          
        case 'blog':
          generatedContent = {
            type: 'blog',
            title: 'Generated Blog Post',
            content: `# ${prompt}\n\nThis is a sample blog post generated based on your prompt. In a real implementation, this would contain the full blog content with proper formatting, sections, and engaging copy.\n\n## Introduction\n\nYour introduction would go here...\n\n## Main Content\n\nThe main body of your blog post would be generated here with relevant information and insights.\n\n## Conclusion\n\nA compelling conclusion to wrap up your blog post.`,
            wordCount: 500,
            readTime: '3 min read',
            seoScore: 85
          };
          break;
          
        case 'instagram':
          generatedContent = {
            type: 'instagram',
            title: 'Generated Instagram Ad',
            imageUrl: '/sample-instagram-ad.jpg', // This would be a real generated image
            caption: `✨ ${prompt}\n\n🔥 Discover amazing content that converts!\n💫 Engage your audience like never before\n\n#marketing #content #instagram #socialmedia`,
            hashtags: ['#marketing', '#content', '#instagram', '#socialmedia'],
            dimensions: '1080x1080'
          };
          break;
      }

      onContentGenerated(generatedContent);
      
      toast({
        title: "Content generated!",
        description: `Your ${contentType} content is ready`
      });
      
      setPrompt('');
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again with a different prompt",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const insertHelperPrompt = (helperPrompt: string) => {
    setPrompt(helperPrompt);
  };

  return (
    <Card className="h-full flex flex-col glass">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="capitalize">{contentType} Generation</span>
          <Badge variant="outline" className="text-xs">
            AI Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Helper Prompts */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Lightbulb className="h-4 w-4" />
            <span>Quick suggestions:</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {helperPrompts[contentType].map((helper, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="justify-start text-xs h-8 text-muted-foreground hover:text-foreground"
                onClick={() => insertHelperPrompt(helper)}
              >
                {helper}
              </Button>
            ))}
          </div>
        </div>

        {/* Asset Upload */}
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={handleAssetUpload}
            className="hidden"
          />
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Assets
          </Button>
          
          {uploadedAssets.length > 0 && (
            <div className="text-xs text-muted-foreground">
              {uploadedAssets.length} asset(s) uploaded
            </div>
          )}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-end space-y-4">
          <div className="flex-1">
            <Textarea
              placeholder={`Describe the ${contentType} content you want to create...`}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            
            <Button
              type="submit"
              disabled={!prompt.trim() || isGenerating}
              className="flex-1 btn-hero"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}