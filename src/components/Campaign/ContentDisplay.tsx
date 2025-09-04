import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Pause, 
  Download, 
  Share2, 
  Clock, 
  Eye, 
  FileText, 
  Image as ImageIcon,
  Youtube,
  Instagram,
  Linkedin,
  Loader2,
  Sparkles,
  Video as VideoIcon,
  Hash
} from 'lucide-react';

interface ContentDisplayProps {
  contentType: string;
  content: any;
  isGenerating: boolean;
  onUploadToSocial: (platform: string) => void;
}

export default function ContentDisplay({ 
  contentType, 
  content, 
  isGenerating, 
  onUploadToSocial 
}: ContentDisplayProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const renderVideoContent = () => (
    <div className="space-y-6">
      {/* Video Player */}
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
        {content ? (
          <video
            src="/reel.mp4"
            controls
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-white">
              <VideoIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">Video Content</p>
              <p className="text-xs opacity-90 text-muted-foreground">Click Generate to Start</p>
            </div>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{content?.title || 'Sample Video Title'}</h3>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{content?.duration || '0:30'}</span>
          </Badge>
        </div>
        
        <p className="text-muted-foreground">
          {content?.description || 'This is a sample video description showing how your generated content will appear.'}
        </p>

        {content?.script && (
          <div className="space-y-2">
            <h4 className="font-medium flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Video Script</span>
            </h4>
            <div className="bg-muted p-4 rounded-lg text-sm whitespace-pre-wrap">
              {content.script}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderBlogContent = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">{content?.title || 'Sample Blog Post Title'}</h3>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Badge variant="outline">{content?.readTime || '3 min read'}</Badge>
            <Badge variant="outline">{content?.wordCount || 500} words</Badge>
            {content?.seoScore && (
              <Badge variant="outline" className="text-green-600">
                SEO: {content.seoScore}%
              </Badge>
            )}
          </div>
        </div>

        <div className="prose prose-sm max-w-none dark:prose-invert">
          {content?.content ? (
            <div dangerouslySetInnerHTML={{ __html: content.content.replace(/\n/g, '<br/>') }} />
          ) : (
            <>
              <h1>Sample Blog Post Title</h1>
              <p>This is a sample blog post content that demonstrates how your generated blog post will appear. The AI will create engaging, well-structured content based on your prompts.</p>
              <h2>Introduction</h2>
              <p>Your blog post introduction will be crafted to hook readers and provide value from the very first paragraph.</p>
              <h2>Main Content</h2>
              <p>The main body will contain detailed, informative content that addresses your topic comprehensively.</p>
              <h2>Conclusion</h2>
              <p>A compelling conclusion that wraps up your points and provides clear next steps for readers.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderInstagramContent = () => (
    <div className="space-y-6">
      {/* Instagram Post Preview */}
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Post Header */}
          <div className="flex items-center p-3 bg-white">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">F</span>
            </div>
            <div className="ml-3 flex-1">
              <div className="font-semibold text-gray-900 text-sm">framestorm_official</div>
            </div>
          </div>

          {/* Post Image */}
          <div className="aspect-square bg-muted">
            {content ? (
              <img 
                src="/samplegen.png" 
                alt="Sample Instagram Ad"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
                <div className="text-center text-white">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-sm font-medium">Instagram Ad</p>
                  <p className="text-xs opacity-90">Click Generate to Start</p>
                </div>
              </div>
            )}
          </div>

          {/* Post Content */}
          <div className="p-3 bg-white">
            <div className="text-gray-900 text-sm">
              {content?.caption || (
                <>
                  <span className="font-semibold">framestorm_official</span> ✨ Create amazing content with AI
                  <br /><br />
                  🔥 Discover the power of automated content creation
                  <br />
                  💫 Engage your audience like never before
                  <br /><br />
                  #marketing #content #instagram #ai #socialmedia
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Post Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{content?.title || 'Sample Instagram Ad'}</h3>
          <Badge variant="outline">{content?.dimensions || '1080x1080'}</Badge>
        </div>

        {content?.hashtags && (
          <div className="space-y-2">
            <h4 className="font-medium flex items-center space-x-2">
              <Hash className="h-4 w-4" />
              <span>Hashtags</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {content.hashtags.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderLoadingState = () => (
    <div className="h-full flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-20 h-20 mx-auto">
            {contentType === 'video' && <VideoIcon className="w-20 h-20 text-video animate-pulse" />}
            {contentType === 'blog' && <FileText className="w-20 h-20 text-blog animate-pulse" />}
            {contentType === 'instagram' && <ImageIcon className="w-20 h-20 text-instagram animate-pulse" />}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Generating {contentType} content...</h3>
          <p className="text-muted-foreground text-sm">
            This may take a few moments. Please wait while we create your amazing content.
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-primary">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm">AI is working its magic</span>
          <Sparkles className="h-4 w-4" />
        </div>
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="h-full flex items-center justify-center">
      <div className="text-center space-y-4 max-w-md">
        <div className="w-20 h-20 mx-auto">
          {contentType === 'video' && <VideoIcon className="w-20 h-20 text-muted-foreground/50" />}
          {contentType === 'blog' && <FileText className="w-20 h-20 text-muted-foreground/50" />}
          {contentType === 'instagram' && <ImageIcon className="w-20 h-20 text-muted-foreground/50" />}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Ready to create {contentType} content</h3>
          <p className="text-muted-foreground text-sm">
            Use the chat interface to describe what you want to create, and our AI will generate amazing content for you.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="h-full glass">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="capitalize">{contentType} Content</span>
          {content && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1">
        {isGenerating ? renderLoadingState() : 
         content ? (
           <div className="space-y-6">
             {contentType === 'video' && renderVideoContent()}
             {contentType === 'blog' && renderBlogContent()}
             {contentType === 'instagram' && renderInstagramContent()}
             
             {/* Upload to Social Platforms */}
             <Separator />
             <div className="space-y-3">
               <h4 className="font-medium">Upload to social platforms</h4>
               <div className="flex flex-wrap gap-2">
                 <Button
                   variant="outline"
                   size="sm"
                   onClick={() => onUploadToSocial('youtube')}
                   className="flex items-center space-x-2"
                 >
                   <Youtube className="h-4 w-4 text-red-600" />
                   <span>YouTube</span>
                 </Button>
                 
                 <Button
                   variant="outline"
                   size="sm"
                   onClick={() => onUploadToSocial('instagram')}
                   className="flex items-center space-x-2"
                 >
                   <Instagram className="h-4 w-4 text-pink-600" />
                   <span>Instagram</span>
                 </Button>
                 
                 <Button
                   variant="outline"
                   size="sm"
                   onClick={() => onUploadToSocial('linkedin')}
                   className="flex items-center space-x-2"
                 >
                   <Linkedin className="h-4 w-4 text-blue-600" />
                   <span>LinkedIn</span>
                 </Button>
               </div>
             </div>
           </div>
         ) : 
         renderEmptyState()}
      </CardContent>
    </Card>
  );
}