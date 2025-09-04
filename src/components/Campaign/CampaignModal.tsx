import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface CampaignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCampaignCreated: (campaignId: string, campaignType: string) => void;
}

export default function CampaignModal({ open, onOpenChange, onCampaignCreated }: CampaignModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [campaignType, setCampaignType] = useState('');
  const [marketingTargets, setMarketingTargets] = useState('');
  const [uploading, setUploading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newFiles = Array.from(files);
    setUploadedFiles(prev => [...prev, ...newFiles]);
    setUploading(false);
    
    toast({
      title: "Files uploaded",
      description: `${newFiles.length} file(s) added successfully`
    });
  };

  const handleCreateCampaign = async () => {
    if (!user || !title || !campaignType) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setCreating(true);

    try {
      // Upload files to storage if any
      let mediaFiles: any[] = [];
      
      if (uploadedFiles.length > 0) {
        for (const file of uploadedFiles) {
          const fileName = `${user.id}/${Date.now()}-${file.name}`;
          const { data, error } = await supabase.storage
            .from('campaign-assets')
            .upload(fileName, file);
          
          if (error) throw error;
          
          mediaFiles.push({
            name: file.name,
            path: data.path,
            type: file.type,
            size: file.size
          });
        }
      }

      // Create campaign in database
      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          user_id: user.id,
          title,
          description,
          campaign_type: campaignType,
          marketing_targets: marketingTargets,
          media_files: mediaFiles
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Campaign created!",
        description: "Your campaign has been created successfully"
      });

      onCampaignCreated(data.id, campaignType);
      
      // Reset form
      setTitle('');
      setDescription('');
      setCampaignType('');
      setMarketingTargets('');
      setUploadedFiles([]);
      onOpenChange(false);
      
    } catch (error: any) {
      toast({
        title: "Error creating campaign",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] glass">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient">Create New Campaign</DialogTitle>
          <DialogDescription>
            Set up your content creation campaign with all the details and assets you need.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Campaign Title *</Label>
            <Input
              id="title"
              placeholder="Enter campaign title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your campaign goals and requirements"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="campaign-type">Campaign Type *</Label>
            <Select value={campaignType} onValueChange={setCampaignType}>
              <SelectTrigger>
                <SelectValue placeholder="Select campaign type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="video">Video Campaign</SelectItem>
                <SelectItem value="blog">Blog Post</SelectItem>
                <SelectItem value="instagram">Instagram Ad</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="targets">Marketing Audience (Optional)</Label>
            <Input
              id="targets"
              placeholder="e.g., Tech professionals, age 25-40"
              value={marketingTargets}
              onChange={(e) => setMarketingTargets(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="media">Upload Assets (Optional)</Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
              <input
                type="file"
                id="media"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mov"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
              <label
                htmlFor="media"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                {uploading ? (
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                ) : (
                  <Upload className="h-8 w-8 text-muted-foreground" />
                )}
                <span className="text-sm text-muted-foreground">
                  Click to upload PDFs, images, or videos
                </span>
              </label>
              
              {uploadedFiles.length > 0 && (
                <div className="mt-4 text-left">
                  <p className="text-sm font-medium mb-2">Uploaded files:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span>{file.name}</span>
                        <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreateCampaign} 
            disabled={creating || !title || !campaignType}
            className="btn-hero"
          >
            {creating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Campaign'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}