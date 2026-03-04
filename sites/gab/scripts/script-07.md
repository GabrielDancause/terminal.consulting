# Module 7: Git & GitHub — Pushing Your Site
**Duration:** ~8-10 minutes
**Format:** Audio only

---

## INTRO — GIT IS NOT SCARY

2. Okay. Real talk.
3. This is the module that scares people.
4. [BEAT]
5. Git. GitHub. Version control. Pushing. Pulling. Branches.
6. It sounds like a lot.
7. [BEAT]
8. But here's what I need you to hear.
10. It's six commands. That's it.
11. Six commands and your website is gonna be on the internet.
12. [PAUSE]
13. So take a breath. We're gonna go step by step.
14. And by the end of this module, your code is gonna be safely stored in the cloud.
15. [BEAT]
16. Let's start with what this stuff actually is.

---

## WHAT IS GIT?

18. So. Git.
19. [BEAT]
20. You know how Google Docs has that version history thing?
21. Where you can see every change anyone ever made, and you can go back to any version?
23. Git is that. But for code.
24. [BEAT]
25. Every time you save a "snapshot" of your project — which is called a commit — Git remembers it.
26. Every single change. Every file. Every line.
27. [BEAT]
28. So if you ever break something — and you will, we all do — you can just go back.
30. It's a safety net for your code.
31. [BEAT]
32. That's all it is. A really smart save system.

---

## WHAT IS GITHUB?

34. Now. GitHub.
35. Git and GitHub are not the same thing. This confuses everyone.
36. [BEAT]
37. Git is the tool that tracks your changes. It lives on your computer.
38. GitHub is where you put your code online. It lives in the cloud.
39. [BEAT]
40. Think of it this way.
42. Git is like the version history feature.
43. GitHub is like Google Drive. It's where the files actually live online.
44. [BEAT]
45. So Git tracks the changes. GitHub stores them in the cloud.
46. [PAUSE]
47. And the reason we need GitHub specifically is because in the next module, we're gonna use it to make your website live.
48. Like, on the actual internet. For free.
49. [BEAT]
50. But first, we gotta get your code up there.

---

## STEP 1 — INITIALIZE GIT

52. Alright. Step one. Let's set up Git in your project.
53. [BEAT]
54. First, make sure you're in your website folder.
55. [TYPE on screen: cd ~/my-website]
56. `cd ~/my-website`
57. 
58. [BEAT]
59. If you named your folder something different, use that name instead. You know the drill.
60. [BEAT]
61. Now type this.
62. [TYPE on screen: git init]
63. `git init`
64. 
66. [BEAT]
67. That's it. You just told Git, "Hey, start tracking this folder."
68. It created a hidden folder called `.git` that keeps track of everything.
69. You'll never need to touch it. Just know it's there, doing its thing.
70. [BEAT]
71. Step one. Done.

---

## STEP 2 — CREATE A .GITIGNORE

73. Step two. We need to create a file called `.gitignore`.
74. [BEAT]
75. This is exactly what it sounds like.
76. It tells Git, "Hey, ignore these files. Don't track them."
77. [BEAT]
78. Why would you want Git to ignore files?
79. Because some files are junk. System files, temporary stuff, things that don't belong on the internet.
80. [BEAT]
81. And the easiest way to make one? Let Claude do it.
83. Open Claude Code and type this.
84. [TYPE on screen: Create a .gitignore for a static website project]
85. "Create a .gitignore for a static website project"
86. 
88. 
89. See? It knows exactly what to put in there.
90. `.DS_Store` — that's a Mac thing. Nobody needs to see that.
91. `.env` — that's for secret keys. Definitely don't want that online.
92. [BEAT]
93. Claude handles it. You don't need to memorize any of this.
94. [BEAT]
95. Step two. Done.

---

## STEP 3 — STAGE YOUR FILES

97. Step three. Staging.
98. [BEAT]
99. Okay, so here's how Git works.
100. You don't just save everything at once.
101. First, you pick which files you want to include in your next snapshot.
102. That's called staging.
103. [BEAT]
104. Think of it like packing a box before you ship it.
105. You put things in the box first. Then you seal it and send it.
106. Staging is putting things in the box.
107. [BEAT]
108. So type this.
109. [TYPE on screen: git add .]
110. `git add .`
111. 
112. [BEAT]
113. That dot means "everything." So we're saying, "Stage all the files in this folder."
114. [BEAT]
115. Now let's check what's staged.
116. [TYPE on screen: git status]
117. `git status`
118. 
120. [BEAT]
121. See all that green? Green means staged. Ready to go.
122. If you ever see red, that means those files haven't been staged yet.
123. [BEAT]
124. But right now, everything's green. We're good.
125. [BEAT]
126. Step three. Done.

