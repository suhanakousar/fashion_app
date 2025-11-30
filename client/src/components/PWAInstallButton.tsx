import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Share2, Plus } from "lucide-react";

// Detect iOS
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

export function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);
  const [showIOSDialog, setShowIOSDialog] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);

  useEffect(() => {
    // Don't show if already installed
    if (isStandalone) {
      setShowButton(false);
      return;
    }

    // Check if iOS
    if (isIOS) {
      setIsIOSDevice(true);
      // Show button on iOS (they need instructions)
      setShowButton(true);
      return;
    }

    // For Android/Chrome - listen for beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    // iOS - show instructions
    if (isIOSDevice) {
      setShowIOSDialog(true);
      return;
    }

    // Android/Chrome - use deferred prompt
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowButton(false);
  };

  if (!showButton) return null;

  return (
    <>
      <Button
        onClick={handleInstall}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        {isIOSDevice ? (
          <>
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Install App</span>
            <span className="sm:hidden">Install</span>
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Install App</span>
            <span className="sm:hidden">Install</span>
          </>
        )}
      </Button>

      <Dialog open={showIOSDialog} onOpenChange={setShowIOSDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Install Rajiya Fashion App</DialogTitle>
            <DialogDescription>
              Follow these steps to add the app to your home screen:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">1</span>
              </div>
              <div>
                <p className="font-medium">Tap the Share button</p>
                <p className="text-sm text-muted-foreground">
                  Look for the <Share2 className="h-4 w-4 inline" /> icon at the bottom of your Safari browser
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">2</span>
              </div>
              <div>
                <p className="font-medium">Select "Add to Home Screen"</p>
                <p className="text-sm text-muted-foreground">
                  Scroll down in the share menu and tap <Plus className="h-4 w-4 inline" /> "Add to Home Screen"
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">3</span>
              </div>
              <div>
                <p className="font-medium">Confirm installation</p>
                <p className="text-sm text-muted-foreground">
                  Tap "Add" in the top right corner
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

