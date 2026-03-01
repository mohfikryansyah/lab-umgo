// components/DataViewToggle.tsx
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type ViewMode = 'grid' | 'table';

interface DataViewToggleProps {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}

export function DataViewToggle({ view, onChange }: DataViewToggleProps) {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-1 rounded-md border bg-muted p-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant={view === 'grid' ? 'default' : 'ghost'}
              className="h-7 w-7 p-0"
              onClick={() => onChange('grid')}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Grid View</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant={view === 'table' ? 'default' : 'ghost'}
              className="h-7 w-7 p-0"
              onClick={() => onChange('table')}
              aria-label="Table view"
            >
              <List className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Table View</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}