# Paste Files as Attachments

This Thunderbird Add-on fills the gap left by the modernized [Attach-From-Clipboard Add-on][1], which is no longer able to paste files from the clipboard as attachments after [migrating away from legacy Mozilla code][2].

The original Add-on directly accessed the clipboard and allowed its contents (e.g., screenshots) to be pasted as attachments. However, modern Web APIs do not permit access to clipboard files, making that approach unworkable today.

This Add-on takes a different approach. Instead of accessing the clipboard directly, it listens for the standard `paste` event. Thunderbird does not normally handle pasted files (pasting a file into the compose window has no effect). With this Add-on installed, pasted files are extracted from the event and automatically added as attachments.

[1]: https://addons.thunderbird.net/addon/attach-from-clipboard/  
[2]: https://github.com/mganss/AttachFromClipboard/issues/22#issuecomment-2912962119