---

## STEP 4 — YOUR FIRST COMMIT

128. Step four. The big one. Your first commit.
129. [BEAT]
130. A commit is that snapshot I was talking about.
131. It's Git saying, "Okay, I'm saving the state of everything right now."
132. [BEAT]
133. Every commit gets a message. A little note that says what you did.
134. So future you — or anyone else looking at your code — knows what happened.
135. [BEAT]
136. Type this.
137. [TYPE on screen: git commit -m "Initial website build"]
138. `git commit -m "Initial website build"`
139. 
141. 
142. There it is. Your first commit.
143. [BEAT]
144. The `-m` flag means "message." And then the message goes in quotes.
145. You can write whatever you want there. "Initial website build" is a classic first commit message.
146. [BEAT]
147. Some people write "first commit" or "initial commit." Doesn't matter. Just make it something that makes sense.
148. [BEAT]
149. Alright. Your code is now tracked by Git on your computer.
150. Now let's get it to the cloud.

---

## STEP 5 — CREATE A REPO ON GITHUB

152. Step five. We need to create a home for your code on GitHub.
153. [BEAT]
154. Go to github.com. Make sure you're logged in.
155. If you don't have an account yet, go make one. It's free. I'll wait.
156. [BEAT]
158. Okay. See that little plus icon in the top right?
160. Click that. Then click "New repository."
161. [CLICK: + → New repository]
163. [BEAT]
164. Now. Repository name.
165. This should match your project folder name. So if your folder is called `my-website`, type `my-website`.
166. 
167. [BEAT]
168. Description? Optional. You can put something like "My business website" or just leave it blank.
169. [BEAT]
170. Keep it set to Public.
172. I know that sounds weird — "Public? Everyone can see my code?"
173. Yes. And that's fine. That's actually how most websites work.
174. Plus, we need it public for free hosting in the next module.
175. [BEAT]
176. Now here's the important part.
178. Do NOT check any of these boxes.
179. No README. No .gitignore. No license.
180. [BEAT]
181. We already have our files. If you check these, GitHub creates extra files that conflict with what we already have. Trust me, just leave them unchecked.
182. [BEAT]
184. Click "Create repository."
185. [CLICK: Create repository]
187. [PAUSE]
188. Boom. Your repo exists. It's empty right now, but see these instructions on screen?
189. That's exactly what we're about to do.

---

## STEP 6 — CONNECT AND PUSH

