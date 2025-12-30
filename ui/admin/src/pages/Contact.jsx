import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { CONTACTUS_DETAIL, CREATE_CONTACTUS, UPDATE_CONTACTUS } from '@/resources/server_apis';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

export default function Contact() {
    const { register, handleSubmit, reset } = useForm();
    const [faqs, setFAQS] = useState([]);

    useEffect(() => {
        const fetchContactDetails = async () => {
            const response = await axios.get(CONTACTUS_DETAIL);
            if (response.data.status == true) {
                console.log(response.data.contactUs[0]);
                reset(response.data.contactUs[0]);
                response.data.contactUs[0] && setFAQS(response.data.contactUs[0].faqs);
            }
        }
        fetchContactDetails();
    }, []);

    const handleSaveContactDetails = async (data) => {
        try {
            const faqData = {
                phone: data.phone,
                address: data.address,
                email: data.email,
                map: data.map,
                faqs: faqs
            };

            if (data._id) {
                const response = await axios.patch(`${UPDATE_CONTACTUS}/${data._id}`, faqData);
                if (response.data.status == true) {
                    reset(response.data.updatedContactUs);
                    toast.success(response.data.message)
                } else {
                    console.log("Updated: Axios error");
                    toast.success(response.data.message)
                }
            } else {
                const response = await axios.post(CREATE_CONTACTUS, faqData);
                if (response.data.status == true) {
                    reset(response.data.newContactUs);
                    toast.success(response.data.message)
                } else {
                    console.log("Created: Axios error");
                    toast.success(response.data.message)
                }
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    const addFAQ = (e) => {
        e.preventDefault();
        setFAQS([...faqs, { id: Date.now(), question: '', answer: '' }]);
    };

    const removeFAQ = (id) => {
        setFAQS(faqs.filter(f => f.id !== id));
    };

    const updateFAQ = (id, field, value) => {
        setFAQS(faqs.map(f => f.id === id ? { ...f, [field]: value } : f));
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Contact Page</h2>
                <p className="text-muted-foreground">Manage your contact information and location.</p>
            </div>

            <form onSubmit={handleSubmit(handleSaveContactDetails)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>Update the contact details displayed on your website.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input {...register("phone")} id="phone" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input {...register("email")} id="email" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Physical Address</Label>
                            <Textarea {...register("address")} id="address" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="map">Google Maps Embed URL</Label>
                            <Input {...register("map")} id="map" placeholder="https://www.google.com/maps/embed?..." />
                            <p className="text-xs text-muted-foreground">Paste the 'src' attribute from the Google Maps embed code.</p>
                        </div>
                    </CardContent>
                </Card>

                <div className="my-5"></div>

                <Card>
                    <CardHeader>
                        <CardTitle>Frequently Asked Questions</CardTitle>
                        <CardDescription>Find answers to common questions about our repair services.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="flex gap-2">
                                <Input
                                    value={faq.question}
                                    onChange={(e) => updateFAQ(faq.id, "question", e.target.value)}
                                    placeholder="Faq question"
                                />
                                <Input
                                    value={faq.answer}
                                    onChange={(e) => updateFAQ(faq.id, "answer", e.target.value)}
                                    placeholder="Faq answer"
                                />
                                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeFAQ(faq.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                        <Button onClick={addFAQ} variant="outline" className="w-full">
                            <Plus className="w-4 h-4 mr-2" /> Add FAQ
                        </Button>
                    </CardContent>
                </Card>

                <div className="my-5 flex justify-end">
                    <Button size="lg">Save Changes</Button>
                </div>
            </form>
        </div>
    );
}
