# Module 10: Making Changes & Keeping It Updated
**Duration:** ~6-8 minutes
**Format:** Audio only

---

## INTRO — YOUR SITE IS LIVE, NOW WHAT

2. So. Your site is live. Custom domain. SSL. SEO. The whole thing.
3. [BEAT]
4. Now what?
5. [BEAT]
6. Well, a website isn't a poster. You don't build it and walk away.
7. Hours change. Menus change. You run a special. You hire someone. Seasons change.
8. [BEAT]
9. Your site needs to keep up.
10. [PAUSE]
11. The good news? Updating your site is way easier than building it was.
12. And that's what this module is about.

---

## THE UPDATE WORKFLOW — FIVE STEPS

14. Every single update you'll ever make follows the same five steps.
15. [BEAT]
16. Every. Single. One.
17. [BEAT]
19. Step one. Open your terminal and cd into your project folder.
21. cd my-website. Or whatever your folder's called. You know this one by now.
22. [BEAT]
24. Step two. Type claude to start Claude Code.
26. Just like we've been doing all course.
27. [BEAT]
29. Step three. Describe what you want to change. In plain English.
30. [BEAT]
32. Step four. Commit and push to GitHub.
33. [BEAT]
35. Step five. Wait a minute or two for GitHub Pages to deploy.
36. [BEAT]
38. That's the rhythm. cd, claude, describe, push, wait. Every time.
39. [PAUSE]
40. Let me show you some real examples.

---

## EXAMPLE UPDATES — THE STUFF YOU'LL ACTUALLY DO

42. Let's say your hours change. Maybe you're now open Sundays.
44. "Update my business hours on the contact page. We're now open Sunday from ten AM to three PM."
46. Done. Ten seconds.
47. [BEAT]
49. Let's say you added a new item to your menu.
50. "Add a new menu item called 'Sourdough Focaccia' in the bread section. Price is four fifty. Description is 'Crispy on the outside, soft and airy inside. Made with our forty-eight hour fermented dough.'"
52. Done.
53. [BEAT]
55. Maybe you got a new photo and you want to swap out the hero image.
56. "Replace the hero image on the homepage with this new photo." And then you drop the image file into the conversation or tell Claude where it is.
58. Done.
59. [BEAT]
61. Holiday coming up? Want a banner?
62. "Add a banner at the very top of the homepage that says 'Holiday hours: Closed December twenty-fourth and twenty-fifth. Happy Holidays!' Make it a warm red background with white text and a little close button."
64. Done.
65. [BEAT]
66. See the pattern? You just describe what you want. Claude does the work.
67. [PAUSE]

---

## LET CLAUDE HANDLE GIT

69. Now here's a tip that'll save you time.
70. [BEAT]
71. You don't need to do the git stuff manually anymore. Claude can do it for you.
73. After Claude makes your change, just say: "Commit these changes with the message 'Updated Sunday hours' and push to GitHub."
75. It runs the git commands. Adds the files. Commits with your message. Pushes to GitHub.
76. [BEAT]
77. One prompt to make the change. One prompt to push it live.
78. [BEAT]
79. Or honestly? You can do it all in one shot.
81. "Update the Sunday hours to ten AM to three PM on the contact page, then commit with the message 'Added Sunday hours' and push to GitHub."
83. One prompt. Change made. Site updated. Live in a minute.
84. [PAUSE]
85. That's the whole workflow.

---

## ADDING A BLOG OR NEWS SECTION

87. Okay, here's something a lot of you are gonna want. A blog. Or a news section. Or announcements. Whatever you want to call it.
88. [BEAT]
89. This is great for SEO too, by the way. Fresh content tells Google your site is alive.
90. [BEAT]
92. First, tell Claude to set up the structure.
93. "Create a blog section for my website. I need a blog listing page called blog.html that shows a list of blog posts with their title, date, and a short preview. Then create my first blog post as an individual page in a blog folder. The post title is 'We're Open For Business' and write a short welcome post about the bakery's story. Match the design of my existing pages and add Blog to the navigation on all pages."
95. Look at that. It creates the listing page, the individual post page, a blog folder to keep things organized, and updates the nav across your whole site.
96. [BEAT]
98. Blog listing page. Click a post. Full post. Nav works. Design matches.
99. [BEAT]
100. And here's the beautiful part. Adding a new post? It's just another prompt.
102. "Create a new blog post titled 'Summer Menu Now Available.' Write a few paragraphs about the new seasonal items we're offering. Add it to the blog listing page."
104. New post created. Listing updated. Push to GitHub and it's live.
105. [BEAT]
106. You are your own publisher now.

---

## CONTACT FORM THAT ACTUALLY WORKS

108. Remember back in Module 5 when I said the contact form doesn't actually send emails yet?
109. [BEAT]
110. Let's fix that.
112. We're gonna use a service called Formspree. F-O-R-M-S-P-R-E-E.
113. [BEAT]
114. Free tier gives you fifty submissions per month. For most small businesses, that's more than enough.
116. Sign up. Create a new form. It gives you an endpoint URL. That's basically an address where your form data gets sent.
117. [BEAT]
119. Copy that endpoint.
121. "Update my contact form on contact.html to submit to Formspree. Here's my Formspree endpoint URL:" and paste it in.
123. Claude wires it up. It changes the form action to point at Formspree. One line of code, basically.
124. [BEAT]
126. Now let's test it. Fill in a name. Email. Message. Hit Send.
128. Check your email.
129. [BEAT]
131. There it is. The message came through. Your contact form actually works now.
132. [PAUSE]
133. Fifty submissions a month for free. If you're getting more than that, congratulations — that's a good problem to have.

