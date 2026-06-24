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
                specialty: "Mobile Phone Repairs",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
                experience: 8,
                rating: 4.9
            },
            {
                name: "Michael Chen",
                email: "michael@repairsexpert.com",
                phone: "+1 (555) 234-5678",
                specialty: "Laptop & Computer Repairs",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
                experience: 6,
                rating: 4.8
            },
            {
                name: "Emily Davis",
                email: "emily@repairsexpert.com",
                phone: "+1 (555) 345-6789",
                specialty: "Home Appliance Repairs",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
                experience: 7,
                rating: 4.7
            },
            {
                name: "David Wilson",
                email: "david@repairsexpert.com",
                phone: "+1 (555) 456-7890",
                specialty: "Tablet & Smart Device Repairs",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
                experience: 9,
                rating: 5
            },
            {
                name: "Jessica Martinez",
                email: "jessica@repairsexpert.com",
                phone: "+1 (555) 567-8901",
                specialty: "Microwave & Small Appliance Repairs",
                image: "https://images.unsplash.com/photo-1438761681000-0ce8506788ae?auto=format&fit=crop&q=80",
                experience: 5,
                rating: 4.6
            },
            {
                name: "Robert Thompson",
                email: "robert@repairsexpert.com",
                phone: "+1 (555) 678-9012",
                specialty: "Television & Audio System Repairs",
                image: "https://images.unsplash.com/photo-1530268729831-4ca59d999266?auto=format&fit=crop&q=80",
                experience: 10,
                rating: 4.9
            }
        ];

        const createdRepairers = await Repairer.insertMany(repairers);
        console.log(`✅ ${createdRepairers.length} repairers seeded`);

        // Seed Webpages
        const webpages = [
            {
                title: "Our Services",
                slug: "services",
                content: "<h2>Comprehensive Repair Services</h2><p>We offer professional repair services for:</p><ul><li><strong>Mobile Phones:</strong> iPhone, Samsung, Google Pixel, and more</li><li><strong>Laptops & PCs:</strong> Dell, HP, Lenovo, MacBook repairs</li><li><strong>Tablets:</strong> iPad, Samsung Galaxy Tab repairs</li><li><strong>Home Appliances:</strong> Refrigerators, washers, dryers, ovens, microwaves</li><li><strong>Audio & TV:</strong> Smart TVs, soundbars, and audio equipment</li></ul><p>All repairs come with a 90-day warranty on parts and labor. We use genuine parts and follow manufacturer guidelines.</p>",
                featured_image: "https://images.unsplash.com/photo-1581092165854-40129fb0b16d?auto=format&fit=crop&q=80",
                author: "Admin",
                published: true
            },
            {
                title: "Warranty & Guarantees",
                slug: "warranty",
                content: "<h2>Our Warranty Promise</h2><p>We stand behind our work with comprehensive warranty coverage:</p><ul><li><strong>90-Day Warranty:</strong> All repairs covered on parts and labor</li><li><strong>Free Diagnostics:</strong> Complimentary device assessment</li><li><strong>Quality Guarantee:</strong> Factory-trained technicians using OEM parts</li><li><strong>Lifetime Support:</strong> Contact us with any concerns after repair</li></ul><p>If the same issue reoccurs within the warranty period, we'll fix it at no additional cost.</p>",
                featured_image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
                author: "Admin",
                published: true
            },
            {
                title: "Service Areas & Locations",
                slug: "service-areas",
                content: "<h2>Coverage Areas</h2><p>We proudly serve the metropolitan area and surrounding regions:</p><ul><li>Downtown & Business District</li><li>North & South Suburbs</li><li>Residential Communities</li><li>Commercial & Industrial Parks</li></ul><p>Service radius: 50 miles from our central location. Home service and on-site repairs available for appliances.</p>",
                featured_image: "https://images.unsplash.com/photo-1579482646014-0bc10e925e2a?auto=format&fit=crop&q=80",
                author: "Admin",
                published: true
            },
            {
                title: "Pricing & Estimates",
                slug: "pricing",
                content: "<h2>Transparent Pricing</h2><p>We believe in honest, upfront pricing with no hidden fees:</p><ul><li>Free diagnostic assessment</li><li>Transparent written quotes before any work</li><li>Competitive market rates</li><li>Flexible payment options available</li></ul><p>Our pricing includes:</p><ul><li>Parts (genuine/OEM quality)</li><li>Labor</li><li>90-day warranty</li><li>Technical support</li></ul>",
                featured_image: "https://images.unsplash.com/photo-1560264357-8d9766d24a2f?auto=format&fit=crop&q=80",
                author: "Admin",
                published: true
            }
        ];

        const createdWebpages = await Webpage.insertMany(webpages);
        console.log(`✅ ${createdWebpages.length} webpages seeded`);

        // Seed About Us
        const aboutUs = {
            mission: "To provide fast, reliable, and professional device repair services to our community, ensuring customer satisfaction and value.",
            vision: "To be the most trusted, innovative, and customer-centric repair service provider in the region.",
            features: [
                { 
                    title: "⚡ 24/7 Service Available", 
                    description: "Emergency repairs available around the clock. Same-day service for most devices" 
                },
                { 
                    title: "✓ Certified Technicians", 
                    description: "Factory-trained professionals with 5+ years average experience on major brands" 
                },
                { 
                    title: "💰 Transparent Pricing", 
                    description: "No hidden fees, free diagnostics, and honest quotes before any repair work" 
                },
                { 
                    title: "🛡️ 90-Day Warranty", 
                    description: "Comprehensive warranty on all parts and labor with lifetime support" 
                },
                {
                    title: "🚀 Fast Turnaround",
                    description: "Most repairs completed within 1-4 hours depending on device type"
                },
                {
                    title: "📱 Multi-Device Support",
                    description: "We repair phones, laptops, tablets, appliances, TVs, and more"
                }
            ],
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
        };

        const createdAbout = await AboutUs.create(aboutUs);
        console.log(`✅ About Us section seeded`);

        // Seed Contact Us
        const contactUs = {
            phone: "+1 (555) 789-0123",
            email: "info@repairsexpert.com",
            address: "123 Main Street, Downtown Center, Springfield, IL 62701",
            map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0972927686343!2d-87.62712!3d39.78173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b8c6e6e6e6e7%3A0x1234567890abcdef!2sSpringfield%2C%20IL!5e0!3m2!1sen!2sus!4v1234567890",
            faqs: [
                {
                    question: "What is your service area?",
                    answer: "We service the entire metropolitan area and surrounding regions within 50 miles. Contact us to confirm service availability for your specific location."
                },
                {
                    question: "Do you offer emergency/same-day repairs?",
                    answer: "Yes, we offer 24/7 emergency repair services for critical issues. Same-day appointments available for most device types. Call us to schedule urgent repairs."
                },
                {
                    question: "How much do repairs typically cost?",
                    answer: "Costs vary depending on the device type and issue complexity. We provide free diagnostics and written quotes. Most repairs range from $50-$300. Call for specific pricing."
                },
                {
                    question: "What brands do you service?",
                    answer: "We service all major brands: Apple, Samsung, LG, Dell, HP, Lenovo, Sony, GE, Whirlpool, and many more. If you're unsure, call us to verify."
                },
                {
                    question: "Is there a warranty on repairs?",
                    answer: "Yes, all repairs come with a 90-day warranty on parts and labor. If the same issue occurs within this period, we'll fix it at no additional cost."
                },
                {
                    question: "Can you repair it today?",
                    answer: "We offer same-day service for most devices. Call us to check availability or book an appointment. Walk-ins welcome during business hours."
                },
                {
                    question: "What payment methods do you accept?",
                    answer: "We accept all major credit cards, cash, debit cards, bank transfers, and digital payment methods. Payment is due upon completion of repair."
                },
                {
                    question: "Do you do home service repairs?",
                    answer: "Yes, for large appliances like refrigerators, washers, and dryers, we offer on-site home repair service. Additional travel fees may apply."
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