191. Step six. The final step. We're connecting your computer to GitHub and sending the code up.
192. [BEAT]
193. Go back to your terminal.
195. We need three commands. I'm gonna type them one at a time and explain each one.
196. [BEAT]
197. First.
198. [TYPE on screen: git remote add origin https://github.com/your-username/my-website.git]
199. `git remote add origin https://github.com/your-username/my-website.git`
200. [BEAT]
201. Now, obviously, replace `your-username` with your actual GitHub username.
202. And if your repo is named something different, use that name.
203. [BEAT]
204. What does this command do? It tells Git, "Hey, when I say 'origin,' I mean this GitHub repo right here."
205. It's setting up the connection between your computer and the cloud.
206. 
207. [BEAT]
208. Second command.
209. [TYPE on screen: git branch -M main]
210. `git branch -M main`
211. 
212. [BEAT]
213. This one's simple. It's just renaming your default branch to "main."
214. Some systems call it "master" by default, but the convention now is "main."
215. Don't overthink it. Just run it.
216. [BEAT]
217. Third and final command.
218. [TYPE on screen: git push -u origin main]
219. `git push -u origin main`
220. [BEAT]
221. This is the big one. This is the push.
222. You're saying, "Take everything I committed and send it up to GitHub."
223. 
225. 
226. [BEAT]
227. Look at that. It's uploading.
228. [PAUSE]
229. And... done.
230. [BEAT]
231. The `-u` flag, by the way? That just means "remember this." So next time you push, you can just type `git push` without all the extra stuff.

---

## VERIFY ON GITHUB

233. Now let's make sure it worked.
234. [BEAT]
235. Go back to your browser. Go to your GitHub repo.
236. Refresh the page.
237. [REFRESH the page]
239. 
240. There it is. All your files. On GitHub. In the cloud.
241. [BEAT]
242. Your `index.html`. Your `styles.css`. Your images. Everything.
243. [BEAT]
244. You can click on any file and see the code right there in the browser.
245. [CLICK: on index.html to show the code]
247. [BEAT]
248. That's your code. You built that. And now it's backed up online.
249. [BEAT]
250. Even if your computer dies tomorrow, your website is safe.

---

## COMMON ERRORS — DON'T PANIC

252. Okay. Before we wrap up, let me save you some future headaches.
253. [BEAT]
254. Git errors look terrifying. They're usually not. Here are the three you'll probably run into.
255. [BEAT]
257. Number one. "Remote origin already exists."
258. This just means you already connected a remote before.
259. The fix is simple.
260. [TYPE on screen: git remote remove origin]
261. `git remote remove origin`
262. [BEAT]
263. And then run that `git remote add origin` command again with the right URL.
264. That's it. You're just removing the old connection and adding a new one.
265. [BEAT]
267. Number two. "Authentication failed."
268. This means GitHub doesn't know who you are.
269. [BEAT]
270. The easiest fix? If you have the GitHub CLI installed — which we set up earlier — just type this.
271. [TYPE on screen: gh auth login]
272. `gh auth login`
273. [BEAT]
274. Follow the prompts. It'll open a browser, you log in, and you're good.
275. [BEAT]
276. If you don't have the GitHub CLI, you'll need to create something called a Personal Access Token on GitHub. It's in Settings, Developer Settings, Tokens. But honestly? Just use `gh auth login`. Way easier.
277. [BEAT]
279. Number three. "Failed to push some refs."
280. This one sounds bad. It's not.
281. [BEAT]
282. It usually means GitHub has something your computer doesn't. Like that README file we told you not to create. If you accidentally checked that box, this happens.
283. [BEAT]
284. The fix.
285. [TYPE on screen: git pull origin main --allow-unrelated-histories]
286. `git pull origin main --allow-unrelated-histories`
287. 
288. [BEAT]
289. Then push again.
290. [TYPE on screen: git push -u origin main]
291. `git push -u origin main`
292. 
293. [BEAT]
294. That flag — `--allow-unrelated-histories` — is just saying, "Yeah I know these don't match up perfectly, merge them anyway."
295. [BEAT]
296. And if none of that works? Tell Claude.
297. Copy the error, paste it into Claude Code, and say "Fix this."
298. Nine times out of ten, it'll handle it.

---

## PRO TIP — LET CLAUDE HANDLE GIT

300. Actually, that's my biggest pro tip for this whole module.
301. [BEAT]
302. You do not need to memorize any of these commands.
303. [BEAT]
304. Once you've done the initial setup — which we just did — you can literally just tell Claude what to do.
305. [BEAT]
306. [TYPE on screen: Commit all my changes with the message "Updated homepage design" and push to GitHub]
307. "Commit all my changes with the message 'Updated homepage design' and push to GitHub."
309. 
310. [BEAT]
311. It runs all the commands for you. The add. The commit. The push. Everything.
312. [BEAT]
313. Or even simpler.
314. [TYPE on screen: Push my code to GitHub]
315. "Push my code to GitHub."
316. [BEAT]
317. Claude figures out what needs to happen and does it.
318. [BEAT]
319. So yeah. Learn the concepts. Understand what Git is doing. But don't stress about memorizing commands.
320. That's what Claude is for.

---

## OUTRO — RECAP

322. Let's recap what just happened.
323. [BEAT]
325. One. We initialized Git in our project. `git init`.
326. [BEAT]
327. Two. We created a `.gitignore` so junk files don't get tracked.
328. [BEAT]
329. Three. We staged our files. `git add .`
330. [BEAT]
331. Four. We committed them. Our first snapshot.
332. [BEAT]
333. Five. We created a repo on GitHub.
334. [BEAT]
335. Six. We connected our computer to GitHub and pushed everything up.
336. [BEAT]
337. Six steps. That's all Git is. At least for now.
338. [PAUSE]
339. Your code is in the cloud. It's backed up. It's safe.
340. [BEAT]
341. And in the next module?
342. [BEAT]
343. We're taking that code and putting it on the actual internet.
344. Your website. Live. For real.
345. [BEAT]
346. That's Module 8. I'll see you there.
