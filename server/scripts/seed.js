import 'dotenv/config';
import { dbConnect } from '../config/db.js';
import Repairer from '../models/repairerModel.js';
import Webpage from '../models/webpageModel.js';
import AboutUs from '../models/aboutUsModel.js';
import ContactUs from '../models/contactUsModel.js';

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seed...');

        await dbConnect();

        // Clear existing data (optional, comment out to preserve data)
        // await Repairer.deleteMany({});
        // await Webpage.deleteMany({});
        // await AboutUs.deleteMany({});
        // await ContactUs.deleteMany({});

        // Seed Repairers
        const repairers = [
            {
                name: "Sarah Johnson",
                email: "sarah@repairsexpert.com",
                phone: "+1 (555) 123-4567",
                specialty: "Refrigerators & Freezers",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
                experience: 8,
                rating: 4.9
            },
            {
                name: "Michael Chen",
                email: "michael@repairsexpert.com",
                phone: "+1 (555) 234-5678",
                specialty: "Washing Machines & Dryers",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
                experience: 6,
                rating: 4.8
            },
            {
                name: "Emily Davis",
                email: "emily@repairsexpert.com",
                phone: "+1 (555) 345-6789",
                specialty: "Ovens & Stoves",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
                experience: 7,
                rating: 4.7
            },
            {
                name: "David Wilson",
                email: "david@repairsexpert.com",
                phone: "+1 (555) 456-7890",
                specialty: "Dishwashers & Microwaves",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
                experience: 9,
                rating: 5
            }
        ];

        const createdRepairers = await Repairer.insertMany(repairers);
        console.log(`✅ ${createdRepairers.length} repairers seeded`);

        // Seed Webpages
        const webpages = [
            {
                title: "Services",
                slug: "services",
                content: "<h2>Our Services</h2><p>We offer comprehensive appliance repair services for all major brands.</p>",
                featured_image: "https://images.unsplash.com/photo-1581092165854-40129fb0b16d?auto=format&fit=crop&q=80",
                author: "Admin",
                published: true
            },
            {
                title: "Warranty",
                slug: "warranty",
                content: "<h2>Our Warranty</h2><p>All repairs come with a 90-day warranty on parts and labor.</p>",
                featured_image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
                author: "Admin",
                published: true
            },
            {
                title: "Service Areas",
                slug: "service-areas",
                content: "<h2>Service Areas</h2><p>We service the entire metropolitan area and surrounding regions.</p>",
                featured_image: "https://images.unsplash.com/photo-1579482646014-0bc10e925e2a?auto=format&fit=crop&q=80",
                author: "Admin",
                published: true
            }
        ];

        const createdWebpages = await Webpage.insertMany(webpages);
        console.log(`✅ ${createdWebpages.length} webpages seeded`);

        // Seed About Us
        const aboutUs = {
            mission: "To provide fast, reliable, and professional appliance repair services to our community.",
            vision: "To be the most trusted and recommended appliance repair service provider in the region.",
            features: [
                { title: "24/7 Service", description: "We're available when you need us most" },
                { title: "Certified Technicians", description: "Factory-trained and certified professionals" },
                { title: "Parts Warranty", description: "90-day warranty on all parts and labor" },
                { title: "Honest Pricing", description: "No hidden fees, transparent quotes" }
            ],
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
        };

        const createdAbout = await AboutUs.create(aboutUs);
        console.log(`✅ About Us section seeded`);

        // Seed Contact Us
        const contactUs = {
            phone: "+1 (555) 789-0123",
            email: "info@repairsexpert.com",
            address: "123 Main Street, Springfield, IL 62701",
            map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0972927686343!2d-87.62712!3d39.78173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b8c6e6e6e6e7%3A0x1234567890abcdef!2sSpringfield%2C%20IL!5e0!3m2!1sen!2sus!4v1234567890",
            faqs: [
                {
                    question: "What is your service area?",
                    answer: "We service the entire metropolitan area and surrounding regions within 50 miles."
                },
                {
                    question: "Do you offer emergency repairs?",
                    answer: "Yes, we offer 24/7 emergency repair services for critical issues."
                },
                {
                    question: "How much do repairs typically cost?",
                    answer: "Costs vary depending on the appliance and type of repair. We provide free estimates."
                },
                {
                    question: "What brands do you service?",
                    answer: "We service all major appliance brands including GE, Whirlpool, LG, Samsung, and more."
                }
            ]
        };

        const createdContact = await ContactUs.create(contactUs);
        console.log(`✅ Contact Us section seeded`);

        console.log('🎉 Database seeded successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    }
};

seedDatabase();
