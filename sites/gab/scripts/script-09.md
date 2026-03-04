# Module 9: Custom Domain & SEO
**Duration:** ~8-10 minutes
**Format:** Audio only

---

## INTRO — THE FINISHING TOUCH

2. Alright. Your site is live. It looks great. It works on mobile. It's fast.
3. [BEAT]
4. But right now, your URL looks like this.
6. And that's... fine. It works. But it doesn't exactly scream "professional business."
7. [BEAT]
8. Imagine handing someone your business card and it says "goldencrust dot github dot io."
10. They're gonna think you're a developer, not a bakery.
11. [BEAT]
13. But goldencrust dot com? That's a real business.
14. [PAUSE]
15. So in this module, we're gonna get you a custom domain, point it at your site, lock it down with HTTPS, and then do some basic SEO so Google actually knows you exist.
16. [BEAT]
17. Let's button this up.

---

## WHY A CUSTOM DOMAIN MATTERS

19. So there are three big reasons to get your own domain.
20. [BEAT]
22. One. Professionalism. People trust a dot com. It's that simple. When they see a custom domain, they assume you're legit.
24. Two. Branding. Your domain IS your brand online. It's how people find you, remember you, and talk about you.
26. Three. Portability. And this one's sneaky important.
27. [BEAT]
28. If you own goldencrust dot com, you can point it at GitHub Pages today, move it to a different host tomorrow, and nobody notices. Your URL stays the same.
29. [BEAT]
30. But if you're using github dot io? That URL belongs to GitHub. You can't take it with you.
31. [PAUSE]
32. So yeah. Get the domain. It's worth it.

---

## WHERE TO BUY YOUR DOMAIN

34. Okay, where do you actually buy a domain?
35. [BEAT]
36. There are a ton of registrars out there. I'm gonna make this simple.
38. My top pick is Cloudflare. They sell domains at wholesale price. No markup. No upsells. No nonsense.
39. [BEAT]
40. A dot com will run you about ten to twelve dollars a year. That's it. That's the only cost in this entire course.
42. Twelve bucks. Per year. Not per month. Per year.
43. [BEAT]
45. If Cloudflare isn't your thing, Namecheap is great. Good prices, straightforward interface.
47. Porkbun is another solid option. Slightly quirky branding, but their prices are really good and their dashboard is clean.
48. [BEAT]
50. One place I'd avoid — GoDaddy. They hit you with the low price the first year and then jack it up on renewal. Plus they upsell you on everything.
51. [BEAT]
52. Stick with Cloudflare, Namecheap, or Porkbun. You'll be fine.

---

## STEP 1 — BUY THE DOMAIN

54. Alright, step one is straightforward. Go to your registrar and buy the domain.
55. [BEAT]
57. Search for the name you want. If the dot com is available, grab it.
59. If it's taken, try variations. Add your city. Add what you do. Keep it short and memorable.
60. [BEAT]
62. Add it to your cart. Check out. Done.
63. [BEAT]
64. You now own a piece of the internet. Congrats.
65. [PAUSE]
66. Now let's connect it to your site.

---

## STEP 2 — TELL GITHUB ABOUT YOUR DOMAIN

68. Step two. We need to tell GitHub that your site has a custom domain.
69. [BEAT]
71. Go to your repository on GitHub.
73. Click Settings.
75. In the left sidebar, click Pages.
77. And right here — Custom domain. See that text field?
78. [BEAT]
80. Type in your domain. No "www." No "https." Just the plain domain. Like goldencrust dot com.
82. Hit Save.
83. [BEAT]
85. And notice what just happened. GitHub created a file called CNAME in your repo. That's just a tiny file that tells GitHub "this repo belongs to this domain."
86. [BEAT]
87. You don't need to touch that file. GitHub handles it.
88. [PAUSE]
89. Okay. GitHub knows about your domain. Now we need to do the other side — tell your domain about GitHub.

---

## STEP 3 — SET UP DNS RECORDS

