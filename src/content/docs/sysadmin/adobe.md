---
title: Adobe
createdAt: 2022-08-01
---

> This is strictly for educational purposes only — if you can't pay for software, there are great free alternatives!

1. Download [Creative Cloud (CC)](https://creativecloud.adobe.com/apps/all/desktop?action=install&source=apps&productId=creative-cloud).
2. Install CC. **DO NOT INSTALL "Genuine Software Detector"**.
3. Open CC and install whatever you want (even if it says "Start Trial"). Lightroom and Acrobat doesn't work with this guide.

   If Adobe asks for a credit card:

   1. download and extract [CCStopper](https://github.com/eaaasun/CCStopper/releases/latest),
   2. open `CCStopper.bat`,
   3. input number `4`,
   4. and press <kbd>Enter</kbd>.

4. Exit and kill all Creative Cloud services (open the Task Manager and stop anything containing "Adobe", "Creative Cloud", "CC", or similar).
5. Disable Adobe Genuine Service.
   1. Press `Win+R`.
   2. Run `Services.msc`.
   3. Look for "Adobe Genuine Monitor Service" and/or "Adobe Genuine Software Integrity Service" (if you don't find any, skip to step 6).
   4. For each one:
      1. right click,
      2. go to "Properties",
      3. change "Startup type" to `DISABLED`,
      4. change "Service status" to `STOPPED`,
      5. click "Apply",
      6. and "Close".
6. Delete the folder `C:\Program Files (x86)\Common Files\Adobe\AdobeGCClient`. If you there isn't any, skip this step.
7. Download [GenP v2.7](https://www.mediafire.com/file/3lpsrxiz47mlhu2/Adobe-GenP-2.7.zip/file) and extract it.
8. Run GenP, check the lastest CC version (for example, `CC2022`) for automatic detection and click the pill picture. If GenP says "file is not vanilla", it means that the app has been patched previously.
9. Disable all Adobe programs from startup (open the Task Manager -> Startup).
10. Registry Editor (optional):
    1. press `Win+R`,
    2. run `Regedit.msc`,
    3. navigate to `Computer\HKEY_CURRENT_USER\SOFTWARE\Classes\CLSID\`,
    4. find the key `{0E270DAA-1BE6-48F2-AC49-...}`,
    5. set `System.IsPinnedToNameSpaceTree` value to `0`.

That's it! Always open the apps from the Windows menu / shortcurts, **never from the Creative Cloud launcher**.

If something's wrong, check out [this guide on r/GenP](https://www.reddit.com/r/GenP/wiki/redditgenpguides/).
