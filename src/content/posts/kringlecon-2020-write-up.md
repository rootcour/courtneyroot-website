---
title: "KringleCon 2020: a partial write-up"
description: "My first SANS Holiday Hack Challenge: S3 bucket hunting, unpacking an over-wrapped file, extracting secrets from an Electron app, and more."
date: 2021-01-10
pillar: general
archived: true
---

KringleCon is the conference behind the SANS Holiday Hack Challenge, held every year since 2010. It's put on by the SANS Institute, which develops training and certification courses. Those courses are usually expensive, so most people try to get their employer to sponsor prep courses and exam fees.

This was my first year playing, and two things stood out. First, there's a Discord server with moderators where players can ask questions, get hints and get unstuck. When I'm stuck, I like some encouragement after I've done my own research, and this kept me going. Even so, there's a lot of content and I didn't get through all of it. Second, they have their own music, which is on Spotify. My favorites were "I Could Be Santa" and "I Saw Mommy Kissing Santa Claus."

Follow along as I walk through the parts I completed. Commands I entered are in code blocks.

**Warning: spoilers ahead.** You can still play at [2020.kringlecon.com](https://2020.kringlecon.com/).

To start, create an account and a character from the preset options. There's also an introductory video with helpful tips.

## Objective 1: Uncover Santa's gift list

> There is a photo of Santa's desk on that billboard with his personal gift list. What gift is Santa planning on getting Josh Wright for the holidays?

When you first arrive, an elf gives you hints to download the billboard picture in the distance. On the desk in the picture is a list with swirled writing. A hint points to Photopea: use the lasso tool to draw around the swirled writing, then apply the twirl filter in reverse to make it readable.

Josh Wright is getting a **Proxmark3**. Enter that as the answer to objective 1.

## Objective 2: Investigate S3 bucket

> When you unwrap the over-wrapped file, what text string is inside the package?

This starts outside the castle with Shinny Upatree.

First is the Kringle Kiosk, a menu of options. A hint says option 4 has a command injection vulnerability and to use `/bin/bash`. It took me a couple of tries to realize I needed an ampersand so the interpreter would run my command:

```sh
& /bin/bash
```

That completes the mini-task and unlocks more hints for the main objective.

I needed a lot of help from Discord on this one; it took me a while just to figure out how to download the file. The gist: modify the inputs to an existing script that searches for a public S3 bucket and downloads its contents, then peel back every layer of compression until you reach a text file.

Following the hints, I used `vi` to add the word `wrapper3000` to the wordlist. I lost a lot of time because I didn't realize it was case-sensitive: I'd tried `Wrapper3000` but not the lowercase version. Once the word was added, the script downloaded the file:

```sh
./bucket_finder.rb wordlist --download
```

The file was `package.txt.Z.xz.xxd.tar.bz2`, so I unwrapped it one layer at a time, looking up each extension as I went:

```sh
base64 --decode package > newpackage
unzip newpackage
bzip2 -d package.txt.Z.xz.xxd.tar.bz2
tar xopf package.txt.Z.xz.xxd.tar
xxd -r package.txt.Z.xz.xxd package.txt.Z.xz
xz --decompress package.txt.Z.xz
uncompress package.txt.Z
cat package.txt
```

It prints **"North Pole: The Frostiest Place on Earth."** Enter that as the answer to objective 2.

## Objective 3: Point-of-sale password recovery

> Help Sugarplum Mary in the courtyard find the supervisor password for the point-of-sale terminal.

The courtyard is behind the castle. I started with the Linux Primer challenge: finding munchkins while removing files and moving between directories. I looked up any commands I didn't know.

Afterward, Sugarplum Mary gives more hints. Download `santa-shop.exe`; the goal is to get at the source code and look for a hard-coded password. It's an Electron app, so the source lives in an `app.asar` archive. On macOS, I installed the tools with Homebrew and npm:

```sh
brew update
brew install node
npm install -g asar
mkdir obj3-sourcecode
```

Then, from the folder containing `app.asar` (for me, `app-64/resources/`):

```sh
asar extract app.asar /full/path/to/obj3-sourcecode
```

Opening `main.js`, the password was right there:

```js
const SANTA_PASSWORD = 'santapass';
```

Enter **santapass** for objective 3. (A good real-world reminder: never hard-code secrets in client-side code.)

## Objective 4: Operate the Santavator

You complete this by wandering the castle collecting objects and light bulbs to power the elevator. Not everything is on the ground floor, so you collect what you can, ride up, and find more. There are red, yellow and green bulbs plus a key for the back panel. Directing power to each color enables different floor buttons. Mine wasn't pretty, but it worked.

That got me to the other floors, but I didn't get far enough to get the fingerprint needed for Santa's office. Objectives 1 through 4 were as far as I got.

## Side quests

**The Elf Code (Dining Hall).** An arcade game where you write JavaScript to move your elf around, collecting lollipops and avoiding obstacles. Each level gives hints about the expected input and gets harder.

**The Unprep door (Kringle Talks floor).** Bushy Evergreen hints to run `strings` against the binary in the nearby terminal:

```sh
strings door
```

Scrolling through the output reveals the plaintext password. Run the binary and enter it:

```sh
./door
# password: Op3nTheD00r
```

The door opens to the Unprep room. I didn't finish the other tasks there, like turning on the lights and fixing the vending machine.

**Snowball Fight.** Basically Battleship against an AI at a difficulty you choose. I played the old-fashioned way rather than hacking the AI, and I was not good.

## Verdict

I thoroughly enjoyed this challenge. I wish I'd had more time for the remaining objectives and side plots; even after many hours there was plenty left. It was a great way to learn by searching for concepts when I got stuck and by getting insight from other players on Discord.

I'll definitely play again next year.
