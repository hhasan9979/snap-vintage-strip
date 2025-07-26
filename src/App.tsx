import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoriesGallery } from '@/components/MemoriesGallery';
import { VintagePatterns } from '@/components/VintagePatterns';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="relative">
        <VintagePatterns />
        <MemoriesGallery />
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
