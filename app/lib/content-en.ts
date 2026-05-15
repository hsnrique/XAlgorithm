import type { LocaleContent } from "./content";

export const content: LocaleContent = {
  ui: {
    kicker: "A plain-English walkthrough",
    title: "How the X “For You” algorithm works",
    intro:
      "Ever wonder why X showed you that post? There’s a chain of 8 steps deciding it. Here it is — in 5 minutes, in plain English.",
    readTime: "5-min read · 8 steps",
    startReading: "Start reading",
    tldrTitle: "The 30-second version",
    diagramTitle: "The flow at a glance",
    diagramNodes: ["Request", "Find candidates", "Filter", "Score with ML", "Your feed"],
    stagesTitle: "Step by step",
    bigIdeaTitle: "The big idea behind the scoring",
    bigIdeaBody: [
      "The model doesn’t output one “relevance” number. It predicts a probability for many different reactions you might have — like, reply, repost, share, click, dwell, block, mute, report. Each action has a weight: good reactions add to the score, bad ones subtract. The feed is sorted by the weighted sum.",
      "That’s why “engagement” isn’t the whole story. Posts that make people block or report aren’t rewarded — those signals push scores down.",
    ],
    shareCtaTitle: "Know someone who’d find this useful?",
    shareCtaBody:
      "If this helped you understand the feed a little better, send it to one person who’d enjoy it.",
    footerSource: "Built from the open-source X For You feed algorithm.",
    viewSource: "View on GitHub",
    stepLabel: "Step",
    createdBy: "Made by",
    underTheHood: "Under the hood:",
    readMore: "Read this step",
    previous: "Previous step",
    next: "Next step",
    backToOverview: "Back to overview",
    share: "Share this page",
    copied: "Link copied",
    localeName: "English",
    switchToOther: "Português",
    detailsTitle: "A little deeper",
    notFoundTitle: "Page not found",
    notFoundBody:
      "That URL doesn’t match anything on this site. Head back to the overview to start from the top.",
  },
  stages: [
    {
      slug: "request-arrives",
      number: 1,
      title: "The request arrives",
      summary: "A request comes in.",
      plain:
        "You open the app and pull to refresh. That sends a request to a service called Home Mixer, which is the conductor for everything that happens next.",
      analogy:
        "Think of Home Mixer as the pass in a restaurant kitchen: every dish goes through it, and it decides what reaches your table and in what order.",
      underTheHood:
        "Home Mixer exposes a gRPC endpoint that returns ranked posts for a user.",
      file: "home-mixer/scored_posts_server.rs",
      details: [
        "Home Mixer doesn’t generate posts itself. It orchestrates a pipeline: it asks other services for candidates, enriches them, filters them, scores them, and finally returns a sorted list.",
        "Splitting orchestration from generation is what makes the system flexible. New candidate sources or new filters can be plugged in without touching the rest.",
      ],
    },
    {
      slug: "who-are-you",
      number: 2,
      title: "Who are you, right now?",
      summary: "The system gathers everything it knows about you.",
      plain:
        "Before fetching any posts, the system builds a fresh picture of you: who you follow, what you’ve liked, replied to, shared, the topics you follow, even what was shown to you recently.",
      analogy:
        "Like a barista who, before making your coffee, glances at what you usually order, what mood you seem to be in, and what you tried last week.",
      underTheHood:
        "These are query hydrators — small pieces of code that each fetch one slice of context in parallel.",
      file: "home-mixer/query_hydrators/",
      details: [
        "Each hydrator fetches one piece of context: followed topics, starter packs, impression bloom filters (so the same post doesn’t haunt you), mutual follow graph, served history.",
        "The big shift is that there are no hand-engineered “features” here. The model receives your raw engagement sequence and learns relevance from it directly.",
      ],
    },
    {
      slug: "two-sources",
      number: 3,
      title: "Two sources of posts",
      summary:
        "It collects candidate posts — from people you follow, and from strangers.",
      plain:
        "Now it gathers candidates from two places, at the same time. Posts from accounts you follow (“in-network”, served by Thunder), and posts from people you don’t follow but might enjoy (“out-of-network”, found by Phoenix).",
      analogy:
        "Two scouts go out: one combs through your inner circle’s posts, the other searches the entire world for things that smell like you.",
      underTheHood:
        "Thunder is a Rust in-memory store fed by Kafka, with sub-millisecond lookups. Phoenix retrieval uses a two-tower model: one tower turns you into a vector, another turns posts into vectors, and the closest matches win.",
      file: "thunder/ · phoenix/recsys_retrieval_model.py",
      details: [
        "Thunder ingests post create and delete events from Kafka and keeps recent posts in memory, organized per user. It can answer “what did the people I follow just post?” in under a millisecond.",
        "Phoenix retrieval is the magic of the “For You” feed: it can surface posts from people you’ve never heard of. The user tower encodes your taste; the candidate tower encodes every post; a similarity search picks the best matches.",
      ],
    },
    {
      slug: "enrichment",
      number: 4,
      title: "Filling in the blanks",
      summary: "It enriches each post with more data.",
      plain:
        "For every candidate post, more data is pulled in: the actual text, media, author info, engagement counts, language, brand-safety signals, whether it’s a quote post, and so on.",
      analogy:
        "Each candidate dish comes back with its full label: ingredients, allergens, where it came from.",
      underTheHood:
        "These are hydrators — they enrich candidates in parallel, before any ranking decision.",
      file: "home-mixer/candidate_hydrators/",
      details: [
        "At this point a candidate is still just an ID. Hydrators attach text, media, author metadata, engagement counts, language codes, and safety signals.",
        "Running them in parallel keeps the request fast. A slow hydrator can be made optional so the request doesn’t block on it.",
      ],
    },
    {
      slug: "cheap-filters",
      number: 5,
      title: "Cheap filters first",
      summary: "It throws out the obvious junk.",
      plain:
        "Before paying the cost of running ML, the obvious removals happen: duplicates, posts that are too old, your own posts, posts from people you’ve blocked or muted, posts containing your muted keywords, and posts you’ve already seen.",
      analogy:
        "The bouncer’s first sweep — anyone clearly not getting in tonight is turned away before the headliner shows up.",
      underTheHood:
        "Each filter is one small piece of code with one job. Composable and cheap to run.",
      file: "home-mixer/filters/",
      details: [
        "The order matters. Cheap filters run first because they reduce the pool of posts that go through the expensive ML step.",
        "These rules are also where personal controls (mutes, blocks, muted keywords) actually take effect.",
      ],
    },
    {
      slug: "scoring",
      number: 6,
      title: "The scoring (the actual algorithm)",
      summary: "It uses an ML model to predict how you’ll react to each post.",
      plain:
        "Each remaining post is scored by an ML model called Phoenix, a transformer based on Grok. For every post it predicts the probability you will: like, reply, repost, quote, click, expand the photo, watch the video, dwell, share, follow the author... and also the negative ones: not interested, block, mute, report.",
      analogy:
        "Imagine a friend looking at a post and quietly betting: “There’s a 14% chance you’ll like this, a 2% chance you’ll reply, a 0.3% chance you’ll block them.” Then they sum it up with weights.",
      underTheHood:
        "Each predicted probability has a weight. Positive actions add to the score; negative actions subtract. Then two correction passes run: author diversity attenuates posts when one author dominates the feed, and an OON scorer rebalances out-of-network content.",
      file: "phoenix/recsys_model.py · home-mixer/scorers/",
      details: [
        "Phoenix is a transformer. It reads your engagement history as a sequence, then for each candidate post predicts a vector of probabilities — one per action type.",
        "A clever trick called “candidate isolation” forbids candidates from attending to each other during scoring. The result: each post’s score depends only on your context, so scores are independent and cacheable.",
      ],
    },
    {
      slug: "selection",
      number: 7,
      title: "Pick the best",
      summary: "It sorts by score and keeps the top ones.",
      plain:
        "Sort by final score. Take the top K. Those are the posts that will be served to you, in that order.",
      analogy:
        "All the dishes have a final star rating. The pass sends out the top ones, best to worst.",
      underTheHood: "A selector just sorts and slices.",
      file: "home-mixer/selectors/",
      details: [
        "K is small — usually a few dozen posts — because most users only scroll through the first handful before pulling again.",
        "The score is what determines order, but the system can also blend in things like ads or “who to follow” suggestions at specific positions after this step.",
      ],
    },
    {
      slug: "safety-pass",
      number: 8,
      title: "One last safety pass",
      summary: "A final safety pass, and the feed is sent back.",
      plain:
        "Right before sending the feed back to you, one more check: anything that was deleted, marked spam, violent, gore, etc. is dropped. Conversation threads get collapsed so you don’t see five branches of the same argument.",
      analogy:
        "The expediter takes one last look at the plate before it leaves the kitchen.",
      underTheHood:
        "Post-selection filters — same idea as step 5, but applied after ranking, on the small final set.",
      file: "home-mixer/filters/",
      details: [
        "Two passes of filtering exist for a reason. Pre-scoring filters are cheap and drop obvious junk before ML. Post-selection filters catch issues that depend on the final picked set — for example, deduplicating conversation branches.",
        "Visibility checks also run here: a post that was deleted or marked as violating policy between retrieval and now is dropped before reaching you.",
      ],
    },
  ],
};
