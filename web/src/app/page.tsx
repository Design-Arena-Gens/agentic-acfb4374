"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AuroraCanvas } from "@/components/aurora-canvas";

type Idea = {
  title: string;
  summary: string;
  tags: string[];
  momentum: string;
  difficulty: "Low" | "Medium" | "High";
};

type LabUpdate = {
  title: string;
  description: string;
  shipDate: string;
  status: "prototype" | "live" | "ideating";
};

const IDEA_LIBRARY: Idea[] = [
  {
    title: "Living Moodboard",
    summary:
      "A collaborative canvas that rearranges itself using generative gradients and AI-assisted captions the moment someone drops a new inspiration tile.",
    tags: ["WebGL", "Realtime", "Figma API"],
    momentum: "Captures a team's evolving vibe and turns it into motion.",
    difficulty: "High",
  },
  {
    title: "Pocket Mentor",
    summary:
      "Micro lessons that remix your own notes into flashcards and practice prompts, delivered in a calm 3-minute daily ritual.",
    tags: ["LLMs", "Spaced Repetition", "Progressive Web App"],
    momentum: "Gently nudges learners to keep up the streak without pressure.",
    difficulty: "Medium",
  },
  {
    title: "Sonic Garden",
    summary:
      "Seed a soundscape with emojis; watch a generative music engine grow loops that respond to the emoji ecosystem's health.",
    tags: ["Web Audio", "Procedural", "Emoji UI"],
    momentum: "Transforms idle browsers into serene ambient instruments.",
    difficulty: "Medium",
  },
  {
    title: "Moment Atlas",
    summary:
      "Automagically threads highlights into a narrative timeline, helping storytellers anchor key beats before the edit even starts.",
    tags: ["Video", "Embeddings", "Storyboarding"],
    momentum: "Keeps teams aligned on the emotional rhythm of their project.",
    difficulty: "High",
  },
  {
    title: "Pulseboard",
    summary:
      "A mood-first dashboard that reads signals from your tools and paints a color dial showing the team's energy—not just velocity.",
    tags: ["Data Viz", "Sentiment", "Team Health"],
    momentum: "Surfaces the invisible pulses that keep creative teams thriving.",
    difficulty: "Low",
  },
];

const LAB_UPDATES: LabUpdate[] = [
  {
    title: "Waveform UI Kit",
    description:
      "An interface system for sonifying UI events with tasteful micro interactions and drag-and-drop gesture hooks.",
    shipDate: "Shipping Next",
    status: "prototype",
  },
  {
    title: "Prompted Journeys",
    description:
      "Opinionated flow templates for onboarding AI features without breaking trust or overwhelming nobody.",
    shipDate: "Live Today",
    status: "live",
  },
  {
    title: "Playbook Archive",
    description:
      "A living library of creative workouts that spark ideation sprints for remote teams in under 15 minutes.",
    shipDate: "Exploring",
    status: "ideating",
  },
];

const STORY_STEPS = [
  {
    title: "Spark",
    content:
      "Collect fragments—screenshots, phrases, scribbles—and drop them into the nebula to begin shaping a new world.",
  },
  {
    title: "Weave",
    content:
      "Use guided rituals to remix those fragments into narrative threads with directional audio cues to keep momentum.",
  },
  {
    title: "Polish",
    content:
      "Invite collaborators, tune the emotional arc, and export a blueprint ready for decks, prototypes, or full builds.",
  },
];

const STATUS_COPY: Record<LabUpdate["status"], string> = {
  live: "Live",
  prototype: "In Prototype",
  ideating: "Early Sketch",
};

const STATUS_COLOR: Record<LabUpdate["status"], string> = {
  live: "var(--badge-live)",
  prototype: "var(--badge-prototype)",
  ideating: "var(--badge-ideating)",
};

const getRandomIndex = (exclude: number) => {
  let next = Math.floor(Math.random() * IDEA_LIBRARY.length);
  while (next === exclude && IDEA_LIBRARY.length > 1) {
    next = Math.floor(Math.random() * IDEA_LIBRARY.length);
  }
  return next;
};

export default function Home() {
  const [activeIdeaIndex, setActiveIdeaIndex] = useState(() =>
    Math.floor(Math.random() * IDEA_LIBRARY.length),
  );

  const activeIdea = IDEA_LIBRARY[activeIdeaIndex];

  const momentumCards = useMemo(
    () => [
      {
        label: "Why it matters",
        body: activeIdea.momentum,
      },
      {
        label: "Build energy",
        body: `Estimated lift: ${activeIdea.difficulty}. Great for a ${
          activeIdea.difficulty === "Low" ? "weekend dive" : "focused sprint"
        }.`,
      },
    ],
    [activeIdea],
  );

  return (
    <div className="page-shell">
      <main className="hero">
        <AuroraCanvas />
        <div className="hero__content">
          <span className="pill">Agentic Playground</span>
          <h1>Invent the next delightful tool today.</h1>
          <p>
            Welcome to a micro lab for experiments, rituals, and creative
            prototypes. Spin the wheel, catch a spark, and follow the thread to
            a shippable story.
          </p>
          <div className="hero__actions">
            <button
              className="primary"
              type="button"
              onClick={() =>
                setActiveIdeaIndex((prev) => getRandomIndex(prev))
              }
            >
              Shuffle an Idea
            </button>
            <Link className="ghost" href="#blueprint">
              View the Blueprint
            </Link>
          </div>
        </div>
      </main>

      <section className="idea-lab">
        <div className="section-heading">
          <h2>Idea in Focus</h2>
          <p>Each shuffle reveals a ready-to-ship creative experiment.</p>
        </div>

        <article className="idea-card">
          <div>
            <h3>{activeIdea.title}</h3>
            <p className="idea-card__summary">{activeIdea.summary}</p>
          </div>
          <div className="idea-card__meta">
            <ul className="idea-tags">
              {activeIdea.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <div className="idea-pulse">
              {momentumCards.map((card) => (
                <div key={card.label}>
                  <span>{card.label}</span>
                  <p>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section id="blueprint" className="blueprint">
        <div className="section-heading">
          <h2>Blueprint a Moment</h2>
          <p>
            Progress through repeatable rituals that turn sparks into polished
            experiences.
          </p>
        </div>

        <div className="story-steps">
          {STORY_STEPS.map((step, index) => (
            <div key={step.title} className="story-step">
              <span className="story-step__index">{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="lab-updates">
        <div className="section-heading">
          <h2>Lab Dispatch</h2>
          <p>Snapshots from experiments brewing in the background.</p>
        </div>
        <div className="lab-grid">
          {LAB_UPDATES.map((update) => (
            <article key={update.title} className="lab-card">
              <span
                className="status-badge"
                style={{ backgroundColor: STATUS_COLOR[update.status] }}
              >
                {STATUS_COPY[update.status]}
              </span>
              <h3>{update.title}</h3>
              <p>{update.description}</p>
              <span className="lab-date">{update.shipDate}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="cta">
        <div>
          <h2>Ready to explore?</h2>
          <p>
            Save a snapshot of today&apos;s idea and remix it with your crew.
            Every visit reshapes the lab.
          </p>
        </div>
        <div className="cta-actions">
          <a className="primary" href="https://vercel.com/templates">
            Fork the Lab
          </a>
          <a className="ghost" href="https://github.com/vercel/next.js">
            Explore Inspirations
          </a>
        </div>
      </section>
    </div>
  );
}
