import React from "react";
import Card from "../ui/Card";
import { IoIosArrowRoundForward } from "react-icons/io";

const cards = [
  {
    img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop",
    name: "Ada Vibes",
    sub: "Singer",
    body: "Soulful Afrobeat vocalist for your events",
   area: "Lagos, Nigeria",
    btn: "View Profile",
    status: "Hireable",
    sticker: "PRO",
  },
  {
    img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    name: "ChiFlow",
    sub: "Dancer",
    body: "Afrobeats dancer & choreographer with 2M+...",
   area: "Abuja, Nigeria",
    btn: "View Profile",
    status: "Sponsorship",
    sticker: "PRO",
  },
  {
    img:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    name: "Anina Art",
    sub: "Painter",
    body: "Contemporary African art with global appea",
    area: "Kano, Nigeria",
    btn: "View Profile",
    status: "Sponsorship",
    sticker: "PRO",
  },
  {
    img:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    name: "Bless Yoga",
    sub: "Yoga",
    body: "Certified yoga instructor for private & group sessions",
    area: "Lagos, Nigeria",
    btn: "View Profile",
    status: "Hireable",
    sticker: "PRO",
  },
];

const CardsSection = () => {
  return (
    <section className="bg-gray-100 py-16 space-y-2">
      <div className="">
      <h1 className="text-black font-semibold text-3xl text-center mb-3 ">Featured Talents</h1>
      <p className="text-gray-500 text-center pb-6  ">Top-rated Professionals ready for your next project</p>
      </div>
      <div className="max-w-6xl mx-auto grid md:flex gap-8 rounded-xl place-items-center ">
        {cards.map((card, index) => (
          <Card
            key={index}
            img={card.img}
            name={card.name}
            sub={card.sub}
            area={card.area}
            body={card.body}
            btn={card.btn}
            status={card.status}
            sticker={card.sticker}
          />
        ))}
      </div>
        <button className=" hover:text-white bg-white text-black rounded-xl px-5 py-2 hover:bg-black flex items-center justify-center gap-2 mx-auto mt-10 w-60 ">Browse All Talent<IoIosArrowRoundForward /></button>
    </section>
  );
};

export default CardsSection;
