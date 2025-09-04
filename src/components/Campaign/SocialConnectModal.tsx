import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Youtube, Instagram, Linkedin, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface SocialConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platform: string;
}

export default function SocialConnectModal({ open, onOpenChange, platform }: SocialConnectModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [username, setUsername] = useState('');
  const [accountId, setAccountId] = useState('');
  const [loading, setLoading] = useState(false);
  const [existingAccount, setExistingAccount] = useState<any>(null);
  const [uploadingContent, setUploadingContent] = useState(false);

  useEffect(() => {
    if (open && platform && user) {
      loadExistingAccount();
    }
  }, [open, platform, user]);

  const loadExistingAccount = async () => {
    if (!user || !platform) return;

    const { data, error } = await supabase
      .from('social_accounts')
      .select('*')
      .eq('user_id', user.id)
      .eq('platform', platform)
      .single();

    if (data) {
      setExistingAccount(data);
      setUsername(data.username);
      setAccountId(data.account_id || '');
    } else {
      setExistingAccount(null);
      setUsername('');
      setAccountId('');
    }
  };

  const getPlatformIcon = () => {
    switch (platform) {
      case 'youtube':
        return <Youtube className="h-5 w-5 text-red-600" />;
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-600" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5 text-blue-600" />;
      default:
        return null;
    }
  };

  const getPlatformColor = () => {
    switch (platform) {
      case 'youtube':
        return 'text-red-600';
      case 'instagram':
        return 'text-pink-600';
      case 'linkedin':
        return 'text-blue-600';
      default:
        return 'text-primary';
    }
  };

  const handleSaveAccount = async () => {
    if (!user || !username.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your username",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const accountData = {
        user_id: user.id,
        platform,
        username: username.trim(),
        account_id: accountId.trim() || null,
        is_connected: false // Mock connection - would be true if actually authenticated
      };

      if (existingAccount) {
        const { error } = await supabase
          .from('social_accounts')
          .update(accountData)
          .eq('id', existingAccount.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('social_accounts')
          .insert(accountData);

        if (error) throw error;
      }

      toast({
        title: "Account saved",
        description: `Your ${platform} account details have been saved`
      });

      await loadExistingAccount();
    } catch (error: any) {
      toast({
        title: "Error saving account",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUploadContent = async () => {
    if (!existingAccount) {
      toast({
        title: "No account configured",
        description: `Please add your ${platform} account details first`,
        variant: "destructive"
      });
      return;
    }

    setUploadingContent(true);

    // Simulate upload attempt
    setTimeout(() => {
      setUploadingContent(false);
      toast({
        title: "Authentication Pending",
        description: `Authentication pending for ${existingAccount.username}. Please complete the OAuth flow to enable content uploads.`,
        variant: "destructive"
      });
    }, 2000);
  };

  const getPlaceholderText = () => {
    switch (platform) {
      case 'youtube':
        return 'your-channel-name';
      case 'instagram':
        return 'your.username';
      case 'linkedin':
        return 'your-profile-name';
      default:
        return 'username';
    }
  };

  const getAccountIdLabel = () => {
    switch (platform) {
      case 'youtube':
        return 'Channel ID (Optional)';
      case 'instagram':
        return 'Account ID (Optional)';
      case 'linkedin':
        return 'Profile ID (Optional)';
      default:
        return 'Account ID (Optional)';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] glass">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getPlatformIcon()}
            <span className="capitalize">{platform} Integration</span>
          </DialogTitle>
          <DialogDescription>
            Connect your {platform} account to upload content directly from Framestorm.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {existingAccount && (
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  {getPlatformIcon()}
                  <span className="font-medium">@{existingAccount.username}</span>
                </div>
              </div>
              <Badge variant={existingAccount.is_connected ? "default" : "secondary"}>
                {existingAccount.is_connected ? (
                  <>
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Connected
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Not Connected
                  </>
                )}
              </Badge>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="username">Username *</Label>
            <Input
              id="username"
              placeholder={getPlaceholderText()}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="account-id">{getAccountIdLabel()}</Label>
            <Input
              id="account-id"
              placeholder="Leave empty if unsure"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className="w-full"
            />
          </div>

          {!existingAccount?.is_connected && (
            <div className="flex items-start space-x-2 p-3 bg-muted/50 rounded-lg">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Authentication Required</p>
                <p>
                  To enable content uploads, you'll need to complete OAuth authentication with {platform}. 
                  This feature is currently in development.
                </p>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Cancel
          </Button>
          
          <div className="flex space-x-2 w-full sm:w-auto">
            <Button
              onClick={handleSaveAccount}
              disabled={loading || !username.trim()}
              variant="outline"
              className="flex-1 sm:flex-none"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Account'
              )}
            </Button>
            
            <Button
              onClick={handleUploadContent}
              disabled={uploadingContent || !existingAccount}
              className="flex-1 sm:flex-none btn-hero"
            >
              {uploadingContent ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload Content'
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}