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

export function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);
  const [showIOSDialog, setShowIOSDialog] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed (reactive check)
    const checkStandalone = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches;
      setIsStandalone(standalone);
      return standalone;
    };

    if (checkStandalone()) {
      setShowButton(false);
      return;
    }

    // Detect iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOSDevice(ios);

    // Show button on iOS immediately (they need instructions)
    if (ios) {
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

    // Also show button on mobile Android even if event hasn't fired yet
    // (the browser might show its own prompt, but we'll show instructions)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile && !ios) {
      // Show button after a short delay to allow beforeinstallprompt to fire first
      const timeout = setTimeout(() => {
        if (!deferredPrompt) {
          setShowButton(true);
        }
      }, 2000);
      return () => {
        clearTimeout(timeout);
        window.removeEventListener('beforeinstallprompt', handler);
      };
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [deferredPrompt]);

  const handleInstall = async () => {
    // iOS - show instructions
    if (isIOSDevice) {
      setShowIOSDialog(true);
      return;
    }

    // Android/Chrome - use deferred prompt if available
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
      setShowButton(false);
    } else {
      // Fallback: show instructions for Android
      setShowIOSDialog(true);
    }
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
              {isIOSDevice 
                ? "Follow these steps to add the app to your home screen:"
                : "Follow these steps to install the app on your device:"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {isIOSDevice ? (
              <>
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
              </>
            ) : (
              <>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Look for the install prompt</p>
                    <p className="text-sm text-muted-foreground">
                      Chrome may show an install banner at the top or bottom of the screen
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Or use the browser menu</p>
                    <p className="text-sm text-muted-foreground">
                      Tap the three dots menu → "Install app" or "Add to Home screen"
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

