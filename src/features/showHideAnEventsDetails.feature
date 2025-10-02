Feature: Show/Hide Event Details
    As a user
    I want to toggle an event’s details
    So that I can scan events quickly or dive into one

    Background:
        Given the app is loaded

    Scenario: Events are collapsed by default
        When the list of events is displayed
        Then each event’s details are hidden

    Scenario: User can expand an event to see its details
        When the user toggles the first event’s details
        Then the first event’s details are visible

    Scenario: User can collapse an event to hide its details
        Given the first event’s details are visible
        When the user toggles the first event’s details
        Then the first event’s details are hidden
