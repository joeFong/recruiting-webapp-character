# recruiting-webapp-character
React coding test

# Approach 
This application has 2 layers, a context that manages data pertaining characters, and core components that facilitate the character management in the front end.  

1. To create a context that stored the global data about a character
  - To also poll character data from the API endpoint 
  - To export character data from the API endpoing 
  - Calculate meta data regarding characters such as skill points, remaining stats and skills.  

The context was to act as the global store to push and pull data to the core components. This was done to avoid prop drilling and to have a centralized area to manage character data. 

2. To modularise the sections in the app 
  - The character selection <CharacterSelection/> component 
  - The character/party skill check <CharacterSkillCheck/> component
  - The character skill slider <CharacterSkillSlider/> component
  - The character stat attribute slider <CharacterAttributes/> component 
  - The character classes <CharacterClasses/> component 

Each core component was to handle a disctinct role within the app. 

The <CharacterSelection/> component was to handle adding, saving, deleting, and selecting characters. 

The <CharacterSkillCheck/> component was the playground to test if the character can pass the DC check for a certain skill, as well as be extended to check for party skill as well via props. This was done to reduce the repeated code & logic. 

The <CharacterSkillSlider/> component to allow incrementing and decrementing character skills 

The <CharacterAttributes/> component to allow incrementing and decrementing character stats 

The <CharacterClasses/> component to show available classes and class eligibility based on character stats

# Final Notes 

I had an incredibly fun time creating this app. It reminded me of the videos games I used to play when I was younger. 

Thank you for the opportunity, and I would love any feedback if any. 

Thank you. 