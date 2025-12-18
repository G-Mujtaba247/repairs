import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from 'lucide-react';

export default function About() {
    const [features, setFeatures] = useState([
        { id: 1, text: 'Certified Technicians' },
        { id: 2, text: 'Same Day Service' },
        { id: 3, text: '90-Day Warranty on Parts & Labor' },
        { id: 4, text: 'Transparent Pricing' },
    ]);

    const addFeature = () => {
        setFeatures([...features, { id: Date.now(), text: '' }]);
    };

    const removeFeature = (id) => {
        setFeatures(features.filter(f => f.id !== id));
    };

    const updateFeature = (id, text) => {
        setFeatures(features.map(f => f.id === id ? { ...f, text } : f));
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">About Page</h2>
                <p className="text-muted-foreground">Manage the content of your About Us page.</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Company Overview</CardTitle>
                        <CardDescription>Define your company's mission and vision.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="mission">Our Mission</Label>
                            <Textarea
                                id="mission"
                                className="min-h-[100px]"
                                defaultValue="To provide fast, reliable, and affordable appliance repair services to our community. We believe in fixing things rather than throwing them away."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="vision">Our Vision</Label>
                            <Textarea
                                id="vision"
                                className="min-h-[100px]"
                                defaultValue="To be the most trusted name in appliance repair, known for our technical expertise and exceptional customer service."
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Why Choose Us?</CardTitle>
                        <CardDescription>List the key benefits of your service.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {features.map((feature) => (
                            <div key={feature.id} className="flex gap-2">
                                <Input
                                    value={feature.text}
                                    onChange={(e) => updateFeature(feature.id, e.target.value)}
                                    placeholder="Feature text"
                                />
                                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeFeature(feature.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline" onClick={addFeature} className="w-full">
                            <Plus className="w-4 h-4 mr-2" /> Add Feature
                        </Button>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button size="lg">Save Changes</Button>
                </div>
            </div>
        </div>
    );
}