91. Step three. This is the most technical part. But I promise it's just copying and pasting.
92. [BEAT]
93. DNS. Domain Name System. All it does is translate your domain name into the actual server address where your site lives.
94. [BEAT]
95. Think of it like a phone book. Someone dials goldencrust dot com, and DNS says "oh, that's at this address."
96. [BEAT]
98. Go to your registrar's DNS settings. It might be called DNS Management, or DNS Records, or something like that.
99. [BEAT]
101. First thing — if there are any existing A records or AAAA records, delete them. They'll conflict with what we're about to add.
102. [BEAT]
104. Now we're gonna add four A records. These point your domain directly at GitHub's servers.
105. [BEAT]
107. A record number one. Host is at-sign — that just means the root domain. And the value is 185 dot 199 dot 108 dot 153.
109. Number two. Same host, at-sign. Value is 185 dot 199 dot 109 dot 153.
111. Number three. 185 dot 199 dot 110 dot 153.
113. And number four. 185 dot 199 dot 111 dot 153.
114. [BEAT]
116. See the pattern? It's the same address, just the third number goes 108, 109, 110, 111. Four servers for redundancy.
117. [BEAT]
119. Now one more record. A CNAME record. This handles the "www" version of your domain.
121. Host is www. And the value is your GitHub Pages URL. So that's your username dot github dot io.
122. [BEAT]
124. That's it. Four A records and one CNAME. Save everything.
125. [PAUSE]
126. Now we wait.

---

## STEP 4 — WAIT FOR DNS PROPAGATION

128. Step four. The waiting game.
129. [BEAT]
130. DNS propagation. That's just a fancy way of saying "the internet needs a minute to learn about your new address."
131. [BEAT]
133. Officially, it can take anywhere from five minutes to twenty-four hours.
134. [BEAT]
135. In reality? It's usually under an hour. Often way less than that.
137. You can check the progress at dnschecker dot org.
139. Type in your domain and it'll show you a map of DNS servers around the world. When they start turning green, you're good.
140. [BEAT]
141. If it's been fifteen minutes and you're seeing mostly green? You're fine. Move on.
142. [BEAT]
143. If it's been a few hours and nothing's working, double-check your DNS records. Typos are the usual suspect.
144. [PAUSE]
145. Once the domain resolves, let's lock it down with HTTPS.

---

## STEP 5 — ENABLE HTTPS

147. Step five. HTTPS. The little padlock icon in the browser.
148. [BEAT]
150. You've seen this. Every legit site has it. It means the connection is encrypted.
151. [BEAT]
152. Without it, browsers will literally warn people your site isn't safe. Even if it's just a bakery website.
153. [BEAT]
155. Go back to GitHub. Settings. Pages.
157. See that checkbox that says "Enforce HTTPS"?
158. [BEAT]
159. Check it.
161. That's it. GitHub gives you a free SSL certificate. Free. Most hosts charge for this.
162. [BEAT]
164. Now, sometimes this checkbox is greyed out. That just means GitHub is still provisioning your certificate. Give it a few minutes and refresh the page. It'll be clickable.
165. [BEAT]
167. Once it's enabled, visit your site. See the padlock? You're secure.
168. [PAUSE]
169. Your domain is bought, connected, and secured. That's the hard part done.

---

## SEO BASICS — GETTING FOUND ON GOOGLE

171. Okay, your site is live on a custom domain. But here's the thing.
172. [BEAT]
173. Google doesn't know you exist yet.
174. [BEAT]
175. If nobody can find you on Google, it's like having a store with no sign on the door.
177. So let's fix that. And this is where Claude does the heavy lifting for you.

---

## META TAGS — TELLING GOOGLE WHAT YOUR SITE IS

179. First up. Meta tags. These are invisible bits of info in your code that tell search engines what your pages are about.
180. [BEAT]
182. Here's the prompt.
184. "Add proper SEO meta tags to all my HTML pages. Each page should have a unique title tag and meta description. The title tags should include the business name and what the page is about. The meta descriptions should be under a hundred and sixty characters and describe what's on each page. Also add Open Graph tags — og title, og description, and og image — so the site looks good when shared on social media."
185. [BEAT]
187. Look at Claude go. It's adding unique titles and descriptions to every page.
188. [BEAT]
190. See those tags in the head section? Title, description, Open Graph. That's what Google reads to understand your site.
191. [BEAT]
192. And the Open Graph stuff? That's what controls how your site looks when someone shares it on Facebook or LinkedIn. You know those little preview cards with the title and image? That's Open Graph.
193. [PAUSE]

