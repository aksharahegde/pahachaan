---
title: I Built Three Mac Apps With Glaze
description: What happened when I stopped asking AI to build demos and started giving it the small problems I actually wanted solved — Wolog, Monochrome, and NetRunway.
path: /blog/i-built-three-mac-apps-with-glaze
published: 2026-08-09T12:00:00.000Z
cover: /blog/i-built-three-mac-apps-with-glaze.png
thumbnail: /blog/thumbnails/i-built-three-mac-apps-with-glaze.png
---

<img src="/blog/i-built-three-mac-apps-with-glaze.png" alt="I Built Three Mac Apps With Glaze">

*What happened when I stopped asking AI to build demos and started giving it the small problems I actually wanted solved.*

## The Problem

There are a lot of tiny things I want software to do.

Not another startup.

Not another SaaS product.

Not necessarily something that needs a landing page, a pricing page, authentication, analytics, and a database.

Sometimes I just want a small application that does one thing properly.

The problem is that building those applications has always had a cost.

You have to create the project.

Set up the architecture.

Build the UI.

Wire up the state.

Handle edge cases.

Package it.

Test it.

Then, somewhere in the middle of all that, you start wondering whether the original problem was actually annoying enough to justify building anything in the first place.

Usually, it isn't.

So the idea gets dropped.

I've done this more times than I can count.

> "I should build something for that."

And then I don't.

Glaze changed that calculation for me.

Not because it can build an application from a prompt. We've seen that idea before.

The interesting part is that it makes **small software feel worth building**.

Over the last few months, I ended up building three completely unrelated macOS apps with it:

- **Wolog** — to remember what I actually worked on during the day.
- **Monochrome** — to turn photos into black and white without opening a full image editor.
- **NetRunway** — to see what is happening on my network.

They aren't really products from the same category.

They don't share a market.

They don't even solve similar problems.

That's exactly what made them interesting.

## I Started Building the Things I Would Normally Ignore

The first thing I noticed wasn't that Glaze could build applications.

It was that I started asking myself different questions.

Before:

> Is this worth building?

After:

> What would I build if building it were cheap?

That's a surprisingly different question.

A lot of software ideas die before implementation because the implementation itself is too expensive.

The idea might be useful.

The problem might be real.

But the amount of engineering required is larger than the value of solving it.

So you live with the problem.

Glaze makes that boundary smaller.

It is a desktop-first approach to AI app building. Instead of producing another browser application, the apps live on the Mac and can work with things that actually exist on the machine: files, keyboard shortcuts, menu bar behavior, background processes, APIs, and other OS-level capabilities.

That makes a difference for the kinds of software I wanted to build.

I wasn't looking for another web application.

I wanted utilities.

Small ones.

The kind of software that sits quietly on the machine and does its job.

## Wolog

### Your Work, Remembered

<img src="/blog/i-built-three-mac-apps-with-glaze-wolog.png" alt="Wolog menu bar time tracking on macOS">

The first one was Wolog.

The problem was simple.

At the end of a workday, I usually remember what I worked on.

I don't necessarily remember **when** I worked on it.

I don't remember exactly when I switched tasks.

I don't remember how long something took.

And if I need to fill in a timesheet later, I'm effectively trying to reconstruct the day from memory.

That's not particularly accurate.

So I wanted something that remembered it for me.

Wolog is a keyboard-first macOS menu bar application.

The active task stays visible from the menu bar, with support for the MacBook notch. Tasks can be created, started, paused, resumed, and switched without opening a large application window. When you switch tasks, Wolog automatically stops the previous one and starts the new one.

The important part isn't the task list.

It's the timeline.

At the end of the day, Wolog has a chronological record of what happened:

- task
- start time
- end time
- duration

And that can be copied directly into a company timesheet.

That changes the workflow slightly.

Instead of trying to remember my day at 6 PM, I let the application remember it while the day is happening.

> The best timesheet is probably the one you never have to fill in.

### The Feature I Didn't Want

There is an obvious direction this kind of application could take.

More project management.

More task management.

More dashboards.

More reports.

More charts.

I didn't want that.

Wolog can plan today's tasks, mark planned tasks as completed, search recent tasks and work history, edit task names and time entries, and recover its state after a restart. It also supports configurable global keyboard shortcuts.

But those features are there to support the central behavior.

They aren't the product.

The product is remembering.

That's an important distinction.

A productivity application can easily become another thing you have to maintain.

I wanted the opposite.

The application should do more of the remembering than I do.

## Monochrome

### When One Feature Is Enough

<img src="/blog/i-built-three-mac-apps-with-glaze-monochrome.png" alt="Monochrome photo conversion on macOS">

Monochrome came from a much smaller problem.

I wanted to turn photos into black and white.

