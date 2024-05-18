---
title: "Decompiling GoGuardian (and how to with any extension)"
date: "5/17/2024"
---

GoGuardian is my least favorite extension, and I am forced to have it for school. So, I decided to, for the fun of it, decompile GoGuardian, and look through the source code. But how would I accomplish this? Well, this is how.  

Also, if you're following along at home, I use Windows 11 for my school computer, but the decompiling was on Windows 10.  

If you decide to use this method or future posts about exploiting blockers/extensions and get in trouble, that is not my fault. I don't recommend using any exploits in any extensions, as it's suspicious when a teacher sees "student offline", but your laptop is open.  

I followed this with GoGuardian.  

## Downloading

First we need to download the extension, but it isn't a normal extension. You can't just get it from the web store. So, here's how to download it: When it's automatically installed, it's in a JSON Policy object called ExtensionInstallForceList. You can find the policies in "edge://policy" or "chrome://policy". So, what is it? There's GoGuardian License, which isn't important. However, we get linked to an XML object on the GoGuardian website. (https://goguardian.com/ext/m.xml). The contents are as following:
```xml
<gupdate protocol="2.0">
<app appid="haldlgldplgnggkjaafhelgiaglafanh">
<updatecheck codebase="https://crx.goguardian.com/extension-m-4.0.7072.2-stable-crx2.crx" version="4.0.7072.2"/>
</app>
</gupdate>
```
Now, there is one thing which is very important. The <updatecheck> part. The codebase attribute has the link to GoGuardian's crx file, named `extension-m-4.0.7072.2-stable-crx2.crx`.

## Extracting

Next, we need to extract the GoGuardian crx file. For all intents and purposes, crx files are just renamed zip files. For some reason this didn't work for me, claiming that the zip file was invalid.


![The error while opening the zip](/assets/1/error.png)
<p style="text-align: center;" id="alt">The error while opening the zip</p>

I decided to use crxextractor.com which still didn't work. Eventually I tried a python project called `uncrx` and it worked. My theory on why it worked is GoGuardian is a V2 crx, and the extracting I was using was for v3. Thankfully, uncrx works for v2 and v3. I decided to unzip it in a safe place on my computer.  

Bye!