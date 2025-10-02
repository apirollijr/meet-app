Feature: Specify Number of Events
    As a user
    I want to choose how many events are shown
    So that I can control how long the list is

    Background:
        Given the app is loaded

    Scenario: A default number of events is shown when the user has not specified a number
        When the list of events is displayed
        Then the app shows the default number of events

    Scenario Outline: User changes the number of events shown
        When the user sets the number of events to "<count>"
        Then up to "<count>" events are displayed
        Examples:
            | count |
            | 10    |
            | 5     |
            | 1     |
