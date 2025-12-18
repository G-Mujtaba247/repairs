import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Image as ImageIcon, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
    const [slides, setSlides] = useState([
        { id: 1, title: 'Professional Repair Services', buttonText: 'Book Now', image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=2070&auto=format&fit=crop' },
        { id: 2, title: 'Expert Technicians', buttonText: 'Our Team', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop' },
    ]);
    const [services, setServices] = useState([
        { id: 1, title: 'Refrigerator Repair', description: 'Expert repair for all major refrigerator brands.', icon: '❄️' },
        { id: 2, title: 'Washing Machine Repair', description: 'Fixing leaks, spin issues, and more.', icon: '🧺' },
    ]);
    const [reviews, setReviews] = useState([
        { id: 1, name: 'John Doe', rating: 5, comment: 'Excellent service! Fixed my fridge in no time.' },
        { id: 2, name: 'Jane Smith', rating: 4, comment: 'Good technician, but arrived a bit late.' },
    ]);

    const [activeTab, setActiveTab] = useState('sliders');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [dialogType, setDialogType] = useState(null); // 'slide', 'service', 'review'

    const handleSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const id = currentItem ? currentItem.id : Date.now();

        if (dialogType === 'slide') {
            const newItem = {
                id,
                title: formData.get('title'),
                buttonText: formData.get('buttonText'),
                image: formData.get('image'),
            };
            setSlides(currentItem ? slides.map(i => i.id === id ? newItem : i) : [...slides, newItem]);
        } else if (dialogType === 'service') {
            const newItem = {
                id,
                title: formData.get('title'),
                description: formData.get('description'),
                icon: formData.get('icon'),
            };
            setServices(currentItem ? services.map(i => i.id === id ? newItem : i) : [...services, newItem]);
        } else if (dialogType === 'review') {
            const newItem = {
                id,
                name: formData.get('name'),
                rating: parseInt(formData.get('rating')),
                comment: formData.get('comment'),
            };
            setReviews(currentItem ? reviews.map(i => i.id === id ? newItem : i) : [...reviews, newItem]);
        }

        setIsDialogOpen(false);
        setCurrentItem(null);
        setDialogType(null);
    };

    const handleDelete = (id, type) => {
        if (confirm('Are you sure you want to delete this item?')) {
            if (type === 'slide') setSlides(slides.filter(i => i.id !== id));
            if (type === 'service') setServices(services.filter(i => i.id !== id));
            if (type === 'review') setReviews(reviews.filter(i => i.id !== id));
        }
    };

    const openEdit = (item, type) => {
        setCurrentItem(item);
        setDialogType(type);
        setIsDialogOpen(true);
    };

    const openAdd = (type) => {
        setCurrentItem(null);
        setDialogType(type);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Home Page</h2>
                <p className="text-muted-foreground">Manage your home page content.</p>
            </div>

            <Tabs defaultValue="sliders" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="sliders">Hero Sliders</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="sliders" className="space-y-4">
                    <div className="flex justify-end">
                        <Button onClick={() => openAdd('slide')}>
                            <Plus className="w-4 h-4 mr-2" /> Add Slide
                        </Button>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Sliders</CardTitle>
                            <CardDescription>Manage the main sliders displayed on the home page.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Image</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Button Text</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {slides.map((slide) => (
                                        <TableRow key={slide.id}>
                                            <TableCell>
                                                <div className="w-16 h-10 rounded overflow-hidden bg-muted relative">
                                                    {slide.image ? (
                                                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                                                            <ImageIcon className="w-4 h-4" />
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">{slide.title}</TableCell>
                                            <TableCell>{slide.buttonText}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => openEdit(slide, 'slide')}>
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(slide.id, 'slide')}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {slides.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                                No slides found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="services" className="space-y-4">
                    <div className="flex justify-end">
                        <Button onClick={() => openAdd('service')}>
                            <Plus className="w-4 h-4 mr-2" /> Add Service
                        </Button>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Services</CardTitle>
                            <CardDescription>Manage the services offered section.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">Icon</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {services.map((service) => (
                                        <TableRow key={service.id}>
                                            <TableCell className="text-2xl">{service.icon}</TableCell>
                                            <TableCell className="font-medium">{service.title}</TableCell>
                                            <TableCell>{service.description}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => openEdit(service, 'service')}>
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(service.id, 'service')}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {services.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                                No services found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                    <div className="flex justify-end">
                        <Button onClick={() => openAdd('review')}>
                            <Plus className="w-4 h-4 mr-2" /> Add Review
                        </Button>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Reviews</CardTitle>
                            <CardDescription>Manage customer testimonials.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Comment</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {reviews.map((review) => (
                                        <TableRow key={review.id}>
                                            <TableCell className="font-medium">{review.name}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    {review.rating} <Star className="w-3 h-3 ml-1 fill-primary text-primary" />
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-[300px] truncate">{review.comment}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => openEdit(review, 'review')}>
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(review.id, 'review')}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {reviews.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                                No reviews found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {currentItem ? 'Edit ' : 'Add '}
                            {dialogType === 'slide' ? 'Slide' : dialogType === 'service' ? 'Service' : 'Review'}
                        </DialogTitle>
                        <DialogDescription>
                            Make changes to the {dialogType} here.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSave} className="space-y-4">
                        {dialogType === 'slide' && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="title">Slide Title</Label>
                                    <Input id="title" name="title" defaultValue={currentItem?.title} placeholder="e.g. Professional Repair Services" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="buttonText">Button Text</Label>
                                    <Input id="buttonText" name="buttonText" defaultValue={currentItem?.buttonText} placeholder="e.g. Book Now" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="image">Image URL</Label>
                                    <Input id="image" name="image" defaultValue={currentItem?.image} placeholder="https://..." required />
                                </div>
                            </>
                        )}
                        {dialogType === 'service' && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="title">Service Title</Label>
                                    <Input id="title" name="title" defaultValue={currentItem?.title} placeholder="e.g. Refrigerator Repair" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="icon">Icon (Emoji)</Label>
                                    <Input id="icon" name="icon" defaultValue={currentItem?.icon} placeholder="e.g. ❄️" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" name="description" defaultValue={currentItem?.description} placeholder="Brief description of the service..." required />
                                </div>
                            </>
                        )}
                        {dialogType === 'review' && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Customer Name</Label>
                                    <Input id="name" name="name" defaultValue={currentItem?.name} placeholder="e.g. John Doe" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rating">Rating (1-5)</Label>
                                    <Input id="rating" name="rating" type="number" min="1" max="5" defaultValue={currentItem?.rating || 5} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="comment">Review Comment</Label>
                                    <Textarea id="comment" name="comment" defaultValue={currentItem?.comment} placeholder="Customer's feedback..." required />
                                </div>
                            </>
                        )}
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
