Feature: Specify Number of Events
    As a user
    I want to choose how many events are shown
    So that I can control how long the list is

    Scenario: A default number of events is shown when the user has not specified a number
        Given the user is on the main page
        When the user has not specified a number of events to display
        Then 32 events should be displayed by default

    Scenario: User changes the number of events shown
        Given the user is viewing the events list
        When the user changes the number in the "Number of Events" input
        Then the events list should update to show that many events
