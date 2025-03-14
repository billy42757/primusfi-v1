import React from "react";

interface SectionProps {
  title: string;
  content: string | string[];
}

const Section: React.FC<SectionProps> = ({ title, content }) => (
  <div className="self-stretch flex flex-col justify-start items-start gap-4">
    <div className="self-stretch justify-start text-white text-2xl font-medium font-['Rubik'] leading-7">
      {title}
    </div>
    {Array.isArray(content) ? (
      content.map((paragraph, index) => (
        <div
          key={index}
          className="self-stretch justify-start text-[#838587] text-xl font-normal font-['Rubik'] leading-7"
        >
          {paragraph}
        </div>
      ))
    ) : (
      <div className="self-stretch justify-start text-[#838587] text-xl font-normal font-['Rubik'] leading-7">
        {content}
      </div>
    )}
  </div>
);

const AboutSection: React.FC = () => {
  const sections = [
    {
      title: "Bloom: Democratizing Finance Through Innovation",
      content:
        "At Bloom, we're not just creating a platform; we're transforming how people engage with the financial world. Our mission goes beyond the conventional—it's about empowering individuals like you with the tools to voice your opinions and capitalize on them. Imagine turning your insights and predictions into real, tangible assets. That’s the reality we’re building at Bloom.",
    },
    {
      title: "An Unprecedented Asset Class: Event Contracts",
      content:
        "We've pioneered a revolutionary asset class: event contracts. This isn't just another trading platform; it's a space where you can interact with events that matter to you. Whether it's predicting central bank policies or forecasting technological milestones, Bloom places the power of prediction directly in your hands.",
    },
    {
      title: "Leveling the Playing Field",
      content:
        "For far too long, sophisticated trading and market strategies were the preserve of big banks and institutional investors. Bloom changes the narrative. We're breaking down barriers to ensure everyone can access the tools to make smart trades and strategic investments, leveling the playing field for all.",
    },
    {
      title: "A Marketplace of Ideas",
      content:
        "Picture a stock exchange where, instead of stocks and bonds, the traded commodities are the outcomes of real-world events. This is the essence of Bloom—a platform for the events that shape our world. From climate policies to geopolitical trends, if it impacts your life, it’s likely a market on Bloom.",
    },
    {
      title: "The Power of Yes & No",
      content:
        "Trading on Bloom boils down to a simple yet profound decision: Yes or No. Will an event happen, or won’t it? This binary approach makes trading intuitive and accessible to anyone, regardless of experience. Each Yes/No share represents your belief and a chance to profit from your foresight.",
    },
    {
      title: "Our Commitment",
      content: [
        "As we forge ahead, Bloom remains steadfast in its commitment to inclusivity, transparency, and innovation. We're not just observing the future of finance; we’re building it—one event contract at a time.",
        "Join Bloom, and be part of a community that values predictions, profits from insight, and believes in the democratization of finance. Together, we’re not just trading; we’re shaping the future. This is your opportunity to trade on the events that define our world—with Bloom, your opinions have never been more valuable.",
      ],
    },
  ];

  return (
    <div className="flex-1 py-6 inline-flex flex-col justify-start items-start gap-14 lg:max-h-[80vh] h-auto overflow-y-auto">
      <div className="self-stretch flex flex-col justify-center items-start gap-4">
        <div className="justify-start text-white text-5xl font-medium font-['Rubik'] leading-[48px]">
          What is ChainTrend?
        </div>
        <div className="self-stretch justify-start text-[#838587] text-base font-normal font-['Rubik'] leading-normal">
          Last updated on June 23, 2025
        </div>
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-12">
        {sections.map((section, index) => (
          <Section key={index} {...section} />
        ))}
      </div>
    </div>
  );
};

export { AboutSection };
