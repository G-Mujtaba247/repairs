import React, { useEffect, useState } from 'react'
import WebLayout from '../layouts/WebLayout'
import { Mail, Phone, MapPin, Send, CheckCircle2Icon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import axios from 'axios'

import { BOOKING_CREATE, CONTACTUS_DETAIL } from '../resources/server_apis'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const Contact = () => {
    const [contactUs, setContactUs] = useState({});
    const [faqs, setFAQS] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [ emailMessage, setEmailMessage ] = useState('')
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchContactDetails = async () => {
            const response = await axios.get(CONTACTUS_DETAIL);
            if (response.data.status == true) {
                console.log(response.data.contactUs[0]);
                setContactUs(response.data.contactUs[0]);
                response.data.contactUs[0].faqs && setFAQS(response.data.contactUs[0].faqs);
            } else {
                setContactUs({});
                console.error("Failed to fetch contact us details");
            }
        }
        fetchContactDetails();
    }, []);

    const handleSubmitBooking = async (data) => {
        if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.message || !category) {
            toast.error("Please fill all the fields");
            return;
        }

        try {
            setLoading(true)
            const bookingDetails = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                issue: data.applianceIssue,
                message: data.message,
                category: category
            }

            const response = await axios.post(BOOKING_CREATE, bookingDetails)
            if (response.data.status == true) {
                toast.success(response.data.message);
                setEmailMessage(response.data?.message);
                reset();
                setCategory('');
                setLoading(false)
            } else {
                toast.error(response.data.message);
                setLoading(false)
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error");
            setLoading(false)
        }
    }

    return (
        <WebLayout>
            <div className="min-h-screen bg-background text-foreground">
                {/* Banner Section */}
                <section className="relative h-[300px] w-full bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-10 text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                            Schedule Your Repair
                        </h1>
                        <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto">
                            Don't let a broken appliance disrupt your day. Contact us for fast, reliable service.
                        </p>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-12 md:py-20 space-y-20">
                    {/* Contact Info & Form Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight mb-4">Get in Touch</h2>
                                <p className="text-muted-foreground text-lg">
                                    Need an urgent repair or have a question? Our team is ready to help.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
                                    <CardContent className="flex items-center gap-4 p-6">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Mail className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">Email Us</h3>
                                            <p className="text-muted-foreground">{contactUs.email}</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
                                    <CardContent className="flex items-center gap-4 p-6">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Phone className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">Call Us</h3>
                                            <p className="text-muted-foreground">{contactUs.phone}</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm">
                                    <CardContent className="flex items-center gap-4 p-6">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <MapPin className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">Visit Us</h3>
                                            <p className="text-muted-foreground">
                                                {contactUs.address}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <Card className="shadow-lg border-muted/40">
                            <CardHeader>
                                { emailMessage &&
                                <Alert>
                                    <CheckCircle2Icon />
                                    <AlertTitle>Booking has been submitted successfully</AlertTitle>
                                    <AlertDescription>
                                    {emailMessage}
                                    </AlertDescription>
                                </Alert>
                                }
                                <CardTitle className="text-2xl">Request a Service</CardTitle>
                                <CardDescription>
                                    Fill out the form below and we'll get back to you to confirm your appointment.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit(handleSubmitBooking)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First name</Label>
                                            <Input {...register('firstName')} id="firstName" placeholder="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last name</Label>
                                            <Input {...register('lastName')} id="lastName" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input {...register('email')} id="email" type="email" placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone no#</Label>
                                        <Input {...register('phone')} id="phone" type="text" placeholder="+(513) 783 346" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Appliance category</Label>
                                        <Select onValueChange={(e) => setCategory(e)} value={category}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Categories</SelectLabel>
                                                    <SelectItem value="ac">AC</SelectItem>
                                                    <SelectItem value="dryer">Dryer</SelectItem>
                                                    <SelectItem value="refrigerator">Refrigerator</SelectItem>
                                                    <SelectItem value="microwave">Microwave</SelectItem>
                                                    <SelectItem value="oven">Oven</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Appliance issue</Label>
                                        <Input {...register('applianceIssue')} id="subject" placeholder="e.g., Washing machine not draining" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            {...register('message')}
                                            placeholder="Describe the problem in detail..."
                                            className="min-h-[150px]"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full md:w-auto" disabled={loading}>
                                        <Send className="mr-2 h-4 w-4" /> Book Appointment
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* FAQs & Map Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-10">
                        {/* FAQs */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
                                <p className="text-muted-foreground">
                                    Find answers to common questions about our repair services.
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="text-left text-lg font-medium">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground text-base">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                        {/* Map */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight mb-4">Find Us on Map</h2>
                                <p className="text-muted-foreground">
                                    Visit our office in the heart of Lahore.
                                </p>
                            </div>
                            {contactUs.map &&
                                <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-muted">
                                    <iframe
                                        src={contactUs.map}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Lahore Map"
                                    ></iframe>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </WebLayout>
    )
}

export default Contact