That's it.

There are obviously hundreds of applications that can do this.

Most of them can also do many other things.

That's usually where the problem starts.

If I want to make one photograph monochrome, I don't necessarily want to open a full photo editor, find the right adjustment, decide how much contrast I want, export it, and close the application.

I want the operation.

Nothing else.

That was the idea behind Monochrome.

The Glaze profile describes it very simply:

> Convert photos to black & white.

I like that description.

There isn't much to explain.

And that's kind of the point.

### More Functionality Isn't Always More Useful

This is something I've come back to a lot when building software.

There is a tendency to treat functionality as an additive thing.

If one feature is useful, five must be better.

If five are better, twenty must be even better.

Eventually you end up with an application that can do everything except the thing you opened it for.

Monochrome is deliberately the opposite.

The constraint is the feature.

I didn't want to build Photoshop.

I wanted the thing I would open instead of Photoshop when all I wanted was one decision.

That distinction matters.

A small utility doesn't need to justify its existence by accumulating features.

Sometimes doing one thing without getting in the way is enough.

## NetRunway

### Making the Invisible Visible

<img src="/blog/i-built-three-mac-apps-with-glaze-net-runway.png" alt="NetRunway network traffic visualization">

NetRunway came from a different kind of problem.

Network activity is usually invisible.

Packets move.

Connections open.

Services communicate.

Background processes make requests.

And most of the time, I don't need to care.

Until I do.

Then suddenly I want to know what is actually happening.

The Glaze profile describes NetRunway as:

> "Watch your internet traffic take flight."

That idea is what interested me.

Not another giant network administration dashboard.

Just a better way to see something that normally disappears into the background.

### The Hard Part Is Deciding What Should Be Visible

Once you can expose system activity, there is a temptation to expose everything.

That's usually not useful.

A wall of telemetry is technically informative.

It isn't necessarily understandable.

This is the same problem I run into with other software.

Visibility and usability aren't the same thing.

You can show every piece of information and still hide the thing the user actually cares about.

So the interesting question isn't:

> How much data can I show?

It's:

> What should I make visible?

That distinction matters for a network tool.

It matters for Wolog.

It matters for almost every monitoring interface I've ever used.

More information isn't automatically more signal.

## Three Apps, Three Different Reasons

At this point, the three apps don't have much in common.

And that's probably the most interesting part.

| App | Problem | What I wanted |
| --- | --- | --- |
| **Wolog** | Reconstructing my workday | Memory |
| **Monochrome** | Using a large editor for one operation | Focus |
| **NetRunway** | Not knowing what was happening on the network | Visibility |

One remembers something.

One removes everything except the operation I need.

One exposes something that normally stays hidden.

Different problems.

Same instinct.

I wanted software that fit the problem instead of making the problem fit the software.

## The Interesting Part Wasn't the First Prompt

This is probably the part that surprised me most.

The first version of an app is rarely the interesting version.

You describe what you want.

The agent builds it.

You open it.

You notice something.

Then you tell it.

It changes.

You try it again.

Then you notice something else.

That loop becomes the development process.

Glaze's own prompting guidance recommends starting with the core outcome, trying the application, then refining it through smaller follow-up prompts rather than attempting to specify everything in one giant prompt.

That matches how I ended up using it.

The first prompt gets the idea into software.

The following prompts make it mine.

That's an important difference.

> The first version is almost never the product. It's the beginning of the conversation.

## The Developer Doesn't Disappear

It would be easy to look at this and conclude that the developer isn't necessary anymore.

That's not what happened.

If anything, I became more aware of the parts of development that aren't typing code.

The difficult questions were still there:

- What should the application actually do?
- What should it deliberately not do?
- What state should survive a restart?
- What should happen when something fails?
- What belongs in the menu bar?
- What deserves a keyboard shortcut?
- What should be automatic?
- What should require confirmation?
- What should be visible?
- What should stay out of the way?

Those decisions don't disappear.

They become more obvious.

And because the implementation loop is faster, bad decisions become cheaper to discover.

That's useful.

A lot of development time is spent not on writing the code, but on discovering that the thing you thought you wanted isn't actually the thing you wanted.

AI makes that discovery loop faster.

It doesn't remove the need to make the decision.

> The code became cheaper. The decisions didn't.

## What Changed Because It Was Local

There is another reason these experiments felt different from building another web application.

These are desktop utilities.

They can live on the machine.

They can behave like Mac applications instead of websites pretending to be applications.

Glaze is explicitly designed around this model: apps run locally on the Mac and can interact with the filesystem, keyboard shortcuts, menu bar, background processes, APIs, and other OS capabilities.

That changes what "small app" means.

A menu bar application can be enough.

A global keyboard shortcut can be enough.

