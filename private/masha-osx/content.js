// Masha's Mac course: all the words live here. The app (index.html) only renders.
//
// Mini-markdown used in lesson bodies and challenge text:
//   "## Heading", "- bullet", "1. numbered", "> callout", "~~~" code fence (copy button),
//   [[inline code]], **bold**, {{Cmd+Space}} for keys, [text](url) links, | tables |.
// No backticks anywhere (they would end the template literal). No em dashes anywhere.
//
// Shape:
//   modules[].lessons[]  { id, title, minutes, body }
//   modules[].quiz[]     { q, a: [options], c: index of the right one, why }
//                        or { q, type: "text", accept: [regex strings], why }
//   modules[].challenge  { title, body, proof?: { regex, flags?, sample, placeholder, hint } }
//   tips[]               { title, body }   (Mac moments, one per day on the home screen)
//   levels[]             { xp, name }      (ascending)
window.CONTENT = {
  version: "1.0.0",
  xp: { lesson: 10, answer: 5, challenge: 25 },
  levels: [
    { xp: 0, name: "Newcomer" },
    { xp: 60, name: "Spotlight Seeker" },
    { xp: 180, name: "Finder Friend" },
    { xp: 320, name: "Terminal Tamer" },
    { xp: 480, name: "Pipe Dreamer" },
    { xp: 660, name: "Brew Master" },
    { xp: 860, name: "Git Gardener" },
    { xp: 1080, name: "Claude Co-pilot" },
    { xp: 1320, name: "myos Operator" },
    { xp: 1560, name: "Owner" },
  ],
  modules: [
    // ───────────────────────────────────────────── m0
    {
      id: "m0",
      emoji: "🗺️",
      title: "Welcome",
      blurb: "How this course works, and how to keep it on the Dock.",
      badge: "Map Reader",
      lessons: [
        {
          id: "l1",
          title: "What this is",
          minutes: 3,
          body: `This page is a course in ten modules. It takes you from "which key is Cmd" to running **myos** (Harry's Claude Code setup) and owning your job search app.

Every module has three parts:

- **Lessons**: short reads with commands you can copy with one tap.
- **A quiz**: a few questions to see what stuck. Wrong answers are fine; you get the explanation and can try again.
- **A challenge**: a real thing to do on the Mac. Some challenges check your terminal output right here on the page.

You earn XP for each of those. Your level is shown at the top. Nothing here counts days or tells you off for taking a break. Close the lid, come back next week, it waits.

> 💡 You do not have to go in order, but the modules build on each other. Module 3 assumes you did module 1.

## The one rule

Do everything **on the Mac itself**, not on your Windows laptop. The whole point is to get your hands on the keys.`,
        },
        {
          id: "l2",
          title: "Keep it on the Dock",
          minutes: 2,
          body: `This page can be installed like an app. Progress is saved **in the browser you use**, so pick one browser on the Mac and stick with it.

## In Chrome

1. Open this page in Chrome.
2. Look at the right end of the address bar for an install icon (a small monitor with an arrow), or open the three-dot menu and choose **Cast, save, and share** then **Install page as app**.
3. It opens in its own window and lands in the Dock. Right-click the Dock icon and choose **Options > Keep in Dock**.

## In Safari

1. Open this page in Safari.
2. Menu **File > Add to Dock**.

> 💡 Progress stays on this Mac in this browser. The Progress screen has an Export button if you ever want to move it.

That is it. Go and earn your first XP: finish this module's quiz.`,
        },
      ],
      quiz: [
        { q: "Where is your progress saved?", a: ["On Harry's server", "In the browser on this Mac", "In your Google account", "Nowhere, it resets every time"], c: 1, why: "It lives in this browser's local storage. That is why you should keep using the same browser on the Mac." },
        { q: "You take two weeks off. What happens to your progress?", a: ["It is deleted", "You lose your level", "Nothing, it waits for you", "You get a warning email"], c: 2, why: "No nagging. The page waits." },
        { q: "What does a challenge ask you to do?", a: ["Read a longer text", "Watch a video", "Do a real thing on the Mac, sometimes proving it with terminal output", "Rate the lesson"], c: 2, why: "Challenges are hands-on. Several check the output you paste." },
        { q: "Which machine should you use for this course?", a: ["The Windows laptop", "Your phone", "The MacBook", "Any of them"], c: 2, why: "Hands on the Mac keys. That is the whole idea." },
      ],
      challenge: {
        title: "Install the page as an app",
        body: `Install this page as an app in Chrome or Safari and open it from the Dock. Then tick the box below.

> 💡 If the install icon is missing in Chrome, make sure you opened the page over https (the published link), not as a file.`,
      },
    },
    // ───────────────────────────────────────────── m1
    {
      id: "m1",
      emoji: "⌨️",
      title: "Hello, Mac",
      blurb: "The keyboard, Spotlight, Finder, windows and the trackpad, translated from Windows.",
      badge: "Spotlight Seeker",
      lessons: [
        {
          id: "l1",
          title: "The keyboard is the big difference",
          minutes: 5,
          body: `On Windows the magic key is {{Ctrl}}. On the Mac it is {{Cmd}} (⌘), the key right next to the space bar. Almost every shortcut you know works if you swap Ctrl for Cmd.

| Windows | Mac | What it does |
|---|---|---|
| Ctrl+C / Ctrl+V / Ctrl+X | Cmd+C / Cmd+V / Cmd+X | copy, paste, cut |
| Ctrl+Z / Ctrl+Y | Cmd+Z / Cmd+Shift+Z | undo, redo |
| Ctrl+S / Ctrl+A / Ctrl+F | Cmd+S / Cmd+A / Cmd+F | save, select all, find |
| Alt+Tab | Cmd+Tab | switch apps (hold Cmd, tap Tab) |
| Alt+F4 | Cmd+Q | quit the app for real |
| Ctrl+W | Cmd+W | close the window or tab |
| Home / End | Cmd+Left / Cmd+Right | start or end of the line |
| Ctrl+Left / Ctrl+Right | Option+Left / Option+Right | jump a word |
| Delete (forward) | Fn+Delete | delete the character after the cursor |
| Win+L | Ctrl+Cmd+Q | lock the screen |
| PrtScn | Cmd+Shift+4 | screenshot of an area (lands on the Desktop) |
| Ctrl+Alt+Del | Cmd+Option+Esc | force quit a stuck app |

## The other keys

- {{Option}} (⌥) is the Alt key. It types special characters and modifies shortcuts.
- {{Control}} (^) exists too, but it is rare outside the Terminal.
- {{Fn}} (bottom left, with a globe) unlocks F1 to F12 and the forward delete.

## The red dot does not quit

Closing a window with the red dot leaves the app running (you can see a dot under its icon in the Dock). {{Cmd+Q}} quits. Harry's tip: quit with {{Cmd+Q}} when you are done with an app, close windows with {{Cmd+W}}.

> 💡 Every app's own settings are at {{Cmd+,}} (Cmd and comma). Works everywhere.`,
        },
        {
          id: "l2",
          title: "Spotlight: the one key combo to rule them all",
          minutes: 3,
          body: `Press {{Cmd+Space}}. A search box appears in the middle of the screen. This is **Spotlight**, and it is how Harry opens everything.

Type a few letters of an app name and press {{Return}}:

- [[term]] then Return opens the Terminal.
- [[chro]] opens Chrome.
- [[sys]] opens System Settings.
- [[cal]] opens Calendar.

Spotlight also does small jobs without opening anything:

- Maths: type [[23*4.5]] and read the answer.
- Units: [[180 cm in feet]] or [[45 chf in eur]].
- Files: type part of a file name and press Return to open it.
- Definitions: type a word and look for the dictionary entry.

> 💡 Harry starts every app this way. He never clicks through folders to find an app. Try to go a whole day without the Launchpad or the Applications folder.

## Try it now

{{Cmd+Space}}, type [[term]], Return. A white or black window with a blinking cursor is the Terminal. Say hello to it, we come back here in module 3. Press {{Cmd+Q}} to quit it.`,
        },
        {
          id: "l3",
          title: "Finder and the Dock",
          minutes: 5,
          body: `**Finder** is the Mac's file explorer. The smiling blue face at the left of the Dock. It is always running, you cannot quit it.

## Things that are different from Explorer

- Your personal folder is called your **home folder**. In Finder, {{Cmd+Shift+H}} jumps there. In the Terminal it is written [[~]] (tilde).
- There is no C: drive. Everything hangs off one root folder called [[/]].
- **Quick Look**: select any file and press {{Space}}. A preview pops up. Press Space again to close. This works for PDFs, images, code, videos. You will use it constantly.
- **Go to folder**: {{Cmd+Shift+G}}, type a path like [[~/Downloads]], Return.
- **Show hidden files**: {{Cmd+Shift+.}} (Cmd, Shift and the full stop). Dotfiles like [[.zshrc]] appear and disappear.
- **Copy a file's path**: select it, hold {{Option}}, open the Edit menu, choose **Copy "name" as Pathname**. Or just drag the file into a Terminal window: the path is pasted.
- **Delete**: {{Cmd+Delete}} moves to the Bin. Empty the Bin with {{Cmd+Shift+Delete}}.
- **Rename**: select and press {{Return}} (yes, Return renames; it does not open). {{Cmd+O}} opens, or double-click.
- **Info**: {{Cmd+I}} shows size, kind and where it lives.

## The menu bar belongs to the active app

The bar at the very top of the screen is not part of a window. It shows the menus of whatever app is in front. Click an app and watch the bar change. The right side holds Wi-Fi, battery, the clock and Control Centre.

## The Dock

The strip at the bottom holds your favourite apps, running apps (with a dot), and the Bin. Drag an app in to keep it; drag it out until "Remove" appears to drop it. Right-click an icon for options.`,
        },
        {
          id: "l4",
          title: "Windows, desktops and the traffic lights",
          minutes: 4,
          body: `Every window has three dots top left: red (close), yellow (minimise to the Dock), green (full screen).

- **Green** puts the app in its own full-screen space. Swipe sideways with three fingers to move between spaces. Move the mouse to the top to reveal the menu bar, and click the green dot again to leave.
- **Hover over the green dot** to get tiling options (left half, right half, and more). You can also drag a window to a screen edge to snap it.
- **Double-click the title bar** to make a window fill the screen without going full screen.

## Switching

- {{Cmd+Tab}} cycles apps. Hold Cmd, tap Tab until the app you want is highlighted, let go.
- {{Cmd+\`}} (the key above Tab) cycles windows of the same app.
- {{Cmd+H}} hides the app you are in. Click it in the Dock to get it back.
- **Mission Control**: swipe up with three fingers (or press {{Ctrl+Up}}) to see every window at once. Swipe down with three fingers to see the windows of the current app only.

## Desktops

In Mission Control, click the + at the top right to add a desktop. Keep "browser and Terminal" on one and "everything else" on another. Three-finger swipe moves between them.

> 💡 If a window is stuck off-screen, hold {{Option}} and click the green dot, or choose **Window > Zoom** from the menu bar.`,
        },
        {
          id: "l5",
          title: "Trackpad and System Settings",
          minutes: 4,
          body: `The trackpad is a big part of why Macs feel nice. Set it up once.

Open **System Settings** ({{Cmd+Space}}, type [[sys]]). It has a search box top left; type what you want instead of hunting through the sidebar.

## Trackpad

Search **Trackpad**.

- **Tap to click**: on. A light tap is a click, no pressing.
- **Secondary click**: "Click or tap with two fingers". That is your right-click.
- **Tracking speed**: nudge it faster than the default.
- **Scroll direction, Natural**: the Mac scrolls like a phone (content follows your fingers). If that feels wrong after a week, switch it off here. Give it the week.
- **Three-finger drag** (under Accessibility > Pointer Control > Trackpad Options) lets you move windows by dragging with three fingers. Harry's favourite.

## Other gestures

- Two fingers left or right in the browser: back and forward.
- Pinch: zoom. Two-finger click: right-click.
- Four fingers pinch in: Launchpad (all apps).

## Keyboard

Search **Keyboard**. Set **Key repeat rate** to fast and **Delay until repeat** to short. Holding backspace will then eat text quickly, which matters in the Terminal.

Under **Text Input > Input Sources** check the layout matches the physical keyboard (Swiss German has the ü where you expect it).

> 💡 System Settings is searchable. "dark" finds Appearance, "wallpaper" finds Wallpaper, "bluetooth" finds Bluetooth. You never need to know where a setting lives.`,
        },
      ],
      quiz: [
        { q: "Which key replaces Ctrl for most shortcuts on the Mac?", a: ["Option", "Control", "Cmd", "Fn"], c: 2, why: "Cmd (⌘) sits next to the space bar and takes the role Ctrl has on Windows." },
        { q: "You press the red dot on a Chrome window. What happens to Chrome?", a: ["It quits", "It keeps running with no windows", "It minimises", "It restarts"], c: 1, why: "The red dot closes the window. Cmd+Q quits the app." },
        { q: "How do you open any app the Harry way?", a: ["Launchpad", "Applications folder in Finder", "Cmd+Space, type, Return", "Right-click the Desktop"], c: 2, why: "Spotlight. Cmd+Space, a few letters, Return." },
        { q: "Which key gives you a quick preview of a selected file in Finder?", a: ["Return", "Space", "Cmd+O", "Tab"], c: 1, why: "Space is Quick Look. Return renames." },
        { q: "What is the Mac equivalent of Alt+Tab?", a: ["Cmd+Tab", "Option+Tab", "Ctrl+Tab", "Fn+Tab"], c: 0, why: "Cmd+Tab switches apps; Cmd+backtick switches windows of one app." },
        { q: "Which shortcut shows hidden files in Finder?", a: ["Cmd+H", "Cmd+Shift+.", "Cmd+Shift+H", "Option+H"], c: 1, why: "Cmd+Shift+. (full stop) toggles dotfiles. Cmd+Shift+H goes to your home folder." },
        { q: "What does Cmd+Shift+4 do?", a: ["Locks the screen", "Takes a screenshot of an area you draw", "Opens Spotlight", "Quits the front app"], c: 1, why: "Cmd+Shift+3 is the whole screen, Cmd+Shift+4 an area, Cmd+Shift+5 the screenshot toolbar." },
        { q: "Where is the menu bar of the app you are using?", a: ["At the top of its window", "At the top of the screen", "In the Dock", "Behind the green dot"], c: 1, why: "The menu bar is shared and always shows the front app's menus." },
      ],
      challenge: {
        title: "Set up the trackpad and prove it with a screenshot",
        body: `1. Open System Settings with Spotlight.
2. Turn on **Tap to click** and the two-finger secondary click.
3. Press {{Cmd+Shift+4}} and draw a box around the Trackpad settings.
4. Find the screenshot on the Desktop and press {{Space}} to Quick Look it.

Tick the box when the screenshot is on your Desktop.`,
      },
    },
    // ───────────────────────────────────────────── m2
    {
      id: "m2",
      emoji: "🧩",
      title: "Make it yours",
      blurb: "Your account, Google Calendar in the Mac calendar, Chrome, looks and safety.",
      badge: "Settled In",
      lessons: [
        {
          id: "l1",
          title: "Your account and your Apple ID",
          minutes: 3,
          body: `Harry set up a user account for you on this Mac. Everything you do lives in your home folder, and his account cannot see it.

## Apple ID

Many things on a Mac want an Apple ID: the App Store, iCloud, Find My. If you have an iPhone, you already have one. Sign in with it under **System Settings > Apple Account** (top of the sidebar). You do not have to turn on iCloud Drive or Photos; untick what you do not want.

If you have no Apple ID, you can skip this for now. Everything in this course works without one, because we install tools with Homebrew, not the App Store.

## Software Update

Search **Software Update** in System Settings and let the Mac install what it offers. Do it now while you read the next lesson; it can take a while and asks to restart.

> 💡 Your password is asked for often: installs, settings changes, the Terminal's [[sudo]]. That is normal. Nothing bad happens when you type it into a system dialog. Never type it into a web page that pretends to be one.`,
        },
        {
          id: "l2",
          title: "Google Calendar in the Mac's Calendar",
          minutes: 4,
          body: `The Mac's **Calendar** app can show your Google calendar, with notifications in the corner and a monthly view that is nicer than the web.

## Steps

1. Open System Settings and search **Internet Accounts**.
2. Click **Add Account**, choose **Google**.
3. A browser window opens. Sign in with your Google account and allow access.
4. Back in Settings you get a list of apps: **Mail, Contacts, Calendars, Notes**. Tick **Calendars**. Untick **Mail** (we leave Apple Mail alone; Gmail in the browser is better). Contacts is your call.
5. Open Calendar ({{Cmd+Space}}, [[cal]]). Your Google events appear within a minute. If not, choose **View > Refresh Calendars**.

## Using Calendar

- {{Cmd+N}} makes an event. Type "Lunch with Lea Friday 12:30" in the quick box and it understands.
- {{Cmd+T}} jumps to today. {{Cmd+1}} to {{Cmd+4}} switch day, week, month, year.
- In **Calendar > Settings > General**, set the default calendar to your Google one so new events go to Google.
- Notifications: **System Settings > Notifications > Calendar** to choose banners or alerts.

> 💡 Click the clock top right to open Notification Centre and see today's events.`,
        },
        {
          id: "l3",
          title: "Chrome, passwords and the browser you will live in",
          minutes: 3,
          body: `Safari is fine, but Chrome is what you know and what the course pages were tested in.

## Install Chrome

For now, download it from [google.com/chrome](https://www.google.com/chrome/) and drag the icon into Applications when the window asks you to. (In module 5 you learn to install apps with one terminal command instead. [[brew install --cask google-chrome]] is that command.)

Open it with Spotlight, sign in to your Google account so your bookmarks and passwords sync, and set it as the default browser when it asks.

## Passwords

Two good options, pick one and use it everywhere:

- Chrome's built-in password manager (synced with your Google account).
- The Mac's **Passwords** app (synced with your Apple ID, works in Safari and on iPhone).

Whichever you choose: let it generate passwords, never reuse one. The Mac will keep asking for your Mac login password in the Terminal and for installs; keep that one in your head.

> 💡 {{Cmd+L}} jumps to the address bar in every browser. {{Cmd+T}} new tab, {{Cmd+W}} close tab, {{Cmd+Shift+T}} reopen the tab you just closed, {{Cmd+1}} first tab.`,
        },
        {
          id: "l4",
          title: "Looks and little comforts",
          minutes: 3,
          body: `Five minutes in System Settings make the Mac feel like yours.

- **Appearance**: Light, Dark or Auto. Auto flips at sunset.
- **Wallpaper**: pick one. The dynamic ones change with the time of day.
- **Desktop & Dock**: make the Dock smaller, turn on **Automatically hide and show the Dock** if you like the screen space, and under **Hot Corners** set the bottom right corner to **Lock Screen**.
- **Displays > Night Shift**: warmer colours in the evening.
- **Keyboard > Text Replacements**: type [[@@]] and get your email address, or [[addr]] and get your address. Add a few.
- **Control Centre**: choose what sits in the menu bar (battery percentage is worth showing).
- **Lock Screen**: require the password immediately after sleep.

## Three apps that come with the Mac and are worth knowing

- **Notes**: fast, syncs to the iPhone, fine for a daily to-do.
- **Preview**: opens PDFs and images, can sign PDFs (Tools > Annotate > Signature), crop, resize, convert.
- **TextEdit**: for plain text. {{Cmd+Shift+T}} switches a document to plain text.

> 💡 Hold {{Option}} while clicking the Wi-Fi or sound icon in the menu bar for the hidden technical details.`,
        },
        {
          id: "l5",
          title: "Safety basics",
          minutes: 3,
          body: `Four things, once.

- **FileVault** (search it in Settings): on. It encrypts the disk, so a lost laptop is only a lost laptop. If it asks about a recovery key, let it store it in your Apple ID or write the key down somewhere safe.
- **Backups**: the simplest is Time Machine with any external disk; plug it in, Settings asks whether to use it. Until you have one: keep code in GitHub (module 6) and documents in Google Drive. Then a lost disk costs you nothing.
- **Firewall** (search it): on.
- **Updates**: automatic.

## About "the Mac wants to install something"

Apps you download from the web may show "cannot be opened because the developer cannot be verified". That is Gatekeeper. For apps you trust (ones named in this course) you can allow it under **Settings > Privacy & Security**, scroll down to the message, click **Open Anyway**. For random downloads, listen to the warning.

> 💡 Lock the screen whenever you walk away: {{Ctrl+Cmd+Q}}. In the café, on the train, at work.`,
        },
      ],
      quiz: [
        { q: "Where do you add your Google account so Calendar shows your events?", a: ["In the Calendar app's File menu only", "System Settings > Internet Accounts", "The App Store", "Spotlight"], c: 1, why: "Internet Accounts is the place. Tick Calendars, untick Mail." },
        { q: "Why does the course say to untick Mail?", a: ["It costs money", "Apple Mail is not great; Gmail in the browser is better", "Gmail does not allow it", "It is unsafe"], c: 1, why: "Harry's call: Mail stays off, Gmail in the browser." },
        { q: "What does FileVault do?", a: ["Backs up to the cloud", "Encrypts the disk", "Blocks websites", "Stores passwords"], c: 1, why: "Full-disk encryption. A lost laptop stays only a lost laptop." },
        { q: "Which shortcut locks the screen?", a: ["Cmd+L", "Ctrl+Cmd+Q", "Cmd+Shift+L", "Fn+L"], c: 1, why: "Ctrl+Cmd+Q. Cmd+L is the address bar in the browser." },
        { q: "What is Cmd+, (comma) for?", a: ["Zoom out", "Settings of the app you are in", "Switch tabs", "Nothing"], c: 1, why: "Every Mac app opens its settings with Cmd+comma." },
        { q: "You see 'developer cannot be verified'. Where can you allow a trusted app anyway?", a: ["Settings > Privacy & Security", "Finder > Get Info", "The App Store", "Keychain"], c: 0, why: "The Open Anyway button appears there shortly after you tried to open the app." },
      ],
      challenge: {
        title: "Calendar shows your Google events",
        body: `Add your Google account under Internet Accounts with Calendars on and Mail off. Open Calendar and find next week's view ({{Cmd+2}}). Add one event from the Mac and check it shows up on your phone.

Tick the box when it does.`,
      },
    },
    // ───────────────────────────────────────────── m3
    {
      id: "m3",
      emoji: "🖥️",
      title: "The Terminal, first steps",
      blurb: "What a shell is, moving around, making and reading files. Practise in the sandbox first.",
      badge: "Terminal Tamer",
      lessons: [
        {
          id: "l1",
          title: "What the Terminal is and why Harry lives in it",
          minutes: 4,
          body: `The Terminal is a window where you type commands instead of clicking. Under the pretty surface, macOS is **Unix**: the same family as Linux. Nearly every server on the internet speaks this language, and so does Claude Code. Learn thirty commands and the whole machine is yours.

## Open it

{{Cmd+Space}}, type [[term]], Return. You see something like:

~~~
masha@MacBook ~ %
~~~

That line is the **prompt**. It says who you are, which machine, which folder ([[~]] is your home folder), and [[%]] means "ready, type something". The program reading your typing is called the **shell**. On the Mac it is **zsh**.

## Three rules

1. Type a command, press {{Return}}. The result prints below. The prompt comes back.
2. If something runs forever or you want out: {{Ctrl+C}}. (Yes, Control, not Cmd. The Terminal is the one place Control matters.)
3. Nothing is case-insensitive. [[Downloads]] and [[downloads]] are different.

## Settings worth doing now

{{Cmd+,}} in Terminal. Under **Profiles**, pick a theme you like (Pro is dark, Basic is light), set the font to 14 or bigger. Click **Default** so new windows use it.

> 💡 {{Cmd+K}} clears the screen. {{Cmd+T}} opens a new tab. {{Cmd++}} makes the text bigger.

## Before you touch the real one

Open the **Sandbox** from the menu at the top of this page. It is a pretend terminal with a pretend home folder; you cannot break anything there. Every command in the next lessons works in it.`,
        },
        {
          id: "l2",
          title: "Where am I? pwd, ls, cd",
          minutes: 6,
          body: `Three commands cover ninety percent of moving around.

~~~
pwd
~~~

**P**rint **w**orking **d**irectory: which folder you are in. Fresh Terminal: [[/Users/masha]], your home.

~~~
ls
ls -l
ls -la
~~~

**L**i**s**t what is here. [[-l]] gives the long form (size, date), [[-a]] shows hidden files too (the ones starting with a dot). Letters after a dash are called **flags**.

~~~
cd Downloads
cd ..
cd ~
cd -
~~~

**C**hange **d**irectory. [[..]] is the folder above, [[~]] is home, [[-]] is "back where I just was". [[cd]] alone also goes home.

## Paths

A path is an address. [[/Users/masha/Downloads/cv.pdf]] is absolute (starts at the root [[/]]). [[Downloads/cv.pdf]] is relative to where you are. [[~/Downloads]] works from anywhere.

Spaces in names must be escaped or quoted: [[cd "My Folder"]] or [[cd My\\ Folder]]. Better: avoid spaces in folder names you make.

## The two keys that make this fast

- {{Tab}} completes names. Type [[cd Dow]] and press Tab: it becomes [[cd Downloads/]]. Press Tab twice to see all options.
- {{Up}} brings back the last command. Keep pressing for older ones.

## Finder and Terminal talk to each other

- [[open .]] opens the current folder in Finder.
- Drag any folder from Finder into the Terminal window and its path is typed for you. Then press Return.
- In Finder, right-click a folder and look for **New Terminal at Folder** under Services (turn it on in Settings > Keyboard > Keyboard Shortcuts > Services if it is missing).

> 💡 Try this in the Sandbox: [[cd Documents]], [[ls]], [[cd ..]], [[pwd]].`,
        },
        {
          id: "l3",
          title: "Make, copy, move, delete",
          minutes: 5,
          body: `~~~
mkdir Playground
mkdir -p Playground/week1/notes
~~~

**M**a**k**e **dir**ectory. [[-p]] makes the whole chain at once.

~~~
touch notes.txt
~~~

Makes an empty file (or updates the date of an existing one).

~~~
cp notes.txt notes-copy.txt
cp -r Playground Playground-backup
~~~

**C**o**p**y. Folders need [[-r]] (recursive).

~~~
mv notes.txt ideas.txt
mv ideas.txt Playground/
~~~

**M**o**v**e, which is also how you rename. Same command, both jobs.

~~~
rm ideas.txt
rm -r Playground-backup
~~~

**R**e**m**ove. **There is no Bin and no undo.** [[rm]] is gone-gone. Read the name twice before you press Return. Never run [[rm -rf]] on anything you did not make yourself, and never on [[~]] or [[/]].

> 💡 Safer habit: move things to the Bin from the Terminal with [[mv file ~/.Trash/]]. Then the Finder can bring it back.

## open

- [[open file.pdf]] opens it in the default app, like a double-click.
- [[open -a "Visual Studio Code" .]] opens the current folder in a named app.
- [[open https://github.com]] opens a URL in the browser.

## A shape you will see a lot

~~~
command -flags what-to-act-on
~~~

Command first, flags with a dash, then the file or folder. [[man command]] shows the manual (press [[q]] to leave it, {{Space}} to page down). [[command --help]] often gives a shorter version.`,
        },
        {
          id: "l4",
          title: "Read files: cat, less, head, tail, echo",
          minutes: 5,
          body: `~~~
cat notes.txt
~~~

Prints the whole file. Good for short ones. (The name comes from con**cat**enate: [[cat a.txt b.txt]] prints both in a row.)

~~~
less README.md
~~~

For long files: scroll with {{Space}} and the arrows, search with [[/word]], leave with [[q]].

~~~
head notes.txt
head -n 3 notes.txt
tail notes.txt
tail -f app.log
~~~

First or last ten lines. [[-n 3]] for three. [[tail -f]] **follows** a growing file live (a log while a program runs). {{Ctrl+C}} to stop following.

~~~
wc -l notes.txt
~~~

**W**ord **c**ount; [[-l]] counts lines.

## Writing without an editor

~~~
echo "hello"
echo "first line" > notes.txt
echo "second line" >> notes.txt
cat notes.txt
~~~

[[echo]] prints text. [[>]] sends the output into a file (**replacing** it). [[>>]] appends. This works with any command: [[ls -la > listing.txt]].

## Editing a file for real

- [[open -e notes.txt]] opens it in TextEdit.
- [[nano notes.txt]] edits inside the Terminal: type, {{Ctrl+O}} to save (Return to confirm the name), {{Ctrl+X}} to leave. The bottom lines list the keys; [[^]] means Control.
- After module 5: [[code notes.txt]] opens it in VS Code.

> 💡 In the Sandbox: [[echo "hi" > a.txt]], [[echo "again" >> a.txt]], [[cat a.txt]], [[wc -l a.txt]].`,
        },
        {
          id: "l5",
          title: "Getting unstuck",
          minutes: 3,
          body: `Everybody gets stuck. Here is the way out of each trap.

| You see | It means | Do |
|---|---|---|
| nothing happens, no prompt | a program is running or waiting | {{Ctrl+C}} |
| [[:]] at the bottom left | you are in [[less]] or [[man]] | press [[q]] |
| [[>]] on a new line | an open quote; the shell waits for the closing one | {{Ctrl+C}} and retype |
| a screen with ~ lines and no way out | you are in [[vim]] | type [[:q!]] then Return |
| [[command not found]] | typo, or the tool is not installed yet | check spelling; module 5 installs tools |
| [[Permission denied]] | the file belongs to the system | usually you do not need it; [[sudo]] is for module 4 |
| [[No such file or directory]] | wrong path or wrong folder | [[pwd]], [[ls]], use Tab |

## Three habits

1. [[pwd]] before any [[rm]] or [[mv]].
2. {{Tab}} instead of typing names.
3. Read the error message. It nearly always says exactly what is wrong.

## History

[[history]] prints every command you typed. {{Ctrl+R}} then a few letters searches it backwards; press Return to run the match, {{Ctrl+C}} to leave.

> 💡 {{Cmd+K}} wipes the screen when it gets messy; nothing else changes.`,
        },
      ],
      quiz: [
        { q: "Which command shows the folder you are in?", a: ["ls", "pwd", "cd", "where"], c: 1, why: "pwd prints the working directory." },
        { q: "What does cd .. do?", a: ["Goes home", "Goes to the folder above", "Goes back to the last folder", "Lists hidden files"], c: 1, why: "Two dots are the parent. cd - goes back to the previous folder, cd alone goes home." },
        { q: "Which key completes a file name for you?", a: ["Return", "Tab", "Esc", "Space"], c: 1, why: "Tab completes; Tab twice lists the options." },
        { q: "How do you stop a command that runs forever?", a: ["Cmd+C", "Cmd+Q", "Ctrl+C", "Esc"], c: 2, why: "Ctrl+C in the Terminal. Cmd+C would copy." },
        { q: "What does rm do with a file?", a: ["Moves it to the Bin", "Deletes it for good", "Renames it", "Hides it"], c: 1, why: "No Bin, no undo. Read the name twice." },
        { q: "Which one renames notes.txt to ideas.txt?", a: ["rename notes.txt ideas.txt", "cp notes.txt ideas.txt", "mv notes.txt ideas.txt", "touch ideas.txt"], c: 2, why: "mv moves and renames. cp would leave you with two files." },
        { q: "What is the difference between > and >>?", a: ["None", "> replaces the file, >> appends", "> appends, >> replaces", ">> is for folders"], c: 1, why: "One arrow overwrites, two arrows add to the end." },
        { q: "You are stuck in less. How do you leave?", a: ["Ctrl+C", "q", "Esc", "Cmd+W"], c: 1, why: "q quits less and man. Ctrl+C stops a running command." },
        { q: "Type the command that lists all files including hidden ones in long form.", type: "text", accept: ["^ls\\s+-la$", "^ls\\s+-al$", "^ls\\s+-l\\s+-a$", "^ls\\s+-a\\s+-l$"], why: "ls -la (or ls -al): long listing, all files." },
      ],
      challenge: {
        title: "Your first real commands",
        body: `In the **real** Terminal ({{Cmd+Space}}, [[term]]), run this, one line at a time:

~~~
mkdir -p ~/Playground/week1
cd ~/Playground/week1
echo "hello from the terminal" > hello.txt
ls -la
~~~

Copy the output of the last command ([[ls -la]]) and paste it below. Select the text with the mouse and press {{Cmd+C}}; in the Terminal, {{Cmd+C}} copies when text is selected.`,
        proof: {
          regex: "hello\\.txt",
          sample: "total 8\ndrwxr-xr-x  3 masha  staff   96 Nov  4 17:20 .\ndrwxr-xr-x  3 masha  staff   96 Nov  4 17:20 ..\n-rw-r--r--  1 masha  staff   24 Nov  4 17:20 hello.txt",
          placeholder: "paste the output of ls -la here",
          hint: "The listing should contain a line ending in hello.txt. If it does not, check you are in ~/Playground/week1 with pwd.",
        },
      },
    },
    // ───────────────────────────────────────────── m4
    {
      id: "m4",
      emoji: "🔧",
      title: "Terminal, level two",
      blurb: "Pipes and grep, the Mac-only toys, variables and your .zshrc, find, cron.",
      badge: "Pipe Dreamer",
      lessons: [
        {
          id: "l1",
          title: "Pipes and grep: the superpower",
          minutes: 6,
          body: `The Unix idea in one sentence: small tools, each doing one thing, joined with a **pipe** [[|]] (the vertical bar, {{Option+7}} on a Swiss keyboard). The output of the left side becomes the input of the right side.

~~~
ls ~/Downloads | wc -l
~~~

How many things are in Downloads? [[ls]] lists, [[wc -l]] counts lines.

~~~
grep "error" app.log
grep -i "error" app.log
grep -c "error" app.log
grep -r "TODO" .
grep -n "function" script.ts
~~~

**grep** finds lines containing a word. [[-i]] ignores case, [[-c]] counts, [[-r]] searches every file under a folder, [[-n]] shows line numbers. You will use grep every day for the rest of your life.

~~~
history | grep brew
cat names.txt | sort | uniq -c | sort -rn | head -5
~~~

The second line: read the file, sort it, collapse duplicates with a count, sort by count descending, show the top five. Four small tools, one question answered.

~~~
ls -la | grep "\\.pdf"
ps aux | grep Chrome
~~~

[[ps aux]] lists running programs; piped through grep it answers "is Chrome running and how much memory does it eat".

## Reading a pipeline

Read left to right and say "then": "list the folder, **then** keep lines with pdf, **then** count them."

~~~
ls | grep pdf | wc -l
~~~

> 💡 In the Sandbox: [[cat shopping.txt | grep -i milk]], then [[ls | wc -l]].`,
        },
        {
          id: "l2",
          title: "The Mac-only toys",
          minutes: 5,
          body: `These commands exist only on macOS. Harry uses most of them weekly.

~~~
echo "hello" | pbcopy
pbpaste
~~~

**pbcopy** puts whatever comes through the pipe on the clipboard. **pbpaste** prints the clipboard. [[cat cv.txt | pbcopy]] and the file's text is ready to paste into Chrome. [[pbpaste > note.txt]] saves what you copied. Pure gold.

~~~
say "I am a Mac"
say -v "?" | head
~~~

The Mac talks. Pipe something long into it and listen: [[cat notes.txt | say]].

~~~
open .
open -a Calendar
open https://google.com
~~~

[[open]] again: folders, apps, URLs.

~~~
caffeinate -d
~~~

Keeps the Mac awake while it runs (long download, a build). {{Ctrl+C}} to let it sleep again. Or [[caffeinate -t 3600]] for an hour.

~~~
screencapture -i shot.png
~~~

A screenshot from the Terminal; [[-i]] lets you draw the area.

~~~
sips -Z 1200 photo.jpg
sips -s format png photo.jpg --out photo.png
~~~

Resize an image to 1200 px on the long edge, or convert formats. No app needed.

~~~
mdfind "Lebenslauf"
mdfind -name cv.pdf
~~~

Spotlight from the Terminal.

~~~
textutil -convert html notes.md
networkQuality
date
cal
~~~

Convert documents, test your internet speed, print the date, show a calendar.

> 💡 [[osascript -e 'display notification "done" with title "Terminal"']] pops a notification. Put it after a long command: [[sleep 5 && osascript -e 'display notification "tea" with title "Ready"']].`,
        },
        {
          id: "l3",
          title: "Variables, PATH and your .zshrc",
          minutes: 6,
          body: `## Variables

~~~
echo $HOME
echo $USER
name="Masha"
echo "Hi $name"
~~~

A variable is a name for a value. [[$]] reads it. No spaces around [[=]] when setting one.

## PATH

~~~
echo $PATH
which ls
which brew
~~~

When you type [[brew]], the shell looks through the folders in [[$PATH]] (separated by colons) for a program called brew. [[which]] tells you where it found it. "command not found" after an install nearly always means the install folder is not on PATH yet. Module 5 shows the fix.

## .zshrc, your shell's settings file

Every new Terminal window reads [[~/.zshrc]] first. That is where PATH additions and shortcuts go.

~~~
open -e ~/.zshrc
~~~

(If it does not exist, [[touch ~/.zshrc]] first.) Add lines like:

~~~
alias ll="ls -la"
alias play="cd ~/Playground"
export EDITOR=nano
~~~

Save, then tell the running shell to reread it:

~~~
source ~/.zshrc
~~~

Now [[ll]] works. An **alias** is a shortcut name for a longer command. [[export]] sets a variable that programs you start can see; [[EDITOR]] is what [[git]] and [[crontab]] open when they need you to type something.

## Quoting

- Double quotes [["..."]] keep spaces together but still expand [[$variables]].
- Single quotes [['...']] keep everything literal.
- Backslash [[\\ ]] escapes one character.

> 💡 [[echo $SHELL]] prints [[/bin/zsh]]. Bash is the other common shell; nearly everything you learn works in both.`,
        },
        {
          id: "l4",
          title: "find, disk, processes, permissions",
          minutes: 5,
          body: `~~~
find . -name "*.png"
find ~/Downloads -name "*.pdf" -mtime -7
find . -type d -name node_modules
~~~

**find** walks folders. By name (quotes keep the [[*]] from being expanded by the shell), by age ([[-mtime -7]] is "changed in the last 7 days"), by type ([[d]] folder, [[f]] file).

~~~
du -sh ~/Downloads
du -sh * | sort -h
df -h
~~~

**du**: how big is this. [[-s]] sum, [[-h]] human readable. [[df -h]]: how full is the disk.

~~~
top
ps aux | grep -i chrome
kill 12345
~~~

[[top]] is a live view of what eats the CPU ([[q]] to leave). [[ps aux]] lists processes with their PID (process id). [[kill PID]] asks one to stop; [[kill -9 PID]] forces it.

## Permissions

~~~
ls -l script.sh
chmod +x script.sh
./script.sh
~~~

The letters at the start of [[ls -l]] ([[-rwxr-xr-x]]) say who may **r**ead, **w**rite, e**x**ecute. A script needs [[+x]] to run, and you run things in the current folder with [[./]] in front.

## sudo

~~~
sudo some-command
~~~

Runs one command as the administrator; asks your Mac password (typing shows nothing, that is normal). You need it rarely: system folders, [[brew]] never needs it. If a tutorial says [[sudo rm -rf]] anything, stop and ask Harry.

> 💡 [[uptime]] shows how long the Mac has been on. [[whoami]] shows who you are. [[sw_vers]] shows the macOS version.`,
        },
        {
          id: "l5",
          title: "cron: the Mac does things while you sleep",
          minutes: 5,
          body: `**cron** runs commands on a schedule. Harry's Mac has dozens of cron lines: fetching jobs, publishing pages, reports. Yours can too.

~~~
crontab -l
crontab -e
~~~

[[-l]] lists your schedule, [[-e]] edits it (in the editor from [[$EDITOR]], so set [[export EDITOR=nano]] in [[.zshrc]] first).

A line has five time fields and then the command:

~~~
# minute hour day month weekday  command
0 9 * * *       say "good morning"
30 8 * * 1-5    open https://calendar.google.com
*/15 * * * *    date >> ~/Playground/ticks.log
~~~

- [[0 9 * * *]]: at 09:00 every day.
- [[30 8 * * 1-5]]: 08:30, Monday to Friday.
- [[*/15 * * * *]]: every 15 minutes.

Each field: minute (0 to 59), hour (0 to 23), day of month, month, weekday (0 is Sunday). [[*]] means every.

## Three cron truths

1. cron has a tiny PATH. Write full paths: [[/opt/homebrew/bin/brew]], [[$HOME/.bun/bin/bun]]. [[which bun]] tells you the full path.
2. Nothing shows on screen. Send output to a log: [[... >> ~/cron.log 2>&1]] (the [[2>&1]] catches errors too).
3. The Mac must be awake. A sleeping laptop skips the run. For "catch up after waking", the Mac's own scheduler **launchd** does that; it is a later lesson, cron first.

## Try it

[[crontab -e]], add [[* * * * * date >> ~/Playground/ticks.log]], save, wait two minutes, then [[cat ~/Playground/ticks.log]]. Then remove the line again; a line every minute forever is noise.

> 💡 If a cron job touches Desktop, Documents or Downloads, macOS may block it until you give [[cron]] **Full Disk Access** under Settings > Privacy & Security. Playground in your home folder needs nothing.`,
        },
      ],
      quiz: [
        { q: "What does the | (pipe) do?", a: ["Runs two commands at the same time", "Sends the output of the left command into the right one", "Compares two files", "Writes to a file"], c: 1, why: "Left output becomes right input. Chain as many as you like." },
        { q: "Which command finds the lines of a file that contain a word?", a: ["find", "grep", "cat", "which"], c: 1, why: "grep searches text; find searches for files by name." },
        { q: "What does pbcopy do?", a: ["Copies a file", "Puts piped text on the clipboard", "Prints the clipboard", "Pastes into Finder"], c: 1, why: "pbcopy fills the clipboard; pbpaste prints it." },
        { q: "Where do aliases and PATH additions go so they survive a new window?", a: ["~/.zshrc", "/etc/hosts", "~/Desktop", "System Settings"], c: 0, why: "Every new zsh reads ~/.zshrc. Run source ~/.zshrc to apply changes now." },
        { q: "What does 'command not found' right after an install usually mean?", a: ["The install failed", "The tool's folder is not on PATH yet", "You need sudo", "The Mac needs a restart"], c: 1, why: "Add the folder to PATH in .zshrc, or open a new Terminal window if the installer did it for you." },
        { q: "What does the cron line 0 9 * * 1-5 mean?", a: ["Every 9 minutes", "09:00 Monday to Friday", "9th of every month", "Every hour on weekdays"], c: 1, why: "minute 0, hour 9, any day, any month, weekdays 1 to 5." },
        { q: "What does caffeinate -d do?", a: ["Makes coffee", "Keeps the Mac awake while it runs", "Speeds up the CPU", "Dims the screen"], c: 1, why: "It prevents sleep until you Ctrl+C it." },
        { q: "Type a pipeline that counts the lines in the output of ls.", type: "text", accept: ["^ls\\s*\\|\\s*wc\\s+-l$", "^ls\\s+-\\w+\\s*\\|\\s*wc\\s+-l$"], why: "ls | wc -l: list, then count lines." },
      ],
      challenge: {
        title: "A pipeline, through the clipboard",
        body: `In the Terminal:

~~~
echo "i can pipe" | tr a-z A-Z | pbcopy
~~~

[[tr]] translates characters; here lower case to upper case. Nothing prints, because [[pbcopy]] took it. Now click the box below and press {{Cmd+V}}.`,
        proof: {
          regex: "^\\s*I CAN PIPE\\s*$",
          sample: "I CAN PIPE",
          placeholder: "Cmd+V here",
          hint: "The clipboard should hold exactly I CAN PIPE in capitals. Check the quotes and the two dashes in a-z A-Z.",
        },
      },
    },
    // ───────────────────────────────────────────── m5
    {
      id: "m5",
      emoji: "🍺",
      title: "The toolbox",
      blurb: "Command Line Tools, Homebrew, bun, VS Code, MarkEdit, Rectangle and friends.",
      badge: "Brew Master",
      lessons: [
        {
          id: "l1",
          title: "Xcode Command Line Tools",
          minutes: 3,
          body: `Apple's compilers and [[git]] come in one package that is not installed by default.

~~~
xcode-select --install
~~~

A dialog appears. Click **Install**, agree, wait (a few minutes, sometimes more). You do **not** need the full Xcode app from the App Store (it is huge); the Command Line Tools are enough.

Check:

~~~
git --version
~~~

Prints something like [[git version 2.50.1]]. If the dialog says the tools are already installed, even better.

> 💡 After a big macOS update the tools can need a reinstall. The symptom is git suddenly saying "invalid active developer path". Run the install command again.`,
        },
        {
          id: "l2",
          title: "Homebrew: the Mac's app store for the Terminal",
          minutes: 6,
          body: `**Homebrew** (short: brew) installs almost any developer tool or app with one command, and updates them all with one more. This is how Harry installs everything.

## Install

The official command from [brew.sh](https://brew.sh):

~~~
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
~~~

It explains what it will do, waits for Return, asks for your password, and runs for a few minutes.

## The step everyone misses

At the end the installer prints a block called **Next steps** with lines to run, so that your shell finds brew (it lives in [[/opt/homebrew]] on an M1). They look like this; copy them **from your own Terminal**, because they contain your user name:

~~~
echo >> ~/.zprofile
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
~~~

Then open a new Terminal window and check:

~~~
brew --version
brew doctor
~~~

[[brew doctor]] should say "Your system is ready to brew."

## Using it

~~~
brew install tree
brew install --cask rectangle
brew list
brew update && brew upgrade
brew uninstall tree
brew search markdown
brew info --cask markedit
~~~

- Plain [[brew install]] is for command line tools (formulae).
- [[--cask]] is for apps with a window (Chrome, VS Code, Rectangle).
- [[brew update]] refreshes the catalogue, [[brew upgrade]] updates everything you installed. Do both once a week.

> 💡 brew never needs [[sudo]]. If something asks you to sudo brew, it is wrong.`,
        },
        {
          id: "l3",
          title: "bun: run TypeScript without ceremony",
          minutes: 3,
          body: `**bun** runs JavaScript and TypeScript files directly, installs packages, and runs tests. It is what myos and the job search app are written for. Harry's rule: bun, never npm.

~~~
brew install oven-sh/bun/bun
~~~

(The other official way is [[curl -fsSL https://bun.com/install | bash]]; pick one, not both.)

~~~
bun --version
~~~

## The commands you will use

- [[bun run file.ts]]: run a TypeScript file. No compile step.
- [[bun install]]: install a project's packages (reads [[package.json]], makes [[node_modules/]]).
- [[bun test]]: run the project's tests.
- [[bunx something]]: run a tool from the registry without installing it.

## First TypeScript in thirty seconds

~~~
mkdir -p ~/Playground/hello && cd ~/Playground/hello
echo 'console.log("Hoi " + (process.env.USER ?? "du"))' > hello.ts
bun run hello.ts
~~~

> 💡 [[&&]] between two commands means "and if that worked, then". The second runs only when the first succeeded.`,
        },
        {
          id: "l4",
          title: "Editors: VS Code and MarkEdit",
          minutes: 5,
          body: `## VS Code

~~~
brew install --cask visual-studio-code
~~~

Open it with Spotlight once. The cask also installs the [[code]] command, so from any project folder:

~~~
code .
~~~

opens the folder as a project. If [[code]] says "command not found": in VS Code press {{Cmd+Shift+P}}, type **shell command**, choose **Install 'code' command in PATH**, open a new Terminal.

Three things to know:

- {{Cmd+P}} opens any file by typing part of its name. {{Cmd+Shift+P}} runs any command.
- {{Ctrl+\`}} (Control and the backtick) opens a Terminal inside VS Code.
- Extensions ({{Cmd+Shift+X}}): install **Claude Code** when you get to module 7; it puts Claude in a side panel.

## MarkEdit

Harry writes nearly everything in **Markdown**: plain text with [[#]] for headings, [[-]] for lists, [[**bold**]]. MarkEdit is a small, fast Markdown editor, like TextEdit but for [[.md]] files.

~~~
brew install --cask markedit
~~~

Open MarkEdit, then **MarkEdit > Settings > Extensions**: it has its own extension manager. Install the official **Preview** extension; that gives you a rendered view of the document ("view mode"), so you see headings and lists as they will look.

Make MarkEdit the default for [[.md]] files: right-click any .md file in Finder, **Get Info**, under **Open with** choose MarkEdit, click **Change All**.

> 💡 Markdown is the language Claude Code answers in and the language every README is written in. Ten minutes learning it pays back daily: [Markdown guide](https://www.markdownguide.org/basic-syntax/).`,
        },
        {
          id: "l5",
          title: "Nice extras",
          minutes: 4,
          body: `None of these are required. All of them are small and good.

~~~
brew install --cask rectangle
~~~

**Rectangle**: window snapping with the keyboard, the thing Windows users miss most. {{Ctrl+Option+Left}} puts a window on the left half, {{Ctrl+Option+Return}} maximises. Give it Accessibility permission when it asks.

~~~
brew install --cask google-chrome
~~~

Chrome, the brew way (skip if you already installed it in module 2).

~~~
brew install gh jq tree ripgrep
~~~

- **gh**: GitHub from the Terminal (module 6 uses it).
- **jq**: pretty-print and query JSON: [[cat data.json | jq .]].
- **tree**: a folder as a tree: [[tree -L 2]].
- **ripgrep** ([[rg]]): grep, but faster and it skips [[node_modules]] on its own. [[rg TODO]].

~~~
brew install --cask ghostty
~~~

**Ghostty**: a faster, prettier Terminal. Harry uses it. The built-in Terminal is fine until you want this.

~~~
brew install --cask raycast
~~~

**Raycast**: Spotlight with superpowers (clipboard history, window management, snippets). Optional; Spotlight is enough to start.

## Keep it tidy

~~~
brew update && brew upgrade && brew cleanup
~~~

Once a week. Takes a minute.

> 💡 [[brew list]] is the honest inventory of what you have installed. When a tutorial says "install X", check there first.`,
        },
      ],
      quiz: [
        { q: "What does xcode-select --install give you?", a: ["The full Xcode app", "Apple's Command Line Tools including git", "Homebrew", "Swift Playgrounds"], c: 1, why: "Compilers and git, without the giant Xcode app." },
        { q: "Which brew command installs an app with a window, like VS Code?", a: ["brew install visual-studio-code", "brew install --cask visual-studio-code", "brew app visual-studio-code", "sudo brew install visual-studio-code"], c: 1, why: "--cask is for GUI apps. And brew never wants sudo." },
        { q: "brew works in the window where you installed it but not in a new one. Why?", a: ["Homebrew is broken", "The 'Next steps' lines were not added to ~/.zprofile", "You need to restart the Mac", "You need the App Store"], c: 1, why: "The shellenv lines put /opt/homebrew/bin on PATH for every new shell." },
        { q: "What runs a TypeScript file directly?", a: ["node file.ts", "bun run file.ts", "npm file.ts", "tsc file.ts"], c: 1, why: "bun runs .ts without a compile step. Harry's rule: bun, not npm." },
        { q: "Which command updates everything brew installed?", a: ["brew refresh", "brew update && brew upgrade", "brew install --all", "brew doctor"], c: 1, why: "update refreshes the catalogue, upgrade installs the newer versions." },
        { q: "What does MarkEdit's Preview extension give you?", a: ["Spell check", "A rendered view of the Markdown", "Dark mode", "Git integration"], c: 1, why: "It is the view mode: see headings and lists rendered." },
        { q: "What does && between two commands mean?", a: ["Run both at once", "Run the second only if the first succeeded", "Run the second in the background", "Pipe the output"], c: 1, why: "'And then, if that worked.' A failing first command stops the chain." },
      ],
      challenge: {
        title: "Prove the toolbox",
        body: `Run this one line and paste the output:

~~~
brew --version; bun --version; git --version; code --version | head -1
~~~

(A semicolon runs commands one after another, whether or not the previous one worked.)`,
        proof: {
          regex: "Homebrew\\s+\\d[\\s\\S]*\\b\\d+\\.\\d+\\.\\d+\\b[\\s\\S]*git version \\d",
          sample: "Homebrew 5.0.1\n1.3.2\ngit version 2.50.1\n1.106.0",
          placeholder: "paste the four lines here",
          hint: "Expected: a Homebrew line, a bun version like 1.3.2, a git version line, and a VS Code version. A 'command not found' means that tool is not installed or not on PATH yet.",
        },
      },
    },
    // ───────────────────────────────────────────── m6
    {
      id: "m6",
      emoji: "🌱",
      title: "Git and GitHub",
      blurb: "Save points for code, your GitHub account, SSH keys and your first repository.",
      badge: "Git Gardener",
      lessons: [
        {
          id: "l1",
          title: "Why git",
          minutes: 3,
          body: `**git** keeps a history of a folder. Every time you say "this is a good state", git takes a snapshot called a **commit**. You can look at any old snapshot, see exactly what changed between two, and go back. You already met it in the apprenticeship; here is the picture that makes it click.

Three places:

1. **Working folder**: the files you edit.
2. **Staging area**: the changes you have picked for the next commit ([[git add]]).
3. **History**: the commits ([[git commit]]).

And a fourth, optional: a **remote** copy on GitHub (the push), which is your backup and your way of sharing.

## Why it matters for Claude Code

When an AI edits your files, git is your safety net. Commit before you let it loose, look at [[git diff]] after, and you can always throw its changes away with one command. People who use Claude Code without git lose work; people who commit first never do.

> 💡 One commit per small finished thing, with a message that says what and why: [["Add the price field to the job card"]], not [["changes"]].`,
        },
        {
          id: "l2",
          title: "Set up git and GitHub",
          minutes: 6,
          body: `## Tell git who you are

~~~
git config --global user.name "Masha Madani"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
~~~

Use the email of your GitHub account.

## A GitHub account

Go to [github.com](https://github.com) and sign up (or sign in; you may have one from school). Free is fine.

## An SSH key, so you never type a password for git

A key pair: a private file that stays on your Mac, a public file you give GitHub.

~~~
ssh-keygen -t ed25519 -C "you@example.com"
~~~

Press Return for the default file name. A passphrase is optional; empty is fine on a laptop with FileVault on.

~~~
pbcopy < ~/.ssh/id_ed25519.pub
~~~

Your **public** key is now on the clipboard ([[<]] feeds a file into a command). Go to [github.com/settings/keys](https://github.com/settings/keys), **New SSH key**, give it a name like "MacBook", paste, save.

~~~
ssh -T git@github.com
~~~

The first time it asks whether to trust github.com: type [[yes]]. Then it should greet you by name. That greeting is this module's challenge.

> 💡 Never share [[id_ed25519]] (no [[.pub]]). The [[.pub]] file is the one that is safe to give out; that is what "public" means.

## gh, the GitHub command

~~~
gh auth login
~~~

Choose GitHub.com, SSH, use the key you just made, log in with the browser. Now [[gh]] can create repositories and open pull requests for you.`,
        },
        {
          id: "l3",
          title: "The daily four",
          minutes: 5,
          body: `~~~
git status
~~~

What changed since the last commit. Run it all the time. It also tells you what to do next.

~~~
git add file.ts
git add .
~~~

Pick changes for the next commit. [[.]] means everything in this folder.

~~~
git commit -m "Say what you did"
~~~

Take the snapshot.

~~~
git push
~~~

Send the commits to GitHub.

## And three for looking

~~~
git log --oneline
git diff
git diff --staged
~~~

History one line per commit; what you changed but have not staged; what is staged.

## .gitignore

A file named [[.gitignore]] lists what git should never track: [[node_modules/]], [[.env]], [[.DS_Store]], logs. Put it in the project root before the first commit.

~~~
printf 'node_modules/\\n.env\\n.DS_Store\\n' > .gitignore
~~~

## Undo

- [[git restore file.ts]]: throw away your uncommitted edits to that file.
- [[git restore --staged file.ts]]: unstage, keep the edits.
- [[git revert HEAD]]: make a new commit that undoes the last one. Safe, even after a push.

> 💡 [[git add -p]] goes through your changes piece by piece and asks y or n for each. The best way to make small, honest commits.`,
        },
        {
          id: "l4",
          title: "Your first repository",
          minutes: 5,
          body: `Turn the Playground from module 5 into a repository and put it on GitHub.

~~~
cd ~/Playground/hello
git init
printf 'node_modules/\\n.DS_Store\\n' > .gitignore
git add .
git commit -m "First commit: hello in bun"
~~~

Now on GitHub, in one command:

~~~
gh repo create masha-playground --private --source=. --push
~~~

[[--source=.]] uses this folder, [[--push]] sends the commit. Open it:

~~~
gh repo view --web
~~~

## Cloning

The reverse direction: a repository that exists on GitHub comes to your Mac with

~~~
git clone git@github.com:harryf/myos.git ~/Code/personal/myos
~~~

(That exact line is the first step of module 8.) The [[git@github.com:owner/name.git]] form uses your SSH key; the [[https://]] form asks for a password.

## Branches, in two sentences

A branch is a parallel line of commits for trying something without touching [[main]]. [[git switch -c idea]] starts one, [[git switch main]] goes back, [[git merge idea]] brings it in. You will not need branches for a while; Harry commits straight to main in his own repos.

> 💡 A tidy habit: keep all code under [[~/Code]], one folder per project. [[mkdir -p ~/Code/personal]] now.`,
        },
      ],
      quiz: [
        { q: "What is a commit?", a: ["A file upload", "A snapshot of the folder with a message", "A branch", "A GitHub account"], c: 1, why: "A saved state you can return to or compare against." },
        { q: "Which file do you give to GitHub?", a: ["~/.ssh/id_ed25519", "~/.ssh/id_ed25519.pub", "~/.zshrc", "~/.gitconfig"], c: 1, why: "The .pub file is public. The one without .pub is your secret, never share it." },
        { q: "What does git status do?", a: ["Pushes", "Shows what changed and what to do next", "Deletes untracked files", "Creates a commit"], c: 1, why: "Run it constantly. It is the git dashboard." },
        { q: "Right order of the daily four?", a: ["push, add, commit, status", "status, add, commit, push", "commit, add, push, status", "add, push, commit, status"], c: 1, why: "Look, stage, snapshot, send." },
        { q: "Why commit before letting Claude Code edit files?", a: ["Claude requires it", "So you can see the diff and throw the changes away if needed", "To upload to GitHub", "It makes Claude faster"], c: 1, why: "git is the safety net around any AI edit." },
        { q: "What belongs in .gitignore?", a: ["Your source code", "node_modules, .env, .DS_Store", "README.md", "package.json"], c: 1, why: "Generated files, secrets, and macOS clutter never go into history." },
        { q: "Type the command that shows the history one line per commit.", type: "text", accept: ["^git\\s+log\\s+--oneline$"], why: "git log --oneline." },
      ],
      challenge: {
        title: "GitHub knows you",
        body: `Run

~~~
ssh -T git@github.com
~~~

and paste the reply.`,
        proof: {
          regex: "Hi .+! You've successfully authenticated",
          sample: "Hi masha! You've successfully authenticated, but GitHub does not provide shell access.",
          placeholder: "paste the greeting here",
          hint: "Expected 'Hi <name>! You've successfully authenticated...'. 'Permission denied (publickey)' means the public key is not on GitHub yet, or the key was made under a different name.",
        },
      },
    },
    // ───────────────────────────────────────────── m7
    {
      id: "m7",
      emoji: "🤖",
      title: "Claude Code",
      blurb: "What it is, honestly. Install, log in, first session, prompting that works, your first build.",
      badge: "Claude Co-pilot",
      lessons: [
        {
          id: "l1",
          title: "What it is, honestly",
          minutes: 5,
          body: `**Claude Code** is an AI that works inside your Terminal. You type what you want in plain language; it reads your files, writes code, runs commands, and shows you what it did. It asks before anything risky.

You have been sceptical of AI. Good. Here is the honest version.

## What it is good at

- Reading a folder you have never seen and explaining it.
- Writing the boring eighty percent: a script, a test, a config, a README.
- Explaining an error message, a command, a concept, at your level, as often as you ask.
- Doing the thing you know how to do but do not want to type for an hour.

## What it gets wrong

- It is confident when it is wrong. It will say "done" when it is not done.
- It guesses when it lacks context: wrong file, wrong library version, a function that does not exist.
- It can make a mess fast if you let it run without reading what it does.

## How you stay the boss

1. **git first.** Commit before, [[git diff]] after.
2. **Make it show evidence.** "Run the tests and show me the output." "Open the page and tell me what you see." Never accept "should work".
3. **Small steps.** One thing per request. Review. Next thing.
4. **You review, it types.** Read every diff like you would read a colleague's pull request. You are the senior here.

That is exactly how Harry works, and why his setup (module 8) has rules that force the AI to prove things. The skill of the next ten years is not typing code. It is specifying clearly, reviewing sharply, and knowing when the machine is bluffing. You did an apprenticeship; you can tell when code smells. That is the valuable part.

> 💡 You cannot break the Mac by asking Claude a question. Ask it anything, as often as you like. The cost is tokens on the account, not your dignity.`,
        },
        {
          id: "l2",
          title: "Install and log in",
          minutes: 4,
          body: `Official install command (from the [setup page](https://code.claude.com/docs/en/setup)):

~~~
curl -fsSL https://claude.ai/install.sh | bash
~~~

It shows no progress while downloading; wait. Then open a **new** Terminal window and check:

~~~
claude --version
claude doctor
~~~

A version number like [[2.1.311 (Claude Code)]] means it worked. "command not found" means [[~/.local/bin]] is not on PATH; add this line to [[~/.zshrc]], then [[source ~/.zshrc]]:

~~~
export PATH="$HOME/.local/bin:$PATH"
~~~

(The brew way exists too: [[brew install --cask claude-code]]. Pick one.)

## Log in

Claude Code needs a paid plan (Pro or Max) or a Team seat; the free claude.ai plan does not include it. **Ask Harry which account to use** before this step.

~~~
cd ~/Playground/hello
claude
~~~

The first start opens the browser to log in. Pick a theme, answer the setup questions, and you land at the prompt. Type [[/exit]] to leave.

## Updates

The native install updates itself in the background. [[claude update]] forces it.

> 💡 The Claude Code docs have a [terminal guide](https://code.claude.com/docs/en/terminal-guide) and a [quickstart](https://code.claude.com/docs/en/quickstart) that cover the same ground as this module, with pictures.`,
        },
        {
          id: "l3",
          title: "Your first session",
          minutes: 5,
          body: `Claude Code works in the folder you start it from. That folder is its world.

~~~
cd ~/Playground/hello
claude
~~~

Try these, one at a time:

- [[What is in this folder and what does hello.ts do?]]
- [[Explain what pbcopy does and give me two examples.]]
- [[Add a line to hello.ts that prints today's date in Swiss format. Then run it and show me the output.]]

Watch what happens on the third one: it shows you the edit, asks permission for the edit and for running bun, runs it, and shows the output. Say yes with Return, no with Esc.

## Keys and commands inside Claude

- {{Esc}}: stop what it is doing.
- {{Shift+Tab}}: cycle permission modes. One of them is **plan mode**: Claude thinks and proposes, touches nothing until you approve. Use it for anything bigger than one file.
- [[/help]]: all commands.
- [[/clear]]: start a fresh conversation (do this when you change topic; long chats get worse).
- [[/init]]: Claude writes a [[CLAUDE.md]] describing the project, which it reads at every start. Your project's standing instructions go in that file.
- [[/exit]]: leave. [[claude -c]] from the shell continues the last conversation.

## One-shot from the shell

~~~
claude -p "explain this error: $(cat error.log)"
~~~

[[-p]] prints the answer and exits. Good for quick questions.

> 💡 Claude can see images: drag a screenshot into the Terminal window and ask "why does this look wrong?".`,
        },
        {
          id: "l4",
          title: "Prompting that works",
          minutes: 5,
          body: `A good request has four parts. Not a template to recite, a checklist for when the answer disappoints.

1. **Goal**: what you want at the end. "A script that renames the screenshots on my Desktop to the date they were taken."
2. **Context**: where things are, what exists. "Screenshots are PNG files named Screenshot 2026-11-04 at 17.20.11.png, in ~/Desktop."
3. **Constraints**: how. "TypeScript, run with bun, no npm packages, do not touch files that are not screenshots."
4. **Done looks like**: how you both know. "Run it on a copy of three files in ~/Playground and show me ls before and after."

Short version: **what, where, how, prove it**.

## Phrases that pull better work

- "Before you change anything, tell me your plan." (or use plan mode)
- "Run the tests and paste the output."
- "What could go wrong with this?"
- "I do not understand line 12. Explain it."
- "That is wrong because X. Fix it and explain what you changed."
- "Make a git commit with a clear message."

## Phrases that pull worse work

- "Fix it." (fix what, how will you know)
- "Make it better."
- Ten requests in one message.

## When it bluffs

If it says "this should work": ask it to run it. If it says "I have tested it": ask for the output. If the output is missing, it did not test it. Harry's setup makes this a rule; until then, you are the rule.

> 💡 Explaining the problem clearly to Claude often solves half of it in your own head first. That is a feature.`,
        },
        {
          id: "l5",
          title: "Your first build",
          minutes: 8,
          body: `A real tool, built with Claude, in a repository of yours. Thirty minutes.

~~~
mkdir -p ~/Code/personal/shotsort && cd ~/Code/personal/shotsort
git init
claude
~~~

In Claude, press {{Shift+Tab}} until it says plan mode, then:

> Build a bun TypeScript CLI called shotsort. It looks in a folder given as the first argument (default ~/Desktop) for files matching "Screenshot YYYY-MM-DD at HH.MM.SS.png", and moves each into a subfolder named YYYY-MM (for example 2026-11) inside that folder, creating it if needed. Add a --dry-run flag that only prints what it would move. Write a test with bun test that uses a temporary folder with three fake files. Then make a short README. Do not install any packages.

Read the plan. If it looks right, approve it and leave plan mode ({{Shift+Tab}}). Watch it write [[shotsort.ts]], the test, the README. Then:

- [[Run the tests and show the output.]]
- [[Run it with --dry-run on my Desktop and show the output.]]
- [[Write a .gitignore and make the first commit.]]

Leave Claude ([[/exit]]) and check with your own eyes:

~~~
git log --oneline
bun test
bun run shotsort.ts --dry-run
~~~

Then put it on GitHub:

~~~
gh repo create shotsort --private --source=. --push
~~~

You now have a tool you use, that you understand, in a repo you own, built in a conversation. That is the whole loop. Every project from here is this loop, bigger.

> 💡 Add [[alias shotsort="bun ~/Code/personal/shotsort/shotsort.ts"]] to [[.zshrc]] and it is a command on your Mac.`,
        },
      ],
      quiz: [
        { q: "What is the first thing you do before asking Claude Code to change files?", a: ["Close VS Code", "Make a git commit", "Clear the Terminal", "Disable the firewall"], c: 1, why: "Commit first, diff after. The safety net." },
        { q: "Claude says 'this should work'. What do you do?", a: ["Trust it", "Ask it to run it and show the output", "Restart Claude", "Ask again politely"], c: 1, why: "Evidence or it did not happen." },
        { q: "What does plan mode do?", a: ["Makes Claude faster", "Claude proposes a plan and touches nothing until you approve", "Turns off permissions", "Saves the chat"], c: 1, why: "Shift+Tab cycles to it. Use it for anything beyond one file." },
        { q: "What is CLAUDE.md for?", a: ["Claude's log file", "Standing instructions and project facts Claude reads at every start", "A list of errors", "The license"], c: 1, why: "/init writes the first version. You keep it current." },
        { q: "Which plan includes Claude Code?", a: ["The free claude.ai plan", "Pro, Max or a Team seat", "Any Google account", "A GitHub account"], c: 1, why: "Free does not include it. Ask Harry which account to log in with." },
        { q: "A good request contains?", a: ["Only the goal", "Goal, context, constraints, and what done looks like", "As many tasks as possible", "The word please"], c: 1, why: "What, where, how, prove it." },
        { q: "Which key stops Claude mid-action?", a: ["Cmd+Q", "Esc", "Ctrl+Z", "Return"], c: 1, why: "Esc interrupts. /exit leaves." },
      ],
      challenge: {
        title: "Claude Code is installed",
        body: `Run

~~~
claude --version
~~~

and paste the output. Then do lesson 5 for real; the badge is for the version line, the pride is for the repo.`,
        proof: {
          regex: "\\d+\\.\\d+\\.\\d+",
          sample: "2.1.311 (Claude Code)",
          placeholder: "paste the version here",
          hint: "A version like 2.1.311 is expected. 'command not found' means ~/.local/bin is not on PATH: see lesson 2.",
        },
      },
    },
    // ───────────────────────────────────────────── m8
    {
      id: "m8",
      emoji: "🧠",
      title: "myos",
      blurb: "Harry's Claude Code harness: what it adds, how to get access, install, and the way it thinks.",
      badge: "myos Operator",
      lessons: [
        {
          id: "l1",
          title: "What myos is",
          minutes: 4,
          body: `**myos** is Harry's personal setup on top of Claude Code. It is a private GitHub repository ([github.com/harryf/myos](https://github.com/harryf/myos)) that installs into [[~/.myos]] and gives you a command called [[myos]] that starts Claude Code with Harry's rules, skills and tools loaded. Your plain [[claude]] stays exactly as it was; the two live side by side.

What it adds, in plain words:

- **Rules that force evidence.** The assistant may not say "done" without a test, a screenshot it looked at, or a read-back. "Should work" is forbidden.
- **The Algorithm and the ISA.** Before building anything, the assistant writes down what "done" means as a list of testable claims (the **I**deal **S**tate **A**rtifact, a file called [[ISA.md]]). Then it builds, and ticks claims only with proof. You can read that file and see exactly what was promised and what was proven.
- **Skills.** Packaged ways of working: a writing style check, a context search over past work, a browser verifier, a design critique.
- **A house style.** Short sentences, plain words, no em dashes. You will notice it in every answer.
- **Memory.** Past work and knowledge notes it can search, so a new session can pick up an old project.

Why you want it: it turns Claude Code from a clever typist into a colleague that has to show its work. That is the answer to every worry you had in module 7.

> 💡 The job search app was built with it. Its [[ISA.md]] has over a hundred claims, each with the evidence that closed it.`,
        },
        {
          id: "l2",
          title: "Getting access",
          minutes: 2,
          body: `The repository is private. Two things need to happen, one by Harry, one by you.

## Harry

Adds your GitHub user as a collaborator on [[harryf/myos]] (Settings > Collaborators on the repo). Send him your GitHub user name.

## You

Accept the invitation (email from GitHub, or [github.com/notifications](https://github.com/notifications)). Then check you can see it:

~~~
gh repo view harryf/myos
~~~

If that prints the README, you are in. Your SSH key from module 6 is what makes the clone work.

> 💡 While you wait for the invitation, read lesson 4 of this module; it is the part that matters most.`,
        },
        {
          id: "l3",
          title: "Install",
          minutes: 5,
          body: `From the myos README, with one change for you: **do not** use [[--from-pai]]. That flag copies Harry's old memories from a folder you do not have.

~~~
git clone git@github.com:harryf/myos.git ~/Code/personal/myos
cd ~/Code/personal/myos
./install.sh --dry-run
~~~

The dry run prints every step a real install would take and writes nothing. Read it. Then:

~~~
./install.sh
~~~

It sets up [[~/.myos]] and links the launcher at [[~/.local/bin/myos]] (the same folder Claude Code uses, so it is already on your PATH if module 7 worked).

~~~
myos --version
~~~

## First run

~~~
cd ~/Code/personal/shotsort
myos
~~~

myos has its own login (the config folder is separate from plain Claude), so it asks once; use the same account as in module 7. You are in. Ask it:

- [[What is myos and how do you work?]]
- [[Read this project and tell me what you would improve.]]

Notice the answer shape: a banner line, the answer, and a closing line. That is the house format.

## Keeping it current

~~~
cd ~/Code/personal/myos && git pull && ./install.sh
~~~

Your own data under [[~/.myos/MYOS/MEMORY]] and [[~/.myos/MYOS/USER]] is never touched by an upgrade.

> 💡 If anything in the install goes wrong, the whole run is mirrored to [[~/.myos/install.log]]. Send that to Harry rather than describing the problem.`,
        },
        {
          id: "l4",
          title: "The way it thinks",
          minutes: 6,
          body: `Four ideas carry the whole system. Learn them and you can read any myos session.

## 1. Ideal state first

Before building, write what done is. Not "make a job app", but claims like:

- The page lists every job from jobs.json with employer and title.
- Marking a job Applied survives a reload.
- No em dash appears anywhere in the page.

Each claim names a way to test it. That file is the **ISA**. It lives at [[ISA.md]] in the project. Ask myos [[show me the ISA]] in any project and you see the contract.

## 2. Evidence or it did not happen

A claim gets ticked only with tool evidence: a test run, a screenshot the assistant looked at, a command's output. You will see [[✅ VERIFY:]] lines in answers naming the proof. When they are missing, ask.

## 3. Ask before the irreversible

Deleting, pushing to GitHub, publishing a page, editing secrets: myos asks. Everything reversible it just does. That is why you can let it work.

## 4. Writing you can read

Short sentences. One idea each. No fluff. Numbers in tables. It makes the assistant easier to check and it is a good way to write yourself.

## Things to try

- [[/cs job search]]: searches past work notes (once your own memory fills, it searches yours).
- [[Write an ISA for a tool that ...]]: watch the claims appear before any code.
- [[Verify that in a real browser]]: it opens Chrome and looks.

## Making it yours

myos was written for Harry. Its memory folder and project list under [[~/.myos/MYOS/USER]] are yours to fill: [[PROJECTS.md]] is the index of what you are working on. Ask Harry how to put your name into the identity files; that is a one-time edit he knows.

> 💡 [[~/.myos/CLAUDE.md]] is the routing table: a short file saying where every rule and tool lives. Read it once with [[cat ~/.myos/CLAUDE.md]].`,
        },
      ],
      quiz: [
        { q: "What does myos add on top of Claude Code?", a: ["A different AI model", "Rules, skills, the ISA method and a house style, in its own config folder", "A web interface", "Faster internet"], c: 1, why: "Same Claude Code, with Harry's harness loaded. Plain claude stays untouched." },
        { q: "What is an ISA?", a: ["A type of SSH key", "A file listing what done is as testable claims, with evidence", "A GitHub action", "An installer"], c: 1, why: "Ideal State Artifact: the contract, the tests and the record, in one file." },
        { q: "Why must you NOT run ./install.sh --from-pai?", a: ["It deletes the Mac", "It copies Harry's old memories from a folder you do not have", "It needs sudo", "It installs Windows"], c: 1, why: "Plain ./install.sh is yours. --from-pai is a one-time migration for Harry." },
        { q: "Which does myos always ask before doing?", a: ["Reading a file", "Running a test", "Pushing to GitHub or publishing a page", "Listing a folder"], c: 2, why: "Reversible things it does; irreversible or public things it asks." },
        { q: "What do you need before git clone of myos works?", a: ["Nothing, it is public", "Harry adds you as a collaborator and your SSH key is on GitHub", "A paid GitHub plan", "Xcode"], c: 1, why: "Private repo plus SSH access." },
        { q: "What do the VERIFY lines in an answer tell you?", a: ["The time used", "Which evidence closed the claim", "The model name", "How many tokens were spent"], c: 1, why: "Missing evidence means the claim is not proven. Ask for it." },
      ],
      challenge: {
        title: "myos runs",
        body: `Run

~~~
myos --version
~~~

and paste the output.`,
        proof: {
          regex: "myos v\\d+\\.\\d+",
          sample: "myos v1.4.0",
          placeholder: "paste the version here",
          hint: "Expected 'myos v1.x.y'. 'not installed' means ./install.sh did not finish; read ~/.myos/install.log.",
        },
      },
    },
    // ───────────────────────────────────────────── m9
    {
      id: "m9",
      emoji: "🚀",
      title: "Take over the job search app",
      blurb: "What exists, get the code, run it, what is Harry's and must become yours, own it.",
      badge: "Owner",
      lessons: [
        {
          id: "l1",
          title: "What exists",
          minutes: 5,
          body: `Harry built two things for your job search, in one folder on his Mac ([[masha_job_search]]).

## The map

The page you have seen: [harryf.github.io/private/masha-map.html](https://harryf.github.io/private/masha-map.html). Six chapters, your comments and stars go to a shared Grist sheet. One file, [[site/index.html]].

## The jobs app

[harryf.github.io/private/masha-jobs/](https://harryf.github.io/private/masha-jobs/): the installable app with job cards and your application board. Also one file plus a service worker, in [[site/jobs/]].

## The pipeline behind it, [[Tools/jobs/]]

Every day at 11:00, a cron line on Harry's Mac runs [[daily.ts]], which:

1. Fetches postings from four sources (company career pages, swissdevjobs, jobs.admin.ch, jobs.ch), at a polite pace.
2. Merges duplicates, filters by place and title, scores each against the word lists in [[rules.json]].
3. Asks Claude the thirteen questions you chose, per advert ([[assess.ts]], through myos's [[Inference.ts]]).
4. For any job you set to Preparing on the board, writes a tailored CV, letter and email as Google Docs from your master CV ([[prepare.ts]]).
5. Publishes [[site/jobs/]] to the page.

Everything is TypeScript under bun, with tests ([[bun test Tools/jobs]]). [[README.md]] and [[CLAUDE.md]] in the folder explain each file; [[ISA.md]] is the contract.

> 💡 Read [[CLAUDE.md]] first when you get the code. It was written for an assistant, which means it is written for you too.`,
        },
        {
          id: "l2",
          title: "Get the code and run the tests",
          minutes: 5,
          body: `Ask Harry for the folder. The cleanest way is that he puts it on GitHub as a private repository and adds you, then:

~~~
mkdir -p ~/Code/personal && cd ~/Code/personal
git clone git@github.com:harryf/masha_job_search.git
cd masha_job_search
~~~

(If he gives you a zip instead: unzip it into [[~/Code/personal/masha_job_search]], then [[git init]], [[git add .]], [[git commit -m "Import from Harry"]].)

Two folders of his do not come along and should not: [[Tools/jobs/state/]] (his Google token and local caches) and [[node_modules/]]. Install the packages:

~~~
bun install
bun test Tools/jobs
~~~

Green tests mean the code works on your Mac. A few tests may skip when a token is missing; that is expected until lesson 4.

## Look around

~~~
code .
tree -L 2 Tools/jobs
cat Tools/jobs/rules.json | jq .
~~~

Then start myos in the folder and ask it to walk you through:

~~~
myos
~~~

- [[Read CLAUDE.md and README.md and explain the pipeline to me step by step.]]
- [[Which parts need secrets or accounts, and where do they live?]]

> 💡 The fastest way to learn a codebase in 2026: ask the assistant to explain it, then check one claim yourself in the file. Repeat.`,
        },
        {
          id: "l3",
          title: "Run it read-only",
          minutes: 4,
          body: `Nothing here writes anywhere.

~~~
bun Tools/jobs/run.ts --dry-run
~~~

Fetches at human pace, scores, and prints what it would write. Takes a few minutes. Read the report it mentions under [[Tools/jobs/reports/]].

~~~
bun Tools/jobs/run.ts --rescore
~~~

No fetching: re-apply [[rules.json]] to the stored postings. This is the one you run after editing the word lists.

Open the app from your own disk:

~~~
open site/jobs/index.html
~~~

It reads [[site/jobs/data/jobs.json]], so what you see is what the pipeline wrote.

## Your first real change

Add a word to the title list in [[rules.json]] (say a role name you keep seeing), run [[--rescore]], run the tests, look at the app. Then commit:

~~~
git add Tools/jobs/rules.json site/jobs/data/jobs.json
git commit -m "Add <word> to the title list"
~~~

Or let myos do it and read the diff: [[Add "Application Engineer" to the title words in rules.json, rescore, run the tests and show me the output, then commit.]]

> 💡 A change you made, tested and committed is the moment this stops being Harry's app.`,
        },
        {
          id: "l4",
          title: "What is Harry's and must become yours",
          minutes: 6,
          body: `Five pieces sit on Harry's side today. Each has a path to yours.

| Piece | Today | Yours |
|---|---|---|
| Google Cloud project and client JSON | Harry's project [[masha-job-search]] | Make your own in the Cloud console following [[Tools/jobs/GOOGLE-SETUP.md]] (enable Drive API, OAuth client of type Desktop, download JSON to [[Tools/jobs/state/google-client.json]]). Then [[bun Tools/jobs/google.ts login]] with **your** Google account. |
| Drive folder with your documents | Harry's Drive, shared with you | Make a folder in your Drive, move the master CV Doc in (File > Make a copy, or ask Harry to transfer ownership), and point the tool at it (the folder id in [[google.ts]]). |
| Inference.ts (the model calls) | [[~/.myos/MYOS/TOOLS/Inference.ts]] on his Mac | Already yours once myos is installed: same path on your Mac. |
| Grist board | Public doc, no login | Keep using it, or make your own copy at getgrist.com and change the doc id in [[prepare.ts]]. |
| Publish target and cron | [[harryf.github.io/private/masha-jobs/]], cron on his Mac | Your own GitHub Pages (lesson 5) and a cron line on your Mac. |

Do them in this order: Google (so prepare works), then publish, then cron. Each is a myos session: [[Walk me through GOOGLE-SETUP.md for my own Google account, step by step, and check each step with google.ts check.]]

## Secrets stay local

[[Tools/jobs/state/]] is in [[.gitignore]]. The client JSON, the token and your personal documents never go into git or onto a page. If myos ever proposes to commit something from [[state/]], say no.

> 💡 Until the Google step is done, everything else (fetch, score, assess, the app) runs fine. The documents step is the only one that needs it.`,
        },
        {
          id: "l5",
          title: "Own it",
          minutes: 6,
          body: `## Your repository

~~~
cd ~/Code/personal/masha_job_search
gh repo create masha-jobs --private --source=. --push
~~~

If you cloned from Harry's repo, change the remote first: [[git remote set-url origin git@github.com:<your-user>/masha-jobs.git]].

## Your page

GitHub Pages serves a folder of a repo as a website. Make a second, tiny repo for the public page so your pipeline repo stays private:

~~~
mkdir -p ~/Code/personal/masha-jobs-site && cd ~/Code/personal/masha-jobs-site
git init
cp -r ~/Code/personal/masha_job_search/site/jobs/. .
git add . && git commit -m "First publish"
gh repo create masha-jobs-site --public --source=. --push
~~~

On GitHub: the repo's **Settings > Pages**, source **Deploy from a branch**, branch [[main]], folder [[/ (root)]]. A minute later the app is at [[https://<your-user>.github.io/masha-jobs-site/]]. Install it on your phone from there.

Then ask myos: [[Change Tools/jobs/publish.ts so it mirrors site/jobs into ~/Code/personal/masha-jobs-site and pushes there, with a --dry-run. Run the dry run and show me.]]

## Your cron

~~~
crontab -e
~~~

~~~
0 11 * * * cd $HOME/Code/personal/masha_job_search && /opt/homebrew/bin/bun Tools/jobs/daily.ts >> Tools/jobs/logs/cron.log 2>&1
~~~

Check the bun path with [[which bun]] (brew puts it at [[/opt/homebrew/bin/bun]]; the curl installer at [[~/.bun/bin/bun]]). The Mac has to be awake at 11:00; a lid-closed laptop skips the run, which is fine, the next day catches up.

## Then tell Harry

He switches off his cron line and his publish, so there is one pipeline: yours.

> 💡 Welcome to owning software. The next thing you add is the first thing nobody asked for.`,
        },
      ],
      quiz: [
        { q: "What does daily.ts do?", a: ["Only publishes the page", "Fetch, score, assess, prepare documents, publish, in one run", "Deletes old jobs", "Sends emails"], c: 1, why: "The cron entry point runs every step and logs to Tools/jobs/logs." },
        { q: "Which folder must never be committed?", a: ["site/jobs", "Tools/jobs/state", "Tools/jobs/reports", "research"], c: 1, why: "state/ holds the Google client, the token and local caches." },
        { q: "What do you run after editing rules.json?", a: ["bun install", "bun Tools/jobs/run.ts --rescore", "git push", "brew upgrade"], c: 1, why: "Rescore applies the lists without fetching. Then test and look." },
        { q: "Which piece is already yours once myos is installed?", a: ["The Google client JSON", "Inference.ts", "The Drive folder", "The cron line"], c: 1, why: "Same path under ~/.myos on your Mac." },
        { q: "Why a second repo for the published page?", a: ["GitHub requires it", "Pages is public; the pipeline repo stays private", "It is faster", "Harry said so"], c: 1, why: "Public page, private code and data." },
        { q: "What makes the app stop being Harry's?", a: ["Renaming the folder", "A change you made, tested and committed yourself", "Deleting his name", "Buying a domain"], c: 1, why: "Ownership is the loop: change, test, commit, publish." },
      ],
      challenge: {
        title: "Your repo exists",
        body: `Paste the link to your repository (the [[gh repo view --web]] address, like [[https://github.com/you/masha-jobs]]).`,
        proof: {
          regex: "^https://github\\.com/[A-Za-z0-9-]+/[A-Za-z0-9._-]+/?$",
          sample: "https://github.com/masha/masha-jobs",
          placeholder: "https://github.com/...",
          hint: "A GitHub repository URL: https://github.com/<user>/<repo>.",
        },
      },
    },
    // ───────────────────────────────────────────── m10
    {
      id: "m10",
      emoji: "🏔️",
      title: "Keep going",
      blurb: "Ideas for the next months, and where to read more.",
      badge: "Trailblazer",
      lessons: [
        {
          id: "l1",
          title: "One small tool a week",
          minutes: 4,
          body: `The way to get good at this is boring and it works: build one small thing every week, with Claude, in a repo, used by you. Ideas, easiest first:

1. **A daily brief.** A script that prints today's calendar, the weather, and the top three jobs, run by cron at 08:00 and shown with [[osascript]] as a notification.
2. **Downloads sweeper.** Moves everything older than 30 days in [[~/Downloads]] into dated folders.
3. **CV versions.** A command that lists every tailored CV in Drive with its date and employer.
4. **Your own page.** A one-file site about you (like the map, but yours), published with GitHub Pages.
5. **Job alerts.** When the pipeline finds a job scoring above 80, send yourself a Telegram message.
6. **Interview prep.** A tool that takes an advert and generates ten likely interview questions, through [[Inference.ts]].
7. **A myos skill.** Package the thing you do most into a skill. Ask myos: [[Create a skill that ...]].

For each one: ISA first (ask myos to write it), plan mode, build, tests, commit, use it for a week, then improve or delete it.

## Where to read

- [Claude Code docs](https://code.claude.com/docs): quickstart, the terminal guide, common workflows.
- [Markdown basics](https://www.markdownguide.org/basic-syntax/).
- [brew.sh](https://brew.sh) and [bun.sh](https://bun.sh/docs).
- [The Missing Semester (MIT)](https://missing.csail.mit.edu/): the terminal course every CS degree forgets to teach. Lectures 1, 2 and 5 are the ones.

## Ask Harry

He likes being asked. "How would you approach X?" gets a better answer than "it does not work". Bring the ISA and the error message.

> 💡 You started this course knowing which key was Ctrl. Look at the badges on the Progress screen.`,
        },
      ],
      quiz: [],
      challenge: {
        title: "Pick your first weekly tool",
        body: `Write the name of the first tool you will build next week, one line. The box checks nothing; it is a promise to yourself.`,
        proof: {
          regex: "\\S{3,}",
          sample: "Downloads sweeper",
          placeholder: "the tool",
          hint: "Any name with a few letters.",
        },
      },
    },
  ],

  tips: [
    { title: "Paste without formatting", body: "{{Cmd+Shift+Option+V}} pastes plain text in most apps. No more surprise fonts in your email." },
    { title: "Emoji anywhere", body: "{{Ctrl+Cmd+Space}} opens the emoji picker in any text field. 🍺" },
    { title: "Quick Look everything", body: "Select a file in Finder, press {{Space}}. PDFs, images, code, videos. Space again to close." },
    { title: "pbcopy", body: "Pipe anything to the clipboard: [[cat notes.txt | pbcopy]]. Then {{Cmd+V}} wherever you like." },
    { title: "say", body: "[[say \"the build is done\"]] at the end of a long command and go make tea." },
    { title: "Spotlight does maths", body: "{{Cmd+Space}}, type [[1850*12]] or [[45 chf in eur]]. No calculator app needed." },
    { title: "open .", body: "In the Terminal, [[open .]] shows the current folder in Finder. Dragging a folder into the Terminal pastes its path." },
    { title: "Screenshot to clipboard", body: "Hold {{Ctrl}} while taking a screenshot ({{Ctrl+Cmd+Shift+4}}) and it goes to the clipboard instead of the Desktop." },
    { title: "caffeinate", body: "[[caffeinate -d]] keeps the Mac awake until you press {{Ctrl+C}}. Long downloads, long builds." },
    { title: "grep -r", body: "[[grep -rn \"TODO\" .]] finds every TODO under the current folder with file and line number." },
    { title: "Ctrl+R", body: "In the Terminal, {{Ctrl+R}} then a few letters searches your command history backwards." },
    { title: "cal", body: "[[cal]] prints this month. [[cal 2027]] prints the whole year." },
    { title: "Hidden files", body: "{{Cmd+Shift+.}} in Finder shows dotfiles. Press again to hide them." },
    { title: "Lock the screen", body: "{{Ctrl+Cmd+Q}} every time you stand up. Hot corner bottom right does the same with the mouse." },
    { title: "Text replacements", body: "System Settings > Keyboard > Text Replacements: type [[@@]] and get your email address." },
    { title: "sips resizes images", body: "[[sips -Z 1200 photo.jpg]] shrinks a photo to 1200 px on the long edge. No app, no upload." },
    { title: "tail -f", body: "[[tail -f some.log]] watches a log file grow live. {{Ctrl+C}} to stop." },
    { title: "Rename in Finder", body: "Select a file and press {{Return}} to rename. Select several, right-click, Rename to batch-rename." },
    { title: "which", body: "[[which bun]] tells you where a command lives. Handy when cron cannot find it." },
    { title: "mdfind", body: "[[mdfind -name Lebenslauf]] is Spotlight search from the Terminal." },
    { title: "Hold Option in menus", body: "Hold {{Option}} while a menu is open and some items change into their advanced versions." },
    { title: "du -sh", body: "[[du -sh * | sort -h]] shows what is big in the current folder, biggest last." },
    { title: "Cmd+K in Terminal", body: "{{Cmd+K}} clears the Terminal screen. Nothing else changes." },
    { title: "Force quit", body: "{{Cmd+Option+Esc}} opens Force Quit for a stuck app. The Mac equivalent of Ctrl+Alt+Del." },
    { title: "networkQuality", body: "[[networkQuality]] in the Terminal measures your internet speed. No website needed." },
    { title: "Preview signs PDFs", body: "Open a PDF in Preview, Tools > Annotate > Signature. Sign once with the trackpad, reuse forever." },
    { title: "history | grep", body: "[[history | grep brew]] finds every brew command you ever typed." },
    { title: "Dictation", body: "Press the microphone key (or {{Fn}} twice) to dictate into any text field." },
    { title: "osascript notifications", body: "[[osascript -e 'display notification \"done\" with title \"Terminal\"']] pops a notification. Chain it after a long command with [[&&]]." },
    { title: "Cmd+Shift+T", body: "Reopens the browser tab you just closed. Works in Chrome and Safari." },
  ],

  cheatsheet: {
    keys: [
      ["Copy, paste, cut", "Cmd+C, Cmd+V, Cmd+X", "Ctrl+C, Ctrl+V, Ctrl+X"],
      ["Undo, redo", "Cmd+Z, Cmd+Shift+Z", "Ctrl+Z, Ctrl+Y"],
      ["Switch apps", "Cmd+Tab", "Alt+Tab"],
      ["Quit an app", "Cmd+Q", "Alt+F4"],
      ["Close a window or tab", "Cmd+W", "Ctrl+W"],
      ["Open anything", "Cmd+Space", "Win key, type"],
      ["Settings of the app", "Cmd+,", "varies"],
      ["Start, end of line", "Cmd+Left, Cmd+Right", "Home, End"],
      ["Jump a word", "Option+Left, Option+Right", "Ctrl+Left, Ctrl+Right"],
      ["Forward delete", "Fn+Delete", "Delete"],
      ["Screenshot area", "Cmd+Shift+4", "Win+Shift+S"],
      ["Lock screen", "Ctrl+Cmd+Q", "Win+L"],
      ["Force quit", "Cmd+Option+Esc", "Ctrl+Alt+Del"],
      ["Quick Look a file", "Space", "none"],
      ["Rename in file manager", "Return", "F2"],
      ["Show hidden files", "Cmd+Shift+.", "View menu"],
      ["Go to folder", "Cmd+Shift+G", "type in address bar"],
      ["Emoji", "Ctrl+Cmd+Space", "Win+."],
      ["Terminal: stop a command", "Ctrl+C", "Ctrl+C"],
      ["Terminal: clear screen", "Cmd+K", "cls"],
    ],
    commands: [
      ["pwd", "where am I"],
      ["ls -la", "list everything here, long form"],
      ["cd folder, cd .., cd ~, cd -", "move: into, up, home, back"],
      ["mkdir -p a/b", "make folders"],
      ["touch f.txt", "make an empty file"],
      ["cp a b, cp -r dir dir2", "copy"],
      ["mv a b", "move or rename"],
      ["rm f, rm -r dir", "delete, for good"],
      ["cat f, less f, head f, tail -f log", "read a file"],
      ["echo text > f, >> f", "write, append"],
      ["grep -rin word .", "find lines with word"],
      ["a | b", "pipe a's output into b"],
      ["wc -l", "count lines"],
      ["sort | uniq -c", "count duplicates"],
      ["find . -name '*.png'", "find files"],
      ["pbcopy, pbpaste", "clipboard in and out"],
      ["open ., open -a App, open url", "open in Finder, app, browser"],
      ["say text", "speak"],
      ["which cmd", "where a command lives"],
      ["man cmd, cmd --help", "the manual"],
      ["chmod +x s.sh && ./s.sh", "make runnable, run"],
      ["crontab -e", "edit the schedule"],
      ["brew install x, --cask x", "install a tool, an app"],
      ["bun run f.ts, bun test", "run TypeScript, run tests"],
      ["git status, add, commit -m, push", "the daily four"],
      ["claude, myos", "start the assistant, plain or with the harness"],
    ],
  },
};
