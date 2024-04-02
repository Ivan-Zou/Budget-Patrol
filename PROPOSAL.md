# Chrome Extension: Budget Patrol

## Authors

Ivan Zou,
Allie Fehr,
Roberto Ligeralde

## Problem Statement

Our Chrome Extension makes it easier to stay within your budget when shopping online. Often, people create budgets to keep their spending smart but have difficulty tracking how their potential purchases fit into their budget or need to manually open up another tab with a spreadsheet and compare potential purchases to their budgeting goals. Our chrome extension removes the need to have another tab open and insteads sends pop up notifications to the user letting them know how the purchases of the product whose page they are currently on would fit into or exceed their budget. 

## Target Audience

Our target audience is people who enjoy shopping and are on a budget.

## Description

The purpose of our Chrome Extension is to help users stay within their budget when shopping online. It will allow users to set budget categories (e.g. clothing, food, vacation) and monthly budget goals. While a user is browsing the web page of a product/service they might buy, the extension will find the price and provide a pop-up notification to the user informing them of how that purchase would affect their budget (e.g. “This item exceeds your __ budget by $__” or “You will have $__ remaining in your __ budget after this purchase”). If prices of a product or the category can't automatically be determined by the extension, a pop-up will appear where the user can quickly select the category from their pre-made category (or create a new one) and type in the price and see how the purchase would affect the budget for this category. 

## Selling Points

1. Works across many big online retailers such as Amazon, Ebay, etc.
2. Considers an item automatically into your budget when that item is added to your cart
3. Synchronizes with traditional budgeting tools like Google Sheets
4. Many different ways to make user acutely aware of how much a purchase really costs them
5. Easy to adjust budgets, and provides recommended budget breakdowns

## User Stories

- As someone who is on a budget, I want easily track if the things I want to buy online go over my budget so that I don’t overspend
- As someone who likes to track my purchases, I want to track the category of items I am buying and the total money spent in each category so that I can track the category of items I’m overspending on.
- As an avid budgeter, I want to see the percentage of my budget that I have left, so that I can visualize how much of my budget I have remaining
- As someone who shops on multiple websites, I want to track the total cost of everything in my cart on all of the websites, so that I can see how much everything costs across all the websites.
- As someone who tends to make splurge purchases, I want to view prices as percentages of my budget so that I’m more aware of the consequences of my habits
- As someone who maintains budgeting spreadsheets, I want to update my sheets remotely upon purchase so that I never forget to log anything
- As someone trying to learn the value of money, I want to be able to visualize prices as hours worked so that I’m conscious about how much a dollar costs me
- As a regular concertgoer, I want to be able to factor in ticket prices well in advance so that I know I’ll have enough by the time tickets are released
- As a forgetful person, I want to know when a purchase uses up a substantial amount of my budget so that I never forget about my monthly limits
- As someone who regularly orders international items, I want to be able to convert foreign currencies effortlessly so that I can correctly factor them into my budget
- As a frequent traveler, I want to be able to allocate travel funds ahead of time so that I can regulate my other expenses accordingly
- As a freelancer with irregular income, I want to be able to adjust my budget easily so that I can spend according to my current income
- As someone with dependents, I want to be able to set aside money for them so that I never fail to give them their money on time
- As someone new to budgeting, I want to receive a recommended breakdown of how to divide my funds so that I know how to start off
- As a taxpayer, I want to have my budget automatically factor in my tax amount so that I’ll have enough saved come tax season.

## Notes

- We’ll want to limit ourselves to sites where prices can easily be scraped

## References & Inspiration


## Technical Details

### User Interface

There is a popup menu with two sub-pages: one for submitting purchases and another for viewing / editing current budget breakdowns.
Purchase submission has dropdown for choosing category, textboxes for inputting amount + product name, window for viewing budget remaining after making this purchase, and a submission button
Budget view has each category next to a window displaying the current amount, and allows users to edit it from there. Also has a window for adding a new category + its associated budget

### API, Libraries, and Frameworks

JavaScript, Node, React
Sheets API

### Data Storage

We are going need to store items and its price
A budget
Store the categories the person defines on browser
Name, allocation, remaining
The sheet which the budget corresponds to

## Project Management



### Collaboration and Task Allocation

_[Select a Leader, who will make final decisions on the vision of the project; and a Manager, who will oversee the project management and ensure all team members have everything they need to contribute effectively. List the remaining team members and their roles.]_

- **Leader:** Allie
- **Manager:** Roberto Ligeralde
- **Remaining Team Members:** Ivan, Arjun

Roberto
- API / scraping research
- API Integration
Allie
- Logic of adding categories, updating budget 
Ivan
- Page layout + frontend
- Graphic design
Arjun
- Chrome storage
- React Stuff
- API Integration

_[Provide a brief overview of what each team member will work on. How will you collaborate on this project? What tools or platforms will you use to communicate and share code?]_

Weekly meeting at beginning of week to lay out objectives, constant communication during the week
Communication via Slack channel, shared repo branches for each member’s weekly task (merged by end of week)

### Risks and Mitigation

Unusable sheets API
- Write a disclaimer that this is only for online purchase budgeting
No good website for scraping
- Just don’t this and instead add a simpler feature (ex: warning system)

### Milestones and Timeline

- Week 1: Research Sheets API, UI MockUp + Implementation (functionless app)
- Week 2: Functionalities: add + submit category, submit purchase to category
- Week 3: Sheets integration, research scraping + automatic purchase logging, testing
- Week 4: Beautify, finish sheets integration, auto log + scrape if it’s possible, publish!

