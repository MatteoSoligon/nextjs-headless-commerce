'use client';
import { selectedFiltersAtom } from "@/store/jotai";
import { useAtom } from "jotai";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Grid,
  Label,
} from "@/components/atoms";

const ListingFilters = () => {
  const [activeFilters, setActiveFilters] = useAtom(selectedFiltersAtom);
  const filters = [
    { id: "color", name: "Color", options: ["Red", "Blue", "Green"] },
    { id: "size", name: "Size", options: ["S", "M", "L"] },
    { id: "brand", name: "Brand", options: ["Brand A", "Brand B"] },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Filters
        </Button>
      </DialogTrigger>
      <DialogContent size="full">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>
            This is a full-screen dialog for selecting filters.
          </DialogDescription>
          <Grid cols={1} colsMd={2} colsLg={4}>
            {filters.map((filter) => (
              <div key={filter.id}>
                <h3>{filter.name}</h3>
                {filter.options.map((option) => (
                  <div key={option} className="flex items-center gap-2">
                    <Checkbox
                      id={`${filter.id}-${option}`}
                      checked={
                        activeFilters?.[filter.id]?.includes(option) || false
                      }
                      onCheckedChange={() => {
                        const currentOptions = activeFilters?.[filter.id] || [];
                        if (currentOptions.includes(option)) {
                          setActiveFilters({
                            ...activeFilters,
                            [filter.id]: currentOptions.filter(
                              (o) => o !== option,
                            ),
                          });
                        } else {
                          setActiveFilters({
                            ...activeFilters,
                            [filter.id]: [...currentOptions, option],
                          });
                        }
                      }}
                    />
                    <Label htmlFor={`${filter.id}-${option}`}>{option}</Label>
                  </div>
                ))}
              </div>
            ))}
          </Grid>
        </DialogHeader>
        <DialogFooter>
          <Button size="sm">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ListingFilters;
