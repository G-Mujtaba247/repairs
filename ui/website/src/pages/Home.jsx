import React from 'react'
import WebLayout from '../layouts/WebLayout'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Star,
    Wrench,
    Refrigerator,
    Thermometer,
    Zap,
    Droplets,
    ArrowRight,
    Phone,
    CheckCircle
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from 'react-router'

const Home = () => {
    const heroSlides = [
        {
            image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80",
            title: "Expert Appliance Repair",
            subtitle: "Fast, reliable, and professional service for all your home appliances."
        },
        {
            image: "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80",
            title: "Certified Technicians",
            subtitle: "Our team is factory trained to handle major brands with precision."
        },
        {
            image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&q=80",
            title: "Same-Day Service",
            subtitle: "Don't let a broken appliance ruin your day. We're here to help."
        }
    ]

    const services = [
        {
            icon: <Refrigerator className="h-10 w-10 text-primary" />,
            title: "Refrigerator Repair",
            description: "Fixing cooling issues, leaks, and noise problems for all fridge models."
        },
        {
            icon: <Droplets className="h-10 w-10 text-primary" />,
            title: "Washer & Dryer",
            description: "Expert repair for washing machines and dryers that won't spin, drain, or heat."
        },
        {
            icon: <Thermometer className="h-10 w-10 text-primary" />,
            title: "Oven & Stove",
            description: "Restoring heat and control to your cooking appliances safely."
        },
        {
            icon: <Zap className="h-10 w-10 text-primary" />,
            title: "Electrical Repair",
            description: "Diagnosing and fixing electrical faults in household appliances."
        }
    ]

    const reviews = [
        {
            name: "Alice Freeman",
            rating: 5,
            comment: "The technician arrived on time and fixed my refrigerator in under an hour. Highly recommended!",
            initials: "AF"
        },
        {
            name: "Bob Smith",
            rating: 5,
            comment: "Excellent service! They saved me from buying a new washing machine. Very professional.",
            initials: "BS"
        },
        {
            name: "Catherine Lee",
            rating: 4,
            comment: "Great experience. The booking process was easy and the repair was done correctly.",
            initials: "CL"
        },
        {
            name: "David Miller",
            rating: 5,
            comment: "Honest pricing and knowledgeable staff. I will definitely use them again.",
            initials: "DM"
        }
    ]

    return (
        <WebLayout>
            <div className="min-h-screen bg-background flex flex-col">

                {/* Hero Carousel Section */}
                <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
                    <Carousel className="w-full h-full" opts={{ loop: true }}>
                        <CarouselContent>
                            {heroSlides.map((slide, index) => (
                                <CarouselItem key={index} className="relative w-full h-[500px] md:h-[600px]">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${slide.image})` }}
                                    >
                                        <div className="absolute inset-0 bg-black/50" /> {/* Overlay */}
                                    </div>
                                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 text-white space-y-6">
                                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
                                            {slide.title}
                                        </h1>
                                        <p className="text-lg md:text-2xl max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                                            {slide.subtitle}
                                        </p>
                                        <Link to="/contact" className="bg-gray-800 text-white animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 text-lg px-8">
                                            Book Now
                                        </Link>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                    </Carousel>
                </section>

                {/* Services Section */}
                <section className="py-20 px-4 bg-muted/30">
                    <div className="container mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our Services</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                We specialize in repairing a wide range of household appliances.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {services.map((service, index) => (
                                <Card key={index} className="border-none shadow-md hover:shadow-xl transition-all duration-300 group">
                                    <CardHeader className="text-center pt-8">
                                        <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                                            {service.icon}
                                        </div>
                                        <CardTitle className="text-xl">{service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center pb-8">
                                        <CardDescription className="text-base">
                                            {service.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Reviews Section */}
                <section className="py-20 px-4 bg-background">
                    <div className="container mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Customer Reviews</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                See what our happy customers have to say about our work.
                            </p>
                        </div>

                        <div className="px-4 md:px-12">
                            <Carousel
                                opts={{
                                    align: "start",
                                    loop: true,
                                }}
                                className="w-full"
                            >
                                <CarouselContent>
                                    {reviews.map((review, index) => (
                                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                                            <Card className="h-full border shadow-sm hover:border-primary/50 transition-colors">
                                                <CardContent className="p-6 flex flex-col gap-4">
                                                    <div className="flex items-center gap-1 text-yellow-500">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-4 w-4 ${i < review.rating ? "fill-current" : "text-muted"}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="text-muted-foreground italic flex-grow">
                                                        "{review.comment}"
                                                    </p>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <Avatar>
                                                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                                                {review.initials}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-semibold text-sm">{review.name}</p>
                                                            <p className="text-xs text-muted-foreground">Verified Customer</p>
                                                        </div>
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
                    </div>
                </section>

                {/* Book Appointment CTA Section */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="space-y-4 text-center md:text-left max-w-2xl">
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                    Ready to get your appliance fixed?
                                </h2>
                                <p className="text-primary-foreground/90 text-lg md:text-xl">
                                    Book an appointment today and get $20 off your first repair service.
                                    Our technicians are standing by.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center md:justify-start">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5" />
                                        <span>No hidden fees</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5" />
                                        <span>90-day warranty</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 w-full md:w-auto">
                                <Link to="/contact" size="xl" className="bg-white text-gray-800 text-lg px-8 py-6 h-auto font-bold shadow-lg hover:shadow-xl transition-all">
                                    Book Appointment
                                </Link>
                                <p className="text-center text-sm opacity-90">
                                    Or call us: <span className="font-bold">(555) 123-4567</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </WebLayout>
    )
}

export default Home
