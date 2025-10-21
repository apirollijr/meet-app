Feature: Show/Hide Event Details
    As a user
    I want to show and hide event details
    So that I can see more information when needed

    Scenario: User can expand an event to see its details
        Given the user is viewing the main page with events
        When the user clicks on the "show details" button for an event
        Then the event details should be visible

    Scenario: User can collapse an event to hide its details
        Given the user is viewing an event with its details expanded
        When the user clicks on the "hide details" button
        Then the event details should be hidden

