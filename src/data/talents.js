//  SINGLE SOURCE OF TRUTH 
// Every component imports from here.


 import Image1 from "../assets/img1.jpg"
 import image2 from "../assets/img2.jpg"
 import image3 from "../assets/img3.jpg"
 import image4 from "../assets/img4.jpg"
 import image5 from "../assets/img5.jpg"
 import image6 from "../assets/img6.jpg"
 import image7 from '../assets/img7.png'
 

export const ALL_TALENTS = [
  {
    id: 1,
    name: "Aduke Vibes",
    category: "Singing",
    rating: 4.9,
    price: 120000,
    badge: "Hireable",
    badgeColor: "bg-green-500",
    tier: "PRO",
    tierColor: "bg-yellow-400 text-black",
    bio: "Soulful Afrobeat vocalist for your events",
    location: "Lagos, Nigeria",
    image: image3 ,
  },
  
  
  {
    id: 4,
    name: "Daredre Arts",
    category: "Painting",
    rating: 4.6,
    price: 60000,
    badge: "Hireable",
    badgeColor: "bg-green-500",
    tier: "PRO",
    tierColor: "bg-yellow-400 text-black",
    bio: "Contemporary Nigerian artist with global gallery exhibitions",
    location: "Kano, Nigeria",
    image: image4,
  },
  {
    id: 5,
    name: "Ronaldotwinnie",
    category: "Football",
    rating: 4.5,
    price: 250000,
    badge: "Sponsorship",
    badgeColor: "bg-blue-500",
    tier: null,
    tierColor: null,
    bio: "Professional footballer available for brand deals",
    location: "Port Harcourt, Nigeria",
    image: "https://media.istockphoto.com/id/1296964999/photo/showcasing-great-skill-and-agility.jpg?s=1024x1024&w=is&k=20&c=jFtJk--uWVcvFGH_mNFAoIH6XSYnNrlT6eyHk_-2pEs=",
  },
  {
    id: 6,
    name: "Adeleke Writes",
    category: "Scriptwriting",
    rating: 4.9,
    price: 45000,
    badge: "Hireable",
    badgeColor: "bg-green-500",
    tier: "PRO",
    tierColor: "bg-yellow-400 text-black",
    bio: "Award-winning screenwriter for film and TV productions",
    location: "Ibadan, Nigeria",
    image: image7,
  },
  {
    id: 7,
    name: "Amaka Swims",
    category: "Swimming",
    rating: 4.4,
    price: 75000,
    badge: "Hireable",
    badgeColor: "bg-green-500",
    tier: null,
    tierColor: null,
    bio: "National swimming champion available for coaching & appearances",
    location: "Enugu, Nigeria",
    image: "https://picsum.photos/seed/amaka/400/480",
  },
  {
    id: 8,
    name: "Ola Music",
    category: "Playing Musical Instruments",
    rating: 4.8,
    price: 130000,
    badge: "Sponsorship",
    badgeColor: "bg-blue-500",
    tier: "PRO",
    tierColor: "bg-yellow-400 text-black",
    bio: "Percussionist blending traditional and modern rhythms",
    location: "Lagos, Nigeria",
    image: image5,
  },
  {
    id: 9,
    name: "AminaArt",
    category: "Painting",
    rating: 4.9,
    price: 70000,
    badge: "Sponsorship",
    badgeColor: "bg-blue-500",
    tier: "PRO",
    tierColor: "bg-yellow-400 text-black",
    bio: "Contemporary African art with global appeal",
    location: "Kano, Nigeria",
    image: "src/assets/IMG_20260126_213005.jpg",
  },
  {
    id: 10,
    name: "BlessYoga",
    category: "Yoga",
    rating: 4.8,
    price: 55000,
    badge: "Hireable",
    badgeColor: "bg-green-500",
    tier: "PRO",
    tierColor: "bg-yellow-400 text-black",
    bio: "Certified yoga instructor for private & group sessions",
    location: "Lagos, Nigeria",
    image: "https://picsum.photos/seed/bless/400/480",
  },
  {
    id: 3,
    name: "FunnyJoy",
    category: "Comedy",
    rating: 4.7,
    price: 80000,
    badge: "Hireable",
    badgeColor: "bg-green-500",
    tier: null,
    tierColor: null,
    bio: "Stand-up comedy that brings the house down",
    location: "Lagos, Nigeria",
    image: image2,
  },
  {
    id: 2,
    name: "ChiFlow",
    category: "Dancing",
    rating: 4.8,
    price: 95000,
    badge: "Sponsorship",
    badgeColor: "bg-blue-500",
    tier: "PRO",
    tierColor: "bg-yellow-400 text-black",
    bio: "Afrobeats dancer & choreographer with 2M+ followers",
    location: "Abuja, Nigeria",
    image: image5,
  },
];

// Categories used in Explore sidebar + dropdown
export const CATEGORIES = [
  "All", "Acting", "Singing", "Chanting", "Dancing",
  "Playing Musical Instruments", "Comedy", "Painting",
  "Storytelling", "Scriptwriting", "Running", "Swimming",
  "Football", "Basketball", "Yoga",
];

// Sections used in Explore sidebar + dropdown
export const SECTIONS = ["All", "Hireable", "Sponsorable"];