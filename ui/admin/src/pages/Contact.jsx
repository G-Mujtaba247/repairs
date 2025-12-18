import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { CONTACTUS_DETAIL, CREATE_CONTACTUS, UPDATE_CONTACTUS } from '@/resources/server_apis';

export default function Contact() {
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        const fetchContactDetails = async () => {
            const response = await axios.get(CONTACTUS_DETAIL);
            if (response.data.status == true) {
                console.log(response.data.contactUs[0]);
                reset(response.data.contactUs[0]);
            }
        }
        fetchContactDetails();
    }, []);

    const handleSaveContactDetails = async (data) => {
        try {
            if (data._id) {
                const response = await axios.patch(`${UPDATE_CONTACTUS}/${data._id}`, data);
                if (response.data.status == true) {
                    reset(response.data.updatedContactUs);
                    console.log(response.data.updatedContactUs);
                } else {
                    console.log("Updated: Axios error");
                }
            } else {
                const response = await axios.post(CREATE_CONTACTUS, data);
                if (response.data.status == true) {
                    reset(response.data.newContactUs);
                    console.log(response.data.newContactUs);
                } else {
                    console.log("Created: Axios error");
                }
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Contact Page</h2>
                <p className="text-muted-foreground">Manage your contact information and location.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Update the contact details displayed on your website.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <form onSubmit={handleSubmit(handleSaveContactDetails)}>
        
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

                        <Button type="submit">Save Contact Info</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
