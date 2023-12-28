---
title: Streamlining your ChatGPT experience by integrating ChatGPT in dmenu
description: Streamlining Your ChatGPT Experience by integrating ChatGPT in Dmenu
path: django-jet-calm-announcement
published: 2023-03-08T10:12:15.170Z
cover: /blog/streamlining-chatgpt-experience-integrating-chatgpt-dmenu.png
---

<img src="/blog/streamlining-chatgpt-experience-integrating-chatgpt-dmenu.png">

## Intro
ChatGPT is a state-of-the-art conversational artificial intelligence developed by OpenAI, capable of generating human-like responses to a wide range of prompts. Using the power of deep learning, natural language processing, and a massive dataset of human conversation, ChatGPT can understand the nuances of language and provide intelligent and engaging responses to users. With its ability to learn and adapt to new information, ChatGPT represents a major breakthrough in the field of artificial intelligence and natural language processing.

ChatGPT has been used in a variety of applications, including chatbots, virtual assistants, and language translation tools, and has quickly become a popular tool for developers and businesses looking to enhance their customer engagement and user experience.

But how about if we are able to start ChatGPT conversation with a keyboard shortcut right inside your dmenu?

## Prerequisites
- **OpenAI API key for GPT-3**

	You can obtain a key from https://openai.com/ for research and development purposes.
	
- **Dmenu**

    - [Rofi](https://davatorium.github.io/rofi/) or dmenu for linux 
    - [Raycast](https://www.raycast.com/) for Mac

-  **Shell GPT**

	A command-line productivity tool powered by OpenAI's ChatGPT (GPT-3.5)
	Source: https://github.com/TheR1D/shell_gpt


## Configuration
### Linux

- **Script**

    The following shell script is designed to interact with OpenAI's SGPT API and display the result in a user-friendly way using either rofi or zenity.
    Copy the script to the directory of your preference.


<img src="/blog/chatgpt_rofi_script.png">


- **Keyboard shortcut to launch chatgpt prompt**

    Replace {PATH_TO_SGPT_SCRIPT_FILE} with actual path in your system and add it to _~/.config/openbox/rc.xml_.
    Reload the openbox configuration to changes to take effect.

    <img src="/blog/chatgpt_openbox_shortcut.png">

    Now, you can launch chatgpt prompt by pressing <kbd>Mod</kbd> + <kbd>R</kbd>

    > I am using Archcraft OS with Openbox window manager. So shortcut configuration varies between different WMs and Desktop environments.


### In action
- Rofi prompt

<img src="/blog/chatgpt_prompt.png">

- Zenity progressbar
  
<img src="/blog/chatgpt_progress.png">

- Result
  
<img src="/blog/chatgpt_result.png">
  

## On Mac
There's an excellent extension available which works seamlessly with Raycast on Mac.
Visit [ChatGPT Raycast](https://github.com/abielzulio/chatgpt-raycast) for installation and usage instructions.


## Conclusion
In conclusion, integrating ChatGPT in dmenu is an effective way to streamline your ChatGPT experience. With this integration, you can quickly and easily access ChatGPT's vast knowledge base without having to leave your current application or open a new window. This makes it a convenient tool for anyone who wants to get information or assistance quickly and efficiently.

Furthermore, the flexibility of dmenu allows users to customize their ChatGPT experience to suit their individual needs. They can customize the interface, change the search parameters, and even integrate other tools and services to enhance their ChatGPT experience further.
