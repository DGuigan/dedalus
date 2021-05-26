# Dedalus
My own JavaScript Discord bot named Dedalus.

Relied on this [guide](https://discordjs.guide/) when getting started.

## Commands
**Use the prefix "+" to activate commands.**
* Ping
    * The "hello world" of discord bots
* Delete < int >
    * Delete between 2 and 100 of the previous messeges
* Kick < members... >
    * Kick mentioned members from guild
* Permissions [ members... ]
    * List mentioned members or callers permissions in guild
* Echo < string >
    * Repeats string
* Help [ commands... ]
    * Lists all commands or details about those specified
* Censor < innerCmd > [ args ]
    * Various functions concering censoring words (Just for fun don't actually censor people)
        * status - Replies with on/off status
        * toggle - Toggles status on/off
        * list - Lists words that will be censored
        * add < words... > - Adds given words to blacklist
        * remove < words... > - Removed given words from blacklist
* Reload < commands... >
    * Reloads given commands
