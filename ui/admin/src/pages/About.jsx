import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ABOUTUS_DETAIL, CREATE_ABOUTUS, UPDATE_ABOUTUS } from '@/resources/server_apis';
import { toast } from 'sonner';

export default function About() {

    const { register, handleSubmit, reset } = useForm();

    const [preview, setPreview] = useState('');

    const [features, setFeatures] = useState([]);

    useEffect(() => {
        const getAbout = async () => {
            try {
                const response = await axios.get(ABOUTUS_DETAIL);
                if (response.data.status == true) {
                    console.log(response.data.aboutUs[0])
                    reset(response.data.aboutUs[0]);
                    response.data.aboutUs[0]?.features && setFeatures(response.data.aboutUs[0]?.features)
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log("Error in axios: ", error)
            }
        }
        getAbout();
    }, []);

    const handlePreviewFile = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const addFeature = (e) => {
        e.preventDefault();
        setFeatures([...features, { id: Date.now(), text: '' }]);
    };

    const removeFeature = (id) => {
        setFeatures(features.filter(f => f.id !== id));
    };

    const updateFeature = (id, text) => {
        setFeatures(features.map(f => f.id === id ? { ...f, text } : f));
    };

    const handleSaveAbout = async (data) => {
        console.log(data)
        
        try {
            const aboutData = {
                mission: data.mission,
                vision: data.vision,
                file: preview,
                features: features
            }
            if (data._id) {
                const response = await axios.patch(`${UPDATE_ABOUTUS}/${data._id}`, aboutData)
                if (response.data.status == true) {
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                    return;
                }
            } else {
                const response = await axios.post(CREATE_ABOUTUS, aboutData);
                if (response.data.status == true) {
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                    return;
                }
            }

        } catch (error) {
            console.log("Error in axios: ", error)
        }
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">About Page</h2>
                <p className="text-muted-foreground">Manage the content of your About Us page.</p>
            </div>

            <div className="grid gap-6">
                <form onSubmit={handleSubmit(handleSaveAbout)}>
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
                                    { ...register("mission") }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="vision">Our Vision</Label>
                                <Textarea
                                    id="vision"
                                    className="min-h-[100px]"
                                    { ...register("vision") }
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="grid w-full max-w-sm items-center gap-3">
                                    <Label htmlFor="picture">Right Image</Label>
                                    <Input id="picture" onChange={handlePreviewFile} type="file" />
                                </div>
                                {preview && <img src={preview} className="rounded w-24 h-24" alt="Preview" />}
                            </div>
                        </CardContent>
                    </Card>
                    <div className='my-5'></div>
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

                    <div className="my-5 flex justify-end">
                        <Button size="lg">Save Changes</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
