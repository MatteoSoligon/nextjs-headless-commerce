import * as React from "react";

// Blocks
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  SimpleTooltip,
} from "@/components/blocks";
import {
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Button,
  Badge,
  Checkbox,
  Label,
  Input,
  RadioGroup,
  RadioGroupItem,
  Switch,
} from "@/components/atoms";
import TestForm from "@/components/sections/TestForm";

export default async function UIKitPage() {

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="mb-10">
        <Heading level="h1" className="mb-4">
          UI Kit
        </Heading>
        <Text color="muted" size="lg">
          A comprehensive showcase of all available components in the design
          system.
        </Text>
      </div>

      <Accordion type="multiple" variant="separated" className="space-y-4">
        {/* ========================================
            ATOMS SECTION
        ======================================== */}
        {/* Accordion Component */}
        <AccordionItem value="accordion" variant="separated">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Badge variant="primary">Atom</Badge>
              <span className="font-semibold">Accordion</span>
            </div>
          </AccordionTrigger>
          <React.Suspense
            fallback={<div className="py-4 text-center">Loading…</div>}
          >
            <AccordionContent>
              <div className="space-y-6">
                <Text color="muted" size="sm">
                  Expandable content sections for organizing information
                  hierarchically.
                </Text>

                <div className="space-y-4">
                  <Text weight="medium">Default Accordion</Text>
                  <Accordion
                    type="multiple"
                    variant="separated"
                    className="w-full"
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Is it accessible?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Is it styled?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It comes with default styles that match the design
                        system.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Is it animated?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It&apos;s animated by default with smooth
                        transitions.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </AccordionContent>
          </React.Suspense>
        </AccordionItem>

        {/* Badge Component */}
        <AccordionItem value="badge" variant="separated">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Badge variant="primary">Atom</Badge>
              <span className="font-semibold">Badge</span>
            </div>
          </AccordionTrigger>
          <React.Suspense
            fallback={<div className="py-4 text-center">Loading…</div>}
          >
            <AccordionContent>
              <div className="space-y-6">
                <Text color="muted" size="sm">
                  Status indicators, labels, and counts for highlighting
                  information.
                </Text>

                <div className="space-y-4">
                  <Text weight="medium">Variants</Text>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="accent">Accent</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <Text weight="medium">Sizes</Text>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge size="sm">Small</Badge>
                    <Badge size="md">Medium</Badge>
                    <Badge size="lg">Large</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <Text weight="medium">Pill Shape</Text>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="primary" pill>
                      Pill Badge
                    </Badge>
                    <Badge variant="success" pill>
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </React.Suspense>
        </AccordionItem>

        {/* Button Component */}
        <AccordionItem value="button" variant="separated">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Badge variant="primary">Atom</Badge>
              <span className="font-semibold">Button</span>
            </div>
          </AccordionTrigger>
          <React.Suspense
            fallback={<div className="py-4 text-center">Loading…</div>}
          >
            <AccordionContent>
              <div className="space-y-6">
                <Text color="muted" size="sm">
                  Interactive buttons for actions and navigation.
                </Text>

                <div className="space-y-4">
                  <Text weight="medium">Variants</Text>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="accent">Accent</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Text weight="medium">Sizes</Text>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button size="xs">Extra Small</Button>
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Text weight="medium">States</Text>
                  <div className="flex flex-wrap gap-2">
                    <Button loading>Loading</Button>
                    <Button disabled>Disabled</Button>
                    <Button fullWidth>Full Width</Button>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </React.Suspense>
        </AccordionItem>

        {/* Checkbox Component */}
        <AccordionItem value="checkbox" variant="separated">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Badge variant="primary">Atom</Badge>
              <span className="font-semibold">Checkbox</span>
            </div>
          </AccordionTrigger>
          <React.Suspense
            fallback={<div className="py-4 text-center">Loading…</div>}
          >
            <AccordionContent>
              <div className="space-y-6">
                <Text color="muted" size="sm">
                  Selection control for binary choices.
                </Text>

                <div className="space-y-4">
                  <Text weight="medium">Interactive Example</Text>
                  <div className="flex items-center gap-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <Text weight="medium">Sizes</Text>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Checkbox id="cb-sm" size="sm" defaultChecked />
                      <Label htmlFor="cb-sm" size="sm">
                        Small
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="cb-md" size="md" defaultChecked />
                      <Label htmlFor="cb-md">Medium</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="cb-lg" size="lg" defaultChecked />
                      <Label htmlFor="cb-lg" size="lg">
                        Large
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Text weight="medium">States</Text>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Checkbox id="cb-disabled" disabled />
                      <Label htmlFor="cb-disabled">Disabled</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="cb-disabled-checked"
                        disabled
                        defaultChecked
                      />
                      <Label htmlFor="cb-disabled-checked">
                        Disabled Checked
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="cb-invalid" aria-invalid="true" />
                      <Label htmlFor="cb-invalid">Invalid</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="cb-invalid-checked"
                        aria-invalid="true"
                        defaultChecked
                      />
                      <Label htmlFor="cb-invalid-checked">
                        Invalid Checked
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </React.Suspense>
        </AccordionItem>

        {/* Input Component */}
        <AccordionItem value="input" variant="separated">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Badge variant="primary">Atom</Badge>
              <span className="font-semibold">Input</span>
            </div>
          </AccordionTrigger>
          <React.Suspense
            fallback={<div className="py-4 text-center">Loading…</div>}
          >
            <AccordionContent>
              <div className="space-y-6">
                <Text color="muted" size="sm">
                  Text input fields for forms and data entry.
                </Text>

                <div className="space-y-4">
                  <Text weight="medium">Variants</Text>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="default-input" className="mb-2 block">
                        Default
                      </Label>
                      <Input id="default-input" placeholder="Default input" />
                    </div>
                    <div>
                      <Label htmlFor="filled-input" className="mb-2 block">
                        Filled
                      </Label>
                      <Input
                        id="filled-input"
                        variant="filled"
                        placeholder="Filled input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="flushed-input" className="mb-2 block">
                        Flushed
                      </Label>
                      <Input
                        id="flushed-input"
                        variant="flushed"
                        placeholder="Flushed input"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Text weight="medium">Sizes</Text>
                  <div className="grid gap-4">
                    <Input size="sm" placeholder="Small input" />
                    <Input size="md" placeholder="Medium input" />
                    <Input size="lg" placeholder="Large input" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Text weight="medium">States</Text>
                  <div className="grid gap-4">
                    <Input state="error" placeholder="Error state" />
                    <Input state="success" placeholder="Success state" />
                    <Input disabled placeholder="Disabled input" />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </React.Suspense>
        </AccordionItem>

        {/* Label Component */}
        <AccordionItem value="label" variant="separated">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Badge variant="primary">Atom</Badge>
              <span className="font-semibold">Label</span>
            </div>
          </AccordionTrigger>
          <React.Suspense
            fallback={<div className="py-4 text-center">Loading…</div>}
          >
            <AccordionContent>
              <div className="space-y-6">
                <Text color="muted" size="sm">
                  Text labels for form inputs and controls.
                </Text>

                <div className="space-y-4">
                  <Text weight="medium">Sizes</Text>
                  <div className="space-y-2">
                    <Label size="sm">Small Label</Label>
                    <Label size="md">Medium Label</Label>
                    <Label size="lg">Large Label</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <Text weight="medium">Required</Text>
                  <Label required>Required Field</Label>
                </div>
              </div>
            </AccordionContent>
          </React.Suspense>
        </AccordionItem>

        {/* Radio Component */}
        <AccordionItem value="radio" variant="separated">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Badge variant="primary">Atom</Badge>
              <span className="font-semibold">Radio</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <Text color="muted" size="sm">
                Radio buttons for selecting one option from a group.
              </Text>

              <div className="space-y-4">
                <Text weight="medium">Interactive Example</Text>
                <RadioGroup>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option-1" id="r1" />
                    <Label htmlFor="r1">Option 1</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option-2" id="r2" />
                    <Label htmlFor="r2">Option 2</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="option-3" id="r3" />
                    <Label htmlFor="r3">Option 3</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Text weight="medium">Horizontal Orientation</Text>
                <RadioGroup defaultValue="h1" orientation="horizontal">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="h1" id="h1" />
                    <Label htmlFor="h1">First</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="h2" id="h2" />
                    <Label htmlFor="h2">Second</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="h3" id="h3" />
                    <Label htmlFor="h3">Third</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Text weight="medium">Sizes</Text>
                <div className="flex items-center gap-6">
                  <RadioGroup defaultValue="s" orientation="horizontal">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="s" size="sm" />
                      <Label size="sm">Small</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="m" size="md" />
                      <Label>Medium</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="l" size="lg" />
                      <Label size="lg">Large</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-4">
                <Text weight="medium">States</Text>
                <div className="flex items-center gap-6">
                  <RadioGroup
                    defaultValue="disabled-checked"
                    orientation="horizontal"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value="disabled"
                        id="radio-disabled"
                        disabled
                      />
                      <Label htmlFor="radio-disabled">Disabled</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value="disabled-checked"
                        id="radio-disabled-checked"
                        disabled
                      />
                      <Label htmlFor="radio-disabled-checked">
                        Disabled Checked
                      </Label>
                    </div>
                  </RadioGroup>
                  <RadioGroup
                    defaultValue="invalid-checked"
                    orientation="horizontal"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value="invalid"
                        id="radio-invalid"
                        aria-invalid="true"
                      />
                      <Label htmlFor="radio-invalid">Invalid</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        value="invalid-checked"
                        id="radio-invalid-checked"
                        aria-invalid="true"
                      />
                      <Label htmlFor="radio-invalid-checked">
                        Invalid Checked
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Switch Component */}
        <AccordionItem value="switch" variant="separated">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Badge variant="primary">Atom</Badge>
              <span className="font-semibold">Switch</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <Text color="muted" size="sm">
                Toggle switch for on/off states.
              </Text>

              <div className="space-y-4">
                <Text weight="medium">Interactive Example</Text>
                <div className="flex items-center gap-2">
                  <Switch
                    id="notifications"
                  />
                  <Label htmlFor="notifications">Enable notifications</Label>
                </div>
              </div>

              <div className="space-y-4">
                <Text weight="medium">Sizes</Text>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch id="sw-sm" size="sm" defaultChecked />
                    <Label htmlFor="sw-sm" size="sm">
                      Small
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="sw-md" size="md" defaultChecked />
                    <Label htmlFor="sw-md">Medium</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="sw-lg" size="lg" defaultChecked />
                    <Label htmlFor="sw-lg" size="lg">
                      Large
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Text weight="medium">States</Text>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch id="sw-disabled" disabled />
                    <Label htmlFor="sw-disabled">Disabled</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="sw-disabled-checked" disabled defaultChecked />
                    <Label htmlFor="sw-disabled-checked">
                      Disabled Checked
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="sw-invalid" aria-invalid="true" />
                    <Label htmlFor="sw-invalid">Invalid</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="sw-invalid-checked"
                      aria-invalid="true"
                      defaultChecked
                    />
                    <Label htmlFor="sw-invalid-checked">Invalid Checked</Label>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Typography Component */}
        <AccordionItem value="typography" variant="separated">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Badge variant="primary">Atom</Badge>
              <span className="font-semibold">Typography</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <Text color="muted" size="sm">
                Text and heading components for consistent typography.
              </Text>

              <div className="space-y-4">
                <Text weight="medium">Headings</Text>
                <div className="space-y-2">
                  <Heading level="h1">Heading 1</Heading>
                  <Heading level="h2">Heading 2</Heading>
                  <Heading level="h3">Heading 3</Heading>
                  <Heading level="h4">Heading 4</Heading>
                  <Heading level="h5">Heading 5</Heading>
                  <Heading level="h6">Heading 6</Heading>
                </div>
              </div>

              <div className="space-y-4">
                <Text weight="medium">Text Sizes</Text>
                <div className="space-y-1">
                  <Text size="xs">Extra Small Text</Text>
                  <Text size="sm">Small Text</Text>
                  <Text size="base">Base Text</Text>
                  <Text size="lg">Large Text</Text>
                  <Text size="xl">Extra Large Text</Text>
                  <Text size="2xl">2XL Text</Text>
                </div>
              </div>

              <div className="space-y-4">
                <Text weight="medium">Text Colors</Text>
                <div className="space-y-1">
                  <Text color="default">Default Color</Text>
                  <Text color="muted">Muted Color</Text>
                  <Text color="primary">Primary Color</Text>
                  <Text color="secondary">Secondary Color</Text>
                  <Text color="accent">Accent Color</Text>
                </div>
              </div>

              <div className="space-y-4">
                <Text weight="medium">Font Weights</Text>
                <div className="space-y-1">
                  <Text weight="normal">Normal Weight</Text>
                  <Text weight="medium">Medium Weight</Text>
                  <Text weight="semibold">Semibold Weight</Text>
                  <Text weight="bold">Bold Weight</Text>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* ========================================
            BLOCKS SECTION
        ======================================== */}

        {/* Card Component */}
        <AccordionItem value="card" variant="separated">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">Block</Badge>
              <span className="font-semibold">Card</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <Text color="muted" size="sm">
                Container component for grouping related content.
              </Text>

              <div className="space-y-4">
                <Text weight="medium">Variants</Text>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card variant="default">
                    <CardHeader>
                      <CardTitle>Default Card</CardTitle>
                      <CardDescription>With border style</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Text size="sm">Card content goes here.</Text>
                    </CardContent>
                  </Card>

                  <Card variant="elevated">
                    <CardHeader>
                      <CardTitle>Elevated Card</CardTitle>
                      <CardDescription>With shadow</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Text size="sm">Card content goes here.</Text>
                    </CardContent>
                  </Card>

                  <Card variant="interactive">
                    <CardHeader>
                      <CardTitle>Interactive Card</CardTitle>
                      <CardDescription>Hover to see effect</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Text size="sm">Clickable card style.</Text>
                    </CardContent>
                  </Card>

                  <Card variant="filled">
                    <CardHeader>
                      <CardTitle>Filled Card</CardTitle>
                      <CardDescription>Subtle background</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Text size="sm">Card content goes here.</Text>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-4">
                <Text weight="medium">With Footer</Text>
                <Card>
                  <CardHeader>
                    <CardTitle>Complete Card</CardTitle>
                    <CardDescription>
                      With all sections including footer
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Text size="sm">
                      This card demonstrates all available sections.
                    </Text>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                    <Button size="sm">Save</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Dialog Component */}
        <AccordionItem value="dialog" variant="separated">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">Block</Badge>
              <span className="font-semibold">Dialog</span>
            </div>
          </AccordionTrigger>
          <React.Suspense
            fallback={<div className="py-4 text-center">Loading…</div>}
          >
            <AccordionContent>
              <div className="space-y-6">
                <Text color="muted" size="sm">
                  Modal dialogs for focused interactions.
                </Text>

                <div className="space-y-4">
                  <Text weight="medium">Sizes</Text>
                  <div className="flex flex-wrap gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Small Dialog
                        </Button>
                      </DialogTrigger>
                      <DialogContent size="sm">
                        <DialogHeader>
                          <DialogTitle>Small Dialog</DialogTitle>
                          <DialogDescription>
                            This is a small dialog for quick actions.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button size="sm">Close</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Medium Dialog
                        </Button>
                      </DialogTrigger>
                      <DialogContent size="md">
                        <DialogHeader>
                          <DialogTitle>Medium Dialog</DialogTitle>
                          <DialogDescription>
                            This is the default dialog size, suitable for most
                            use cases.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <Text size="sm">Dialog content goes here.</Text>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button>Confirm</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          Large Dialog
                        </Button>
                      </DialogTrigger>
                      <DialogContent size="lg">
                        <DialogHeader>
                          <DialogTitle>Large Dialog</DialogTitle>
                          <DialogDescription>
                            A larger dialog for complex forms or detailed
                            content.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <Text size="sm">
                            This dialog provides more space for content and
                            complex interactions.
                          </Text>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </React.Suspense>
        </AccordionItem>

        {/* DropdownMenu Component */}
        <AccordionItem value="dropdown" variant="separated">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">Block</Badge>
              <span className="font-semibold">DropdownMenu</span>
            </div>
          </AccordionTrigger>
          <React.Suspense
            fallback={<div className="py-4 text-center">Loading…</div>}
          >
            <AccordionContent>
              <div className="space-y-6">
                <Text color="muted" size="sm">
                  Contextual menus for actions and navigation.
                </Text>

                <div className="space-y-4">
                  <Text weight="medium">Example</Text>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Open Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuItem>Billing</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Sign out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </AccordionContent>
          </React.Suspense>
        </AccordionItem>

        {/* Select Component */}
        <AccordionItem value="select" variant="separated">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">Block</Badge>
              <span className="font-semibold">Select</span>
            </div>
          </AccordionTrigger>
          <React.Suspense
            fallback={<div className="py-4 text-center">Loading…</div>}
          >
            <AccordionContent>
              <div className="space-y-6">
                <Text color="muted" size="sm">
                  Dropdown selection for choosing from a list of options.
                </Text>

                <div className="space-y-4">
                  <Text weight="medium">Sizes</Text>
                  <div className="grid gap-4 max-w-sm">
                    <div>
                      <Label className="mb-2 block">Small</Label>
                      <Select>
                        <SelectTrigger size="sm">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Option 1</SelectItem>
                          <SelectItem value="2">Option 2</SelectItem>
                          <SelectItem value="3">Option 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2 block">Medium</Label>
                      <Select>
                        <SelectTrigger size="md">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Option 1</SelectItem>
                          <SelectItem value="2">Option 2</SelectItem>
                          <SelectItem value="3">Option 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2 block">Large</Label>
                      <Select>
                        <SelectTrigger size="lg">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Option 1</SelectItem>
                          <SelectItem value="2">Option 2</SelectItem>
                          <SelectItem value="3">Option 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Text weight="medium">States</Text>
                  <div className="grid gap-4 max-w-sm">
                    <div>
                      <Label className="mb-2 block">Disabled</Label>
                      <Select disabled>
                        <SelectTrigger>
                          <SelectValue placeholder="Disabled select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Option 1</SelectItem>
                          <SelectItem value="2">Option 2</SelectItem>
                          <SelectItem value="3">Option 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2 block">Invalid</Label>
                      <Select>
                        <SelectTrigger aria-invalid="true">
                          <SelectValue placeholder="Invalid select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Option 1</SelectItem>
                          <SelectItem value="2">Option 2</SelectItem>
                          <SelectItem value="3">Option 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </React.Suspense>
        </AccordionItem>

        {/* Tabs Component */}
        <AccordionItem value="tabs" variant="separated">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">Block</Badge>
              <span className="font-semibold">Tabs</span>
            </div>
          </AccordionTrigger>
          <React.Suspense
            fallback={<div className="py-4 text-center">Loading…</div>}
          >
            <AccordionContent>
              <div className="space-y-6">
                <Text color="muted" size="sm">
                  Tabbed navigation for organizing content into panels.
                </Text>

                <div className="space-y-4">
                  <Text weight="medium">Default Variant</Text>
                  <Tabs defaultValue="tab1">
                    <TabsList variant="default">
                      <TabsTrigger variant="default" value="tab1">
                        Account
                      </TabsTrigger>
                      <TabsTrigger variant="default" value="tab2">
                        Password
                      </TabsTrigger>
                      <TabsTrigger variant="default" value="tab3">
                        Settings
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1">
                      <Card>
                        <CardHeader>
                          <CardTitle>Account</CardTitle>
                          <CardDescription>
                            Manage your account settings.
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </TabsContent>
                    <TabsContent value="tab2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Password</CardTitle>
                          <CardDescription>
                            Change your password.
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </TabsContent>
                    <TabsContent value="tab3">
                      <Card>
                        <CardHeader>
                          <CardTitle>Settings</CardTitle>
                          <CardDescription>
                            Configure your preferences.
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="space-y-4">
                  <Text weight="medium">Underline Variant</Text>
                  <Tabs defaultValue="u1">
                    <TabsList variant="underline">
                      <TabsTrigger variant="underline" value="u1">
                        Overview
                      </TabsTrigger>
                      <TabsTrigger variant="underline" value="u2">
                        Analytics
                      </TabsTrigger>
                      <TabsTrigger variant="underline" value="u3">
                        Reports
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="u1">
                      <Text className="mt-4">Overview content here.</Text>
                    </TabsContent>
                    <TabsContent value="u2">
                      <Text className="mt-4">Analytics content here.</Text>
                    </TabsContent>
                    <TabsContent value="u3">
                      <Text className="mt-4">Reports content here.</Text>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="space-y-4">
                  <Text weight="medium">Pills Variant</Text>
                  <Tabs defaultValue="p1">
                    <TabsList variant="pills">
                      <TabsTrigger variant="pills" value="p1">
                        All
                      </TabsTrigger>
                      <TabsTrigger variant="pills" value="p2">
                        Active
                      </TabsTrigger>
                      <TabsTrigger variant="pills" value="p3">
                        Archived
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="p1">
                      <Text className="mt-4">All items.</Text>
                    </TabsContent>
                    <TabsContent value="p2">
                      <Text className="mt-4">Active items only.</Text>
                    </TabsContent>
                    <TabsContent value="p3">
                      <Text className="mt-4">Archived items.</Text>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </AccordionContent>
          </React.Suspense>
        </AccordionItem>

        {/* Tooltip Component */}
        <AccordionItem value="tooltip" variant="separated">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">Block</Badge>
              <span className="font-semibold">Tooltip</span>
            </div>
          </AccordionTrigger>
          <React.Suspense
            fallback={<div className="py-4 text-center">Loading…</div>}
          >
            <AccordionContent>
              <div className="space-y-6">
                <Text color="muted" size="sm">
                  Informational popups on hover for additional context.
                </Text>

                <div className="space-y-4">
                  <Text weight="medium">Variants</Text>
                  <div className="flex flex-wrap gap-4">
                    <SimpleTooltip content="Default tooltip" variant="default">
                      <Button variant="outline" size="sm">
                        Default
                      </Button>
                    </SimpleTooltip>

                    <SimpleTooltip content="Primary tooltip" variant="primary">
                      <Button variant="outline" size="sm">
                        Primary
                      </Button>
                    </SimpleTooltip>

                    <SimpleTooltip
                      content="Secondary tooltip"
                      variant="secondary"
                    >
                      <Button variant="outline" size="sm">
                        Secondary
                      </Button>
                    </SimpleTooltip>

                    <SimpleTooltip content="Light tooltip" variant="light">
                      <Button variant="outline" size="sm">
                        Light
                      </Button>
                    </SimpleTooltip>
                  </div>
                </div>

                <div className="space-y-4">
                  <Text weight="medium">Positions</Text>
                  <div className="flex flex-wrap gap-4">
                    <SimpleTooltip content="Top tooltip" side="top">
                      <Button variant="outline" size="sm">
                        Top
                      </Button>
                    </SimpleTooltip>

                    <SimpleTooltip content="Bottom tooltip" side="bottom">
                      <Button variant="outline" size="sm">
                        Bottom
                      </Button>
                    </SimpleTooltip>

                    <SimpleTooltip content="Left tooltip" side="left">
                      <Button variant="outline" size="sm">
                        Left
                      </Button>
                    </SimpleTooltip>

                    <SimpleTooltip content="Right tooltip" side="right">
                      <Button variant="outline" size="sm">
                        Right
                      </Button>
                    </SimpleTooltip>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </React.Suspense>
        </AccordionItem>
        {/* Form Component */}
        <AccordionItem value="form" variant="separated">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Badge variant="success">Section</Badge>
              <span className="font-semibold">Form</span>
            </div>
          </AccordionTrigger>

          <AccordionContent> 
            <React.Suspense
              fallback={<div className="py-4 text-center">Loading…</div>}
            >
              <TestForm />
            </React.Suspense>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
