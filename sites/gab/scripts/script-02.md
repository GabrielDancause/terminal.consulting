# Module 2: Setting Up Your Tools
**Duration:** ~9 minutes | **Format:** Audio only

---

## INTRO — SETTING EXPECTATIONS

1. Alright, welcome back.
2. So this module is the setup. I'm not gonna lie — this is the boring part.
3. [BEAT]
4. But here's the deal. You only do this once.
5. After today, you never have to do any of this again.
6. [BEAT]
7. And I know the terminal and all this stuff looks intimidating. I get it.
8. When I first opened a terminal window, I felt like I was about to accidentally launch a missile or something.
9. [BEAT]
10. You're not gonna break anything. I promise.
11. So just follow along, step by step, and in about ten minutes you'll be all set up.
12. [PAUSE]
13. There are seven steps. Let's go.

---

## STEP 1 — CREATE A GITHUB ACCOUNT

14. Step one. Go to github.com.
15. If you already have an account, skip ahead. If not, click Sign Up.
16. Now here's something important. Pay attention to your username.
17. [BEAT]
18. Your username becomes part of your website URL.
19. So if your username is "xXxDarkWolf99xXx"... that's gonna be your website address.
20. [BEAT]
21. Pick something professional. Your name is great. Your business name works too.
22. Something like your first and last name, or your business name. Keep it clean.
23. [BEAT]
24. Fill out the rest of the form. Verify your email. Standard stuff.
25. Once you see the GitHub dashboard, you're good. Step one, done.

---

## STEP 2 — INSTALL GIT

26. Step two. We need Git on your computer.
27. Git is the tool that lets you send your code to GitHub. Think of it like the delivery truck.
28. [BEAT]
29. Now if you're on a Mac, you might already have it. Let's check.
30. Open your terminal and type git dash dash version.
31. If you see a version number, you're good. Skip to step three.
32. [BEAT]
33. If you get a pop-up asking you to install developer tools, or if it says "command not found," here's what to do.
34. Type xcode-select dash dash install and hit enter.
35. A little window will pop up. Click Install. Wait a few minutes. That's it.
36. [BEAT]
37. Now if you're on Windows, it's a little different.
38. Go to git-scm.com. Download the installer.
39. Run it and just click Next through everything. The default settings are fine.
40. Don't change anything. Just Next, Next, Next, Install.
41. [BEAT]
42. Once it's done, open a new terminal and type git dash dash version again.
43. You see a version number? Perfect. Step two, done.

---

## STEP 3 — INSTALL NODE.JS

44. Step three. Node.js.
45. Node is what makes Claude Code run on your computer. You don't need to know anything about it.
46. You just need it installed.
47. [BEAT]
48. Go to nodejs.org.
49. You'll see two big download buttons. Click the one that says LTS. That stands for Long Term Support.
50. It's the stable one. The safe one. That's the one you want.
51. Download it. Run the installer. Again, default settings all the way. Don't change anything.
52. Just keep clicking Next or Continue until it's done.
53. [BEAT]
54. Now let's verify. Open your terminal. Type node dash dash version.
55. You should see a version number. Something like v20 or v22. Doesn't matter what the exact number is, as long as you see one.
56. Now type npm dash dash version.
57. npm comes with Node. If Node installed correctly, npm is already there.
58. [BEAT]
59. Two version numbers? Step three, done.

---

## STEP 4 — INSTALL CLAUDE CODE

60. Step four. This is the big one. Claude Code.
61. [BEAT]
62. In your terminal, type this exact command.
63. npm install dash g at anthropic-ai slash claude-code.
64. [BEAT]
65. I know that looks like a lot. Just type it exactly. Or pause this and copy it from the course materials.
66. Hit enter and let it do its thing. You'll see a bunch of text scrolling. That's normal. Don't worry about it.
67. [BEAT]
68. Once it says it's done, you're good.
69. [PAUSE]
70. Now. If you got a permission error — and a lot of you will — here's the fix.
71. [BEAT]
72. On Mac, put the word sudo in front of the command. S-U-D-O. Then a space. Then the same command.
73. It'll ask for your password. Type it in. You won't see the characters appear — that's normal. It's a security thing. Just type your password and hit enter.
74. [BEAT]
75. On Windows, close your terminal. Right-click on PowerShell and choose "Run as Administrator."
76. Then try the install command again.
77. [BEAT]
78. Alright, let's verify. Type claude dash dash version.
79. You see a version number? Beautiful. Step four, done.

---

## STEP 5 — OPEN YOUR TERMINAL (FOR BEGINNERS)

