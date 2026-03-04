# Module 8: Going Live with GitHub Pages
**Duration:** ~4-5 minutes
**Format:** Audio only

---

## INTRO — THIS IS IT

2. This is it.
3. [BEAT]
4. This is the moment.
5. [PAUSE]
6. Everything you've done so far — setting up your tools, writing prompts, building pages, learning Git —
7. It was all for this.
8. [BEAT]
9. In the next two minutes, your website is going to be on the internet.
10. Not localhost. Not a preview. The real, actual internet.
11. [BEAT]
12. Anyone with the link will be able to see it.
13. Your mom. Your friends. Your customers. Anyone.
14. [BEAT]
15. And it's free. GitHub gives you this for free.
16. [PAUSE]
17. Let's do it.

---

## STEP 1 — GO TO YOUR REPO

19. Okay. You should already be on your GitHub repo page.
20. If not, go to github.com, click your profile icon, go to "Your repositories," and click on your website repo.
22. [BEAT]
23. You should see all your files here. Your `index.html`, your CSS, your images. Everything we pushed in the last module.
24. [BEAT]
25. Good. Now.

---

## STEP 2 — OPEN SETTINGS

27. See the tabs at the top? Code, Issues, Pull requests, Actions...
28. [BEAT]
29. All the way to the right. Settings.
31. Click Settings.
32. [CLICK: Settings]
34. [BEAT]
35. Now look at the left sidebar.
37. Scroll down a little and you'll see "Pages."
39. Click it.
40. [CLICK: Pages]
42. [BEAT]
43. This is where the magic happens.

---

## STEP 3 — CONFIGURE GITHUB PAGES

45. Alright. You should see a section that says "Build and deployment."
46. [BEAT]
47. Under "Source," it should say "Deploy from a branch."
48. If it doesn't, click the dropdown and select that.
50. [BEAT]
51. Now. Under "Branch."
53. Click the dropdown. Select "main."
54. [CLICK: Branch dropdown → select "main"]
55. [BEAT]
56. Next to it, there's a folder dropdown. Make sure it says `/ (root)`.
58. That just means your website files are in the main folder, not buried inside a subfolder.
59. [BEAT]
60. Now click Save.
62. [CLICK: Save]
63. [BEAT]
64. That's it. You just told GitHub, "Hey, take the code on my main branch and turn it into a website."
65. [BEAT]
66. Now we wait.

---

## STEP 4 — WAIT FOR THE BUILD

68. GitHub needs a minute or two to build your site.
69. [BEAT]
70. You wanna check if it's done? Click on the "Actions" tab up top.
72. [CLICK: Actions tab]
74. [BEAT]
75. See that? It says "pages build and deployment." That orange dot means it's still working.
76. [BEAT]
77. Just wait. Give it a minute.
78. [BEAT]
81. [BEAT]
82. Green checkmark. That means it's done.
83. [BEAT]
84. Your website is live.

---

## STEP 5 — GET YOUR URL

86. Go back to Settings. Click Pages again.
87. [CLICK: Settings → Pages]
89. [PAUSE]
90. Look at that.
91. [BEAT]
92. See that green box at the top?
94. That's your URL. That's your website. On the internet. Right now.
95. [BEAT]
96. Click it.
97. [CLICK: The URL in the green box]

---

## THE BIG MOMENT

99. 
101. [LONG PAUSE — 3-4 seconds. Let this moment breathe.]
102. [BEAT]
103. There it is.
104. [BEAT]
105. That's your website. On the internet. You built that.
106. [PAUSE]
107. Not a developer. Not a designer. You.
108. [BEAT]
109. With your own words. With your own ideas. With a conversation.
110. [BEAT]
111. And anyone in the world can see it right now.
112. [PAUSE]
113. Take a second. Let that sink in.
114. [LONG PAUSE]

---

## TROUBLESHOOTING — IF SOMETHING'S OFF

116. Now. If things don't look perfect right away, don't panic.
117. [BEAT]
118. Here are the three most common issues.
119. [BEAT]
121. Number one. The site's not showing at all. You get a 404 or a blank page.
122. [BEAT]
123. First thing — go to the Actions tab. Is there a red X instead of a green checkmark?
125. If so, the build failed. Click on it to see the error.
126. [BEAT]
127. Most common reason? Your main HTML file isn't called `index.html`. It has to be exactly that. Not `home.html`. Not `main.html`. `index.html`.
128. [BEAT]
130. Number two. 404 Page Not Found.
131. [BEAT]
132. This usually means your `index.html` isn't in the root of your repo. It's buried inside a folder.
133. Your file structure should look like this.
135. `index.html` should be right at the top level. Not inside a `src` folder. Not inside a `public` folder. Right there at the root.
136. [BEAT]
137. If it's in the wrong place, tell Claude, "Move index.html to the root of my project," commit, and push again.
138. [BEAT]
139. Also — sometimes it just needs more time. If you just pushed, wait another minute and refresh.
140. [BEAT]
142. Number three. The site loads, but the CSS is broken or images aren't showing up.
143. [BEAT]
144. This is almost always a file path issue.
145. [BEAT]
146. Your CSS might be linked as `/styles.css` when it should be `styles.css` or `./styles.css`.
147. Same with images. If the path is wrong, the browser can't find the file.
148. [BEAT]
149. The fix? Tell Claude.
151. [TYPE on screen: My site is live on GitHub Pages but the CSS and images aren't loading. Fix the file paths.]
152. "My site is live on GitHub Pages but the CSS and images aren't loading. Fix the file paths."
153. [BEAT]
154. Claude will look at your HTML, fix every path, and you just commit and push again.
155. [BEAT]
156. Easy.

---

## CELEBRATE — YOU DID IT

158. But listen.
159. [BEAT]
160. If your site is up and it looks good?
161. [BEAT]
162. That's a big deal.
163. [PAUSE]
164. I don't care if it's a one-page bakery site. I don't care if it's simple.
165. You just built and deployed a website. From scratch. Without writing code.
166. [BEAT]
167. Most people pay someone thousands of dollars for this.
168. You did it yourself. With a conversation.
169. [PAUSE]
170. So here's what I want you to do right now.
171. [BEAT]
173. Copy that URL.
174. [BEAT]
176. And text it to someone.
177. [BEAT]
178. Your friend. Your partner. Your mom. Your business partner. Someone.
179. [BEAT]
180. Send them the link and say, "I built this."
181. [PAUSE]
182. Because you did.
183. [BEAT]
184. And this is just the beginning.
185. [BEAT]
186. In the next modules, we're gonna talk about custom domains, updating your site, and making it even better.
187. [BEAT]
188. But for right now? Go celebrate. You earned it.
189. [PAUSE]
190. I'll see you in the next one.
