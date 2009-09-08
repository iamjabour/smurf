function getSnum(){var WshShell=new ActiveXObject("WScript.Shell");var sName=WshShell.ExpandEnvironmentStrings("%LOCATIONNUM%");return sName;}
function getMnum(){var WshShell=new ActiveXObject("WScript.Shell");var sLoc=WshShell.ExpandEnvironmentStrings("%COMPUTERNAME%");return sLoc;}
