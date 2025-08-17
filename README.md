# Meet App

A Progressive Web Application (PWA) built with React that allows users to view, filter, and interact with events. The app supports offline usage, installability, and visual insights via charts.  

---

## User Stories

### Feature 1: Filter events by city  
- As a busy user, I want to filter events by a chosen city so that I see relevant events.  

### Feature 2: Expand and collapse event details  
- As a curious user, I want to expand an event to see details so that I can learn more without leaving the list.  

### Feature 3: Control number of visible events  
- As a user managing limited screen space, I want to set how many events are displayed so that I can avoid excessive scrolling.  

### Feature 4: Offline usage  
- As a traveler with unreliable internet, I want the app to work offline so that I can still access the UI and cached events.  

### Feature 5: Install PWA to device  
- As a mobile-first user, I want to install the app so that I can launch it like a native app.  

### Feature 6: View event charts  
- As a data-oriented user, I want to view charts summarizing events so that I can spot trends quickly.  

---

**Gherkin Scenarios**

**Feature: Filter events by city**

**Feature: Filter events by city**
  As a busy user
  I want to filter events by a chosen city
  So that I see relevant events

  **Scenario:** Show suggestions as the user types
    Given the events list page is open
    And the city search input is focused
    When the user types "Ber"
    Then a list of city suggestions matching "Ber" should appear

  **Scenario:** Select a city from suggestions
    Given the user sees city suggestions
    When the user clicks "Berlin, DE"
    Then the events list updates to show events in "Berlin, DE"

  **Scenario:** Clear filter to see all cities
    Given a city filter is active
    When the user clears the city field
    Then the events list shows events from all available cities



**Feature: Expand and collapse event details**
  As a curious user
  I want to expand an event to see details
  So that I can learn more without leaving the list

  **Scenario:** Collapse details by default
    Given the events list is displayed
    Then each event card shows only summary info
    And details are hidden

  **Scenario:** Expand details for one event
    Given details are hidden for an event
    When the user clicks "Show details"
    Then the event reveals location, description, start/end time, and link

  **Scenario:** Collapse details again
    Given details are visible for an event
    When the user clicks "Hide details"
    Then the event details collapse



**Feature: Control number of visible events**
  As a user managing limited screen space
  I want to set how many events are displayed
  So that I can avoid excessive scrolling

  **Scenario:** Default number of events
    Given the app loads for the first time
    Then the list shows a default number of events (e.g., 32)

  **Scenario:** Change number of visible events
    Given the events list is displayed
    When the user sets "Number of events" to 10
    Then only 10 events should be shown in the list

  **Scenario:** Handle invalid input
    Given the user enters a non-numeric or negative value
    When the value is submitted
    Then the app shows a validation message and keeps the previous valid count



**Feature: Offline usage**
  As a traveler with unreliable internet
  I want the app to work offline
  So that I can still access the UI and cached events

  **Scenario:** Load app shell offline
    Given the user has installed or previously visited the app
    And the device is offline
    When the user opens the app
    Then the app shell (HTML/CSS/JS) loads from cache

  **Scenario:** View cached events offline
    Given the user previously fetched events while online
    And the device is offline
    When the user opens the events list
    Then the app displays the last cached events with an offline indicator

  **Scenario:** Show sync indicator when back online
    Given the app is open with cached data
    And the device regains connectivity
    When the app detects connection restored
    Then the app syncs and refreshes the events list

**Feature: Install PWA to device**
  As a mobile-first user
  I want to install the app
  So that I can launch it like a native app

  **Scenario:** See install prompt when eligible
    Given the app meets PWA installability criteria
    When the browser fires the beforeinstallprompt event
    Then the app shows an "Install" affordance to the user

  **Scenario:** Install the app
    Given the user clicks the "Install" button
    When the browser install dialog appears
    Then the user can confirm install
    And the app icon is added to the home screen

  **Scenario:** Launch installed app
    Given the app is installed
    When the user opens it from the home screen
    Then it opens in standalone/fullscreen display mode

**Feature: View event charts**
  As a data-oriented user
  I want to view charts summarizing events
  So that I can spot trends quickly

  **Scenario:** Events by city chart
    Given there are events across multiple cities
    When the user navigates to the "Insights" or "Charts" view
    Then a chart displays the number of events per city

  **Scenario:** Topic/keyword distribution chart
    Given event data includes titles/descriptions
    When the chart view loads
    Then a chart summarizes frequency of top topics/keywords

  **Scenario:** Chart updates with filters
    Given the user has filtered by "Berlin, DE"
    When the user opens the charts view
    Then the charts reflect only Berlin events

**Deployment**

This app is deployed using Vercel.
Visit the deployed version here: Live App Link (replace # with your actual Vercel URL).

**Installation**

Clone the repository:
git clone https://github.com/your-username/meet-app.git
cd meet-app

Install dependencies:
npm install

Start the development server:
npm start

**Tech Stack**

React.js – Frontend framework

Jest / Cucumber.js – Testing framework

Recharts – Data visualization for charts

Service Workers – Offline support

Vercel – Deployment platform