---

## GOOGLE ANALYTICS — KNOW YOUR VISITORS

135. Next up. You probably want to know if anyone's actually visiting your site, right?
136. [BEAT]
138. Google Analytics. It's free. It tells you how many people visit, where they come from, which pages they look at, how long they stay.
139. [BEAT]
141. Go to Google Analytics and create a new GA4 property. GA4, that's the current version.
143. Enter your website name and URL.
145. It'll give you a Measurement ID. Starts with G dash and then a bunch of letters and numbers.
146. [BEAT]
148. Copy that.
150. "Add Google Analytics to all my HTML pages. My Measurement ID is G dash" and paste your ID.
152. Claude adds the tracking script to every page. Push to GitHub.
153. [BEAT]
155. Give it a day, then check back. You'll start seeing data.
156. [BEAT]
157. How many visitors. Which pages are popular. Where people are coming from.
158. [BEAT]
159. Knowledge is power. And this is free.

---

## WHEN TO MOVE BEYOND GITHUB PAGES

161. Now, I want to be honest with you about something.
162. [BEAT]
163. GitHub Pages is amazing. Free. Fast. Reliable. I use it myself.
164. [BEAT]
165. But there are things it can't do.
167. If you need to sell products directly on your site, with a shopping cart and checkout — GitHub Pages can't do that.
169. If you need user accounts where people log in — can't do that.
171. If you need a database to store dynamic content — can't do that.
173. If you need any server-side processing — form logic beyond Formspree, dynamic content, APIs — can't do that.
174. [BEAT]
175. GitHub Pages serves static files. HTML, CSS, JavaScript, images. That's it.
176. [BEAT]
177. But here's the thing.
178. [PAUSE]
179. For most small businesses? That's enough.
180. [BEAT]
181. Your bakery doesn't need a database. Your barbershop doesn't need user accounts. Your consulting firm doesn't need a shopping cart.
182. [BEAT]
183. You need a site that looks professional, loads fast, shows your info, and lets people contact you.
185. And that's exactly what you've got.
186. [BEAT]
187. If you DO grow to the point where you need more, you'll know. And when that day comes, you've already got the skills. You'll just move to a different host.
188. [BEAT]
189. But don't borrow that problem today.

---

## THE SKILL YOU NOW HAVE

191. Okay. I want you to understand something.
192. [BEAT]
193. What you've learned in this course is a real skill.
194. [PAUSE]
195. Not a party trick. Not a gimmick. A real, valuable, marketable skill.
196. [BEAT]
198. Businesses pay two thousand to ten thousand dollars to have someone build what you just built.
199. [BEAT]
201. And then they pay two hundred to five hundred dollars a month for someone to maintain it. To make the kind of updates you can now do in sixty seconds.
202. [BEAT]
204. You can now do all of that yourself. For twelve dollars a year.
205. [PAUSE]
206. Let that sink in for a second.

---

## WHAT TO BUILD NEXT

208. So what do you do with this skill?
209. [BEAT]
210. Build more stuff.
211. [BEAT]
213. Build a personal portfolio. Show off your work. Even if you're not a "creative type" — everyone benefits from having an online presence.
215. Build a landing page for a side project or an idea you've been sitting on.
217. Build a site for a friend's business. Or a family member's. They'll think you're a genius.
219. Build a documentation site for a process at work. Clean, searchable, always up to date.
221. Build an event page. Wedding, birthday, fundraiser, local meetup. One page, all the info.
222. [BEAT]
223. The point is — every time you build something, you get faster. You get better at writing prompts. You learn what works. You develop an eye for design.
224. [BEAT]
225. And it's all free to host. So there's no risk. Just build.

---

## FINAL WORDS — SHIP IT

227. Alright. Last thing. And this is the most important thing I'll say in this entire course.
228. [PAUSE]
230. The best website is the one that's live.
231. [BEAT]
232. Not the perfect one. Not the one with the best animations. Not the one you've been tweaking in a folder on your desktop for three months.
233. [BEAT]
234. The one that's live. On the internet. Where people can see it.
235. [PAUSE]
236. I see people get stuck all the time. They want to get the colors just right. They want to rewrite the copy one more time. They want to add one more section.
237. [BEAT]
238. And their site never goes live.
239. [BEAT]
240. Don't be that person.
241. [PAUSE]
242. Ship it. Put it out there. You can always improve it later. That's the whole point of this module — updates are easy.
243. [BEAT]
244. An imperfect site that's live beats a perfect site that's on your laptop. Every single time.
245. [BEAT]
247. You built this. From nothing. You talked to an AI in plain English and now you have a professional website live on the internet with your own domain.
248. [BEAT]
249. That's not nothing. That's a lot.

---

## SIGN OFF

250. [PAUSE]
252. Go build something.
253. [BEAT]
254. Seriously. Close this module. Open your terminal. And build something.
255. [BEAT]
256. For yourself. For someone you care about. For fun. Doesn't matter. Just build.
257. [BEAT]
258. You've got the tools. You've got the workflow. You've got the skill.
259. [PAUSE]
261. Thanks for sticking with me through this whole course. It means a lot.
262. [BEAT]
264. Go build something.
265. [BEAT]
266. I'll see you out there.

---

**END OF MODULE 10**
Total lines of dialogue: ~266
Estimated spoken time: ~7 minutes