A background utility can be enough.

A tool that never needs a browser tab can be enough.

You don't need to turn every idea into a web application just because that's the easiest thing to distribute.

<img src="/blog/i-built-three-mac-apps-with-glaze-local-first-desktop.png" alt="Local-first desktop utilities on macOS">

## I Still Had to Care About the Details

AI-generated software doesn't mean automatically good software.

There are still edge cases.

There are still awkward interactions.

There are still assumptions that need correcting.

There are still moments where the application technically works but doesn't behave the way I expected.

And those moments are important.

A good prompt isn't just:

> "That's wrong."

It is closer to:

> "When I switch tasks, the previous task should stop immediately and the new one should become active. The timeline should preserve the previous session rather than replacing it."

The difference is specificity.

The more I used these tools, the more I found myself thinking in terms of outcomes rather than implementation.

That's also something Glaze explicitly encourages in its prompting documentation: describe what you want to be true when the application runs rather than prescribing the underlying framework or implementation.

That's a useful habit even when you're writing the code yourself.

## The Weird Side Effect

Once building software becomes cheap enough, you start noticing all the software you don't have.

Not because you need another app.

Because you start seeing small gaps.

A repetitive task.

A missing shortcut.

A piece of information that is always somewhere but never where you want it.

A workflow that is technically possible but unnecessarily annoying.

Previously, the calculation was:

> Is this problem big enough to build software for?

Now it becomes:

> Would this be useful enough to build?

That is a much lower threshold.

And I think that's where these tools get interesting.

Not when they build another clone of an existing SaaS product.

When they make the tiny, slightly weird, highly personal application economically reasonable.

## The Three Apps Are Actually the Same App

Wolog remembers.

Monochrome simplifies.

NetRunway reveals.

That sounds like three unrelated product ideas.

But underneath them is the same design instinct.

Take something that normally requires:

- remembering
- reconstructing
- navigating
- opening a large application
- interpreting invisible system activity

and reduce it to a small control surface.

The application shouldn't compete for attention.

It should remove friction.

That's probably why all three ended up feeling more like utilities than products.

They don't need to convince me to use them.

I built them because I already wanted them.

<img src="/blog/i-built-three-mac-apps-with-glaze-control-surface.png" alt="Small control surfaces for Wolog, Monochrome, and NetRunway">

## What Glaze Actually Changed for Me

I don't think the interesting claim is:

> AI can build applications.

That's already obvious.

The more interesting claim is:

> **AI can make applications that previously weren't worth building worth building.**

That's different.

Wolog probably wouldn't have survived the old calculation.

I would have had to decide whether tracking my own workday justified the engineering effort.

Monochrome would have been another "maybe someday" utility.

NetRunway would have required enough time to make the idea compete with everything else I was already building.

Instead, I could try them.

Some ideas are good.

Some are not.

That's fine.

The cost of finding out is lower.

And when the cost of experimentation goes down, experimentation itself changes.

## What I Wouldn't Do

I don't think this means we should build an application for everything.

That's just another kind of complexity.

There is still value in not building things.

A script is sometimes enough.

A shell command is sometimes enough.

A shortcut is sometimes enough.

Sometimes the correct solution is to do nothing.

The point isn't that AI makes every idea worth implementing.

It's that it makes the threshold easier to test.

That's a subtle difference.

And probably a more useful one.

## Three Apps Later

Wolog started with a simple annoyance:

I didn't want to reconstruct my workday.

Monochrome started with another:

I didn't want a full photo editor for one operation.

NetRunway started with a third:

I wanted to see something that normally stayed invisible.

None of these required a new category of software.

They were just small problems.

And that's probably why I found the experiment more interesting than I expected.

For years, I've thought about software mostly in terms of projects.

Repositories.

Applications.

Products.

Features.

Now I'm thinking a little more in terms of **tools that should exist**.

That is a different way of looking at development.

## The New Calculation

There is a lot of discussion around AI making software development faster.

I'm sure it does.

But that's not the part I'm most interested in.

The more interesting change is what happens **before** development.

When implementation becomes cheaper, the question changes.

You stop asking:

> Is this worth building?

And start asking:

> What would I build if I didn't have to justify the implementation cost first?

That question leads to smaller software.

More personal software.

More opinionated software.

Sometimes software that only makes sense to one person.

That's okay.

It doesn't need a market.

It doesn't need a pricing page.

It doesn't even need to be impressive.

It just needs to solve the problem.

Maybe that's the real promise of these tools.

Not building more software.

**Finally building the small software you kept wishing existed.**

---

<p class="text-[12px] leading-5 text-zinc-500 dark:text-zinc-400">Disclaimer: Few illustrations in this article were generated with Grok for representation; they are not screenshots of the actual applications.</p>
