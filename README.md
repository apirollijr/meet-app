# Meet — Serverless React Event App

A progressive web application (PWA) built with React that lets users explore upcoming events from the Google Calendar API. The app supports filtering by city, viewing details, controlling how many events are shown, offline usage, add-to-home-screen installation, and simple data visualizations.

> Tech Stack: React, Vite (or CRA), React Router, Axios/Fetch, Recharts (or similar), Workbox (service worker), OAuth (Google), Serverless functions (e.g., Vercel)

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [User Stories (Features 1–6)](#user-stories-features-1–6)
- [Gherkin Scenarios](#gherkin-scenarios)
- [Architecture & Key Decisions](#architecture--key-decisions)
- [Getting Started (Local Dev)](#getting-started-local-dev)
- [Testing](#testing)
- [Deployment (Vercel)](#deployment-vercel)
- [Submission Checklist](#submission-checklist)
- [Create a ZIP of the Repo](#create-a-zip-of-the-repo)
- [Create an AWS Account (for next exercise)](#create-an-aws-account-for-next-exercise)
- [License](#license)

---

## Project Overview

**Goal:** Provide a fast, installable, mobile-friendly event browser that works even with poor connectivity. Users can:
- Filter events by city
- Expand/collapse event details
- Specify number of events listed
- Use the app offline (cached shell + last fetched results)
- Install the app to their device (PWA)
- View charts that summarize events by city and by topic

**Why serverless?** To keep the app scalable with minimal ops overhead and to safely handle OAuth token exchange without a dedicated server.

---

## Features

1. **Filter events by city**  
2. **Show/hide event details**  
3. **Specify number of events**  
4. **Work offline (PWA caching)**  
5. **Installable app (Add to Home Screen)**  
6. **Charts to visualize event data**

---

## User Stories (Features 1–6)

### Feature 1 — Filter events by city
- **As a** busy user,
- **I should be able to** filter events by typing/selecting a city,
- **So that** I only see events that are relevant to where I am or where I plan to be.

### Feature 2 — Show/hide event details
- **As a** curious user,
- **I should be able to** expand an event to view details and collapse it again,
- **So that** I can quickly scan the list and dive into specifics only when I want.

### Feature 3 — Specify number of events
- **As a** user managing limited screen space,
- **I should be able to** choose how many events are displayed,
- **So that** I can control the density of information and scrolling.

### Feature 4 — Use the app when offline
- **As a** traveler with unreliable internet,
- **I should be able to** load the app shell and see cached results offline,
- **So that** I can still browse the last-synced events and access the UI.

### Feature 5 — Installable app (Add to Home Screen)
- **As a** mobile-first user,
- **I should be able to** install the app to my device home screen,
- **So that** I can launch it like a native app with a full-screen experience.

### Feature 6 — Visualize event data
- **As a** data-oriented user,
- **I should be able to** view charts that summarize events by city and/or topic,
- **So that** I can quickly spot trends and decide where/what to attend.

---

## Gherkin Scenarios

### Feature 1 — Filter events by city
```gherkin
Feature: Filter events by city
  As a busy user
  I want to filter events by a chosen city
  So that I see relevant events

  Scenario: Show suggestions as the user types
    Given the events list page is open
    And the city search input is focused
    When the user types "Ber"
    Then a list of city suggestions matching "Ber" should appear

  Scenario: Select a city from suggestions
    Given the user sees city suggestions
    When the user clicks "Berlin, DE"
    Then the events list updates to show events in "Berlin, DE"

  Scenario: Clear filter to see all cities
    Given a city filter is active
    When the user clears the city field
    Then the events list shows events from all available cities
