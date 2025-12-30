import React, { useEffect, useState } from 'react'
import WebLayout from '../layouts/WebLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { CheckCircle2, Users, Trophy, Target, ArrowRight, Scale, ShieldCheck } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner';
import { ABOUTUS_DETAIL } from '../resources/server_apis'

const About = () => {
    const [aboutus, setAboutus] = useState()
    const [features, setFeatures] = useState([])
    useEffect(() => {
        const fetchAboutus = async () => {
            const response = await axios.get(ABOUTUS_DETAIL);
            if (response.data.status == true){
                setAboutus(response.data.aboutUs[0])
                setFeatures(response.data.aboutUs[0]?.features)
                console.log(response.data.aboutUs[0])
            } else {
                toast.error("Inertnal server error")
                return;
            }
        }
        fetchAboutus();
    }, [])

    const team = [
        {
            name: "Sarah Johnson",
            role: "Master Technician & Founder",
            initials: "SJ",
            image: "/avatars/01.png" // Placeholder, will use fallback
        },
        {
            name: "Michael Chen",
            role: "Head of Operations",
            initials: "MC",
            image: "/avatars/02.png"
        },
        {
            name: "Emily Davis",
            role: "Customer Service Manager",
            initials: "ED",
            image: "/avatars/03.png"
        },
        {
            name: "David Wilson",
            role: "Senior Appliance Specialist",
            initials: "DW",
            image: "/avatars/04.png"
        },
        {
            name: "Jessica Brown",
            role: "Service Coordinator",
            initials: "JB",
            image: "/avatars/05.png"
        },
        {
            name: "Chris Martinez",
            role: "Quality Control Lead",
            initials: "CM",
            image: "/avatars/06.png"
        }
    ]

    return (
        <WebLayout>
            <div className="min-h-screen bg-background text-foreground">
                {/* Banner Section */}
                <section className="relative h-[400px] w-full bg-gradient-to-br from-blue-900 via-slate-800 to-gray-900 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            Your Trusted Appliance Repair Experts
                        </h1>
                        <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                            Restoring comfort to your home with professional, reliable, and fast appliance repair services.
                        </p>
                        <Button size="lg" className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                            Book a Repair <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-16 md:py-24 space-y-24">
                    {/* Our Story / Intro */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <p className="text-muted-foreground leading-relaxed">
                                <Target className="h-10 w-10 text-primary" />
                                {aboutus?.mission}
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                <Scale className="h-10 w-10 text-primary" />
                                {aboutus?.vision}
                            </p>
                        </div>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 mix-blend-multiply" />
                            <img
                                src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80"
                                alt="Technician repairing appliance"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </section>

                    <Separator />

                    {/* Why Choose Us */}
                    <section>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Why Choose Us</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                We bring technical expertise and genuine care to every repair job.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <Card key={index} className="border-none shadow-lg bg-card hover:shadow-xl transition-shadow duration-300">
                                    <CardHeader>
                                        <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                                            <ShieldCheck className="h-10 w-10 text-primary" />
                                        </div>
                                        <CardTitle className="text-xl">{feature.text}</CardTitle>
                                    </CardHeader>
                                    {/* <CardContent>
                                        <CardDescription className="text-base">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent> */}
                                </Card>
                            ))}
                        </div>
                    </section>

                    <Separator />

                    {/* Team Members */}
                    <section>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Meet Our Team</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                The skilled technicians behind our success.
                            </p>
                        </div>
                        <div className="px-12">
                            <Carousel
                                opts={{
                                    align: "start",
                                    loop: true,
                                }}
                                className="w-full"
                            >
                                <CarouselContent>
                                    {team.map((member, index) => (
                                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4 pl-4">
                                            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 group h-full">
                                                <CardContent className="p-0">
                                                    <div className="aspect-square relative overflow-hidden bg-muted">
                                                        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-muted-foreground/20">
                                                            {member.initials}
                                                        </div>
                                                        <img
                                                            src={`https://images.unsplash.com/photo-${index === 0 ? '1573496359142-b8d87734a5a2' : index === 1 ? '1472099645785-5658abf4ff4e' : index === 2 ? '1580489944761-15a19d654956' : index === 3 ? '1507003211169-0a1dd7228f2d' : index === 4 ? '1573497019940-1c28c88b4f3e' : '1519085360753-af0119f7cbe7'}?auto=format&fit=crop&q=80`}
                                                            alt={member.name}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    </div>
                                                    <div className="p-6 text-center">
                                                        <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                                                        <p className="text-sm text-muted-foreground font-medium text-primary">{member.role}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    </section>
                </div>
            </div>
        </WebLayout>
    )
}

export default About