80. Okay, quick detour. I've been saying "open your terminal" this whole time.
81. Let me actually tell you what that means.
82. [BEAT]
83. On Mac. Hit Command and Space at the same time.
84. That opens Spotlight. It's the search thing.
85. Type the word Terminal. Hit Enter.
86. And there it is. That's your terminal.
87. [BEAT]
88. On Windows. Click the Start menu.
89. Type PowerShell. Click on Windows PowerShell.
90. That's your terminal. Same idea, different look.
91. [BEAT]
92. Both of them do the same thing. You type commands, hit enter, stuff happens.
93. That's literally all a terminal is.

---

## QUICK TERMINAL BASICS — THE ONLY 3 COMMANDS YOU NEED

94. Now, before we go further, let me teach you three terminal commands.
95. Just three. That's all you'll ever need for this course.
96. [BEAT]
97. Number one. ls. That's a lowercase L and a lowercase S.
98. It lists what's in your current folder. Think of it like opening a folder on your desktop and seeing what's inside.
99. On Windows, use dir instead. Same thing.
100. [BEAT]
101. Number two. cd. Stands for "change directory." Directory just means folder.
102. You type cd and then the name of the folder you want to go into.
103. cd Documents takes you into your Documents folder.
104. cd dot dot takes you back up one level.
105. [BEAT]
106. Number three. mkdir. Stands for "make directory." It creates a new folder.
107. mkdir my-website creates a folder called my-website. That's it.
108. [BEAT]
109. So. ls to look around. cd to move. mkdir to make a folder.
110. Three commands. You're a hacker now.
111. [BEAT]
112. I'm kidding. But seriously, that's all you need.

---

## STEP 6 — RUN CLAUDE CODE FOR THE FIRST TIME

113. Alright, this is the fun part. Let's actually run Claude Code.
114. [BEAT]
115. In your terminal, just type claude. One word. Hit enter.
116. The first time you run it, it's gonna ask you to authenticate.
117. It'll open your browser and ask you to log into your Anthropic account.
118. If you don't have one yet, create one now. It's free to sign up.
119. [BEAT]
120. Now I should mention — Claude Code does use API credits. Anthropic gives you some free credits to start.
121. That's plenty to build your first website. So don't worry about that right now.
122. [BEAT]
123. Okay. Once you're logged in, you should see Claude Code waiting for you in your terminal. It looks like a chat interface.
124. [BEAT]
125. Let's test it. Type something simple.
126. Just say "say hello and tell me a fun fact."
127. [BEAT]
128. If it responds, everything is working. You just talked to an AI from your terminal.
129. [PAUSE]
130. Now type slash exit to close it.
131. And you're back to your regular terminal. Easy.

---

## STEP 7 — VERIFY EVERYTHING WORKS

132. Last step. Let's just make sure everything is working.
133. [BEAT]
134. We're gonna run four commands real quick.
135. git dash dash version. You should see a version number.
136. node dash dash version. Another version number.
137. npm dash dash version. Another one.
138. claude dash dash version. And one more.
139. [BEAT]
140. Four for four? You're golden.

---

## TROUBLESHOOTING — COMMON ISSUES

141. Now, if something didn't work, don't panic. Let me cover the most common issues real quick.
142. [BEAT]
143. Number one. "Command not found." This means the program didn't install correctly, or your terminal doesn't know where to find it.
144. First thing to try: close your terminal completely and open a new one. Seriously. That fixes it like half the time.
145. When you install something, sometimes your terminal needs a fresh start to recognize it.
146. [BEAT]
147. Number two. Permission errors. We talked about this with Claude Code, but it applies to anything.
148. On Mac, try putting sudo in front of the command.
149. On Windows, make sure you're running the terminal as Administrator.
150. [BEAT]
151. Number three. Old versions. If something installed but the version number looks really old, just go back to the website and download the latest version.
152. Reinstall it. It'll overwrite the old one.
153. [BEAT]
154. And if you're still stuck? That's genuinely okay.
155. Every computer is a little different. Sometimes things are weird.
156. Drop a question in the comments or the community and we'll help you out.
157. [BEAT]
158. Don't let a setup issue stop you. We'll get it sorted.

---

## WRAP UP

159. Alright. Let's recap what you just did.
160. [BEAT]
161. You created a GitHub account.
162. You installed Git.
163. You installed Node.js.
164. You installed Claude Code.
165. You opened your terminal like a pro.
166. You ran Claude Code and talked to it.
167. And you verified everything works.
168. [BEAT]
169. That's seven steps. And you're done. You never have to do any of this again.
170. [PAUSE]
171. The setup is over. The fun starts now.
172. [BEAT]
173. In the next module, we're actually going to build your website.
174. You're gonna talk to Claude Code, and it's gonna create your whole site.
175. [BEAT]
176. I'll see you there.

---

**END OF MODULE 2**
Estimated spoken time: ~9 minutes