---

## ROBOTS.TXT AND SITEMAP

195. Next. Two small files that make a big difference.
196. [BEAT]
198. "Create a robots.txt file that allows all search engines to crawl the entire site, and include a link to the sitemap. Then create a sitemap.xml file that lists all pages on the site with today's date as the last modified date. Use my custom domain as the base URL."
199. [BEAT]
201. Two files. robots dot txt tells search engines "hey, you're welcome here, crawl everything." And sitemap dot xml gives them a map of every page on your site.
202. [BEAT]
204. You can actually visit these in your browser. See? robots dot txt. Clean and simple. And sitemap dot xml — every page listed with its URL.
205. [BEAT]
206. Think of the sitemap as a table of contents for Google.

---

## STRUCTURED DATA — LOCAL BUSINESS

208. Alright, one more SEO thing. This one's optional but powerful.
209. [BEAT]
210. Structured data. Specifically, JSON-LD for local businesses.
211. [BEAT]
212. This is basically a chunk of code that tells Google exactly what your business is, where it's located, when it's open, and how to contact you. In a format Google loves.
214. Here's the prompt.
216. "Add JSON-LD structured data to my index.html for a local business. Include the business name, description, address, phone number, email, business hours, and the website URL. Use the LocalBusiness schema type."
217. [BEAT]
219. Claude drops in a script tag with all your business info formatted exactly how Google wants it.
220. [BEAT]
222. You can even test it with Google's Rich Results Test. Paste your URL in there and it'll tell you if the structured data is valid.
223. [BEAT]
224. Why bother? Because this is how you get those fancy search results. You know, the ones that show your hours, your address, your phone number right in the Google results? That's structured data.
225. [PAUSE]

---

## GOOGLE SEARCH CONSOLE — SUBMIT YOUR SITE

227. Last step. We need to actually tell Google about your site.
228. [BEAT]
230. Go to Google Search Console. You'll need a Google account. If you have Gmail, you're good.
232. Click Add Property.
234. Choose URL prefix. Type in your full domain. https colon slash slash your domain dot com.
235. [BEAT]
237. Google needs to verify you own this domain. The easiest way? HTML tag.
238. [BEAT]
240. Copy the meta tag it gives you, then go to Claude.
242. "Add this Google Search Console verification meta tag to the head section of my index.html" — and paste the tag.
243. [BEAT]
245. Push that change to GitHub. Wait a minute for it to deploy.
247. Then come back and click Verify. Green checkmark. You're verified.
248. [BEAT]
250. Now go to Sitemaps in the left sidebar.
252. Type sitemap dot xml. Hit Submit.
254. Done. Google now has a map of your entire site.
255. [BEAT]
256. It can take a few days for Google to actually crawl and index everything. But you've done your part. The door is open.

---

## RECAP — WHAT YOU'VE GOT NOW

258. Alright. Let's take a step back and look at what you have right now.
259. [BEAT]
262. A professional, multi-page website. Designed, built, and deployed.
264. Free hosting. No monthly fees. No server to manage.
266. A custom domain. Your name. Your brand. With HTTPS and that little padlock.
268. SEO done right. Meta tags. Open Graph. Sitemap. Structured data. Google Search Console.
269. [BEAT]
271. And the total cost? About twelve dollars a year for the domain. That's it.
272. [PAUSE]
274. Look at that. That's a real website. On a real domain. Secured. Optimized. Live.
275. [BEAT]
276. In the next module, we're gonna talk about keeping this thing updated. How to make changes, add content, and maintain your site going forward. Because a website that never changes is a dead website.
277. [BEAT]
279. Almost at the finish line. I'll see you there.

---

**END OF MODULE 9**
Total lines of dialogue: ~279
Estimated spoken time: ~9 minutes
