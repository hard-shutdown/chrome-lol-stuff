(() => {
    const randomString = Math.random().toString(36).substring(2, 15)
    window[randomString] = (async () => {
        const browser = opener.chrome;
        var allExtensions = await browser.management.getAll();

        const getFormattedPrompt = (title, content) => {
            return `---${title}---\n${content.join('\n')}\nX: Exit`
        };
        const findExtension = (extensionName) => allExtensions.find((extension) => extension.name.toLowerCase().includes(extensionName.toLowerCase()) || extension.id.toLowerCase().includes(extensionName.toLowerCase()));

        var menus = {
            "first": {
                "title": "AlertUI",
                "content": [
                    "1. List extensions", 
                    "2. Get extention's ID",
                    !window.location.href.includes("webstore") ? "3. Reload extension" : "3. Install extension",
                    "4. Disable extension",
                    !window.location.href.includes("webstore") ? "5. Spam Reload Ext" : "",
                ],
            }
        }

        while (true) {
            var option = prompt(getFormattedPrompt(menus.first.title, menus.first.content));
            if (option == null || option == undefined || option.toLowerCase() == "x") {
                break;
            }
            switch (option) {
                case "1":
                    alert(allExtensions.map((extension) => extension.name).join('\n'));
                    break;
                case "2":
                    var extensionName = prompt("Extension name (Can Be Partial):");
                    var extension = findExtension(extensionName);
                    if (extension) {
                        alert(extension.id)
                    } else {
                        alert("Extension not found");
                    }
                    break;
                case "3":
                    if (window.location.href.includes("webstore")) {
                        var extensionID = prompt("Extension ID:");
                        var extentionIcon = new DOMParser().parseFromString(await fetch('https://chrome.google.com/webstore/detail/' + extensionID).then(r => r.text()), "text/html").body.querySelector('.e-f-s').childNodes[0].childNodes[0].src;
                        browser.webstorePrivate.beginInstallWithManifest3({
                            esbAllowList: !0,
                            iconUrl: "" + extentionIcon,
                            localizedName: "" + extensionID,
                            id: "" + extensionID,
                            manifest: '{\n"update_url": "https://clients2.google.com/service/update2/crx",\n\n    "manifest_version": 2,\n    "content_security_policy": "script-src \'self\'; object-src \'self\';",\n    "minimum_chrome_version": "71.0.0.0",\n    "offline_enabled": true,\n    "content_scripts":\n    [\n        {\n            "js": [\n                "page.js",\n                "content.js"\n            ],\n            "matches": [ "file:///*", "http://*/*", "https://*/*" ],\n            "run_at": "document_start",\n            "all_frames": true\n        }\n    ],\n    "browser_action": {\n        "default_icon": {\n            "19": "images/icon_grey19.png",\n            "38": "images/icon_grey38.png",\n            "16": "images/icon_grey16.png",\n            "24": "images/icon_grey24.png",\n            "32": "images/icon_grey32.png"\n        },\n        "default_title": "aaa",\n        "default_popup": "action.html"\n    },\n    "icons": {\n        "32": "images/icon.png",\n        "48": "images/icon48.png",\n        "128": "images/icon128.png"\n    },\n    "incognito": "split",\n    "name": "Tampermonkey",\n    "short_name": "Tampermonkey",\n    "version": "4.18.0",\n    "description": "The world\'s most popular userscript manager",\n    "default_locale": "en",\n    "background": {\n       "page": "background.html"\n    },\n    "options_page": "options.html",\n    "options_ui": {\n        "page": "options.html",\n        "chrome_style": false,\n        "open_in_tab": true\n    },\n    "commands": {\n        "toggle-enable": {\n            "description": "Toggle enable state"\n        },\n        "open-dashboard": {\n            "description": "Open dashboard"\n        },\n        "open-dashboard-with-running-scripts": {\n            "description": "Open dashboard with the current tab\'s URL used as filter"\n        },\n        "open-new-script": {\n            "description": "Open new script tab"\n        }\n    },\n    "permissions": [\n        "notifications",\n        "unlimitedStorage",\n        "tabs",\n        "idle",\n        "webNavigation",\n        "webRequest", "webRequestBlocking",\n        "storage",\n        "contextMenus",\n        "chrome://favicon/",\n        "clipboardWrite",\n        "cookies",\n        "declarativeContent",\n        "<all_urls>"\n    ],\n    "optional_permissions" : [ "downloads" ]\n}\n',
                        }, function() {
                            browser.webstorePrivate.completeInstall("" + extensionID, function() {
                                console.log(arguments);
                            });
                        });
                        break;
                    } else {
                        var extensionName = prompt("Partial extension name or ID:");
                        var extension = findExtension(extensionName);
                        if (extension) {
                            browser.developerPrivate.reload(extension.id);
                            alert(`Reloaded ${extension.name}`);
                        } else {
                            alert("Extension not found");
                        }
                        break;
                    }
                case "4":
                    alert(`Beta Tool, may not work`);
                    var extensionName = prompt("Partial extension name or ID:");
                    var extension = findExtension(extensionName);
                    if (extension) {
                        browser.management.setEnabled(extension.id, false);
                        return;
                    } else {
                        alert("Extension not found");
                    }
                    break;
                case "5":
                    alert("This is designed to spam force reload the extension, useful if a extension like a filter or LanSchool Air can't be disabled but takes a few seconds to load. Because it keeps getting reloaded, it essentially won't work.")
                    if (!window.location.href.includes("webstore")) {
                        var extensionName = prompt("Partial extension name or ID:");
                        var extension = findExtension(extensionName);
                        if (extension) {
                            setInterval(() => {
                                browser.developerPrivate.reload(extension.id);
                            }, 30);
                        } else {
                            alert("Extension not found");
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        allExtensions = await browser.management.getAll();
    });
    window[randomString]();
})();