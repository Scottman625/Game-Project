//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.34;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.34] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned.
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned.
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned.
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start.
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index.
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 *
 * Choice: Properties
 *   Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces. It does not support any Asian languages that do not utilize spaces,
 * such as Chinese, Japanese, Korean, etc.
 *
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @max 100
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const filename = data[0].trim();\\\\n    const index = parseInt(data[1] || '0');\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    const filename = $gameMessage.faceName();\\\\n    $gameMessage.setFaceImage(filename, index);\\\\n    this.loadMessageFace();\\\\n    const rtl = $gameMessage.isRTL();\\\\n    const width = ImageManager.faceWidth;\\\\n    const height = this.innerHeight;\\\\n    const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n    this.contents.clearRect(x, 0, width, height);\\\\n    this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (textState.drawing && this.constructor === Window_Message) {\\\\n    this.setTextDelay(delay);\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default default
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0xa223dd=_0x2d72;(function(_0x33a65c,_0x192154){const _0x36babe=_0x2d72,_0x2ed1ed=_0x33a65c();while(!![]){try{const _0x5cac8f=parseInt(_0x36babe(0x1a5))/0x1+parseInt(_0x36babe(0x29a))/0x2+-parseInt(_0x36babe(0x134))/0x3+-parseInt(_0x36babe(0x10a))/0x4+parseInt(_0x36babe(0x1fd))/0x5+-parseInt(_0x36babe(0x153))/0x6*(parseInt(_0x36babe(0x2de))/0x7)+parseInt(_0x36babe(0x27e))/0x8;if(_0x5cac8f===_0x192154)break;else _0x2ed1ed['push'](_0x2ed1ed['shift']());}catch(_0x22537c){_0x2ed1ed['push'](_0x2ed1ed['shift']());}}}(_0x24e2,0xc707a));var label=_0xa223dd(0x2a0),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0xa223dd(0x11c)](function(_0x3a1bf9){const _0x26c126=_0xa223dd;return _0x3a1bf9['status']&&_0x3a1bf9[_0x26c126(0x35f)][_0x26c126(0x3b3)]('['+label+']');})[0x0];VisuMZ[label][_0xa223dd(0xed)]=VisuMZ[label][_0xa223dd(0xed)]||{},VisuMZ['ConvertParams']=function(_0x169c0a,_0x17175b){const _0x3b02b2=_0xa223dd;for(const _0x134a37 in _0x17175b){if(_0x3b02b2(0x23c)!=='KJqFU'){if(_0x134a37[_0x3b02b2(0x310)](/(.*):(.*)/i)){const _0x577bf3=String(RegExp['$1']),_0x2d2064=String(RegExp['$2'])[_0x3b02b2(0x37c)]()[_0x3b02b2(0x362)]();let _0x6de314,_0x3d9c72,_0x32d3f7;switch(_0x2d2064){case _0x3b02b2(0x3a8):_0x6de314=_0x17175b[_0x134a37]!==''?Number(_0x17175b[_0x134a37]):0x0;break;case _0x3b02b2(0x1c3):_0x3d9c72=_0x17175b[_0x134a37]!==''?JSON[_0x3b02b2(0x31d)](_0x17175b[_0x134a37]):[],_0x6de314=_0x3d9c72[_0x3b02b2(0x1a0)](_0x32f97c=>Number(_0x32f97c));break;case'EVAL':_0x6de314=_0x17175b[_0x134a37]!==''?eval(_0x17175b[_0x134a37]):null;break;case _0x3b02b2(0x2d9):_0x3d9c72=_0x17175b[_0x134a37]!==''?JSON[_0x3b02b2(0x31d)](_0x17175b[_0x134a37]):[],_0x6de314=_0x3d9c72[_0x3b02b2(0x1a0)](_0x1e12d0=>eval(_0x1e12d0));break;case _0x3b02b2(0x3b6):_0x6de314=_0x17175b[_0x134a37]!==''?JSON[_0x3b02b2(0x31d)](_0x17175b[_0x134a37]):'';break;case _0x3b02b2(0x297):_0x3d9c72=_0x17175b[_0x134a37]!==''?JSON['parse'](_0x17175b[_0x134a37]):[],_0x6de314=_0x3d9c72[_0x3b02b2(0x1a0)](_0x6a8980=>JSON[_0x3b02b2(0x31d)](_0x6a8980));break;case _0x3b02b2(0x2f7):_0x6de314=_0x17175b[_0x134a37]!==''?new Function(JSON[_0x3b02b2(0x31d)](_0x17175b[_0x134a37])):new Function(_0x3b02b2(0x2f2));break;case _0x3b02b2(0x126):_0x3d9c72=_0x17175b[_0x134a37]!==''?JSON['parse'](_0x17175b[_0x134a37]):[],_0x6de314=_0x3d9c72[_0x3b02b2(0x1a0)](_0x2a5801=>new Function(JSON['parse'](_0x2a5801)));break;case'STR':_0x6de314=_0x17175b[_0x134a37]!==''?String(_0x17175b[_0x134a37]):'';break;case _0x3b02b2(0x3b8):_0x3d9c72=_0x17175b[_0x134a37]!==''?JSON[_0x3b02b2(0x31d)](_0x17175b[_0x134a37]):[],_0x6de314=_0x3d9c72['map'](_0x339009=>String(_0x339009));break;case'STRUCT':_0x32d3f7=_0x17175b[_0x134a37]!==''?JSON[_0x3b02b2(0x31d)](_0x17175b[_0x134a37]):{},_0x169c0a[_0x577bf3]={},VisuMZ['ConvertParams'](_0x169c0a[_0x577bf3],_0x32d3f7);continue;case _0x3b02b2(0x271):_0x3d9c72=_0x17175b[_0x134a37]!==''?JSON[_0x3b02b2(0x31d)](_0x17175b[_0x134a37]):[],_0x6de314=_0x3d9c72[_0x3b02b2(0x1a0)](_0x3db2a7=>VisuMZ[_0x3b02b2(0x242)]({},JSON[_0x3b02b2(0x31d)](_0x3db2a7)));break;default:continue;}_0x169c0a[_0x577bf3]=_0x6de314;}}else this[_0x3b02b2(0x2da)](_0x290627);}return _0x169c0a;},(_0x40dab3=>{const _0x4cd9b3=_0xa223dd,_0xe9702f=_0x40dab3[_0x4cd9b3(0x194)];for(const _0x5b9b27 of dependencies){if(_0x4cd9b3(0x108)===_0x4cd9b3(0x383))this[_0x4cd9b3(0x30b)][_0x4cd9b3(0x25b)]+=_0x182f2c[_0x4cd9b3(0x2a0)]['Settings'][_0x4cd9b3(0x176)][_0x4cd9b3(0x3a0)],this[_0x4cd9b3(0x30b)][_0x4cd9b3(0x25b)]=_0x3c1cef[_0x4cd9b3(0x35a)](this['contents'][_0x4cd9b3(0x25b)],_0x5af9b4[_0x4cd9b3(0x2a0)][_0x4cd9b3(0xed)][_0x4cd9b3(0x176)][_0x4cd9b3(0x30e)]);else{if(!Imported[_0x5b9b27]){if(_0x4cd9b3(0x2b4)===_0x4cd9b3(0x1d0))return this[_0x4cd9b3(0x309)];else{alert(_0x4cd9b3(0x220)[_0x4cd9b3(0x111)](_0xe9702f,_0x5b9b27)),SceneManager['exit']();break;}}}}const _0x46e73d=_0x40dab3[_0x4cd9b3(0x35f)];if(_0x46e73d[_0x4cd9b3(0x310)](/\[Version[ ](.*?)\]/i)){const _0x5ea8fa=Number(RegExp['$1']);_0x5ea8fa!==VisuMZ[label][_0x4cd9b3(0x22e)]&&(_0x4cd9b3(0x33e)!==_0x4cd9b3(0x33e)?this['setWordWrap'](![]):(alert(_0x4cd9b3(0x130)[_0x4cd9b3(0x111)](_0xe9702f,_0x5ea8fa)),SceneManager[_0x4cd9b3(0x234)]()));}if(_0x46e73d['match'](/\[Tier[ ](\d+)\]/i)){const _0x2174a0=Number(RegExp['$1']);if(_0x2174a0<tier)alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0xe9702f,_0x2174a0,tier)),SceneManager[_0x4cd9b3(0x234)]();else{if(_0x4cd9b3(0x189)!==_0x4cd9b3(0x189))return _0x152884=_0x53024c[_0x4cd9b3(0x20c)](/\x1bN\[(\d+)\]/gi,(_0x247f18,_0x4b81bf)=>this['actorName'](_0x316498(_0x4b81bf))),_0xc3689d=_0x83a2a4[_0x4cd9b3(0x20c)](/\x1bP\[(\d+)\]/gi,(_0x47a80c,_0x15e550)=>this['partyMemberName'](_0x198ade(_0x15e550))),_0x1285a4=_0x1fdc13['replace'](/\x1bG/gi,_0x506896[_0x4cd9b3(0x38f)]),_0x453299;else tier=Math[_0x4cd9b3(0x155)](_0x2174a0,tier);}}VisuMZ[_0x4cd9b3(0x242)](VisuMZ[label][_0x4cd9b3(0xed)],_0x40dab3[_0x4cd9b3(0x179)]);})(pluginData),PluginManager[_0xa223dd(0x1e7)](pluginData['name'],_0xa223dd(0x2d3),_0x2b4af9=>{const _0x6b277c=_0xa223dd;VisuMZ[_0x6b277c(0x242)](_0x2b4af9,_0x2b4af9);const _0x55fa1b=_0x2b4af9[_0x6b277c(0x2be)]||$gameSystem['getChoiceListLineHeight']()||0x1,_0x21f7c6=_0x2b4af9[_0x6b277c(0x118)]||$gameSystem[_0x6b277c(0xfe)]()||0x1,_0x2a7a19=_0x2b4af9[_0x6b277c(0x39b)]||$gameSystem[_0x6b277c(0x22d)]()||0x1,_0x51be09=_0x2b4af9[_0x6b277c(0x2f8)][_0x6b277c(0x332)]()||'default';$gameSystem[_0x6b277c(0x384)](_0x55fa1b),$gameSystem[_0x6b277c(0x335)](_0x21f7c6),$gameSystem[_0x6b277c(0x35d)](_0x2a7a19),$gameSystem[_0x6b277c(0x2d5)](_0x51be09);}),PluginManager[_0xa223dd(0x1e7)](pluginData[_0xa223dd(0x194)],_0xa223dd(0x196),_0x26b665=>{const _0x73442a=_0xa223dd;VisuMZ['ConvertParams'](_0x26b665,_0x26b665);const _0x2458db=_0x26b665[_0x73442a(0x31e)]||$gameSystem[_0x73442a(0x233)]()||0x1,_0x2020dc=_0x26b665[_0x73442a(0x25e)]||$gameSystem[_0x73442a(0x228)]()||0x1;$gameTemp[_0x73442a(0x3ad)]=!![];const _0x4b200d=_0x26b665['WordWrap']['toLowerCase']();$gameSystem[_0x73442a(0x1a1)](_0x2458db),$gameSystem['setMessageWindowWidth'](_0x2020dc);[_0x73442a(0x144),_0x73442a(0x21a)][_0x73442a(0x3b3)](_0x4b200d)&&$gameSystem[_0x73442a(0x25c)](eval(_0x4b200d));const _0x5aab3c=SceneManager[_0x73442a(0x324)]['_messageWindow'];_0x5aab3c&&(_0x73442a(0x341)!=='Lhror'?(_0x5aab3c['resetWordWrap'](),_0x5aab3c[_0x73442a(0x10d)](),_0x5aab3c[_0x73442a(0x39a)]()):_0x4a0761['setMessageWindowWordWrap'](_0x3c71da(_0x374190)));}),PluginManager[_0xa223dd(0x1e7)](pluginData[_0xa223dd(0x194)],_0xa223dd(0x229),_0x57a196=>{const _0x48b18e=_0xa223dd;VisuMZ[_0x48b18e(0x242)](_0x57a196,_0x57a196),$gameSystem[_0x48b18e(0x300)](_0x57a196[_0x48b18e(0x331)],_0x57a196[_0x48b18e(0x37f)]);const _0xcf40c0=SceneManager[_0x48b18e(0x324)][_0x48b18e(0x2ab)];_0xcf40c0&&(_0xcf40c0[_0x48b18e(0x394)](),_0xcf40c0[_0x48b18e(0x10d)](),_0xcf40c0[_0x48b18e(0x39a)]());}),PluginManager[_0xa223dd(0x1e7)](pluginData['name'],_0xa223dd(0x338),_0x4597df=>{const _0x24df31=_0xa223dd;VisuMZ[_0x24df31(0x242)](_0x4597df,_0x4597df);const _0x45a868=_0x4597df[_0x24df31(0x399)]||[],_0x4e5cd3=_0x4597df[_0x24df31(0x25d)]||0x0,_0x243932=[_0x24df31(0x2f9),'up',_0x24df31(0x13a),_0x24df31(0x2dd),_0x24df31(0x33c),_0x24df31(0x204),_0x24df31(0x254),_0x24df31(0x21f),_0x24df31(0x385)];for(const _0x48ee8e of _0x45a868){$gameScreen[_0x24df31(0x27b)](_0x48ee8e,_0x4e5cd3);for(const _0x1eb896 of _0x243932){if(_0x4597df[_0x1eb896]===undefined)continue;$gameScreen[_0x24df31(0x302)](_0x48ee8e,_0x4597df[_0x1eb896],_0x1eb896);}}}),PluginManager['registerCommand'](pluginData['name'],'PictureTextErase',_0x36d851=>{const _0x10d9f6=_0xa223dd;VisuMZ[_0x10d9f6(0x242)](_0x36d851,_0x36d851);const _0x1ca697=_0x36d851[_0x10d9f6(0x399)]||[];for(const _0xe48d1 of _0x1ca697){'USWGw'==='USWGw'?($gameScreen['eraseAllPictureTexts'](_0xe48d1),$gameScreen[_0x10d9f6(0x301)](_0xe48d1)):(this[_0x10d9f6(0xe9)]['x']=_0x3220f5[_0x10d9f6(0x30c)](this[_0x10d9f6(0x2e7)]/0x2),this[_0x10d9f6(0xe9)]['anchor']['x']=0.5,this[_0x10d9f6(0xe9)]['scale']['x']=_0x54fd9a[_0x10d9f6(0x2e7)]);}}),VisuMZ['MessageCore'][_0xa223dd(0x26b)]=Scene_Boot[_0xa223dd(0x2ed)][_0xa223dd(0x1fc)],Scene_Boot[_0xa223dd(0x2ed)][_0xa223dd(0x1fc)]=function(){const _0x41351b=_0xa223dd;VisuMZ[_0x41351b(0x2a0)]['Scene_Boot_onDatabaseLoaded'][_0x41351b(0x221)](this),this[_0x41351b(0x319)](),this[_0x41351b(0x296)](),this[_0x41351b(0x1ac)](),this[_0x41351b(0x295)]();},VisuMZ['MessageCore'][_0xa223dd(0x116)]=function(_0x487a40){const _0x4f6425=_0xa223dd,_0x25bc75=VisuMZ['MessageCore']['Settings'][_0x487a40];_0x25bc75[_0x4f6425(0x2aa)]((_0x5bc3b2,_0x495848)=>{const _0x2bb273=_0x4f6425;if(!_0x5bc3b2||!_0x495848)return-0x1;return _0x495848[_0x2bb273(0x1f0)][_0x2bb273(0x2bf)]-_0x5bc3b2[_0x2bb273(0x1f0)][_0x2bb273(0x2bf)];});},Scene_Boot[_0xa223dd(0x2ed)]['process_VisuMZ_MessageCore_TextCodes_Action']=function(){const _0x4f4a9a=_0xa223dd;VisuMZ['MessageCore'][_0x4f4a9a(0x116)](_0x4f4a9a(0x151));for(const _0x329966 of VisuMZ[_0x4f4a9a(0x2a0)][_0x4f4a9a(0xed)][_0x4f4a9a(0x151)]){_0x329966[_0x4f4a9a(0x1f0)]=_0x329966[_0x4f4a9a(0x1f0)][_0x4f4a9a(0x37c)](),_0x329966[_0x4f4a9a(0x281)]=new RegExp('\x1b'+_0x329966[_0x4f4a9a(0x1f0)],'gi'),_0x329966['textCodeResult']='\x1b'+_0x329966[_0x4f4a9a(0x1f0)];if(_0x329966['Type']==='')_0x329966[_0x4f4a9a(0x186)]+=_0x4f4a9a(0x201);}},Scene_Boot[_0xa223dd(0x2ed)][_0xa223dd(0x296)]=function(){const _0x4dea50=_0xa223dd;VisuMZ[_0x4dea50(0x2a0)][_0x4dea50(0x116)](_0x4dea50(0x28c));for(const _0x132f41 of VisuMZ[_0x4dea50(0x2a0)][_0x4dea50(0xed)][_0x4dea50(0x28c)]){if(_0x4dea50(0x112)!==_0x4dea50(0x378)){_0x132f41[_0x4dea50(0x281)]=new RegExp('\x1b'+_0x132f41[_0x4dea50(0x1f0)]+_0x132f41[_0x4dea50(0x16d)],'gi');if(_0x132f41[_0x4dea50(0x398)]!==''&&_0x132f41[_0x4dea50(0x398)]!==_0x4dea50(0x24d))'mvVwB'==='mvVwB'?_0x132f41[_0x4dea50(0x186)]=new Function(_0x4dea50(0x36b)+_0x132f41[_0x4dea50(0x398)]['replace'](/\\/g,'\x1b')+'\x27'):this[_0x4dea50(0x25a)]&&(this[_0x4dea50(0x25a)]['x']+=this['x']-_0xa62f72['x'],this[_0x4dea50(0x25a)]['y']+=this['y']-_0x274eae['y']);else{if(_0x4dea50(0x33a)===_0x4dea50(0x33a))_0x132f41[_0x4dea50(0x186)]=_0x132f41[_0x4dea50(0x156)];else{if(!_0x7738c8[_0x4dea50(0x209)](_0x6f6807))return!![];}}}else{var _0x16a311=_0x5e91c3[_0x4dea50(0x179)][0x1]+_0x29a591;this['_list'][_0x2f5e7e][_0x4dea50(0x179)][0x1]=_0x16a311;}}},Scene_Boot[_0xa223dd(0x2ed)][_0xa223dd(0x1ac)]=function(){const _0x2d8aac=_0xa223dd;for(const _0x335cb5 of VisuMZ[_0x2d8aac(0x2a0)][_0x2d8aac(0xed)]['TextMacros']){_0x335cb5[_0x2d8aac(0x281)]=new RegExp('\x5c['+_0x335cb5[_0x2d8aac(0x1f0)]+'\x5c]','gi'),_0x335cb5['TextStr']!==''&&_0x335cb5['TextStr']!==_0x2d8aac(0x24d)?_0x335cb5[_0x2d8aac(0x186)]=new Function('return\x20\x27'+_0x335cb5[_0x2d8aac(0x398)][_0x2d8aac(0x20c)](/\\/g,'\x1b')+'\x27'):_0x335cb5[_0x2d8aac(0x186)]=_0x335cb5[_0x2d8aac(0x156)];}},Scene_Boot[_0xa223dd(0x2ed)][_0xa223dd(0x295)]=function(){const _0x3bd813=_0xa223dd,_0x1e7deb=VisuMZ['MessageCore'][_0x3bd813(0xed)][_0x3bd813(0x34b)];!VisuMZ['ParseAllNotetags']&&(_0x3bd813(0x278)===_0x3bd813(0x278)?(VisuMZ['MessageCore'][_0x3bd813(0x178)]($dataClasses,_0x1e7deb['Classes']),VisuMZ[_0x3bd813(0x2a0)]['AddAutoColor']($dataSkills,_0x1e7deb[_0x3bd813(0x34a)]),VisuMZ[_0x3bd813(0x2a0)][_0x3bd813(0x178)]($dataItems,_0x1e7deb['Items']),VisuMZ['MessageCore'][_0x3bd813(0x178)]($dataWeapons,_0x1e7deb[_0x3bd813(0x312)]),VisuMZ[_0x3bd813(0x2a0)][_0x3bd813(0x178)]($dataArmors,_0x1e7deb[_0x3bd813(0x1cf)]),VisuMZ[_0x3bd813(0x2a0)][_0x3bd813(0x178)]($dataEnemies,_0x1e7deb['Enemies']),VisuMZ['MessageCore'][_0x3bd813(0x178)]($dataStates,_0x1e7deb[_0x3bd813(0x1a4)])):_0x124a6c-=_0x5847d5),VisuMZ[_0x3bd813(0x2a0)][_0x3bd813(0x32b)]();},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x377)]=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0xa223dd(0x3ac),_0xa223dd(0x1cc),'<I>',_0xa223dd(0x1eb),_0xa223dd(0x32d),'</LEFT>',_0xa223dd(0x21d),_0xa223dd(0x3ab),'<RIGHT>',_0xa223dd(0x3a4),_0xa223dd(0x164),_0xa223dd(0x1b0),_0xa223dd(0x358),_0xa223dd(0x237),_0xa223dd(0xf2),'</WORDWRAP>',_0xa223dd(0x2c9),_0xa223dd(0x3b5),'PICTURE',_0xa223dd(0x27d),_0xa223dd(0x2ef),_0xa223dd(0x2eb),_0xa223dd(0x162),_0xa223dd(0x333),_0xa223dd(0x177),_0xa223dd(0x1d7),_0xa223dd(0x26a),_0xa223dd(0x24b),_0xa223dd(0x102),_0xa223dd(0x115)],VisuMZ['MessageCore'][_0xa223dd(0x178)]=function(_0x29f6a4,_0x3cf82e){const _0x37ecfb=_0xa223dd;if(_0x3cf82e<=0x0)return;const _0x321474=_0x29f6a4;for(const _0xf86f4f of _0x321474){if('XdjEE'===_0x37ecfb(0x31f)){const _0x138e24=_0x95502d['$1']['split'](',')[_0x37ecfb(0x1a0)](_0x424c55=>_0x5d2984(_0x424c55)||0x0);for(const _0x577e18 of _0x138e24){if(_0x46835d['value'](_0x577e18))return!![];}return![];}else{if(!_0xf86f4f)continue;VisuMZ[_0x37ecfb(0x2a0)]['CreateAutoColorFor'](_0xf86f4f,_0x3cf82e);}}},VisuMZ[_0xa223dd(0x2a0)]['CreateAutoColorRegExpLists']=function(){const _0x5bd984=_0xa223dd;VisuMZ[_0x5bd984(0x2a0)]['AutoColorRegExp']=[];for(let _0x3b3889=0x1;_0x3b3889<=0x1f;_0x3b3889++){const _0x48ed33=_0x5bd984(0x169)[_0x5bd984(0x111)](_0x3b3889),_0x3205fd=VisuMZ[_0x5bd984(0x2a0)][_0x5bd984(0xed)][_0x5bd984(0x34b)][_0x48ed33];_0x3205fd['sort']((_0x36bb4e,_0x307b27)=>{const _0x4455c8=_0x5bd984;if(!_0x36bb4e||!_0x307b27)return-0x1;return _0x307b27['length']-_0x36bb4e[_0x4455c8(0x2bf)];}),this[_0x5bd984(0x15f)](_0x3205fd,_0x3b3889);}},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x15f)]=function(_0x3c57ed,_0x400f3c){const _0x2e3439=_0xa223dd;for(const _0x314860 of _0x3c57ed){if(_0x314860['length']<=0x0)continue;if(/^\d+$/[_0x2e3439(0x14c)](_0x314860))continue;let _0x584253=VisuMZ['MessageCore'][_0x2e3439(0x317)](_0x314860);if(_0x314860['match'](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g)){if(_0x2e3439(0x1ed)===_0x2e3439(0x226)){_0x552bb2['ConvertParams'](_0x4cbbb6,_0x19abe9);const _0x408c14=_0x3f0ef5[_0x2e3439(0x31e)]||_0x316aa3['getMessageWindowRows']()||0x1,_0x318579=_0x1aa5e2['Width']||_0x5e5ae7[_0x2e3439(0x228)]()||0x1;_0x15e607['_centerMessageWindow']=!![];const _0x513348=_0x184c65[_0x2e3439(0x39c)][_0x2e3439(0x332)]();_0x1aaf12[_0x2e3439(0x1a1)](_0x408c14),_0x561462[_0x2e3439(0x3ba)](_0x318579);[_0x2e3439(0x144),'false'][_0x2e3439(0x3b3)](_0x513348)&&_0x1048d4['setMessageWindowWordWrap'](_0x93be50(_0x513348));const _0x33f604=_0x353e19[_0x2e3439(0x324)][_0x2e3439(0x2ab)];_0x33f604&&(_0x33f604['resetWordWrap'](),_0x33f604[_0x2e3439(0x10d)](),_0x33f604['createContents']());}else var _0x244cc7=new RegExp(_0x584253,'i');}else var _0x244cc7=new RegExp('\x5cb'+_0x584253+'\x5cb','g');VisuMZ[_0x2e3439(0x2a0)][_0x2e3439(0x380)][_0x2e3439(0x3a9)]([_0x244cc7,_0x2e3439(0x303)[_0x2e3439(0x111)](_0x400f3c,_0x314860)]);}},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x317)]=function(_0x777c44){const _0x51f7eb=_0xa223dd;return _0x777c44=_0x777c44[_0x51f7eb(0x20c)](/(\W)/gi,(_0x1031f2,_0x55df0a)=>'\x5c%1'[_0x51f7eb(0x111)](_0x55df0a)),_0x777c44;},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x128)]=VisuMZ[_0xa223dd(0x128)],VisuMZ[_0xa223dd(0x128)]=function(_0x78155c){const _0x53029c=_0xa223dd;VisuMZ[_0x53029c(0x2a0)][_0x53029c(0x128)]['call'](this,_0x78155c);const _0x184f9a=VisuMZ['MessageCore'][_0x53029c(0xed)][_0x53029c(0x34b)];VisuMZ[_0x53029c(0x2a0)][_0x53029c(0x199)](_0x78155c,_0x184f9a['Classes']);},VisuMZ['MessageCore']['ParseSkillNotetags']=VisuMZ[_0xa223dd(0x336)],VisuMZ[_0xa223dd(0x336)]=function(_0x1436bb){const _0x4b701d=_0xa223dd;VisuMZ['MessageCore']['ParseSkillNotetags'][_0x4b701d(0x221)](this,_0x1436bb);const _0xfb3b8=VisuMZ[_0x4b701d(0x2a0)][_0x4b701d(0xed)][_0x4b701d(0x34b)];VisuMZ[_0x4b701d(0x2a0)]['CreateAutoColorFor'](_0x1436bb,_0xfb3b8[_0x4b701d(0x34a)]);},0x7,VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x140)]=VisuMZ[_0xa223dd(0x140)],VisuMZ['ParseItemNotetags']=function(_0x25a85c){const _0xda7ead=_0xa223dd;VisuMZ[_0xda7ead(0x2a0)][_0xda7ead(0x140)]['call'](this,_0x25a85c);const _0x5c415e=VisuMZ['MessageCore'][_0xda7ead(0xed)][_0xda7ead(0x34b)];VisuMZ['MessageCore'][_0xda7ead(0x199)](_0x25a85c,_0x5c415e[_0xda7ead(0x350)]);},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x16f)]=VisuMZ['ParseWeaponNotetags'],VisuMZ[_0xa223dd(0x16f)]=function(_0x1f19de){const _0x2ca647=_0xa223dd;VisuMZ[_0x2ca647(0x2a0)][_0x2ca647(0x16f)][_0x2ca647(0x221)](this,_0x1f19de);const _0x3506c2=VisuMZ[_0x2ca647(0x2a0)][_0x2ca647(0xed)]['AutoColor'];VisuMZ[_0x2ca647(0x2a0)]['CreateAutoColorFor'](_0x1f19de,_0x3506c2[_0x2ca647(0x312)]);},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x2a9)]=VisuMZ['ParseArmorNotetags'],VisuMZ['ParseArmorNotetags']=function(_0x5df875){const _0x377918=_0xa223dd;VisuMZ['MessageCore'][_0x377918(0x2a9)][_0x377918(0x221)](this,_0x5df875);const _0x30a49c=VisuMZ[_0x377918(0x2a0)]['Settings']['AutoColor'];VisuMZ[_0x377918(0x2a0)]['CreateAutoColorFor'](_0x5df875,_0x30a49c[_0x377918(0x1cf)]);},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x138)]=VisuMZ['ParseEnemyNotetags'],VisuMZ[_0xa223dd(0x138)]=function(_0x548b01){const _0x3da02a=_0xa223dd;VisuMZ['MessageCore'][_0x3da02a(0x138)][_0x3da02a(0x221)](this,_0x548b01);const _0x28f997=VisuMZ['MessageCore'][_0x3da02a(0xed)][_0x3da02a(0x34b)];VisuMZ[_0x3da02a(0x2a0)][_0x3da02a(0x199)](_0x548b01,_0x28f997[_0x3da02a(0x1e8)]);},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x230)]=VisuMZ[_0xa223dd(0x230)],VisuMZ['ParseStateNotetags']=function(_0x5d8b1e){const _0x4d9bd5=_0xa223dd;VisuMZ[_0x4d9bd5(0x2a0)][_0x4d9bd5(0x230)][_0x4d9bd5(0x221)](this,_0x5d8b1e);const _0x27cb81=VisuMZ[_0x4d9bd5(0x2a0)][_0x4d9bd5(0xed)][_0x4d9bd5(0x34b)];VisuMZ[_0x4d9bd5(0x2a0)][_0x4d9bd5(0x199)](_0x5d8b1e,_0x27cb81['States']);},VisuMZ['MessageCore'][_0xa223dd(0x199)]=function(_0x46043e,_0x49d678){const _0xc2fe7d=_0xa223dd;if(_0x49d678<=0x0)return;const _0xdc8da9=VisuMZ['MessageCore'][_0xc2fe7d(0xed)]['AutoColor'][_0xc2fe7d(0x1df)+_0x49d678];let _0x23e0b4=_0x46043e['name'][_0xc2fe7d(0x362)]();if(/^\d+$/['test'](_0x23e0b4))return;if(VisuMZ[_0xc2fe7d(0x2a0)][_0xc2fe7d(0x377)][_0xc2fe7d(0x3b3)](_0x23e0b4['toUpperCase']()))return;_0x23e0b4=_0x23e0b4[_0xc2fe7d(0x20c)](/\\I\[(\d+)\]/gi,''),_0x23e0b4=_0x23e0b4[_0xc2fe7d(0x20c)](/\x1bI\[(\d+)\]/gi,'');if(_0x23e0b4[_0xc2fe7d(0x2bf)]<=0x0)return;if(_0x23e0b4['match'](/-----/i))return;_0xdc8da9[_0xc2fe7d(0x3a9)](_0x23e0b4);},SceneManager[_0xa223dd(0x12a)]=function(){const _0x4c364c=_0xa223dd;return this[_0x4c364c(0x324)]&&this[_0x4c364c(0x324)][_0x4c364c(0x2d4)]===Scene_Battle;},SceneManager[_0xa223dd(0x292)]=function(){const _0x256927=_0xa223dd;return this[_0x256927(0x324)]&&this['_scene'][_0x256927(0x2d4)]===Scene_Map;},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x255)]=TextManager[_0xa223dd(0x293)],TextManager['message']=function(_0xed191b){const _0x5e4840=_0xa223dd,_0x19e629=[_0x5e4840(0x1af),'emerge',_0x5e4840(0x185),_0x5e4840(0x166),_0x5e4840(0x170),_0x5e4840(0x2c2),_0x5e4840(0x2f0),_0x5e4840(0x325),_0x5e4840(0x1d3),_0x5e4840(0xff)];let _0x3231f3=VisuMZ['MessageCore'][_0x5e4840(0x255)][_0x5e4840(0x221)](this,_0xed191b);return _0x19e629[_0x5e4840(0x3b3)](_0xed191b)&&(_0x5e4840(0x120)!=='DeQZc'?_0x3231f3=_0x5e4840(0x32a)+_0x3231f3:this[_0x5e4840(0x131)][_0x5e4840(0x1f1)]=0x1),_0x3231f3;},ConfigManager[_0xa223dd(0x1f5)]=VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0xed)]['TextSpeed']['Default'],VisuMZ['MessageCore'][_0xa223dd(0x1bb)]=ConfigManager[_0xa223dd(0x2a3)],ConfigManager['makeData']=function(){const _0x2bb842=_0xa223dd,_0x3ab284=VisuMZ[_0x2bb842(0x2a0)][_0x2bb842(0x1bb)][_0x2bb842(0x221)](this);return _0x3ab284[_0x2bb842(0x1f5)]=this[_0x2bb842(0x1f5)],_0x3ab284;},VisuMZ[_0xa223dd(0x2a0)]['ConfigManager_applyData']=ConfigManager[_0xa223dd(0x1d2)],ConfigManager[_0xa223dd(0x1d2)]=function(_0xe32a70){const _0x48bf20=_0xa223dd;VisuMZ[_0x48bf20(0x2a0)][_0x48bf20(0x1b6)][_0x48bf20(0x221)](this,_0xe32a70);if(_0x48bf20(0x1f5)in _0xe32a70)_0x48bf20(0x298)!==_0x48bf20(0x298)?this[_0x48bf20(0x1f5)]=_0x4d597d[_0x48bf20(0x2a0)]['Settings'][_0x48bf20(0x2a2)]['Default']:this['textSpeed']=Number(_0xe32a70[_0x48bf20(0x1f5)])['clamp'](0x1,0xb);else{if(_0x48bf20(0x29b)!==_0x48bf20(0x29b)){if(_0x41f9e5['parameters'][0x2]<0x0)return;const _0x316d50=_0x56bcb0['parameters'][0x2]+_0x87b376;this[_0x48bf20(0x2ea)][_0x1a3a3a]['parameters'][0x2]=_0x316d50;}else this[_0x48bf20(0x1f5)]=VisuMZ[_0x48bf20(0x2a0)][_0x48bf20(0xed)]['TextSpeed']['Default'];}},TextManager[_0xa223dd(0x313)]=VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0xed)][_0xa223dd(0x2a2)][_0xa223dd(0x16b)],TextManager[_0xa223dd(0x273)]=VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0xed)][_0xa223dd(0x2a2)][_0xa223dd(0x1b3)],VisuMZ['MessageCore'][_0xa223dd(0x1e9)]=Game_System[_0xa223dd(0x2ed)][_0xa223dd(0x307)],Game_System[_0xa223dd(0x2ed)][_0xa223dd(0x307)]=function(){const _0x1a8ac1=_0xa223dd;VisuMZ[_0x1a8ac1(0x2a0)][_0x1a8ac1(0x1e9)][_0x1a8ac1(0x221)](this),this[_0x1a8ac1(0x38a)]();},Game_System[_0xa223dd(0x2ed)][_0xa223dd(0x38a)]=function(){const _0x28266a=_0xa223dd,_0x346001=VisuMZ[_0x28266a(0x2a0)]['Settings'][_0x28266a(0x176)],_0x441165=VisuMZ[_0x28266a(0x2a0)][_0x28266a(0xed)][_0x28266a(0x39c)];this[_0x28266a(0x246)]={'messageRows':_0x346001['MessageRows'],'messageWidth':_0x346001[_0x28266a(0x28e)],'messageWordWrap':_0x441165['MessageWindow'],'helpWordWrap':_0x441165[_0x28266a(0x1ae)],'choiceLineHeight':_0x346001[_0x28266a(0x1e1)],'choiceRows':_0x346001[_0x28266a(0x2d2)],'choiceCols':_0x346001[_0x28266a(0x286)],'choiceTextAlign':_0x346001[_0x28266a(0x1ff)]},this['_messageOffsetX']===undefined&&(this[_0x28266a(0x191)]=_0x346001['MsgWindowOffsetX'],this[_0x28266a(0x12d)]=_0x346001['MsgWindowOffsetY']);},Game_System[_0xa223dd(0x2ed)][_0xa223dd(0x233)]=function(){const _0x476748=_0xa223dd;if(this[_0x476748(0x246)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x476748(0x323)]===undefined)this[_0x476748(0x38a)]();return this[_0x476748(0x246)]['messageRows'];},Game_System[_0xa223dd(0x2ed)][_0xa223dd(0x1a1)]=function(_0x5834ab){const _0x449c7b=_0xa223dd;if(this['_MessageCoreSettings']===undefined)this[_0x449c7b(0x38a)]();if(this['_MessageCoreSettings'][_0x449c7b(0x323)]===undefined)this[_0x449c7b(0x38a)]();this[_0x449c7b(0x246)]['messageRows']=_0x5834ab||0x1;},Game_System[_0xa223dd(0x2ed)][_0xa223dd(0x228)]=function(){const _0x1614bf=_0xa223dd;if(this['_MessageCoreSettings']===undefined)this[_0x1614bf(0x38a)]();if(this[_0x1614bf(0x246)]['messageWidth']===undefined)this[_0x1614bf(0x38a)]();return this[_0x1614bf(0x246)]['messageWidth'];},Game_System['prototype']['setMessageWindowWidth']=function(_0x23231d){const _0x31346a=_0xa223dd;if(this[_0x31346a(0x246)]===undefined)this[_0x31346a(0x38a)]();if(this[_0x31346a(0x246)]['messageWidth']===undefined)this['initMessageCore']();_0x23231d=Math[_0x31346a(0x1c9)](_0x23231d);if(_0x23231d%0x2!==0x0)_0x23231d+=0x1;this[_0x31346a(0x246)][_0x31346a(0x37a)]=_0x23231d||0x2;},Game_System[_0xa223dd(0x2ed)][_0xa223dd(0xf4)]=function(){const _0x277c91=_0xa223dd;if(this[_0x277c91(0x246)]===undefined)this[_0x277c91(0x38a)]();if(this[_0x277c91(0x246)][_0x277c91(0x1a7)]===undefined)this[_0x277c91(0x38a)]();return this[_0x277c91(0x246)][_0x277c91(0x1a7)];},Game_System[_0xa223dd(0x2ed)][_0xa223dd(0x25c)]=function(_0x2a8e47){const _0x325d25=_0xa223dd;if(this[_0x325d25(0x246)]===undefined)this[_0x325d25(0x38a)]();if(this[_0x325d25(0x246)][_0x325d25(0x1a7)]===undefined)this[_0x325d25(0x38a)]();this[_0x325d25(0x246)]['messageWordWrap']=_0x2a8e47;},Game_System[_0xa223dd(0x2ed)]['getMessageWindowXyOffsets']=function(){const _0x16599d=_0xa223dd;if(this[_0x16599d(0x191)]===undefined){const _0x2444a6=VisuMZ[_0x16599d(0x2a0)][_0x16599d(0xed)][_0x16599d(0x176)];this[_0x16599d(0x191)]=_0x2444a6['MsgWindowOffsetX'],this[_0x16599d(0x12d)]=_0x2444a6[_0x16599d(0x314)];}return{'x':this['_messageOffsetX']||0x0,'y':this[_0x16599d(0x12d)]||0x0};},Game_System[_0xa223dd(0x2ed)][_0xa223dd(0x300)]=function(_0x50ecf2,_0xe1584c){const _0x12d72a=_0xa223dd;if(this[_0x12d72a(0x246)]===undefined)this['initMessageCore']();this['_messageOffsetX']=_0x50ecf2,this[_0x12d72a(0x12d)]=_0xe1584c;},Game_System['prototype'][_0xa223dd(0x376)]=function(){const _0x49d296=_0xa223dd;if(this[_0x49d296(0x246)]===undefined)this[_0x49d296(0x38a)]();if(this[_0x49d296(0x246)]['helpWordWrap']===undefined)this['initMessageCore']();return this[_0x49d296(0x246)][_0x49d296(0x1e5)];},Game_System['prototype'][_0xa223dd(0x2fd)]=function(_0x21d70b){const _0x45cea0=_0xa223dd;if(this[_0x45cea0(0x246)]===undefined)this[_0x45cea0(0x38a)]();if(this[_0x45cea0(0x246)][_0x45cea0(0x1e5)]===undefined)this[_0x45cea0(0x38a)]();this[_0x45cea0(0x246)]['helpWordWrap']=_0x21d70b;},Game_System[_0xa223dd(0x2ed)][_0xa223dd(0x261)]=function(){const _0x209039=_0xa223dd;if(this[_0x209039(0x246)]===undefined)this[_0x209039(0x38a)]();if(this[_0x209039(0x246)][_0x209039(0x290)]===undefined)this[_0x209039(0x38a)]();return this[_0x209039(0x246)]['choiceLineHeight'];},Game_System['prototype'][_0xa223dd(0x384)]=function(_0x325c6d){const _0x1df446=_0xa223dd;if(this[_0x1df446(0x246)]===undefined)this[_0x1df446(0x38a)]();if(this[_0x1df446(0x246)][_0x1df446(0x290)]===undefined)this[_0x1df446(0x38a)]();this[_0x1df446(0x246)][_0x1df446(0x290)]=_0x325c6d||0x1;},Game_System[_0xa223dd(0x2ed)][_0xa223dd(0xfe)]=function(){const _0xcf85da=_0xa223dd;if(this[_0xcf85da(0x246)]===undefined)this[_0xcf85da(0x38a)]();if(this['_MessageCoreSettings'][_0xcf85da(0xee)]===undefined)this['initMessageCore']();return this['_MessageCoreSettings'][_0xcf85da(0xee)];},Game_System['prototype'][_0xa223dd(0x335)]=function(_0x5346a8){const _0x279aea=_0xa223dd;if(this[_0x279aea(0x246)]===undefined)this[_0x279aea(0x38a)]();if(this[_0x279aea(0x246)][_0x279aea(0xee)]===undefined)this[_0x279aea(0x38a)]();this[_0x279aea(0x246)][_0x279aea(0xee)]=_0x5346a8||0x1;},Game_System[_0xa223dd(0x2ed)][_0xa223dd(0x22d)]=function(){const _0x1adde9=_0xa223dd;if(this[_0x1adde9(0x246)]===undefined)this['initMessageCore']();if(this[_0x1adde9(0x246)]['choiceCols']===undefined)this[_0x1adde9(0x38a)]();return this[_0x1adde9(0x246)]['choiceCols'];},Game_System['prototype'][_0xa223dd(0x35d)]=function(_0x25b65f){const _0xbd7a15=_0xa223dd;if(this[_0xbd7a15(0x246)]===undefined)this[_0xbd7a15(0x38a)]();if(this[_0xbd7a15(0x246)][_0xbd7a15(0x352)]===undefined)this[_0xbd7a15(0x38a)]();this[_0xbd7a15(0x246)][_0xbd7a15(0x352)]=_0x25b65f||0x1;},Game_System[_0xa223dd(0x2ed)]['getChoiceListTextAlign']=function(){const _0x4ca041=_0xa223dd;if(this[_0x4ca041(0x246)]===undefined)this[_0x4ca041(0x38a)]();if(this[_0x4ca041(0x246)][_0x4ca041(0x218)]===undefined)this[_0x4ca041(0x38a)]();return this[_0x4ca041(0x246)][_0x4ca041(0x218)];},Game_System[_0xa223dd(0x2ed)][_0xa223dd(0x2d5)]=function(_0x46d9f0){const _0x3dde3f=_0xa223dd;if(this[_0x3dde3f(0x246)]===undefined)this[_0x3dde3f(0x38a)]();if(this[_0x3dde3f(0x246)][_0x3dde3f(0x218)]===undefined)this[_0x3dde3f(0x38a)]();this['_MessageCoreSettings'][_0x3dde3f(0x218)]=_0x46d9f0[_0x3dde3f(0x332)]();},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x182)]=Game_Screen[_0xa223dd(0x2ed)]['clearPictures'],Game_Screen[_0xa223dd(0x2ed)][_0xa223dd(0x257)]=function(){const _0x21d452=_0xa223dd;VisuMZ['MessageCore'][_0x21d452(0x182)][_0x21d452(0x221)](this),this[_0x21d452(0x38b)]();},Game_Screen[_0xa223dd(0x2ed)][_0xa223dd(0x38b)]=function(){const _0x2e8729=_0xa223dd;this[_0x2e8729(0x1d4)]=[],this[_0x2e8729(0x19b)]=[];},Game_Screen['prototype'][_0xa223dd(0x381)]=function(_0x286fb9){const _0x164acf=_0xa223dd;if(this[_0x164acf(0x1d4)]===undefined)this[_0x164acf(0x38b)]();const _0x576a2b=this[_0x164acf(0x1e6)](_0x286fb9);return this[_0x164acf(0x1d4)][_0x576a2b]=this[_0x164acf(0x1d4)][_0x576a2b]||{},this[_0x164acf(0x1d4)][_0x576a2b];},Game_Screen[_0xa223dd(0x2ed)][_0xa223dd(0x326)]=function(_0x105a45,_0x496262){const _0x488adf=_0xa223dd;return _0x496262=_0x496262['toLowerCase']()[_0x488adf(0x362)](),this[_0x488adf(0x381)](_0x105a45)[_0x496262]||'';},Game_Screen[_0xa223dd(0x2ed)][_0xa223dd(0x302)]=function(_0x123d13,_0x25f2d5,_0x20e7e6){const _0x23245e=_0xa223dd;_0x20e7e6=_0x20e7e6[_0x23245e(0x332)]()[_0x23245e(0x362)](),this[_0x23245e(0x381)](_0x123d13)[_0x20e7e6]=_0x25f2d5||'';},Game_Screen[_0xa223dd(0x2ed)][_0xa223dd(0x22a)]=function(_0x2ce57f){const _0x3a81b6=_0xa223dd;if(this[_0x3a81b6(0x1d4)]===undefined)this[_0x3a81b6(0x38b)]();const _0x5df6b4=this[_0x3a81b6(0x1e6)](_0x2ce57f);this['_pictureText'][_0x5df6b4]=null;},Game_Screen[_0xa223dd(0x2ed)][_0xa223dd(0x260)]=function(_0x34b732){const _0x48cf83=_0xa223dd;if(this[_0x48cf83(0x1d4)]===undefined)this['clearAllPictureTexts']();const _0x546526=this[_0x48cf83(0x1e6)](_0x34b732);return this['_pictureTextBuffer'][_0x546526]||0x0;},Game_Screen[_0xa223dd(0x2ed)][_0xa223dd(0x27b)]=function(_0x2ad083,_0x276712){const _0x46c509=_0xa223dd;if(this['_pictureText']===undefined)this[_0x46c509(0x38b)]();const _0x538c00=this[_0x46c509(0x1e6)](_0x2ad083);this[_0x46c509(0x19b)][_0x538c00]=Math[_0x46c509(0x155)](0x0,_0x276712);},Game_Screen[_0xa223dd(0x2ed)]['erasePictureTextBuffer']=function(_0x4c28f4){const _0xcccf4=_0xa223dd;if(this[_0xcccf4(0x1d4)]===undefined)this[_0xcccf4(0x38b)]();const _0x5db60e=this['realPictureId'](_0x4c28f4);this['_pictureTextBuffer'][_0x5db60e]=undefined;},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x36c)]=Game_Screen['prototype'][_0xa223dd(0x2fe)],Game_Screen[_0xa223dd(0x2ed)][_0xa223dd(0x2fe)]=function(_0x3ae180){const _0x1a4f3a=_0xa223dd;VisuMZ[_0x1a4f3a(0x2a0)]['Game_Screen_erasePicture'][_0x1a4f3a(0x221)](this,_0x3ae180),this[_0x1a4f3a(0x22a)](_0x3ae180),this['erasePictureTextBuffer'](_0x3ae180);},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x2c8)]=Game_Party['prototype'][_0xa223dd(0x307)],Game_Party['prototype'][_0xa223dd(0x307)]=function(){const _0x1dce94=_0xa223dd;VisuMZ[_0x1dce94(0x2a0)][_0x1dce94(0x2c8)]['call'](this),this['initMessageCore']();},Game_Party[_0xa223dd(0x2ed)][_0xa223dd(0x38a)]=function(){const _0x447c76=_0xa223dd;this[_0x447c76(0x131)]={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0xa223dd(0x2ed)][_0xa223dd(0x2af)]=function(){const _0x195a2c=_0xa223dd;if(this[_0x195a2c(0x131)]===undefined)this[_0x195a2c(0x38a)]();return this[_0x195a2c(0x131)];},Game_Party[_0xa223dd(0x2ed)][_0xa223dd(0x1d6)]=function(_0x30c578,_0x4af45a){const _0x20ab30=_0xa223dd;if(this['_lastGainedItemData']===undefined)this['initMessageCore']();if(!_0x30c578)return;if(DataManager[_0x20ab30(0x349)](_0x30c578))this[_0x20ab30(0x131)][_0x20ab30(0x1f1)]=0x0;else{if(DataManager[_0x20ab30(0x205)](_0x30c578))this[_0x20ab30(0x131)][_0x20ab30(0x1f1)]=0x1;else DataManager['isArmor'](_0x30c578)&&(this[_0x20ab30(0x131)][_0x20ab30(0x1f1)]=0x2);}this['_lastGainedItemData']['id']=_0x30c578['id'],this[_0x20ab30(0x131)]['quantity']=_0x4af45a;},VisuMZ[_0xa223dd(0x2a0)]['Game_Party_gainItem']=Game_Party[_0xa223dd(0x2ed)][_0xa223dd(0x334)],Game_Party['prototype'][_0xa223dd(0x334)]=function(_0xec610e,_0x1a4073,_0x2efb21){const _0x4329ac=_0xa223dd;VisuMZ[_0x4329ac(0x2a0)][_0x4329ac(0x2c0)]['call'](this,_0xec610e,_0x1a4073,_0x2efb21),_0x1a4073>0x0&&(_0x4329ac(0x109)!==_0x4329ac(0x1c0)?this[_0x4329ac(0x1d6)](_0xec610e,_0x1a4073):this[_0x4329ac(0x3bf)]=_0x2c1527);},VisuMZ['MessageCore']['Game_Map_initialize']=Game_Map[_0xa223dd(0x2ed)][_0xa223dd(0x307)],Game_Map[_0xa223dd(0x2ed)][_0xa223dd(0x307)]=function(){const _0x558e4f=_0xa223dd;VisuMZ[_0x558e4f(0x2a0)][_0x558e4f(0x1f6)][_0x558e4f(0x221)](this),this[_0x558e4f(0x2ff)]=[];},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x200)]=Game_Map[_0xa223dd(0x2ed)][_0xa223dd(0x3a6)],Game_Map[_0xa223dd(0x2ed)][_0xa223dd(0x3a6)]=function(){const _0x323286=_0xa223dd;VisuMZ[_0x323286(0x2a0)]['Game_Map_setupEvents'][_0x323286(0x221)](this),this[_0x323286(0x2ff)]=[];},VisuMZ['MessageCore'][_0xa223dd(0x222)]=Game_Map[_0xa223dd(0x2ed)][_0xa223dd(0x145)],Game_Map[_0xa223dd(0x2ed)][_0xa223dd(0x145)]=function(){const _0x269136=_0xa223dd;VisuMZ[_0x269136(0x2a0)][_0x269136(0x222)][_0x269136(0x221)](this),this[_0x269136(0x311)]();},Game_Map[_0xa223dd(0x2ed)][_0xa223dd(0x146)]=function(_0x5cdd97){const _0x40f49f=_0xa223dd;if(!$dataCommonEvents[_0x5cdd97])return;this[_0x40f49f(0x2ff)]=this[_0x40f49f(0x2ff)]||[];const _0x296055=this['_interpreter'][_0x40f49f(0x1d1)],_0x1e3acb=new Game_MessageCommonEvent(_0x5cdd97,_0x296055);this[_0x40f49f(0x2ff)][_0x40f49f(0x3a9)](_0x1e3acb);},Game_Map[_0xa223dd(0x2ed)][_0xa223dd(0x311)]=function(){const _0x4534b0=_0xa223dd;this[_0x4534b0(0x2ff)]=this['_messageCommonEvents']||[];for(const _0x4b6445 of this['_messageCommonEvents']){if(!_0x4b6445['_interpreter'])this[_0x4534b0(0x2ff)]['remove'](_0x4b6445);else{if('NNfrY'!=='NNfrY'){const _0x344349=this[_0x4534b0(0x213)](_0x589618),_0x487eca=0x1,_0x3cde80=_0x344349+(_0x155c5f?_0x487eca:-_0x487eca);_0x3cde80>0xb&&_0x530636?this[_0x4534b0(0x175)](_0x23f358,0x1):this[_0x4534b0(0x175)](_0x4eb1d2,_0x3cde80['clamp'](0x1,0xb));}else _0x4b6445[_0x4534b0(0x149)]();}}},Game_Interpreter['prototype']['command101']=function(_0x2639af){const _0x171e99=_0xa223dd;if($gameMessage[_0x171e99(0x3bd)]())return![];return this[_0x171e99(0xf6)](_0x2639af),this[_0x171e99(0x266)](_0x2639af),this['prepareShowTextFollowups'](_0x2639af),this[_0x171e99(0x1ad)]('message'),!![];},Game_Interpreter[_0xa223dd(0x2ed)][_0xa223dd(0xf6)]=function(_0x3e90ff){const _0x44d083=_0xa223dd;$gameMessage[_0x44d083(0x370)](_0x3e90ff[0x0],_0x3e90ff[0x1]),$gameMessage[_0x44d083(0x17c)](_0x3e90ff[0x2]),$gameMessage[_0x44d083(0x39f)](_0x3e90ff[0x3]),$gameMessage[_0x44d083(0x122)](_0x3e90ff[0x4]);},Game_Interpreter[_0xa223dd(0x2ed)]['addContinuousShowTextCommands']=function(_0x86c522){const _0x15eb89=_0xa223dd;while(this['isContinuePrepareShowTextCommands']()){if(_0x15eb89(0x26c)!==_0x15eb89(0x2d6)){this['_index']++;if(this[_0x15eb89(0x1e2)]()[_0x15eb89(0x113)]===0x191){if('CPjGh'!==_0x15eb89(0x13c)){let _0x335e9e=this[_0x15eb89(0x1e2)]()[_0x15eb89(0x179)][0x0];_0x335e9e=VisuMZ[_0x15eb89(0x2a0)][_0x15eb89(0x267)](_0x335e9e),$gameMessage['add'](_0x335e9e);}else this[_0x15eb89(0x11b)](),this[_0x15eb89(0x274)](),this['_messageWindow']&&(this['updatePlacement'](),this[_0x15eb89(0x154)]()),this[_0x15eb89(0x39a)](),this[_0x15eb89(0x357)](),this['refreshDimmerBitmap'](),_0x477882['prototype'][_0x15eb89(0x106)][_0x15eb89(0x221)](this);}if(this['isBreakShowTextCommands']()){if(_0x15eb89(0x2ad)===_0x15eb89(0x1a9))_0x11df4f[_0x15eb89(0x2ed)][_0x15eb89(0x202)][_0x15eb89(0x221)](this),this[_0x15eb89(0x2d7)](this['defaultColor']());else break;}}else return![];}},Game_Interpreter[_0xa223dd(0x2ed)][_0xa223dd(0x241)]=function(){const _0x8fb21e=_0xa223dd;if(this[_0x8fb21e(0x139)]()===0x65&&$gameSystem['getMessageWindowRows']()>0x4)return!![];else{if(_0x8fb21e(0x22c)!==_0x8fb21e(0x17d))return this['nextEventCode']()===0x191;else this[_0x8fb21e(0x2ff)][_0x8fb21e(0x2b0)](_0x529035);}},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x267)]=function(_0x17632a){const _0x46b446=_0xa223dd;return _0x17632a=_0x17632a[_0x46b446(0x20c)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x17632a;},Game_Interpreter[_0xa223dd(0x2ed)][_0xa223dd(0x390)]=function(){const _0x37249e=_0xa223dd;if(this[_0x37249e(0x1e2)]()&&this[_0x37249e(0x1e2)]()[_0x37249e(0x179)][0x0]['match'](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return $gameMessage[_0x37249e(0x2c7)]['length']>=$gameSystem[_0x37249e(0x233)]()&&this[_0x37249e(0x139)]()!==0x191;},Game_Interpreter[_0xa223dd(0x2ed)][_0xa223dd(0x13e)]=function(_0x23b060){const _0x33bc60=_0xa223dd;switch(this['nextEventCode']()){case 0x66:this[_0x33bc60(0x2ec)]++,this[_0x33bc60(0x3bb)](this[_0x33bc60(0x1e2)]()[_0x33bc60(0x179)]);break;case 0x67:this[_0x33bc60(0x2ec)]++,this['setupNumInput'](this['currentCommand']()['parameters']);break;case 0x68:this['_index']++,this[_0x33bc60(0x195)](this[_0x33bc60(0x1e2)]()[_0x33bc60(0x179)]);break;}},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x13b)]=Game_Interpreter[_0xa223dd(0x2ed)][_0xa223dd(0x3bb)],Game_Interpreter[_0xa223dd(0x2ed)]['setupChoices']=function(_0x2f544f){const _0xbaf64=_0xa223dd;_0x2f544f=this[_0xbaf64(0x3b4)](),VisuMZ[_0xbaf64(0x2a0)][_0xbaf64(0x13b)][_0xbaf64(0x221)](this,_0x2f544f);},Game_Interpreter[_0xa223dd(0x2ed)][_0xa223dd(0x3b4)]=function(){const _0x2c9152=_0xa223dd,_0x36eebb=this['_index'],_0x153f57=[];let _0x4ab664=0x0;this['_index']++;while(this[_0x2c9152(0x2ec)]<this[_0x2c9152(0x2ea)][_0x2c9152(0x2bf)]){if(this['currentCommand']()['indent']===this[_0x2c9152(0x1e4)]){if(this[_0x2c9152(0x1e2)]()[_0x2c9152(0x113)]===0x194&&this['nextEventCode']()!==0x66)break;else{if(this[_0x2c9152(0x1e2)]()[_0x2c9152(0x113)]===0x66)this[_0x2c9152(0x137)](_0x4ab664,this[_0x2c9152(0x1e2)](),_0x36eebb),this[_0x2c9152(0x2ec)]-=0x2;else{if(this['currentCommand']()[_0x2c9152(0x113)]===0x192){if(_0x2c9152(0x236)!=='kvTIr'){if(_0xfb8bb8['Type']==='')this[_0x2c9152(0x235)](_0x230c5a);_0x164c00[_0x2c9152(0x1ea)]['call'](this,_0x4c7d17);if(this[_0x2c9152(0x2d4)]===_0x2e0bb5){const _0x421135=_0xa27291[_0x2c9152(0x161)]||0x0;if(_0x421135>0x0)this[_0x2c9152(0x2da)](_0x421135);}}else this['currentCommand']()[_0x2c9152(0x179)][0x0]=_0x4ab664,_0x4ab664++;}}}}this[_0x2c9152(0x2ec)]++;}return this['_index']=_0x36eebb,this['currentCommand']()[_0x2c9152(0x179)];},Game_Interpreter[_0xa223dd(0x2ed)][_0xa223dd(0x137)]=function(_0x186195,_0x4073f1,_0x2b67a9){const _0x3d5318=_0xa223dd;this[_0x3d5318(0x2b7)](_0x186195,_0x4073f1,_0x2b67a9),this[_0x3d5318(0x18f)](_0x186195,_0x4073f1,_0x2b67a9),this['addExtraShowChoices'](_0x4073f1,_0x2b67a9);},Game_Interpreter[_0xa223dd(0x2ed)][_0xa223dd(0x2b7)]=function(_0x2cfc8a,_0x449e70,_0xd6d71b){const _0x584ec0=_0xa223dd;if(_0x449e70[_0x584ec0(0x179)][0x2]<0x0)return;const _0x49bd42=_0x449e70[_0x584ec0(0x179)][0x2]+_0x2cfc8a;this['_list'][_0xd6d71b]['parameters'][0x2]=_0x49bd42;},Game_Interpreter[_0xa223dd(0x2ed)][_0xa223dd(0x18f)]=function(_0x4d2ad6,_0xa6a0af,_0x562bd0){const _0x4c7e49=_0xa223dd;if(_0xa6a0af[_0x4c7e49(0x179)][0x1]>=0x0){var _0x1fa563=_0xa6a0af['parameters'][0x1]+_0x4d2ad6;this[_0x4c7e49(0x2ea)][_0x562bd0][_0x4c7e49(0x179)][0x1]=_0x1fa563;}else _0xa6a0af[_0x4c7e49(0x179)][0x1]===-0x2&&(this[_0x4c7e49(0x2ea)][_0x562bd0][_0x4c7e49(0x179)][0x1]=_0xa6a0af[_0x4c7e49(0x179)][0x1]);},Game_Interpreter['prototype'][_0xa223dd(0x26f)]=function(_0x3122d0,_0x5e4f19){const _0x6302b=_0xa223dd;for(const _0x11cb1a of _0x3122d0[_0x6302b(0x179)][0x0]){this[_0x6302b(0x2ea)][_0x5e4f19][_0x6302b(0x179)][0x0][_0x6302b(0x3a9)](_0x11cb1a);}this[_0x6302b(0x2ea)][_0x6302b(0x30a)](this[_0x6302b(0x2ec)]-0x1,0x2);};function Game_MessageCommonEvent(){const _0x163024=_0xa223dd;this[_0x163024(0x307)](...arguments);}function _0x2d72(_0x4255c7,_0x2f0b01){const _0x24e27b=_0x24e2();return _0x2d72=function(_0x2d727b,_0x1061ed){_0x2d727b=_0x2d727b-0xe9;let _0x569148=_0x24e27b[_0x2d727b];return _0x569148;},_0x2d72(_0x4255c7,_0x2f0b01);}Game_MessageCommonEvent[_0xa223dd(0x2ed)][_0xa223dd(0x307)]=function(_0x120150,_0x53c33e){const _0x408e25=_0xa223dd;this['_commonEventId']=_0x120150,this[_0x408e25(0x1d1)]=_0x53c33e||0x0,this['refresh']();},Game_MessageCommonEvent[_0xa223dd(0x2ed)][_0xa223dd(0x2fc)]=function(){const _0x31efdd=_0xa223dd;return $dataCommonEvents[this[_0x31efdd(0x32f)]];},Game_MessageCommonEvent['prototype'][_0xa223dd(0x252)]=function(){return this['event']()['list'];},Game_MessageCommonEvent[_0xa223dd(0x2ed)][_0xa223dd(0x106)]=function(){const _0xe22501=_0xa223dd;this[_0xe22501(0x125)]=new Game_Interpreter(),this['_interpreter']['setup'](this['list'](),this[_0xe22501(0x1d1)]);},Game_MessageCommonEvent[_0xa223dd(0x2ed)]['update']=function(){const _0x42fc08=_0xa223dd;if(this['_interpreter']){if(this[_0x42fc08(0x125)]['isRunning']()){if(_0x42fc08(0x15a)!=='zcRlT')return this['_relativePosition']=_0x40dcba,'';else this[_0x42fc08(0x125)]['update']();}else this[_0x42fc08(0x103)]();}},Game_MessageCommonEvent[_0xa223dd(0x2ed)][_0xa223dd(0x103)]=function(){const _0x293c35=_0xa223dd;this[_0x293c35(0x125)]=null;},Scene_Message['prototype'][_0xa223dd(0x223)]=function(){const _0x5e4c5a=_0xa223dd,_0x3a7714=Math[_0x5e4c5a(0x35a)](Graphics[_0x5e4c5a(0x2e7)],$gameSystem[_0x5e4c5a(0x228)]()),_0x462e7e=$gameSystem[_0x5e4c5a(0x233)](),_0x33f2a6=this[_0x5e4c5a(0x2f4)](_0x462e7e,![]),_0x510fec=(Graphics['boxWidth']-_0x3a7714)/0x2,_0xe65251=0x0;return new Rectangle(_0x510fec,_0xe65251,_0x3a7714,_0x33f2a6);},VisuMZ['MessageCore'][_0xa223dd(0x31c)]=Scene_Options[_0xa223dd(0x2ed)][_0xa223dd(0x18e)],Scene_Options['prototype'][_0xa223dd(0x18e)]=function(){const _0x1a8435=_0xa223dd;let _0xd0adcf=VisuMZ['MessageCore']['Scene_Options_maxCommands'][_0x1a8435(0x221)](this);const _0x198c5a=VisuMZ['MessageCore'][_0x1a8435(0xed)];if(_0x198c5a[_0x1a8435(0x2a2)][_0x1a8435(0x367)]&&_0x198c5a[_0x1a8435(0x2a2)]['AdjustRect'])_0xd0adcf++;return _0xd0adcf;},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x23b)]=Sprite_Picture[_0xa223dd(0x2ed)][_0xa223dd(0x203)],Sprite_Picture['prototype']['updateBitmap']=function(){const _0x42e7c8=_0xa223dd;VisuMZ[_0x42e7c8(0x2a0)][_0x42e7c8(0x23b)][_0x42e7c8(0x221)](this),this['createPictureText']();},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x29f)]=Sprite_Picture['prototype'][_0xa223dd(0x149)],Sprite_Picture[_0xa223dd(0x2ed)]['update']=function(){const _0x140e2a=_0xa223dd;VisuMZ[_0x140e2a(0x2a0)]['Sprite_Picture_update'][_0x140e2a(0x221)](this),this[_0x140e2a(0x259)]();},Sprite_Picture[_0xa223dd(0x2ed)][_0xa223dd(0x259)]=function(){const _0x11b55c=_0xa223dd;if(!this['visible'])return;this[_0x11b55c(0x2f1)](),this['anchorPictureText'](),this[_0x11b55c(0x1dd)](),this[_0x11b55c(0x2c3)]();},Sprite_Picture[_0xa223dd(0x2ed)][_0xa223dd(0x1f2)]=function(){const _0x1f7b43=_0xa223dd;if(this[_0x1f7b43(0x29c)])return;if(this[_0x1f7b43(0x18c)])return;const _0x57a4f2=new Rectangle(0x0,0x0,0x0,0x0);this[_0x1f7b43(0x29c)]=new Window_Base(_0x57a4f2),this[_0x1f7b43(0x29c)][_0x1f7b43(0x320)]=0x0,this[_0x1f7b43(0x18c)]=new Sprite(),this['addChildAt'](this['_pictureTextSprite'],0x0),this[_0x1f7b43(0x328)]=0x0,this[_0x1f7b43(0x3b7)]=0x0,this['_pictureTextCache']={};},Sprite_Picture['prototype'][_0xa223dd(0x2f1)]=function(){const _0x27556c=_0xa223dd;if(!this[_0x27556c(0x29c)])return;if(this['_pictureTextWidth']===this['width']&&this[_0x27556c(0x3b7)]===this['height'])return;this[_0x27556c(0x328)]=this[_0x27556c(0x2e7)],this[_0x27556c(0x3b7)]=this[_0x27556c(0x167)],this[_0x27556c(0x397)]={},this[_0x27556c(0x29c)]['move'](0x0,0x0,this[_0x27556c(0x2e7)],this[_0x27556c(0x167)]);},Sprite_Picture[_0xa223dd(0x2ed)]['anchorPictureText']=function(){const _0x2b2efa=_0xa223dd;if(!this[_0x2b2efa(0x18c)])return;this[_0x2b2efa(0x18c)][_0x2b2efa(0x3a5)]['x']=this['anchor']['x'],this['_pictureTextSprite']['anchor']['y']=this[_0x2b2efa(0x3a5)]['y'];},Sprite_Picture['prototype'][_0xa223dd(0x1dd)]=function(){const _0x2f4692=_0xa223dd;if(!this[_0x2f4692(0x29c)])return;if(!this[_0x2f4692(0xf0)]())return;const _0x9b6ed6=[_0x2f4692(0x2f9),'up',_0x2f4692(0x13a),'left','center',_0x2f4692(0x204),'lowerleft',_0x2f4692(0x21f),_0x2f4692(0x385)];this[_0x2f4692(0x29c)][_0x2f4692(0x39a)]();for(const _0x121c28 of _0x9b6ed6){this[_0x2f4692(0x16a)](_0x121c28);}},Sprite_Picture['prototype'][_0xa223dd(0xf0)]=function(){const _0x58517c=_0xa223dd,_0x1d78de=['upperleft','up','upperright',_0x58517c(0x2dd),_0x58517c(0x33c),'right',_0x58517c(0x254),'down',_0x58517c(0x385)];for(const _0xc21280 of _0x1d78de){const _0x61ffad=$gameScreen[_0x58517c(0x326)](this[_0x58517c(0xf5)],_0xc21280);if(this['_pictureTextCache'][_0xc21280]===_0x61ffad)continue;return!![];}return![];},Sprite_Picture['prototype']['drawPictureTextZone']=function(_0x106bae){const _0x205465=_0xa223dd,_0x374bcb=$gameScreen[_0x205465(0x326)](this[_0x205465(0xf5)],_0x106bae);this[_0x205465(0x397)][_0x106bae]=_0x374bcb;const _0x301bbe=this[_0x205465(0x29c)][_0x205465(0x2cd)](_0x374bcb);let _0x32ce7a=$gameScreen[_0x205465(0x260)](this[_0x205465(0xf5)]),_0x176bf5=_0x32ce7a,_0xbd59ab=_0x32ce7a;if(['up',_0x205465(0x33c),_0x205465(0x21f)][_0x205465(0x3b3)](_0x106bae)){if(_0x205465(0x20b)!==_0x205465(0x1f7))_0x176bf5=Math['floor']((this[_0x205465(0x2e7)]-_0x301bbe['width'])/0x2);else{const _0xb45b64={'x':this['x'],'y':this['y']};_0x1f9837[_0x205465(0x2ed)][_0x205465(0x36e)][_0x205465(0x221)](this),this[_0x205465(0x22f)](_0xb45b64);}}else{if([_0x205465(0x13a),_0x205465(0x204),_0x205465(0x385)][_0x205465(0x3b3)](_0x106bae)){if(_0x205465(0x1f4)!==_0x205465(0x1d5))_0x176bf5=Math[_0x205465(0x276)](this['width']-_0x301bbe[_0x205465(0x2e7)]-_0x32ce7a);else{if(!_0x2c5ae6||!_0x485a3f)return-0x1;return _0x20a66c[_0x205465(0x2bf)]-_0x306021[_0x205465(0x2bf)];}}}if([_0x205465(0x2dd),_0x205465(0x33c),_0x205465(0x204)][_0x205465(0x3b3)](_0x106bae))'oYlxk'!==_0x205465(0x231)?(_0x1ae3a9[_0x205465(0x2a0)][_0x205465(0x1b6)]['call'](this,_0x516ae4),'textSpeed'in _0xd0e719?this[_0x205465(0x1f5)]=_0x44c7bc(_0x31f470[_0x205465(0x1f5)])[_0x205465(0x17b)](0x1,0xb):this[_0x205465(0x1f5)]=_0x73ff2[_0x205465(0x2a0)][_0x205465(0xed)][_0x205465(0x2a2)][_0x205465(0x33d)]):_0xbd59ab=Math[_0x205465(0x276)]((this['height']-_0x301bbe[_0x205465(0x167)])/0x2);else[_0x205465(0x254),'down',_0x205465(0x385)][_0x205465(0x3b3)](_0x106bae)&&(_0xbd59ab=Math['floor'](this['height']-_0x301bbe[_0x205465(0x167)]-_0x32ce7a));this[_0x205465(0x29c)][_0x205465(0x1e0)](_0x374bcb,_0x176bf5,_0xbd59ab);},Sprite_Picture[_0xa223dd(0x2ed)]['attachPictureText']=function(){const _0x579f18=_0xa223dd;if(!this[_0x579f18(0x29c)])return;if(!this[_0x579f18(0x18c)])return;this[_0x579f18(0x18c)][_0x579f18(0x1c2)]=this[_0x579f18(0x29c)][_0x579f18(0x30b)];},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x2e9)]=Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x307)],Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x307)]=function(_0x3cfe0d){const _0x46801f=_0xa223dd;this[_0x46801f(0x38a)](_0x3cfe0d),VisuMZ[_0x46801f(0x2a0)][_0x46801f(0x2e9)][_0x46801f(0x221)](this,_0x3cfe0d);},Window_Base['prototype'][_0xa223dd(0x38a)]=function(_0x488e4c){const _0x2636d4=_0xa223dd;this[_0x2636d4(0x2d8)](),this[_0x2636d4(0x394)](),this[_0x2636d4(0x1bc)](_0x488e4c);},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x2d8)]=function(){const _0xe4a858=_0xa223dd;this[_0xe4a858(0x339)]('default');},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x339)]=function(_0x3e2b45){const _0x451d69=_0xa223dd;this[_0x451d69(0x309)]=_0x3e2b45;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x2b5)]=function(){const _0x3aa193=_0xa223dd;return this[_0x3aa193(0x309)];},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x2bc)]=Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x2cd)],Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x2cd)]=function(_0x33e97f){const _0x539597=_0xa223dd;return this[_0x539597(0x394)](),VisuMZ[_0x539597(0x2a0)]['Window_Base_textSizeEx']['call'](this,_0x33e97f);},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x2e4)]=Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x147)],Window_Base['prototype']['processAllText']=function(_0x4c4a6b){const _0x575724=_0xa223dd;VisuMZ[_0x575724(0x2a0)]['Window_Base_processAllText'][_0x575724(0x221)](this,_0x4c4a6b);if(_0x4c4a6b[_0x575724(0x1a6)])this[_0x575724(0x339)](_0x575724(0x268));},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x394)]=function(){this['setWordWrap'](![]);},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x183)]=function(){const _0x28a80f=_0xa223dd;return this[_0x28a80f(0x22b)];},Window_Base[_0xa223dd(0x2ed)]['setWordWrap']=function(_0x5c8652){const _0x17c3e7=_0xa223dd;return this[_0x17c3e7(0x22b)]=_0x5c8652,'';},Window_Base[_0xa223dd(0x2ed)]['registerResetRect']=function(_0x27ce3d){const _0x11a779=_0xa223dd;this[_0x11a779(0x1ba)]=JsonEx[_0x11a779(0x32e)](_0x27ce3d);},Window_Base['prototype'][_0xa223dd(0x35b)]=function(){const _0x79d765=_0xa223dd;this[_0x79d765(0x30b)]['fontFace']=$gameSystem[_0x79d765(0x13d)](),this[_0x79d765(0x30b)][_0x79d765(0x25b)]=$gameSystem['mainFontSize'](),this['contents'][_0x79d765(0x2c1)]=![],this[_0x79d765(0x30b)][_0x79d765(0x2e3)]=![],this[_0x79d765(0x202)]();},Window_Base['prototype'][_0xa223dd(0x202)]=function(){const _0x205a29=_0xa223dd;this[_0x205a29(0x2d7)](ColorManager['normalColor']()),this[_0x205a29(0x20f)](ColorManager[_0x205a29(0x17f)]());const _0x390a3f=VisuMZ[_0x205a29(0x2a0)]['Settings'][_0x205a29(0x176)];_0x390a3f[_0x205a29(0x19c)]===undefined&&(_0x390a3f['DefaultOutlineWidth']=0x3),this[_0x205a29(0x30b)]['outlineWidth']=_0x390a3f['DefaultOutlineWidth'],this[_0x205a29(0x2f5)](![]);},Window_Base['prototype']['setColorLock']=function(_0x4b8b77){const _0x196d10=_0xa223dd;this[_0x196d10(0x34e)]=_0x4b8b77;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x3b0)]=function(){const _0x3a6263=_0xa223dd;return this[_0x3a6263(0x34e)];},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x136)]=function(){return![];},Window_Base[_0xa223dd(0x2ed)]['getPreservedFontSettings']=function(){const _0x2649b8=_0xa223dd,_0xd4b3a0=[_0x2649b8(0x35e),_0x2649b8(0x25b),_0x2649b8(0x2c1),_0x2649b8(0x2e3),_0x2649b8(0x100),'outLineColor',_0x2649b8(0x225),_0x2649b8(0x238)];let _0x322216={};for(const _0x595f12 of _0xd4b3a0){_0x322216[_0x595f12]=this['contents'][_0x595f12];}return _0x322216;},Window_Base[_0xa223dd(0x2ed)]['returnPreservedFontSettings']=function(_0x410693){const _0x193c45=_0xa223dd;for(const _0xf9ba4a in _0x410693){if('pCYNt'==='dDPqE'){if(this[_0x193c45(0x1d4)]===_0x5e5e45)this[_0x193c45(0x38b)]();const _0x54158d=this[_0x193c45(0x1e6)](_0x51942b);this['_pictureText'][_0x54158d]=null;}else this['contents'][_0xf9ba4a]=_0x410693[_0xf9ba4a];}},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x2e5)]=Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x149)],Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x149)]=function(){const _0xf18264=_0xa223dd;VisuMZ[_0xf18264(0x2a0)]['Window_Base_update'][_0xf18264(0x221)](this),this['updateMove']();},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x184)]=function(){return![];},Window_Base[_0xa223dd(0x2ed)]['updateMove']=function(){const _0x1a892a=_0xa223dd;this[_0x1a892a(0x2ba)]>0x0&&(this[_0x1a892a(0x184)]()&&(this['x']=this[_0x1a892a(0x11a)](this['x'],this[_0x1a892a(0x1d9)]),this['y']=this['applyMoveEasing'](this['y'],this[_0x1a892a(0x187)]),this[_0x1a892a(0x2e7)]=this['applyMoveEasing'](this[_0x1a892a(0x2e7)],this[_0x1a892a(0x143)]),this['height']=this[_0x1a892a(0x11a)](this[_0x1a892a(0x167)],this[_0x1a892a(0x31a)]),this['clampPlacementPosition']()),this[_0x1a892a(0x2ba)]--);},Window_Base['prototype'][_0xa223dd(0x2dc)]=function(_0x72a023,_0x4be3a0){const _0xb2ad20=_0xa223dd;!_0x72a023&&(this[_0xb2ad20(0x2e7)]=Math[_0xb2ad20(0x35a)](this[_0xb2ad20(0x2e7)],Graphics[_0xb2ad20(0x2e7)]),this[_0xb2ad20(0x167)]=Math[_0xb2ad20(0x35a)](this[_0xb2ad20(0x167)],Graphics[_0xb2ad20(0x167)]));if(!_0x4be3a0){const _0x101c57=-(Math[_0xb2ad20(0x276)](Graphics['width']-Graphics[_0xb2ad20(0x1ca)])/0x2),_0x4804a1=_0x101c57+Graphics[_0xb2ad20(0x2e7)]-this[_0xb2ad20(0x2e7)],_0x20b94f=-(Math[_0xb2ad20(0x276)](Graphics[_0xb2ad20(0x167)]-Graphics['boxHeight'])/0x2),_0x34d620=_0x20b94f+Graphics[_0xb2ad20(0x167)]-this['height'];this['x']=this['x']['clamp'](_0x101c57,_0x4804a1),this['y']=this['y'][_0xb2ad20(0x17b)](_0x20b94f,_0x34d620);}},Window_Base['prototype']['applyMoveEasing']=function(_0x2536df,_0x535c68){const _0x4a5b99=_0xa223dd,_0xa3fe1a=this[_0x4a5b99(0x2ba)],_0x1ef77b=this['_wholeMoveDuration'],_0x12c793=this[_0x4a5b99(0x20a)]((_0x1ef77b-_0xa3fe1a)/_0x1ef77b),_0x587a7c=this[_0x4a5b99(0x20a)]((_0x1ef77b-_0xa3fe1a+0x1)/_0x1ef77b),_0x51bfc0=(_0x2536df-_0x535c68*_0x12c793)/(0x1-_0x12c793);return _0x51bfc0+(_0x535c68-_0x51bfc0)*_0x587a7c;},Window_Base['prototype']['calcMoveEasing']=function(_0x591916){const _0x2a93cf=_0xa223dd,_0x3ee1e6=0x2;switch(this[_0x2a93cf(0x31b)]){case 0x0:return _0x591916;case 0x1:return this[_0x2a93cf(0x1c1)](_0x591916,_0x3ee1e6);case 0x2:return this[_0x2a93cf(0x18b)](_0x591916,_0x3ee1e6);case 0x3:return this['easeInOut'](_0x591916,_0x3ee1e6);default:if(Imported[_0x2a93cf(0x198)]){if(_0x2a93cf(0x345)===_0x2a93cf(0x345))return VisuMZ['applyMoveEasing'](_0x591916,this[_0x2a93cf(0x31b)]);else{if(!_0x253f67['value'](_0x4bcca1))return!![];}}else return _0x591916;}},Window_Base['prototype'][_0xa223dd(0x27c)]=function(_0x1f37ba,_0x539c06,_0x43657e,_0x268f98,_0x340ad8,_0x4fe770){const _0xa3cbd5=_0xa223dd;this[_0xa3cbd5(0x1d9)]=_0x1f37ba,this[_0xa3cbd5(0x187)]=_0x539c06,this[_0xa3cbd5(0x143)]=_0x43657e||this[_0xa3cbd5(0x2e7)],this['_moveTargetHeight']=_0x268f98||this[_0xa3cbd5(0x167)],this[_0xa3cbd5(0x2ba)]=_0x340ad8||0x1;if(this[_0xa3cbd5(0x2ba)]<=0x0)this['_moveDuration']=0x1;this['_wholeMoveDuration']=this['_moveDuration'],this[_0xa3cbd5(0x31b)]=_0x4fe770||0x0;if(_0x340ad8<=0x0)this[_0xa3cbd5(0x36e)]();},Window_Base[_0xa223dd(0x2ed)]['moveBy']=function(_0x42acb5,_0x499822,_0x159ba1,_0x51b4fa,_0xc41c31,_0xfcdf8a){const _0x5a1328=_0xa223dd;this['_moveTargetX']=this['x']+_0x42acb5,this[_0x5a1328(0x187)]=this['y']+_0x499822,this['_moveTargetWidth']=this[_0x5a1328(0x2e7)]+(_0x159ba1||0x0),this[_0x5a1328(0x31a)]=this['height']+(_0x51b4fa||0x0),this['_moveDuration']=_0xc41c31||0x1;if(this[_0x5a1328(0x2ba)]<=0x0)this[_0x5a1328(0x2ba)]=0x1;this[_0x5a1328(0x123)]=this[_0x5a1328(0x2ba)],this[_0x5a1328(0x31b)]=_0xfcdf8a||0x0;if(_0xc41c31<=0x0)this[_0x5a1328(0x36e)]();},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x33b)]=function(_0xc79c7,_0x483ace){const _0xf20a7a=_0xa223dd;this[_0xf20a7a(0x27c)](this[_0xf20a7a(0x1ba)]['x'],this[_0xf20a7a(0x1ba)]['y'],this[_0xf20a7a(0x1ba)][_0xf20a7a(0x2e7)],this[_0xf20a7a(0x1ba)][_0xf20a7a(0x167)],_0xc79c7,_0x483ace);},VisuMZ['MessageCore'][_0xa223dd(0x38d)]=Window_Base['prototype'][_0xa223dd(0x2d7)],Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x2d7)]=function(_0x3ecde9){const _0x4acc30=_0xa223dd;if(this[_0x4acc30(0x3b0)]())return;_0x3ecde9=_0x3ecde9['replace'](/\,/g,''),this[_0x4acc30(0x1b4)]=this[_0x4acc30(0x1b4)]||[],this[_0x4acc30(0x1b4)][_0x4acc30(0x360)](this[_0x4acc30(0x30b)][_0x4acc30(0x100)]),VisuMZ[_0x4acc30(0x2a0)][_0x4acc30(0x38d)][_0x4acc30(0x221)](this,_0x3ecde9);},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x18d)]=function(_0x59f8ec){const _0x4e3739=_0xa223dd;this[_0x4e3739(0x235)](_0x59f8ec);if(this[_0x4e3739(0x3b0)]())return;_0x59f8ec[_0x4e3739(0x1a6)]&&(this[_0x4e3739(0x1b4)]=this[_0x4e3739(0x1b4)]||[],this[_0x4e3739(0x30b)][_0x4e3739(0x100)]=this[_0x4e3739(0x1b4)][_0x4e3739(0x344)]()||ColorManager[_0x4e3739(0x23e)]());},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x361)]=function(_0x478649){const _0x2be76b=_0xa223dd;return _0x478649=this[_0x2be76b(0x23d)](_0x478649),_0x478649=this['convertBackslashCharacters'](_0x478649),_0x478649=this['convertVariableEscapeCharacters'](_0x478649),_0x478649=this[_0x2be76b(0x1a8)](_0x478649),_0x478649=this[_0x2be76b(0x21e)](_0x478649),_0x478649=this[_0x2be76b(0x117)](_0x478649),_0x478649=this[_0x2be76b(0x244)](_0x478649),_0x478649=this[_0x2be76b(0x2d0)](_0x478649),_0x478649=this['convertBaseEscapeCharacters'](_0x478649),_0x478649=this[_0x2be76b(0x21b)](_0x478649),_0x478649=this[_0x2be76b(0x2e2)](_0x478649),_0x478649=this[_0x2be76b(0x197)](_0x478649),_0x478649=this[_0x2be76b(0x158)](_0x478649),_0x478649=this[_0x2be76b(0x1de)](_0x478649),_0x478649=this[_0x2be76b(0x1b9)](_0x478649),_0x478649=this[_0x2be76b(0x193)](_0x478649),_0x478649;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x23d)]=function(_0x35e8b8){const _0x3d067c=_0xa223dd;this[_0x3d067c(0x33f)]=![];for(const _0x53358f of VisuMZ[_0x3d067c(0x2a0)]['Settings'][_0x3d067c(0x219)]){if(_0x3d067c(0x17a)!=='ssBpA')return _0x3315e3;else _0x35e8b8[_0x3d067c(0x310)](_0x53358f[_0x3d067c(0x281)])&&(this[_0x3d067c(0x33f)]=!![],_0x35e8b8=_0x35e8b8[_0x3d067c(0x20c)](_0x53358f[_0x3d067c(0x281)],_0x53358f['textCodeResult']['bind'](this)));}return _0x35e8b8;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x245)]=function(_0x1267a8){const _0x17d8a5=_0xa223dd;return _0x1267a8=_0x1267a8[_0x17d8a5(0x20c)](/\\/g,'\x1b'),_0x1267a8=_0x1267a8[_0x17d8a5(0x20c)](/\x1b\x1b/g,'\x5c'),_0x1267a8;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x1de)]=function(_0x3b4fa5){const _0x243444=_0xa223dd;for(;;){if(_0x243444(0x26d)!=='KxKei'){const _0x1c9e26=_0xec2a8c['$1']['split'](',')['map'](_0x4a3f3e=>_0x3bf4a7(_0x4a3f3e)||0x0);for(const _0x437a3c of _0x1c9e26){if(!_0x3205d8[_0x243444(0x209)](_0x437a3c))return!![];}return![];}else{if(_0x3b4fa5[_0x243444(0x310)](/\\V\[(\d+)\]/gi))_0x3b4fa5=_0x3b4fa5[_0x243444(0x20c)](/\\V\[(\d+)\]/gi,(_0x53a946,_0xf0866f)=>this[_0x243444(0x245)](String($gameVariables[_0x243444(0x209)](parseInt(_0xf0866f)))));else{if(_0x3b4fa5[_0x243444(0x310)](/\x1bV\[(\d+)\]/gi))_0x3b4fa5=_0x3b4fa5[_0x243444(0x20c)](/\x1bV\[(\d+)\]/gi,(_0x228e7a,_0x200fb7)=>this['convertBackslashCharacters'](String($gameVariables[_0x243444(0x209)](parseInt(_0x200fb7)))));else break;}}}return _0x3b4fa5;},Window_Base['prototype']['preConvertEscapeCharacters']=function(_0x3bf5b){const _0x1f384f=_0xa223dd;return this[_0x1f384f(0x39e)](),_0x3bf5b;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x158)]=function(_0x4afd38){return _0x4afd38;},Window_Base['prototype'][_0xa223dd(0x21e)]=function(_0x152519){const _0x2a6ed3=_0xa223dd;return _0x152519=_0x152519[_0x2a6ed3(0x20c)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x152519=_0x152519[_0x2a6ed3(0x20c)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x152519=_0x152519[_0x2a6ed3(0x20c)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x152519=_0x152519['replace'](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x152519=_0x152519['replace'](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x152519;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x117)]=function(_0x3041e3){const _0x3afe22=_0xa223dd;return _0x3041e3=_0x3041e3['replace'](/<B>/gi,_0x3afe22(0x35c)),_0x3041e3=_0x3041e3[_0x3afe22(0x20c)](/<\/B>/gi,_0x3afe22(0x2fa)),_0x3041e3=_0x3041e3['replace'](/<I>/gi,_0x3afe22(0x2d1)),_0x3041e3=_0x3041e3[_0x3afe22(0x20c)](/<\/I>/gi,_0x3afe22(0x172)),_0x3041e3;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x244)]=function(_0x13af80){const _0x5b245=_0xa223dd;return _0x13af80=_0x13af80[_0x5b245(0x20c)](/<LEFT>/gi,_0x5b245(0x251)),_0x13af80=_0x13af80[_0x5b245(0x20c)](/<\/LEFT>/gi,_0x5b245(0x279)),_0x13af80=_0x13af80['replace'](/<CENTER>/gi,_0x5b245(0x11e)),_0x13af80=_0x13af80[_0x5b245(0x20c)](/<\/CENTER>/gi,_0x5b245(0x279)),_0x13af80=_0x13af80[_0x5b245(0x20c)](/<RIGHT>/gi,'\x1bTEXTALIGNMENT[3]'),_0x13af80=_0x13af80[_0x5b245(0x20c)](/<\/RIGHT>/gi,_0x5b245(0x279)),_0x13af80;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x2d0)]=function(_0x2eb011){const _0xcb8354=_0xa223dd;return _0x2eb011=_0x2eb011[_0xcb8354(0x20c)](/<COLORLOCK>/gi,_0xcb8354(0x227)),_0x2eb011=_0x2eb011['replace'](/<\/COLORLOCK>/gi,_0xcb8354(0x168)),_0x2eb011=_0x2eb011[_0xcb8354(0x20c)](/\(\(\(/gi,_0xcb8354(0x227)),_0x2eb011=_0x2eb011['replace'](/\)\)\)/gi,_0xcb8354(0x168)),_0x2eb011;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x224)]=function(_0x485d9c){const _0x1e8e74=_0xa223dd;return _0x485d9c=_0x485d9c['replace'](/\x1bN\[(\d+)\]/gi,(_0x4d31ec,_0x3ae2f6)=>this[_0x1e8e74(0x395)](parseInt(_0x3ae2f6))),_0x485d9c=_0x485d9c[_0x1e8e74(0x20c)](/\x1bP\[(\d+)\]/gi,(_0x18a2e9,_0x33dd88)=>this['partyMemberName'](parseInt(_0x33dd88))),_0x485d9c=_0x485d9c['replace'](/\x1bG/gi,TextManager[_0x1e8e74(0x38f)]),_0x485d9c;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x21b)]=function(_0xe23e5d){const _0x40ab8e=_0xa223dd;return _0xe23e5d=_0xe23e5d[_0x40ab8e(0x20c)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this['battleTargetName']()),_0xe23e5d=_0xe23e5d['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this['battleUserName']()),_0xe23e5d=_0xe23e5d[_0x40ab8e(0x20c)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this[_0x40ab8e(0x250)](!![])),_0xe23e5d=_0xe23e5d[_0x40ab8e(0x20c)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this['battleActionName'](![])),_0xe23e5d;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0xeb)]=function(){const _0x34a504=_0xa223dd;if(!SceneManager['isSceneBattle']())return'';if(BattleManager['_target'])return BattleManager[_0x34a504(0x368)]['name']();if(BattleManager['_targets'][0x0])return BattleManager[_0x34a504(0x19f)][0x0]['name']();return'';},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0xef)]=function(){const _0x228c35=_0xa223dd;if(!SceneManager[_0x228c35(0x12a)]())return'';let _0x55d180=null;return _0x55d180=BattleManager[_0x228c35(0x356)],!_0x55d180&&BattleManager[_0x228c35(0x28f)]()&&(_0x55d180=BattleManager['actor']()),_0x55d180?_0x55d180[_0x228c35(0x194)]():'';},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x250)]=function(_0x49eec9){const _0x444b43=_0xa223dd;if(!SceneManager['isSceneBattle']())return'';let _0x5cd0fd=BattleManager['_action']||null;!_0x5cd0fd&&BattleManager[_0x444b43(0x28f)]()&&(_0x5cd0fd=BattleManager['inputtingAction']());if(_0x5cd0fd&&_0x5cd0fd[_0x444b43(0x306)]()){if(_0x444b43(0x181)!==_0x444b43(0x3af)){let _0x55e952='';if(_0x49eec9)_0x55e952+=_0x444b43(0x316)[_0x444b43(0x111)](_0x5cd0fd[_0x444b43(0x306)]()[_0x444b43(0x165)]);return _0x55e952+=_0x5cd0fd['item']()[_0x444b43(0x194)],_0x55e952;}else this['x']=(_0x1422a7[_0x444b43(0x1ca)]-this['width'])/0x2,_0x17352c[_0x444b43(0x3ad)]=_0x35ea60,this[_0x444b43(0x2dc)]();}return'';},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x2e2)]=function(_0x3edc82){const _0x4b7025=_0xa223dd;for(const _0x527b89 of VisuMZ[_0x4b7025(0x2a0)]['Settings']['TextCodeActions']){_0x3edc82[_0x4b7025(0x310)](_0x527b89[_0x4b7025(0x281)])&&('mOGNX'===_0x4b7025(0x14a)?(_0xf65ce1[_0x4b7025(0x394)](),_0x565574[_0x4b7025(0x10d)](),_0x3d2eae[_0x4b7025(0x39a)]()):(_0x3edc82=_0x3edc82[_0x4b7025(0x20c)](_0x527b89[_0x4b7025(0x281)],_0x527b89['textCodeResult']),_0x3edc82=this[_0x4b7025(0x1de)](_0x3edc82)));}return _0x3edc82;},Window_Base[_0xa223dd(0x2ed)]['convertMessageCoreEscapeReplacements']=function(_0x51e78e){const _0x8a5831=_0xa223dd;for(const _0x19eb3b of VisuMZ[_0x8a5831(0x2a0)][_0x8a5831(0xed)][_0x8a5831(0x28c)]){if(_0x51e78e[_0x8a5831(0x310)](_0x19eb3b[_0x8a5831(0x281)])){if(_0x8a5831(0x366)===_0x8a5831(0x2a4)){this[_0x8a5831(0x2e7)]=_0x58b7bf['getMessageWindowWidth']()+this[_0x8a5831(0x283)]();;this['width']=_0x28ebce[_0x8a5831(0x35a)](_0x2cdd28[_0x8a5831(0x2e7)],this[_0x8a5831(0x2e7)]);const _0x5a244a=_0x402de0[_0x8a5831(0x233)]();this[_0x8a5831(0x167)]=_0x38109a[_0x8a5831(0x324)][_0x8a5831(0x2f4)](_0x5a244a,![])+this[_0x8a5831(0x26e)](),this[_0x8a5831(0x167)]=_0x354a48[_0x8a5831(0x35a)](_0x178bc6[_0x8a5831(0x167)],this[_0x8a5831(0x167)]);if(_0x4bb432[_0x8a5831(0x3ad)])this[_0x8a5831(0xfc)]();}else _0x51e78e=_0x51e78e[_0x8a5831(0x20c)](_0x19eb3b[_0x8a5831(0x281)],_0x19eb3b[_0x8a5831(0x186)][_0x8a5831(0x2f6)](this)),_0x51e78e=this['convertVariableEscapeCharacters'](_0x51e78e);}}return _0x51e78e;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x395)]=function(_0xeb5616){const _0x1d970e=_0xa223dd,_0x49453b=_0xeb5616>=0x1?$gameActors['actor'](_0xeb5616):null,_0x208589=_0x49453b?_0x49453b['name']():'',_0x380560=Number(VisuMZ[_0x1d970e(0x2a0)][_0x1d970e(0xed)][_0x1d970e(0x34b)][_0x1d970e(0x210)]);return this[_0x1d970e(0x136)]()&&_0x380560!==0x0?_0x1d970e(0x303)[_0x1d970e(0x111)](_0x380560,_0x208589):_0x208589;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x133)]=function(_0x54b43f){const _0xefc8d8=_0xa223dd,_0x523e65=_0x54b43f>=0x1?$gameParty[_0xefc8d8(0x16c)]()[_0x54b43f-0x1]:null,_0x55907e=_0x523e65?_0x523e65[_0xefc8d8(0x194)]():'',_0x5364f6=Number(VisuMZ[_0xefc8d8(0x2a0)]['Settings']['AutoColor'][_0xefc8d8(0x210)]);if(this[_0xefc8d8(0x136)]()&&_0x5364f6!==0x0)return'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0xefc8d8(0x111)](_0x5364f6,_0x55907e);else{if(_0xefc8d8(0x36a)===_0xefc8d8(0x171))this['width']=_0x484851[_0xefc8d8(0x35a)](this[_0xefc8d8(0x2e7)],_0x1b1026[_0xefc8d8(0x2e7)]),this[_0xefc8d8(0x167)]=_0x528720[_0xefc8d8(0x35a)](this['height'],_0x55f3a1[_0xefc8d8(0x167)]);else return _0x55907e;}},Window_Base['prototype'][_0xa223dd(0x1b9)]=function(_0x39c663){const _0x63482d=_0xa223dd;return this[_0x63482d(0x136)]()&&(_0x39c663=this[_0x63482d(0x217)](_0x39c663),_0x39c663=this['processActorNameAutoColorChanges'](_0x39c663)),_0x39c663;},Window_Base['prototype'][_0xa223dd(0x217)]=function(_0x22d9fb){const _0x597740=_0xa223dd;for(autoColor of VisuMZ['MessageCore'][_0x597740(0x380)]){_0x22d9fb=_0x22d9fb[_0x597740(0x20c)](autoColor[0x0],autoColor[0x1]);}return _0x22d9fb;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x1ef)]=function(){const _0x2e66d0=_0xa223dd;this[_0x2e66d0(0x207)]=[];},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x39e)]=function(){const _0x5bdc85=_0xa223dd;this[_0x5bdc85(0x1ef)]();const _0x2640d7=VisuMZ[_0x5bdc85(0x2a0)][_0x5bdc85(0xed)][_0x5bdc85(0x34b)],_0x51f079=_0x2640d7['Actors'];if(_0x51f079<=0x0)return;for(const _0x28a14a of $gameActors[_0x5bdc85(0x247)]){if(_0x5bdc85(0x355)!=='EIusf'){if(!_0x28a14a)continue;const _0x124d35=_0x28a14a[_0x5bdc85(0x194)]();if(_0x124d35[_0x5bdc85(0x362)]()[_0x5bdc85(0x2bf)]<=0x0)continue;if(/^\d+$/['test'](_0x124d35))continue;if(_0x124d35[_0x5bdc85(0x310)](/-----/i))continue;let _0xe51b55=VisuMZ[_0x5bdc85(0x2a0)]['ConvertTextAutoColorRegExpFriendly'](_0x124d35);const _0x43c568=new RegExp('\x5cb'+_0xe51b55+'\x5cb','g'),_0x20b942='\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x5bdc85(0x111)](_0x51f079,_0x124d35);this[_0x5bdc85(0x207)][_0x5bdc85(0x3a9)]([_0x43c568,_0x20b942]);}else _0x345f76=_0x5e3a60[_0x5bdc85(0x20c)](_0x432461[_0x5bdc85(0x281)],_0x5d1374[_0x5bdc85(0x186)][_0x5bdc85(0x2f6)](this)),_0x4c3032=this['convertVariableEscapeCharacters'](_0x42b554);}},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x13f)]=function(_0x3dc94c){const _0x43b76f=_0xa223dd;this[_0x43b76f(0x207)]===undefined&&this[_0x43b76f(0x39e)]();for(autoColor of this[_0x43b76f(0x207)]){_0x43b76f(0x11d)===_0x43b76f(0x265)?this[_0x43b76f(0x1b7)](_0x2b7b3b[_0x43b76f(0x376)]()):_0x3dc94c=_0x3dc94c[_0x43b76f(0x20c)](autoColor[0x0],autoColor[0x1]);}return _0x3dc94c;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x129)]=function(_0x4135f5,_0x3acd4f,_0x2c1672){const _0x585a06=_0xa223dd;if(!_0x4135f5)return'';const _0x3789a4=_0x4135f5[_0x3acd4f];let _0x1b2ef4='';if(_0x3789a4&&_0x2c1672&&_0x3789a4[_0x585a06(0x165)]){const _0x270bcc=_0x585a06(0xf1);_0x1b2ef4=_0x270bcc[_0x585a06(0x111)](_0x3789a4[_0x585a06(0x165)],_0x3789a4[_0x585a06(0x194)]);}else _0x3789a4?_0x1b2ef4=_0x3789a4[_0x585a06(0x194)]:_0x1b2ef4='';return this[_0x585a06(0x136)]()&&(_0x585a06(0x282)!==_0x585a06(0x39d)?_0x1b2ef4=this[_0x585a06(0x19e)](_0x1b2ef4,_0x4135f5):_0x33e905=_0x4038b2[_0x585a06(0x194)]),_0x1b2ef4;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x19d)]=function(_0x80f01f){const _0x5c5978=_0xa223dd,_0x2307e5=$gameParty[_0x5c5978(0x2af)]();if(_0x2307e5['id']<0x0)return'';let _0xc80ef7=null;if(_0x2307e5[_0x5c5978(0x1f1)]===0x0)_0xc80ef7=$dataItems[_0x2307e5['id']];if(_0x2307e5['type']===0x1)_0xc80ef7=$dataWeapons[_0x2307e5['id']];if(_0x2307e5[_0x5c5978(0x1f1)]===0x2)_0xc80ef7=$dataArmors[_0x2307e5['id']];if(!_0xc80ef7)return'';return _0x80f01f?_0x5c5978(0xf1)['format'](_0xc80ef7['iconIndex'],_0xc80ef7['name']):_0xc80ef7[_0x5c5978(0x194)];},Window_Base['prototype'][_0xa223dd(0x1da)]=function(){const _0x9d7714=_0xa223dd,_0x5ed883=$gameParty[_0x9d7714(0x2af)]();if(_0x5ed883['id']<=0x0)return'';return _0x5ed883['quantity'];},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x19e)]=function(_0x1ac73f,_0x59037c){const _0x4c50f7=_0xa223dd,_0x2e7ee0=VisuMZ['MessageCore'][_0x4c50f7(0xed)][_0x4c50f7(0x34b)];let _0x56ce4d=0x0;if(_0x59037c===$dataActors)_0x56ce4d=_0x2e7ee0[_0x4c50f7(0x210)];if(_0x59037c===$dataClasses)_0x56ce4d=_0x2e7ee0[_0x4c50f7(0x262)];if(_0x59037c===$dataSkills)_0x56ce4d=_0x2e7ee0['Skills'];if(_0x59037c===$dataItems)_0x56ce4d=_0x2e7ee0[_0x4c50f7(0x350)];if(_0x59037c===$dataWeapons)_0x56ce4d=_0x2e7ee0['Weapons'];if(_0x59037c===$dataArmors)_0x56ce4d=_0x2e7ee0[_0x4c50f7(0x1cf)];if(_0x59037c===$dataEnemies)_0x56ce4d=_0x2e7ee0['Enemies'];if(_0x59037c===$dataStates)_0x56ce4d=_0x2e7ee0[_0x4c50f7(0x1a4)];if(_0x56ce4d>0x0){if(_0x4c50f7(0x348)!=='BculS')_0x1ac73f=_0x4c50f7(0x303)[_0x4c50f7(0x111)](_0x56ce4d,_0x1ac73f);else{_0x5a274d['MessageCore'][_0x4c50f7(0x2cf)][_0x4c50f7(0x221)](this),this[_0x4c50f7(0x2cc)]();if(this['_messagePositionReset'])this[_0x4c50f7(0x392)]();}}return _0x1ac73f;},Window_Base[_0xa223dd(0x2ed)]['prepareWordWrapEscapeCharacters']=function(_0x1cfd0b){const _0x10d87b=_0xa223dd;_0x1cfd0b=_0x1cfd0b[_0x10d87b(0x20c)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x443d99,_0x57c8c4)=>this[_0x10d87b(0x1b7)](!![])),_0x1cfd0b=_0x1cfd0b['replace'](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x106cde,_0x3e53e2)=>this[_0x10d87b(0x1b7)](![])),_0x1cfd0b=_0x1cfd0b[_0x10d87b(0x20c)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x3709a7,_0x4644e9)=>this['setWordWrap'](![]));if(_0x1cfd0b[_0x10d87b(0x310)](Window_Message['_autoSizeRegexp']))this[_0x10d87b(0x1b7)](![]);else _0x1cfd0b[_0x10d87b(0x310)](Window_Message[_0x10d87b(0x1b8)])&&this['setWordWrap'](![]);if(!this[_0x10d87b(0x183)]())return _0x1cfd0b;if(_0x1cfd0b[_0x10d87b(0x2bf)]<=0x0)return _0x1cfd0b;return VisuMZ[_0x10d87b(0x2a0)][_0x10d87b(0xed)]['WordWrap'][_0x10d87b(0x3c0)]?(_0x1cfd0b=_0x1cfd0b['replace'](/[\n\r]+/g,'\x20'),_0x1cfd0b=_0x1cfd0b['replace'](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x1cfd0b=_0x1cfd0b[_0x10d87b(0x20c)](/[\n\r]+/g,''),_0x1cfd0b=_0x1cfd0b[_0x10d87b(0x20c)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x1cfd0b=this[_0x10d87b(0x369)](_0x1cfd0b),_0x1cfd0b=_0x1cfd0b[_0x10d87b(0x2df)]('\x20')[_0x10d87b(0x163)](_0x10d87b(0x14e)),_0x1cfd0b=_0x1cfd0b[_0x10d87b(0x20c)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x1cfd0b=_0x1cfd0b[_0x10d87b(0x20c)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x1cfd0b;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x369)]=function(_0x1b39c8){return _0x1b39c8;},VisuMZ[_0xa223dd(0x2a0)]['Window_Base_processNewLine']=Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x36f)],Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x36f)]=function(_0x5299a8){const _0x4aac4d=_0xa223dd;VisuMZ[_0x4aac4d(0x2a0)][_0x4aac4d(0xea)][_0x4aac4d(0x221)](this,_0x5299a8),this[_0x4aac4d(0x37d)](_0x5299a8);},VisuMZ['MessageCore']['Window_Base_processControlCharacter']=Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x1bf)],Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x1bf)]=function(_0x36a7aa,_0x1498f1){const _0x22a523=_0xa223dd;VisuMZ[_0x22a523(0x2a0)]['Window_Base_processControlCharacter']['call'](this,_0x36a7aa,_0x1498f1),_0x1498f1==='\x1bWrapBreak[0]'&&this[_0x22a523(0x24e)](_0x36a7aa);},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x216)]=function(_0x54fc33){const _0x119626=_0xa223dd;var _0x443125=/^\<(.*?)\>/['exec'](_0x54fc33[_0x119626(0x327)][_0x119626(0x2a8)](_0x54fc33[_0x119626(0x272)]));if(_0x443125){if(_0x119626(0x337)!==_0x119626(0x212))return _0x54fc33[_0x119626(0x272)]+=_0x443125[0x0]['length'],String(_0x443125[0x0][_0x119626(0x2a8)](0x1,_0x443125[0x0][_0x119626(0x2bf)]-0x1));else{const _0x587a46=this[_0x119626(0x213)](_0x119626(0x1f5));return _0x587a46>0xa?_0x8d0461[_0x119626(0x273)]:_0x587a46;}}else{if(_0x119626(0x38c)==='EWUTk'){if(this['_MessageCoreSettings']===_0xb17286)this['initMessageCore']();if(this[_0x119626(0x246)]['choiceRows']===_0x5414cf)this[_0x119626(0x38a)]();this[_0x119626(0x246)]['choiceRows']=_0x311fb2||0x1;}else return'';}},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x152)]=Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x347)],Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x347)]=function(_0x3c4d0b,_0x5e74be){const _0x2e1821=_0xa223dd;switch(_0x3c4d0b){case'C':if(_0x5e74be['drawing']){if('JiVAq'===_0x2e1821(0x2f3))VisuMZ[_0x2e1821(0x2a0)][_0x2e1821(0x152)]['call'](this,_0x3c4d0b,_0x5e74be);else{const _0x15bc2f=this[_0x2e1821(0x235)](_0x478419);this[_0x2e1821(0x30b)][_0x2e1821(0x25b)]=_0x15bc2f[_0x2e1821(0x17b)](_0x467db8[_0x2e1821(0x2a0)]['Settings']['General'][_0x2e1821(0x2e1)],_0x5a007c[_0x2e1821(0x2a0)][_0x2e1821(0xed)][_0x2e1821(0x176)][_0x2e1821(0x30e)]);}}else _0x2e1821(0x15e)==='BUIIx'?this[_0x2e1821(0x131)][_0x2e1821(0x1f1)]=0x0:this[_0x2e1821(0x235)](_0x5e74be);break;case'I':case'{':case'}':VisuMZ[_0x2e1821(0x2a0)][_0x2e1821(0x152)][_0x2e1821(0x221)](this,_0x3c4d0b,_0x5e74be);break;case'FS':this['processFsTextCode'](_0x5e74be);break;case'PX':this['processPxTextCode'](_0x5e74be);break;case'PY':this[_0x2e1821(0x253)](_0x5e74be);break;case _0x2e1821(0x2a7):this[_0x2e1821(0x2b9)](this[_0x2e1821(0x235)](_0x5e74be));break;case _0x2e1821(0x27d):this['processDrawCenteredPicture'](_0x5e74be);break;case _0x2e1821(0x288):this[_0x2e1821(0x2b1)](_0x5e74be);break;case'COMMONEVENT':this[_0x2e1821(0x12e)](_0x5e74be);break;case'ITALIC':this[_0x2e1821(0x243)](this[_0x2e1821(0x235)](_0x5e74be));break;case _0x2e1821(0x124):this['processDrawPicture'](_0x5e74be);break;case'PREVCOLOR':this[_0x2e1821(0x18d)](_0x5e74be);break;case _0x2e1821(0x393):this['processTextAlignmentChange'](_0x5e74be);break;case'WAIT':this['processCustomWait'](_0x5e74be);break;case'WRAPBREAK':this[_0x2e1821(0x24e)](_0x5e74be);break;default:this[_0x2e1821(0x3b1)](_0x3c4d0b,_0x5e74be);}},Window_Base['prototype'][_0xa223dd(0x3b1)]=function(_0x2d1aef,_0x5f088d){const _0x37f087=_0xa223dd;for(const _0x30d841 of VisuMZ['MessageCore'][_0x37f087(0xed)]['TextCodeActions']){if(_0x30d841[_0x37f087(0x1f0)]===_0x2d1aef){if(_0x30d841[_0x37f087(0x16d)]==='')this[_0x37f087(0x235)](_0x5f088d);_0x30d841[_0x37f087(0x1ea)][_0x37f087(0x221)](this,_0x5f088d);if(this[_0x37f087(0x2d4)]===Window_Message){if(_0x37f087(0x24c)===_0x37f087(0x24c)){const _0x58d5ff=_0x30d841[_0x37f087(0x161)]||0x0;if(_0x58d5ff>0x0)this[_0x37f087(0x2da)](_0x58d5ff);}else _0x58c73b['match'](_0x457760['textCodeCheck'])&&(this['_textMacroFound']=!![],_0x2e194e=_0x47ca71[_0x37f087(0x20c)](_0x2c8adb[_0x37f087(0x281)],_0x4864c0['textCodeResult']['bind'](this)));}}}},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x2ce)]=function(){const _0x2397d7=_0xa223dd;this[_0x2397d7(0x30b)][_0x2397d7(0x25b)]+=VisuMZ['MessageCore'][_0x2397d7(0xed)][_0x2397d7(0x176)]['FontChangeValue'],this[_0x2397d7(0x30b)][_0x2397d7(0x25b)]=Math[_0x2397d7(0x35a)](this[_0x2397d7(0x30b)][_0x2397d7(0x25b)],VisuMZ[_0x2397d7(0x2a0)]['Settings'][_0x2397d7(0x176)][_0x2397d7(0x30e)]);},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x3aa)]=function(){const _0x156e7a=_0xa223dd;this[_0x156e7a(0x30b)][_0x156e7a(0x25b)]-=VisuMZ[_0x156e7a(0x2a0)][_0x156e7a(0xed)][_0x156e7a(0x176)][_0x156e7a(0x3a0)],this['contents']['fontSize']=Math[_0x156e7a(0x155)](this['contents'][_0x156e7a(0x25b)],VisuMZ['MessageCore']['Settings']['General'][_0x156e7a(0x2e1)]);},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x15c)]=function(_0x5a069d){const _0x5f0e98=_0xa223dd,_0x567361=this[_0x5f0e98(0x235)](_0x5a069d);this[_0x5f0e98(0x30b)][_0x5f0e98(0x25b)]=_0x567361[_0x5f0e98(0x17b)](VisuMZ[_0x5f0e98(0x2a0)]['Settings'][_0x5f0e98(0x176)][_0x5f0e98(0x2e1)],VisuMZ[_0x5f0e98(0x2a0)][_0x5f0e98(0xed)][_0x5f0e98(0x176)]['FontBiggerCap']);},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x142)]=function(_0xe660df){const _0x1baf0a=_0xa223dd;let _0x183182=this[_0x1baf0a(0x30b)][_0x1baf0a(0x25b)];const _0x31414a=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){if(_0x1baf0a(0x3a7)===_0x1baf0a(0x1dc))return _0x375c97=_0x3d1214[_0x1baf0a(0x20c)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x2a1f5a;else{const _0x20bc28=_0x31414a['exec'](_0xe660df);if(!_0x20bc28)break;const _0x3064d9=String(_0x20bc28[0x1])[_0x1baf0a(0x37c)]();if(_0x3064d9==='{')this[_0x1baf0a(0x2ce)]();else{if(_0x3064d9==='}')this[_0x1baf0a(0x3aa)]();else _0x3064d9==='FS'&&(this['contents'][_0x1baf0a(0x25b)]=parseInt(_0x20bc28[0x3])[_0x1baf0a(0x17b)](VisuMZ['MessageCore'][_0x1baf0a(0xed)][_0x1baf0a(0x176)][_0x1baf0a(0x2e1)],VisuMZ[_0x1baf0a(0x2a0)]['Settings'][_0x1baf0a(0x176)][_0x1baf0a(0x30e)]));}this['contents']['fontSize']>_0x183182&&(_0x1baf0a(0x1e3)!=='NYOyO'?this[_0x1baf0a(0x371)][_0x116b14]!==_0x3b35fc&&(this[_0x4dca1c]=_0x40bccf(this[_0x1baf0a(0x371)][_0x14f7ef])):_0x183182=this[_0x1baf0a(0x30b)][_0x1baf0a(0x25b)]);}}return _0x183182;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x2c4)]=function(_0x27bbeb){const _0x45fed7=_0xa223dd;_0x27bbeb['x']=this[_0x45fed7(0x235)](_0x27bbeb);if(VisuMZ[_0x45fed7(0x2a0)]['Settings']['General']['RelativePXPY']){if(_0x45fed7(0x359)!==_0x45fed7(0x354))_0x27bbeb['x']+=_0x27bbeb['startX'];else{const _0x1b3e21=_0x7ccddc['$1']['split'](',')[_0x45fed7(0x1a0)](_0x432025=>_0x383473(_0x432025)||0x0);for(const _0x2d070b of _0x1b3e21){if(!_0x2e5cd9[_0x45fed7(0x209)](_0x2d070b))return![];}return!![];}}},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x253)]=function(_0xe4da1a){const _0x39ebac=_0xa223dd;_0xe4da1a['y']=this[_0x39ebac(0x235)](_0xe4da1a),VisuMZ[_0x39ebac(0x2a0)][_0x39ebac(0xed)][_0x39ebac(0x176)]['RelativePXPY']&&(_0xe4da1a['y']+=_0xe4da1a['startY']);},Window_Base['prototype'][_0xa223dd(0x2b9)]=function(_0x5393e2){const _0x292967=_0xa223dd;this['contents'][_0x292967(0x2c1)]=!!_0x5393e2;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x243)]=function(_0x54887e){const _0xc3db94=_0xa223dd;this[_0xc3db94(0x30b)]['fontItalic']=!!_0x54887e;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x211)]=function(_0x3a5ef7){const _0x4ace07=_0xa223dd,_0x5a1789=this[_0x4ace07(0x235)](_0x3a5ef7);if(!_0x3a5ef7[_0x4ace07(0x1a6)])return;switch(_0x5a1789){case 0x0:this[_0x4ace07(0x339)](_0x4ace07(0x268));return;case 0x1:this[_0x4ace07(0x339)]('left');break;case 0x2:this[_0x4ace07(0x339)](_0x4ace07(0x33c));break;case 0x3:this['setTextAlignment']('right');break;}this['processTextAlignmentX'](_0x3a5ef7);},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x37d)]=function(_0x207aa2){const _0x2a4c9e=_0xa223dd;if(!_0x207aa2['drawing'])return;if(_0x207aa2[_0x2a4c9e(0x353)])return;if(this[_0x2a4c9e(0x2b5)]()===_0x2a4c9e(0x268))return;let _0x147565=_0x207aa2[_0x2a4c9e(0x327)][_0x2a4c9e(0x11f)](_0x2a4c9e(0x1be),_0x207aa2[_0x2a4c9e(0x272)]+0x1),_0x105d15=_0x207aa2['text'][_0x2a4c9e(0x11f)]('\x0a',_0x207aa2[_0x2a4c9e(0x272)]+0x1);if(_0x147565<0x0)_0x147565=_0x207aa2[_0x2a4c9e(0x327)]['length']+0x1;if(_0x105d15>0x0)_0x147565=Math['min'](_0x147565,_0x105d15);const _0x414e09=_0x207aa2[_0x2a4c9e(0x327)][_0x2a4c9e(0x3a2)](_0x207aa2[_0x2a4c9e(0x272)],_0x147565),_0x4ef03e=this[_0x2a4c9e(0x391)](_0x414e09)[_0x2a4c9e(0x2e7)],_0x4749d1=_0x207aa2[_0x2a4c9e(0x2e7)]||this['innerWidth']-0x8,_0x524583=this[_0x2a4c9e(0x2d4)]===Window_Message&&$gameMessage[_0x2a4c9e(0x104)]()!=='';switch(this['getTextAlignment']()){case'left':_0x207aa2['x']=_0x207aa2[_0x2a4c9e(0x24a)];break;case _0x2a4c9e(0x33c):_0x207aa2['x']=_0x207aa2['startX'],_0x207aa2['x']+=Math[_0x2a4c9e(0x276)]((_0x4749d1-_0x4ef03e)/0x2);_0x524583&&(_0x207aa2['x']-=_0x207aa2[_0x2a4c9e(0x24a)]/0x2);break;case'right':_0x207aa2['x']=_0x4749d1-_0x4ef03e+_0x207aa2[_0x2a4c9e(0x24a)];if(_0x524583){if(_0x2a4c9e(0x3ae)!=='CDEXX')return![];else _0x207aa2['x']-=_0x207aa2[_0x2a4c9e(0x24a)];}break;}},Window_Base['prototype'][_0xa223dd(0x391)]=function(_0x5656f5){const _0x48e175=_0xa223dd;_0x5656f5=_0x5656f5[_0x48e175(0x20c)](/\x1b!/g,''),_0x5656f5=_0x5656f5[_0x48e175(0x20c)](/\x1b\|/g,''),_0x5656f5=_0x5656f5['replace'](/\x1b\./g,'');const _0x49ed01=this[_0x48e175(0x388)](_0x5656f5,0x0,0x0,0x0),_0x1582c1=this[_0x48e175(0x34f)]();return _0x49ed01[_0x48e175(0x1a6)]=![],this[_0x48e175(0x147)](_0x49ed01),this[_0x48e175(0x1aa)](_0x1582c1),{'width':_0x49ed01['outputWidth'],'height':_0x49ed01['outputHeight']};},Window_Base[_0xa223dd(0x1cd)]=VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0xed)][_0xa223dd(0x39c)]['EndPadding']||0x0,Window_Base['prototype']['processWrapBreak']=function(_0x2399f4){const _0x43c2d3=_0xa223dd,_0x781471=(_0x2399f4['rtl']?-0x1:0x1)*this[_0x43c2d3(0x34c)]('\x20');_0x2399f4['x']+=_0x781471;if(this['obtainEscapeParam'](_0x2399f4)>0x0)_0x2399f4['x']+=_0x781471;if(_0x2399f4[_0x43c2d3(0x353)])return;let _0x305faa=_0x2399f4[_0x43c2d3(0x327)][_0x43c2d3(0x11f)](_0x43c2d3(0x14e),_0x2399f4[_0x43c2d3(0x272)]+0x1),_0x45c248=_0x2399f4[_0x43c2d3(0x327)]['indexOf']('\x0a',_0x2399f4['index']+0x1);if(_0x305faa<0x0)_0x305faa=_0x2399f4['text'][_0x43c2d3(0x2bf)]+0x1;if(_0x45c248>0x0)_0x305faa=Math[_0x43c2d3(0x35a)](_0x305faa,_0x45c248);const _0xd61a6b=_0x2399f4[_0x43c2d3(0x327)][_0x43c2d3(0x3a2)](_0x2399f4['index'],_0x305faa),_0x4dd0a2=this[_0x43c2d3(0x3bc)](_0xd61a6b)['width'];let _0x39fb99=_0x2399f4[_0x43c2d3(0x2e7)]||this[_0x43c2d3(0x21c)];_0x39fb99-=Window_Base[_0x43c2d3(0x1cd)];if(this[_0x43c2d3(0x2d4)]===Window_Message){if(_0x43c2d3(0x12f)!==_0x43c2d3(0x119)){const _0x50eba0=$gameMessage[_0x43c2d3(0x104)]()===''?0x0:ImageManager['faceWidth']+0x14;_0x39fb99-=_0x50eba0,VisuMZ[_0x43c2d3(0x2a0)]['Settings']['WordWrap']['TightWrap']&&(_0x43c2d3(0x374)===_0x43c2d3(0x374)?_0x39fb99-=_0x50eba0:this[_0x43c2d3(0x309)]=_0x1f30d6);}else this[_0x43c2d3(0x3bf)]=_0xdcf59d[_0x43c2d3(0x263)]()[_0x43c2d3(0x17e)](_0x1c6d4b-0x2);}let _0x5dbaad=![];if(_0x2399f4['x']+_0x4dd0a2>_0x2399f4[_0x43c2d3(0x24a)]+_0x39fb99)_0x5dbaad=!![];if(_0x4dd0a2===0x0)_0x5dbaad=!![];_0x5dbaad&&(_0x2399f4[_0x43c2d3(0x327)]=_0x2399f4[_0x43c2d3(0x327)][_0x43c2d3(0x2a8)](0x0,_0x2399f4[_0x43c2d3(0x272)])+'\x0a'+_0x2399f4[_0x43c2d3(0x327)][_0x43c2d3(0x379)](_0x2399f4['index']));},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x3bc)]=function(_0x23f34d){const _0x1e4949=_0xa223dd,_0x443511=this[_0x1e4949(0x388)](_0x23f34d,0x0,0x0,0x0),_0xbb17aa=this[_0x1e4949(0x34f)]();return _0x443511[_0x1e4949(0x1a6)]=![],this[_0x1e4949(0x1b7)](![]),this[_0x1e4949(0x147)](_0x443511),this[_0x1e4949(0x1b7)](!![]),this[_0x1e4949(0x1aa)](_0xbb17aa),{'width':_0x443511[_0x1e4949(0x2c6)],'height':_0x443511[_0x1e4949(0x37b)]};},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x12e)]=function(_0x16c6ce){const _0x538a40=_0xa223dd;return this[_0x538a40(0x235)](_0x16c6ce);},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x258)]=function(_0xbafe34){const _0x403068=_0xa223dd,_0x65e6c4=this[_0x403068(0x216)](_0xbafe34)[_0x403068(0x2df)](',');if(!_0xbafe34[_0x403068(0x1a6)])return;const _0x38fea4=_0x65e6c4[0x0]['trim'](),_0x321730=_0x65e6c4[0x1]||0x0,_0x4ee5e3=_0x65e6c4[0x2]||0x0,_0xe92757=ImageManager[_0x403068(0x1ce)](_0x38fea4),_0x2750b5=this['contents'][_0x403068(0x238)];_0xe92757[_0x403068(0x1b2)](this[_0x403068(0xfd)][_0x403068(0x2f6)](this,_0xe92757,_0xbafe34['x'],_0xbafe34['y'],_0x321730,_0x4ee5e3,_0x2750b5));},Window_Base[_0xa223dd(0x2ed)]['drawBackPicture']=function(_0x242850,_0x14ddbc,_0x468340,_0x26b2a5,_0x247d04,_0x17fa68){const _0xef15fc=_0xa223dd;_0x26b2a5=_0x26b2a5||_0x242850[_0xef15fc(0x2e7)],_0x247d04=_0x247d04||_0x242850[_0xef15fc(0x167)],this[_0xef15fc(0x240)][_0xef15fc(0x238)]=_0x17fa68,this[_0xef15fc(0x240)][_0xef15fc(0x25f)](_0x242850,0x0,0x0,_0x242850['width'],_0x242850['height'],_0x14ddbc,_0x468340,_0x26b2a5,_0x247d04),this[_0xef15fc(0x240)][_0xef15fc(0x238)]=0xff;},Window_Base['prototype'][_0xa223dd(0x173)]=function(_0x5839e4){const _0x1d6c0a=_0xa223dd,_0x13d169=this[_0x1d6c0a(0x216)](_0x5839e4)[_0x1d6c0a(0x2df)](',');if(!_0x5839e4[_0x1d6c0a(0x1a6)])return;const _0x58aeb5=_0x13d169[0x0][_0x1d6c0a(0x362)](),_0x4e86b0=ImageManager[_0x1d6c0a(0x1ce)](_0x58aeb5),_0x74f550=JsonEx[_0x1d6c0a(0x32e)](_0x5839e4),_0x11f633=this['contents'][_0x1d6c0a(0x238)];_0x4e86b0[_0x1d6c0a(0x1b2)](this['drawBackCenteredPicture'][_0x1d6c0a(0x2f6)](this,_0x4e86b0,_0x74f550,_0x11f633));},Window_Base[_0xa223dd(0x2ed)]['drawBackCenteredPicture']=function(_0x34447e,_0x1b56b1,_0x343100){const _0x134113=_0xa223dd,_0x3449e1=_0x1b56b1[_0x134113(0x2e7)]||this['innerWidth'],_0x3b3bc7=this[_0x134113(0x2ec)]!==undefined?this['itemHeight']():this[_0x134113(0x373)],_0x56fdca=_0x3449e1/_0x34447e['width'],_0x3ba39b=_0x3b3bc7/_0x34447e[_0x134113(0x167)],_0x5f1f64=Math[_0x134113(0x35a)](_0x56fdca,_0x3ba39b,0x1),_0x3cea84=this[_0x134113(0x2ec)]!==undefined?(this[_0x134113(0x2e0)](0x0)[_0x134113(0x167)]-this[_0x134113(0x3b2)]())/0x2:0x0,_0x20a5e1=_0x34447e[_0x134113(0x2e7)]*_0x5f1f64,_0xa4ecc6=_0x34447e[_0x134113(0x167)]*_0x5f1f64,_0x2f6bb6=Math[_0x134113(0x276)]((_0x3449e1-_0x20a5e1)/0x2)+_0x1b56b1[_0x134113(0x24a)],_0x571366=Math[_0x134113(0x276)]((_0x3b3bc7-_0xa4ecc6)/0x2)+_0x1b56b1[_0x134113(0x29d)]-_0x3cea84*0x2;this[_0x134113(0x240)]['paintOpacity']=_0x343100,this[_0x134113(0x240)][_0x134113(0x25f)](_0x34447e,0x0,0x0,_0x34447e[_0x134113(0x2e7)],_0x34447e[_0x134113(0x167)],_0x2f6bb6,_0x571366,_0x20a5e1,_0xa4ecc6),this[_0x134113(0x240)]['paintOpacity']=0xff;},Window_Base[_0xa223dd(0x2ed)][_0xa223dd(0x2b1)]=function(_0x504ef6){const _0x3a2f62=_0xa223dd,_0x2cc7fa=this[_0x3a2f62(0x235)](_0x504ef6);if(_0x504ef6[_0x3a2f62(0x1a6)])this[_0x3a2f62(0x2f5)](_0x2cc7fa>0x0);},Window_Base[_0xa223dd(0x2ed)]['processCustomWait']=function(_0x4ca4b8){const _0x24f651=_0xa223dd,_0x29b361=this['obtainEscapeParam'](_0x4ca4b8);this[_0x24f651(0x2d4)]===Window_Message&&_0x4ca4b8[_0x24f651(0x1a6)]&&('ndRAP'==='LnSZJ'?_0x1d02e9[_0x3046ef]=this[_0x24f651(0x30b)][_0x14fae1]:this[_0x24f651(0x110)](_0x29b361));},Window_Help['prototype'][_0xa223dd(0x394)]=function(){const _0x3874ee=_0xa223dd;this[_0x3874ee(0x1b7)]($gameSystem[_0x3874ee(0x376)]());},Window_Help[_0xa223dd(0x2ed)][_0xa223dd(0x136)]=function(){return!![];},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x192)]=Window_Help[_0xa223dd(0x2ed)][_0xa223dd(0x106)],Window_Help[_0xa223dd(0x2ed)][_0xa223dd(0x106)]=function(){const _0x36b7cf=_0xa223dd;this[_0x36b7cf(0x1ef)](),VisuMZ['MessageCore'][_0x36b7cf(0x192)][_0x36b7cf(0x221)](this),this[_0x36b7cf(0x394)]();},VisuMZ['MessageCore']['Window_Options_addGeneralOptions']=Window_Options[_0xa223dd(0x2ed)][_0xa223dd(0x1c5)],Window_Options[_0xa223dd(0x2ed)][_0xa223dd(0x1c5)]=function(){const _0x52c882=_0xa223dd;VisuMZ['MessageCore'][_0x52c882(0x15d)]['call'](this),this[_0x52c882(0x2ac)]();},Window_Options[_0xa223dd(0x2ed)]['addMessageCoreCommands']=function(){const _0x41711a=_0xa223dd;VisuMZ[_0x41711a(0x2a0)][_0x41711a(0xed)]['TextSpeed']['AddOption']&&this[_0x41711a(0x132)]();},Window_Options[_0xa223dd(0x2ed)]['addMessageCoreTextSpeedCommand']=function(){const _0x1ee277=_0xa223dd,_0x7a89e=TextManager[_0x1ee277(0x313)],_0x6ac6b=_0x1ee277(0x1f5);this['addCommand'](_0x7a89e,_0x6ac6b);},VisuMZ['MessageCore'][_0xa223dd(0x127)]=Window_Options[_0xa223dd(0x2ed)][_0xa223dd(0x1c7)],Window_Options[_0xa223dd(0x2ed)][_0xa223dd(0x1c7)]=function(_0x31f85c){const _0x47286c=_0xa223dd,_0x26d401=this[_0x47286c(0x27f)](_0x31f85c);if(_0x26d401===_0x47286c(0x1f5))return this[_0x47286c(0x23f)]();return VisuMZ[_0x47286c(0x2a0)][_0x47286c(0x127)][_0x47286c(0x221)](this,_0x31f85c);},VisuMZ['MessageCore'][_0xa223dd(0x10f)]=Window_Options[_0xa223dd(0x2ed)][_0xa223dd(0x1ec)],Window_Options[_0xa223dd(0x2ed)][_0xa223dd(0x1ec)]=function(_0xdbebc7){const _0x559a5b=_0xa223dd;if(_0xdbebc7==='textSpeed')return!![];return VisuMZ[_0x559a5b(0x2a0)][_0x559a5b(0x10f)][_0x559a5b(0x221)](this,_0xdbebc7);},Window_Options[_0xa223dd(0x2ed)][_0xa223dd(0x23f)]=function(){const _0x23453e=_0xa223dd,_0x317151=this[_0x23453e(0x213)]('textSpeed');return _0x317151>0xa?TextManager[_0x23453e(0x273)]:_0x317151;},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x2b3)]=Window_Options[_0xa223dd(0x2ed)]['changeVolume'],Window_Options[_0xa223dd(0x2ed)][_0xa223dd(0x275)]=function(_0x5da31b,_0x1a9ab5,_0x3d0141){const _0x536ef0=_0xa223dd;if(_0x5da31b===_0x536ef0(0x1f5))return this[_0x536ef0(0x2a6)](_0x5da31b,_0x1a9ab5,_0x3d0141);VisuMZ['MessageCore'][_0x536ef0(0x2b3)][_0x536ef0(0x221)](this,_0x5da31b,_0x1a9ab5,_0x3d0141);},Window_Options['prototype'][_0xa223dd(0x2a6)]=function(_0x2b3be9,_0x32d973,_0x2f8dcd){const _0x6268d4=_0xa223dd,_0x492de4=this[_0x6268d4(0x213)](_0x2b3be9),_0x550aee=0x1,_0x1ab059=_0x492de4+(_0x32d973?_0x550aee:-_0x550aee);_0x1ab059>0xb&&_0x2f8dcd?this[_0x6268d4(0x175)](_0x2b3be9,0x1):_0x6268d4(0xec)===_0x6268d4(0xec)?this[_0x6268d4(0x175)](_0x2b3be9,_0x1ab059[_0x6268d4(0x17b)](0x1,0xb)):(this[_0x6268d4(0x365)](_0x31430b),_0x5d2892['prototype'][_0x6268d4(0x121)][_0x6268d4(0x221)](this,_0x4a8d40),this[_0x6268d4(0x2ee)](_0x654eb8));},Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x3be)]=function(){const _0x1df947=_0xa223dd;let _0x202c46=Window_Base[_0x1df947(0x2ed)][_0x1df947(0x3be)][_0x1df947(0x221)](this);return _0x202c46-=this[_0x1df947(0x26e)](),_0x202c46;},Window_Message['prototype'][_0xa223dd(0x346)]=function(){const _0x145c12=_0xa223dd;Window_Base[_0x145c12(0x2ed)][_0x145c12(0x346)][_0x145c12(0x221)](this),VisuMZ['MessageCore'][_0x145c12(0xed)]['General']['StretchDimmedBg']&&this[_0x145c12(0x32c)]();},Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x32c)]=function(){const _0x362f8d=_0xa223dd;this[_0x362f8d(0xe9)]['x']=Math['round'](this[_0x362f8d(0x2e7)]/0x2),this[_0x362f8d(0xe9)][_0x362f8d(0x3a5)]['x']=0.5,this[_0x362f8d(0xe9)]['scale']['x']=Graphics[_0x362f8d(0x2e7)];},VisuMZ[_0xa223dd(0x2a0)]['Window_Message_clearFlags']=Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x2cc)],Window_Message['prototype']['clearFlags']=function(){const _0x24c391=_0xa223dd;VisuMZ['MessageCore']['Window_Message_clearFlags'][_0x24c391(0x221)](this),this[_0x24c391(0x1ef)](),this[_0x24c391(0x394)](),this[_0x24c391(0x2f5)](![]),this[_0x24c391(0x339)](_0x24c391(0x268)),this[_0x24c391(0x1b1)](VisuMZ['MessageCore'][_0x24c391(0xed)][_0x24c391(0x176)][_0x24c391(0x239)]);},Window_Message['prototype']['resetWordWrap']=function(){const _0x135656=_0xa223dd;this[_0x135656(0x1b7)]($gameSystem[_0x135656(0xf4)]());},Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x136)]=function(){return!![];},Window_Message['prototype'][_0xa223dd(0x1b1)]=function(_0x46057b){const _0x54bb33=_0xa223dd,_0x58cb34=0xb-ConfigManager['textSpeed'];_0x46057b=Math[_0x54bb33(0x30c)](_0x46057b*_0x58cb34),this[_0x54bb33(0x248)]=_0x46057b,this[_0x54bb33(0x2fb)]=_0x46057b;},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x188)]=Window_Message[_0xa223dd(0x2ed)]['isTriggered'],Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x364)]=function(){const _0x185ca6=_0xa223dd;return VisuMZ[_0x185ca6(0x2a0)][_0x185ca6(0x188)][_0x185ca6(0x221)](this)||Input[_0x185ca6(0x18a)](VisuMZ['MessageCore'][_0x185ca6(0xed)]['General'][_0x185ca6(0x2cb)]);},VisuMZ['MessageCore']['Window_Message_updatePlacement']=Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x28a)],Window_Message['prototype']['updatePlacement']=function(){const _0x510fef=_0xa223dd;let _0x3048d8=this['y'];this['x']=Math[_0x510fef(0x30c)]((Graphics[_0x510fef(0x1ca)]-this['width'])/0x2),VisuMZ[_0x510fef(0x2a0)][_0x510fef(0x36d)]['call'](this);if(this[_0x510fef(0x3bf)])this['y']=_0x3048d8;this[_0x510fef(0x372)](),this['updateForcedPlacement'](),this[_0x510fef(0x2dc)]();},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x386)]=Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x20d)],Window_Message['prototype'][_0xa223dd(0x20d)]=function(_0x1ba37e){const _0x1ebe4a=_0xa223dd;this['convertNewPageTextStateMacros'](_0x1ba37e),this['onNewPageMessageCore'](_0x1ba37e),VisuMZ[_0x1ebe4a(0x2a0)][_0x1ebe4a(0x386)]['call'](this,_0x1ba37e),this[_0x1ebe4a(0x39a)]();},Window_Message[_0xa223dd(0x2ed)]['convertNewPageTextStateMacros']=function(_0x58ff49){const _0x436d87=_0xa223dd;if(!_0x58ff49)return;this['_macroBypassWordWrap']=![],_0x58ff49['text']=this[_0x436d87(0x23d)](_0x58ff49[_0x436d87(0x327)]),this[_0x436d87(0x33f)]&&(_0x58ff49[_0x436d87(0x327)]=this[_0x436d87(0x193)](_0x58ff49['text']),this[_0x436d87(0x315)]=!![]);},Window_Message[_0xa223dd(0x2ed)]['prepareWordWrapEscapeCharacters']=function(_0x561d06){const _0x23e918=_0xa223dd;if(this['_macroBypassWordWrap'])return _0x561d06;return Window_Base['prototype']['prepareWordWrapEscapeCharacters'][_0x23e918(0x221)](this,_0x561d06);},Window_Message['prototype'][_0xa223dd(0x23a)]=function(_0x226aad){const _0x340a9f=_0xa223dd;this['prepareForcedPositionEscapeCharacters'](_0x226aad),this[_0x340a9f(0x2ca)](_0x226aad),this[_0x340a9f(0x10d)]();},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x2cf)]=Window_Message['prototype'][_0xa223dd(0x2bb)],Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x2bb)]=function(){const _0x374532=_0xa223dd;VisuMZ[_0x374532(0x2a0)][_0x374532(0x2cf)][_0x374532(0x221)](this),this[_0x374532(0x2cc)]();if(this['_messagePositionReset'])this['messagePositionReset']();},Window_Message['prototype'][_0xa223dd(0x10d)]=function(){const _0x8279ef=_0xa223dd;this[_0x8279ef(0x2e7)]=$gameSystem['getMessageWindowWidth']()+this[_0x8279ef(0x283)]();;this[_0x8279ef(0x2e7)]=Math[_0x8279ef(0x35a)](Graphics['width'],this[_0x8279ef(0x2e7)]);const _0x12f15f=$gameSystem[_0x8279ef(0x233)]();this[_0x8279ef(0x167)]=SceneManager['_scene']['calcWindowHeight'](_0x12f15f,![])+this['addedHeight'](),this['height']=Math[_0x8279ef(0x35a)](Graphics[_0x8279ef(0x167)],this[_0x8279ef(0x167)]);if($gameTemp[_0x8279ef(0x3ad)])this[_0x8279ef(0xfc)]();},Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x283)]=function(){return 0x0;},Window_Message[_0xa223dd(0x2ed)]['addedHeight']=function(){return 0x0;},Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0xfc)]=function(){const _0x2b88be=_0xa223dd;this['x']=(Graphics[_0x2b88be(0x1ca)]-this['width'])/0x2,$gameTemp[_0x2b88be(0x3ad)]=undefined,this[_0x2b88be(0x2dc)]();},Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x36e)]=function(){const _0x757c05=_0xa223dd,_0x247838={'x':this['x'],'y':this['y']};Window_Base[_0x757c05(0x2ed)][_0x757c05(0x36e)]['call'](this),this[_0x757c05(0x22f)](_0x247838);},Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x184)]=function(){return!![];},Window_Message[_0xa223dd(0x2ed)]['updateNameBoxMove']=function(_0x21bbd3){const _0xa54f44=_0xa223dd;this['_nameBoxWindow']&&(this[_0xa54f44(0x25a)]['x']+=this['x']-_0x21bbd3['x'],this[_0xa54f44(0x25a)]['y']+=this['y']-_0x21bbd3['y']);},Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x33b)]=function(_0x51057a,_0x47d200){const _0x535ca3=_0xa223dd;this[_0x535ca3(0x27c)](this[_0x535ca3(0x1ba)]['x'],this[_0x535ca3(0x34d)]*(Graphics[_0x535ca3(0x3a3)]-this[_0x535ca3(0x167)])/0x2,this[_0x535ca3(0x1ba)][_0x535ca3(0x2e7)],this[_0x535ca3(0x1ba)][_0x535ca3(0x167)],_0x51057a,_0x47d200);},Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x12e)]=function(_0x4f3178){const _0x391602=_0xa223dd,_0x20856d=Window_Base[_0x391602(0x2ed)]['processCommonEvent']['call'](this,_0x4f3178);_0x4f3178[_0x391602(0x1a6)]&&this[_0x391602(0x2da)](_0x20856d);},Window_Message[_0xa223dd(0x2ed)]['launchMessageCommonEvent']=function(_0x371ddb){const _0x5e4b0b=_0xa223dd;if($gameParty['inBattle']()){}else _0x5e4b0b(0x214)===_0x5e4b0b(0x214)?$gameMap[_0x5e4b0b(0x146)](_0x371ddb):_0xc878e7=_0x12b622[_0x5e4b0b(0x20c)](/\\V\[(\d+)\]/gi,(_0x5714de,_0x4e8126)=>this[_0x5e4b0b(0x245)](_0x3517ab(_0x2a0f9c[_0x5e4b0b(0x209)](_0xd542b7(_0x4e8126)))));},Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x2bd)]=function(_0x238170){const _0x1957d9=_0xa223dd;this[_0x1957d9(0x248)]--,this['_textDelayCount']<=0x0&&(this[_0x1957d9(0x1f3)](_0x238170),Window_Base[_0x1957d9(0x2ed)][_0x1957d9(0x2bd)]['call'](this,_0x238170));},Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x1f3)]=function(_0x1540c9){const _0x5d996c=_0xa223dd;this[_0x5d996c(0x248)]=this[_0x5d996c(0x2fb)];if(this[_0x5d996c(0x2fb)]<=0x0)this[_0x5d996c(0x15b)]=!![];},VisuMZ[_0xa223dd(0x2a0)]['Window_Message_processEscapeCharacter']=Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x347)],Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x347)]=function(_0xec508a,_0x49f579){const _0x4ff8db=_0xa223dd;!_0x49f579['drawing']?Window_Base[_0x4ff8db(0x2ed)][_0x4ff8db(0x347)][_0x4ff8db(0x221)](this,_0xec508a,_0x49f579):VisuMZ[_0x4ff8db(0x2a0)]['Window_Message_processEscapeCharacter'][_0x4ff8db(0x221)](this,_0xec508a,_0x49f579);},Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x1bd)]=function(_0x5dac4d){const _0x47e3fd=_0xa223dd;let _0x297584=_0x5dac4d[_0x47e3fd(0x327)];this[_0x47e3fd(0x371)]={};if(this[_0x47e3fd(0x183)]())return _0x297584;_0x297584=_0x297584[_0x47e3fd(0x20c)](/<POSITION:[ ]*(.*)>/gi,(_0x4591c0,_0x4de6df)=>{const _0x2a85f3=_0x47e3fd;if(_0x2a85f3(0x107)===_0x2a85f3(0x107)){const _0x334803=_0x4de6df[_0x2a85f3(0x2df)](',')['map'](_0x5c81cc=>Number(_0x5c81cc)||0x0);if(_0x334803[0x0]!==undefined)this[_0x2a85f3(0x371)]['x']=Number(_0x334803[0x0]);if(_0x334803[0x1]!==undefined)this[_0x2a85f3(0x371)]['y']=Number(_0x334803[0x1]);if(_0x334803[0x2]!==undefined)this['_forcedPosition']['width']=Number(_0x334803[0x2]);if(_0x334803[0x3]!==undefined)this[_0x2a85f3(0x371)][_0x2a85f3(0x167)]=Number(_0x334803[0x3]);return'';}else{let _0x3d8d35=_0x48bbfb;return _0x3d8d35=_0x3d8d35[_0x2a85f3(0x20c)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x3d8d35=_0x3d8d35[_0x2a85f3(0x20c)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x3d8d35;}}),_0x297584=_0x297584[_0x47e3fd(0x20c)](/<COORDINATES:[ ]*(.*)>/gi,(_0x348729,_0x35f643)=>{const _0x1e0237=_0x47e3fd,_0x4597eb=_0x35f643[_0x1e0237(0x2df)](',')['map'](_0x3d217e=>Number(_0x3d217e)||0x0);if(_0x4597eb[0x0]!==undefined)this[_0x1e0237(0x371)]['x']=Number(_0x4597eb[0x0]);if(_0x4597eb[0x1]!==undefined)this['_forcedPosition']['y']=Number(_0x4597eb[0x1]);return'';}),_0x297584=_0x297584[_0x47e3fd(0x20c)](/<DIMENSIONS:[ ]*(.*)>/gi,(_0x9bd9ad,_0x5dc292)=>{const _0x292ad9=_0x47e3fd;if(_0x292ad9(0x1cb)===_0x292ad9(0x1cb)){const _0x129f7d=_0x5dc292[_0x292ad9(0x2df)](',')[_0x292ad9(0x1a0)](_0x46295c=>Number(_0x46295c)||0x0);if(_0x129f7d[0x0]!==undefined)this[_0x292ad9(0x371)][_0x292ad9(0x2e7)]=Number(_0x129f7d[0x2]);if(_0x129f7d[0x1]!==undefined)this['_forcedPosition'][_0x292ad9(0x167)]=Number(_0x129f7d[0x3]);return'';}else this[_0x292ad9(0x25a)]['x']+=this['x']-_0x1614cf['x'],this[_0x292ad9(0x25a)]['y']+=this['y']-_0x173822['y'];}),_0x297584=_0x297584['replace'](/<OFFSET:[ ]*(.*)>/gi,(_0x25168a,_0x557a9f)=>{const _0x35e621=_0x47e3fd,_0x3d1f11=_0x557a9f[_0x35e621(0x2df)](',')[_0x35e621(0x1a0)](_0x2a66e4=>Number(_0x2a66e4)||0x0);let _0x4a152f=_0x3d1f11[0x0]||0x0,_0x418370=_0x3d1f11[0x1]||0x0;return $gameSystem[_0x35e621(0x300)](_0x4a152f,_0x418370),'';}),_0x5dac4d[_0x47e3fd(0x327)]=_0x297584;},Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x372)]=function(){const _0x3d3341=_0xa223dd,_0x463455=$gameSystem[_0x3d3341(0xf9)]();this['x']+=_0x463455['x'],this['y']+=_0x463455['y'];},Window_Message[_0xa223dd(0x2ed)]['updateForcedPlacement']=function(){const _0xc0c867=_0xa223dd;this[_0xc0c867(0x371)]=this[_0xc0c867(0x371)]||{};const _0x4a501e=['x','y','width','height'];for(const _0x513d7b of _0x4a501e){if(this[_0xc0c867(0x371)][_0x513d7b]!==undefined){if(_0xc0c867(0xf3)!=='RDukH'){if(this[_0xc0c867(0x1e2)]()&&this[_0xc0c867(0x1e2)]()[_0xc0c867(0x179)][0x0]['match'](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return _0xe07f9e[_0xc0c867(0x2c7)][_0xc0c867(0x2bf)]>=_0x1b7d28[_0xc0c867(0x233)]()&&this[_0xc0c867(0x139)]()!==0x191;}else this[_0x513d7b]=Number(this[_0xc0c867(0x371)][_0x513d7b]);}}},Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x2ca)]=function(_0x234e93){const _0xa61040=_0xa223dd;let _0x391101=_0x234e93['text'];_0x391101=_0x391101[_0xa61040(0x20c)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x3a6a60=_0xa61040;return _0x3a6a60(0x150)===_0x3a6a60(0x150)?(this[_0x3a6a60(0x2e8)](_0x391101,!![],!![]),this[_0x3a6a60(0xf7)]('none'),''):_0x39a79c[_0x3a6a60(0x2ed)][_0x3a6a60(0x1a8)][_0x3a6a60(0x221)](this,_0x3121d6);}),_0x391101=_0x391101[_0xa61040(0x20c)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x3eada8=_0xa61040;if(_0x3eada8(0x294)!==_0x3eada8(0x294))this['obtainEscapeParam'](_0x2b0773);else return this[_0x3eada8(0x2e8)](_0x391101,!![],![]),this['processAutoPosition'](_0x3eada8(0x340)),'';}),_0x391101=_0x391101[_0xa61040(0x20c)](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x5e8fa4=_0xa61040;return this[_0x5e8fa4(0x2e8)](_0x391101,![],!![]),this['processAutoPosition'](_0x5e8fa4(0x340)),'';});if(SceneManager['isSceneBattle']()){if('GCULV'===_0xa61040(0x1c6))_0x391101=_0x391101[_0xa61040(0x20c)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x20f50d,_0x565783)=>{const _0x206739=_0xa61040;if(_0x206739(0x2b8)!==_0x206739(0x318))return this['processAutoSize'](_0x391101,!![],!![]),this[_0x206739(0xf7)](_0x206739(0x289),Number(_0x565783)||0x1),'';else this[_0x206739(0x34e)]=_0xdc68e9;}),_0x391101=_0x391101[_0xa61040(0x20c)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x28148e,_0x56cdb7)=>{const _0x13db18=_0xa61040;return this[_0x13db18(0x2e8)](_0x391101,!![],!![]),this[_0x13db18(0xf7)]('battle\x20party',Number(_0x56cdb7)||0x0),'';}),_0x391101=_0x391101[_0xa61040(0x20c)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x4f8a2a,_0x5cb285)=>{const _0x56757a=_0xa61040;return this['processAutoSize'](_0x391101,!![],!![]),this[_0x56757a(0xf7)](_0x56757a(0x208),Number(_0x5cb285)||0x0),'';});else return this[_0xa61040(0x2e8)](_0x157e76,!![],!![]),this[_0xa61040(0xf7)](_0xa61040(0x3a1),_0x5564cd(_0x12eaf3)||0x1),'';}else SceneManager[_0xa61040(0x292)]()&&(_0xa61040(0x24f)===_0xa61040(0x24f)?(_0x391101=_0x391101[_0xa61040(0x20c)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x49cd5d,_0x163e58)=>{const _0x3b9c53=_0xa61040;return this['processAutoSize'](_0x391101,!![],!![]),this['processAutoPosition'](_0x3b9c53(0x16e),0x0),'';}),_0x391101=_0x391101[_0xa61040(0x20c)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x2bd5bc,_0x48760c)=>{const _0x503bfa=_0xa61040;return this['processAutoSize'](_0x391101,!![],!![]),this[_0x503bfa(0xf7)](_0x503bfa(0x3a1),Number(_0x48760c)||0x1),'';}),_0x391101=_0x391101[_0xa61040(0x20c)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x244355,_0x2ef65a)=>{const _0x293ee5=_0xa61040;if(_0x293ee5(0x1a3)!=='wFMLO'){const _0x1216d3=_0x37883e[_0x293ee5(0x2df)](',')[_0x293ee5(0x1a0)](_0x309d94=>_0x565a3e(_0x309d94)||0x0);if(_0x1216d3[0x0]!==_0x1b9bc2)this[_0x293ee5(0x371)]['x']=_0x556247(_0x1216d3[0x0]);if(_0x1216d3[0x1]!==_0x1cd8e8)this[_0x293ee5(0x371)]['y']=_0x375268(_0x1216d3[0x1]);return'';}else return this[_0x293ee5(0x2e8)](_0x391101,!![],!![]),this[_0x293ee5(0xf7)]('map\x20party',Number(_0x2ef65a)||0x0),'';}),_0x391101=_0x391101[_0xa61040(0x20c)](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x1b6ed4,_0x420498)=>{const _0x189180=_0xa61040;return this[_0x189180(0x2e8)](_0x391101,!![],!![]),this['processAutoPosition'](_0x189180(0x2e6),Number(_0x420498)||0x0),'';})):(this[_0xa61040(0x1f3)](_0x173315),_0x4ebba9[_0xa61040(0x2ed)]['processCharacter'][_0xa61040(0x221)](this,_0x5c2ffd)));_0x234e93[_0xa61040(0x327)]=_0x391101;},Window_Message[_0xa223dd(0x1c4)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0xa223dd(0x1b8)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x2e8)]=function(_0x72bb,_0x4b73e7,_0x32c468){const _0x5bc160=_0xa223dd;_0x72bb=_0x72bb[_0x5bc160(0x20c)](Window_Message[_0x5bc160(0x1c4)],''),_0x72bb=_0x72bb[_0x5bc160(0x20c)](Window_Message[_0x5bc160(0x1b8)],''),this[_0x5bc160(0x1d8)]=!![];const _0x5baa91=this['textSizeEx'](_0x72bb);if(_0x4b73e7){if(_0x5bc160(0x1a2)===_0x5bc160(0x1a2)){let _0x479aa2=_0x5baa91[_0x5bc160(0x2e7)]+$gameSystem['windowPadding']()*0x2+0x6;const _0x5b7ebe=$gameMessage['faceName']()!=='',_0x5813df=ImageManager['faceWidth'],_0x4154ff=0x14;_0x479aa2+=_0x5b7ebe?_0x5813df+_0x4154ff:0x4;if(_0x479aa2%0x2!==0x0)_0x479aa2+=0x1;$gameSystem[_0x5bc160(0x3ba)](_0x479aa2);}else{const _0x250820=0x2;switch(this[_0x5bc160(0x31b)]){case 0x0:return _0x37ae2e;case 0x1:return this[_0x5bc160(0x1c1)](_0x426e3d,_0x250820);case 0x2:return this[_0x5bc160(0x18b)](_0x51fa26,_0x250820);case 0x3:return this['easeInOut'](_0x1b2f5d,_0x250820);default:return _0x49c61e['VisuMZ_0_CoreEngine']?_0x24a9d7['applyMoveEasing'](_0x3bbcaa,this[_0x5bc160(0x31b)]):_0x3b3b0d;}}}if(_0x32c468){let _0xa1cb8f=Math[_0x5bc160(0x1c9)](_0x5baa91[_0x5bc160(0x167)]/this[_0x5bc160(0x3b2)]());$gameSystem[_0x5bc160(0x1a1)](_0xa1cb8f);}this[_0x5bc160(0x27a)](),this[_0x5bc160(0x1d8)]=![],this['_messagePositionReset']=!![];},Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x27a)]=function(){const _0x2f3fdd=_0xa223dd;this[_0x2f3fdd(0x10d)](),this['updatePlacement'](),this['resetPositionX'](),this[_0x2f3fdd(0x1b5)](),this[_0x2f3fdd(0x30b)]['clear'](),this['createContents']();},Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0xf7)]=function(_0x5e0609,_0xea1543){const _0x4c74bd=_0xa223dd;switch(_0x5e0609[_0x4c74bd(0x332)]()[_0x4c74bd(0x362)]()){case'battle\x20actor':this['_autoPositionTarget']=$gameActors[_0x4c74bd(0x232)](_0xea1543);break;case'battle\x20party':this[_0x4c74bd(0x3bf)]=$gameParty[_0x4c74bd(0x16c)]()[_0xea1543-0x1];break;case'battle\x20enemy':this['_autoPositionTarget']=$gameTroop[_0x4c74bd(0x16c)]()[_0xea1543-0x1];break;case _0x4c74bd(0x16e):this['_autoPositionTarget']=$gamePlayer;break;case _0x4c74bd(0x3a1):const _0x29f005=$gameActors[_0x4c74bd(0x232)](_0xea1543)[_0x4c74bd(0x272)]();if(_0x29f005===0x0){if(_0x4c74bd(0x291)==='sBmac'){!_0xcc6c71&&(this[_0x4c74bd(0x2e7)]=_0x29c169[_0x4c74bd(0x35a)](this[_0x4c74bd(0x2e7)],_0x88afc1[_0x4c74bd(0x2e7)]),this[_0x4c74bd(0x167)]=_0x132827['min'](this[_0x4c74bd(0x167)],_0x53514a[_0x4c74bd(0x167)]));if(!_0x1d5c6e){const _0x3b9955=-(_0xb42a2e['floor'](_0x42677c[_0x4c74bd(0x2e7)]-_0x5c99a0[_0x4c74bd(0x1ca)])/0x2),_0x186c00=_0x3b9955+_0x2aef3c[_0x4c74bd(0x2e7)]-this[_0x4c74bd(0x2e7)],_0x14471d=-(_0x275760[_0x4c74bd(0x276)](_0x1aa220[_0x4c74bd(0x167)]-_0xa47b15[_0x4c74bd(0x3a3)])/0x2),_0x1b21dd=_0x14471d+_0x1b22ae[_0x4c74bd(0x167)]-this['height'];this['x']=this['x'][_0x4c74bd(0x17b)](_0x3b9955,_0x186c00),this['y']=this['y'][_0x4c74bd(0x17b)](_0x14471d,_0x1b21dd);}}else this[_0x4c74bd(0x3bf)]=$gamePlayer;}else{if('jzpMQ'!==_0x4c74bd(0x28d))this[_0x4c74bd(0x3bf)]=$gamePlayer[_0x4c74bd(0x263)]()[_0x4c74bd(0x17e)](_0x29f005-0x1);else return _0x5e3387[_0x4c74bd(0x272)]+=_0x1b2dd5[0x0][_0x4c74bd(0x2bf)],_0x22602c(_0x27b3f3[0x0]['slice'](0x1,_0x2eec12[0x0][_0x4c74bd(0x2bf)]-0x1));}break;case _0x4c74bd(0x160):if(_0xea1543===0x1){if(_0x4c74bd(0x308)!==_0x4c74bd(0x20e))this['_autoPositionTarget']=$gamePlayer;else return _0x22bc29=_0x1ea9bd[_0x4c74bd(0x20c)](/<LEFT>/gi,'\x1bTEXTALIGNMENT[1]'),_0x17efaa=_0x731c93[_0x4c74bd(0x20c)](/<\/LEFT>/gi,_0x4c74bd(0x279)),_0x4199ed=_0xe8d1e4[_0x4c74bd(0x20c)](/<CENTER>/gi,_0x4c74bd(0x11e)),_0x1b5d4c=_0x4e743c['replace'](/<\/CENTER>/gi,_0x4c74bd(0x279)),_0x5cfd83=_0x56c81d[_0x4c74bd(0x20c)](/<RIGHT>/gi,_0x4c74bd(0x363)),_0x38e6dc=_0x2b238a[_0x4c74bd(0x20c)](/<\/RIGHT>/gi,_0x4c74bd(0x279)),_0x45a965;}else this['_autoPositionTarget']=$gamePlayer['followers']()[_0x4c74bd(0x17e)](_0xea1543-0x2);break;case'map\x20event':this[_0x4c74bd(0x3bf)]=$gameMap['event'](_0xea1543);break;}if(this[_0x4c74bd(0x3bf)]){if(_0x4c74bd(0x249)===_0x4c74bd(0x249))this[_0x4c74bd(0x375)]();else{const _0x56d360=_0x2b5837>=0x1?_0x58d98e['members']()[_0x2400ae-0x1]:null,_0x1f329b=_0x56d360?_0x56d360[_0x4c74bd(0x194)]():'',_0x334467=_0x30318d(_0x1204d5['MessageCore']['Settings']['AutoColor'][_0x4c74bd(0x210)]);return this[_0x4c74bd(0x136)]()&&_0x334467!==0x0?_0x4c74bd(0x303)[_0x4c74bd(0x111)](_0x334467,_0x1f329b):_0x1f329b;}}},VisuMZ[_0xa223dd(0x2a0)]['Window_Message_synchronizeNameBox']=Window_Message[_0xa223dd(0x2ed)]['synchronizeNameBox'],Window_Message[_0xa223dd(0x2ed)]['synchronizeNameBox']=function(){const _0x488457=_0xa223dd;this[_0x488457(0x375)](),VisuMZ[_0x488457(0x2a0)]['Window_Message_synchronizeNameBox'][_0x488457(0x221)](this);},Window_Message[_0xa223dd(0x2ed)]['updateAutoPosition']=function(){const _0x1144c9=_0xa223dd;if(!this[_0x1144c9(0x3bf)])return;const _0x5a57a7=SceneManager[_0x1144c9(0x324)];if(!_0x5a57a7)return;if(!_0x5a57a7[_0x1144c9(0x329)])return;const _0x3ab655=_0x5a57a7['_spriteset']['findTargetSprite'](this['_autoPositionTarget']);if(!_0x3ab655)return;let _0x69bbff=_0x3ab655['x'];_0x69bbff-=this[_0x1144c9(0x2e7)]/0x2,_0x69bbff-=(Graphics['width']-Graphics[_0x1144c9(0x1ca)])/0x2;let _0x58e344=_0x3ab655['y'];_0x58e344-=this[_0x1144c9(0x167)],_0x58e344-=(Graphics[_0x1144c9(0x167)]-Graphics[_0x1144c9(0x3a3)])/0x2,_0x58e344-=_0x3ab655[_0x1144c9(0x167)]+0x8;const _0x409f1c=$gameSystem[_0x1144c9(0xf9)]();_0x69bbff+=_0x409f1c['x'],_0x58e344+=_0x409f1c['y'],this['x']=Math[_0x1144c9(0x30c)](_0x69bbff),this['y']=Math[_0x1144c9(0x30c)](_0x58e344),this[_0x1144c9(0x2dc)](!![],![]),this[_0x1144c9(0x25a)][_0x1144c9(0x28a)]();},Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x392)]=function(){const _0xf62e2b=_0xa223dd;this[_0xf62e2b(0x12b)]=![],this[_0xf62e2b(0x3bf)]=undefined,$gameSystem[_0xf62e2b(0x38a)](),this['updateAutoSizePosition'](),this['openness']=0x0;},Window_Message['prototype'][_0xa223dd(0x1a8)]=function(_0x203214){const _0x477ed5=_0xa223dd;return Window_Base['prototype']['preConvertEscapeCharacters'][_0x477ed5(0x221)](this,_0x203214);},Window_Message['prototype'][_0xa223dd(0x158)]=function(_0x5b6a58){const _0x1e7808=_0xa223dd;return Window_Base['prototype']['postConvertEscapeCharacters'][_0x1e7808(0x221)](this,_0x5b6a58);},Window_Message['prototype'][_0xa223dd(0x121)]=function(_0x3b5fe7){const _0xb2e910=_0xa223dd;this['preFlushTextState'](_0x3b5fe7),Window_Base[_0xb2e910(0x2ed)]['flushTextState'][_0xb2e910(0x221)](this,_0x3b5fe7),this[_0xb2e910(0x2ee)](_0x3b5fe7);},Window_Message[_0xa223dd(0x2ed)][_0xa223dd(0x365)]=function(_0x583e31){},Window_Message[_0xa223dd(0x2ed)]['postFlushTextState']=function(_0x269ef6){},Window_NameBox['prototype'][_0xa223dd(0x136)]=function(){return![];},Window_NameBox[_0xa223dd(0x2ed)][_0xa223dd(0x202)]=function(){const _0x3d560a=_0xa223dd;Window_Base[_0x3d560a(0x2ed)]['resetTextColor']['call'](this),this[_0x3d560a(0x2d7)](this[_0x3d560a(0x387)]());},Window_NameBox[_0xa223dd(0x2ed)][_0xa223dd(0x387)]=function(){const _0x46756a=_0xa223dd,_0x4cf644=VisuMZ[_0x46756a(0x2a0)][_0x46756a(0xed)][_0x46756a(0x176)][_0x46756a(0x2ae)];return ColorManager[_0x46756a(0x100)](_0x4cf644);},VisuMZ['MessageCore']['Window_NameBox_updatePlacement']=Window_NameBox[_0xa223dd(0x2ed)]['updatePlacement'],Window_NameBox[_0xa223dd(0x2ed)][_0xa223dd(0x28a)]=function(){const _0x4f88d8=_0xa223dd;VisuMZ['MessageCore']['Window_NameBox_updatePlacement'][_0x4f88d8(0x221)](this),this['updateRelativePosition'](),this['updateOffsetPosition'](),this['clampPlacementPosition'](),this[_0x4f88d8(0x396)]();},Window_NameBox['prototype'][_0xa223dd(0x1a8)]=function(_0x4d0381){const _0x17f28b=_0xa223dd;return _0x4d0381=_0x4d0381[_0x17f28b(0x20c)](/<LEFT>/gi,this[_0x17f28b(0x10c)][_0x17f28b(0x2f6)](this,0x0)),_0x4d0381=_0x4d0381[_0x17f28b(0x20c)](/<CENTER>/gi,this[_0x17f28b(0x10c)][_0x17f28b(0x2f6)](this,0x5)),_0x4d0381=_0x4d0381[_0x17f28b(0x20c)](/<RIGHT>/gi,this[_0x17f28b(0x10c)][_0x17f28b(0x2f6)](this,0xa)),_0x4d0381=_0x4d0381[_0x17f28b(0x20c)](/<POSITION:[ ](\d+)>/gi,(_0x5196f8,_0x1606c3)=>this['setRelativePosition'](parseInt(_0x1606c3))),_0x4d0381=_0x4d0381[_0x17f28b(0x20c)](/<\/LEFT>/gi,''),_0x4d0381=_0x4d0381[_0x17f28b(0x20c)](/<\/CENTER>/gi,''),_0x4d0381=_0x4d0381[_0x17f28b(0x20c)](/<\/RIGHT>/gi,''),Window_Base[_0x17f28b(0x2ed)][_0x17f28b(0x1a8)]['call'](this,_0x4d0381);},Window_NameBox[_0xa223dd(0x2ed)][_0xa223dd(0x10c)]=function(_0x3cc690){const _0x4586db=_0xa223dd;return this[_0x4586db(0x105)]=_0x3cc690,'';},Window_NameBox[_0xa223dd(0x2ed)]['updateRelativePosition']=function(){const _0x134447=_0xa223dd;if($gameMessage[_0x134447(0x10b)]())return;this[_0x134447(0x105)]=this['_relativePosition']||0x0;const _0x48ca7d=this[_0x134447(0x2ab)],_0x223ea2=Math[_0x134447(0x276)](_0x48ca7d[_0x134447(0x2e7)]*this[_0x134447(0x105)]/0xa);this['x']=_0x48ca7d['x']+_0x223ea2-Math[_0x134447(0x276)](this[_0x134447(0x2e7)]/0x2),this['x']=this['x'][_0x134447(0x17b)](_0x48ca7d['x'],_0x48ca7d['x']+_0x48ca7d[_0x134447(0x2e7)]-this[_0x134447(0x2e7)]);},Window_NameBox['prototype'][_0xa223dd(0x157)]=function(){const _0x4492e3=_0xa223dd;if($gameMessage['isRTL']())return;this[_0x4492e3(0x105)]=this[_0x4492e3(0x105)]||0x0;const _0x4d0cd=VisuMZ[_0x4492e3(0x2a0)]['Settings'][_0x4492e3(0x176)][_0x4492e3(0x101)],_0x523a70=VisuMZ[_0x4492e3(0x2a0)]['Settings']['General'][_0x4492e3(0x180)],_0x281658=(0x5-this[_0x4492e3(0x105)])/0x5;this['x']+=Math[_0x4492e3(0x276)](_0x4d0cd*_0x281658),this['y']+=_0x523a70;},Window_NameBox[_0xa223dd(0x2ed)][_0xa223dd(0x396)]=function(){const _0x41ab80=_0xa223dd,_0x197a9b=this['_messageWindow'],_0x468c78=_0x197a9b['y'],_0x42c093=VisuMZ[_0x41ab80(0x2a0)][_0x41ab80(0xed)][_0x41ab80(0x176)][_0x41ab80(0x180)];_0x468c78>this['y']&&_0x468c78<this['y']+this[_0x41ab80(0x167)]-_0x42c093&&(this['y']=_0x197a9b['y']+_0x197a9b[_0x41ab80(0x167)]);},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x287)]=Window_NameBox[_0xa223dd(0x2ed)][_0xa223dd(0x106)],Window_NameBox[_0xa223dd(0x2ed)]['refresh']=function(){const _0xcf2f70=_0xa223dd;this[_0xcf2f70(0x105)]=0x0,VisuMZ[_0xcf2f70(0x2a0)][_0xcf2f70(0x287)][_0xcf2f70(0x221)](this);},Window_ChoiceList[_0xa223dd(0x2ed)][_0xa223dd(0x183)]=function(){return![];},Window_ChoiceList[_0xa223dd(0x2ed)]['isAutoColorAffected']=function(){return!![];},Window_ChoiceList[_0xa223dd(0x2ed)][_0xa223dd(0x12c)]=function(){const _0x13f765=_0xa223dd;return $gameSystem[_0x13f765(0x261)]()+0x8;},Window_ChoiceList[_0xa223dd(0x2ed)][_0xa223dd(0x305)]=function(){return $gameSystem['getChoiceListMaxColumns']();},Window_ChoiceList['prototype'][_0xa223dd(0xfb)]=function(){const _0x5985c8=_0xa223dd;this[_0x5985c8(0x106)](),this[_0x5985c8(0x19a)](),this[_0x5985c8(0x14d)](),this[_0x5985c8(0x1ee)]();},Window_ChoiceList[_0xa223dd(0x2ed)][_0xa223dd(0x106)]=function(){const _0x402073=_0xa223dd;this['clearCommandList'](),this[_0x402073(0x274)](),this[_0x402073(0x2ab)]&&(this[_0x402073(0x28a)](),this[_0x402073(0x154)]()),this['createContents'](),this[_0x402073(0x357)](),this['refreshDimmerBitmap'](),Window_Selectable[_0x402073(0x2ed)][_0x402073(0x106)][_0x402073(0x221)](this);},Window_ChoiceList[_0xa223dd(0x2ed)][_0xa223dd(0x274)]=function(){const _0x2ff8f1=_0xa223dd,_0x3e4b79=$gameMessage[_0x2ff8f1(0x1fa)]();let _0x55eca5=0x0;for(let _0x1c715f of _0x3e4b79){_0x1c715f=this['convertChoiceMacros'](_0x1c715f);if(this[_0x2ff8f1(0x351)](_0x1c715f)){const _0x279c99=this[_0x2ff8f1(0xfa)](_0x1c715f),_0x364bf9=this['isChoiceEnabled'](_0x1c715f);this[_0x2ff8f1(0x141)](_0x279c99,_0x2ff8f1(0x37e),_0x364bf9,_0x55eca5);}_0x55eca5++;}},Window_ChoiceList[_0xa223dd(0x2ed)][_0xa223dd(0xf8)]=function(_0x2211c9){const _0x5b5329=_0xa223dd;return Window_Base['prototype'][_0x5b5329(0x23d)][_0x5b5329(0x221)](this,_0x2211c9);},Window_ChoiceList[_0xa223dd(0x2ed)][_0xa223dd(0x351)]=function(_0x35b45b){const _0x486cb5=_0xa223dd;if(Imported[_0x486cb5(0x280)])$gameMessage[_0x486cb5(0x3b9)]();if(_0x35b45b['match'](/<HIDE>/i))return![];if(_0x35b45b[_0x486cb5(0x310)](/<SHOW>/i))return!![];if(_0x35b45b[_0x486cb5(0x310)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if('MdaVR'===_0x486cb5(0x1f8))this['x']=this['applyMoveEasing'](this['x'],this[_0x486cb5(0x1d9)]),this['y']=this[_0x486cb5(0x11a)](this['y'],this[_0x486cb5(0x187)]),this[_0x486cb5(0x2e7)]=this[_0x486cb5(0x11a)](this[_0x486cb5(0x2e7)],this['_moveTargetWidth']),this[_0x486cb5(0x167)]=this['applyMoveEasing'](this['height'],this[_0x486cb5(0x31a)]),this['clampPlacementPosition']();else{const _0x4dda81=RegExp['$1']['split'](',')[_0x486cb5(0x1a0)](_0x1321d4=>Number(_0x1321d4)||0x0);for(const _0x425589 of _0x4dda81){if(!$gameSwitches['value'](_0x425589))return![];}return!![];}}if(_0x35b45b[_0x486cb5(0x310)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if('bcqfZ'===_0x486cb5(0x382)){_0x5cc43b[_0x486cb5(0x1f0)]=_0x4503b8['Match'][_0x486cb5(0x37c)](),_0x2f31a0['textCodeCheck']=new _0x58d7f2('\x1b'+_0x4c0a94[_0x486cb5(0x1f0)],'gi'),_0x59f9bb[_0x486cb5(0x186)]='\x1b'+_0x2fae9a['Match'];if(_0x187229[_0x486cb5(0x16d)]==='')_0x6ed681['textCodeResult']+=_0x486cb5(0x201);}else{const _0x1a9f13=RegExp['$1'][_0x486cb5(0x2df)](',')[_0x486cb5(0x1a0)](_0x39f147=>Number(_0x39f147)||0x0);for(const _0x2eeebe of _0x1a9f13){if(!$gameSwitches[_0x486cb5(0x209)](_0x2eeebe))return![];}return!![];}}if(_0x35b45b[_0x486cb5(0x310)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x486cb5(0x30d)!==_0x486cb5(0x206)){const _0x2ff0ad=RegExp['$1'][_0x486cb5(0x2df)](',')[_0x486cb5(0x1a0)](_0x47c8ed=>Number(_0x47c8ed)||0x0);for(const _0x438345 of _0x2ff0ad){if($gameSwitches[_0x486cb5(0x209)](_0x438345))return!![];}return![];}else this['drawPictureTextZone'](_0x392768);}if(_0x35b45b[_0x486cb5(0x310)](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x51b20d=RegExp['$1'][_0x486cb5(0x2df)](',')[_0x486cb5(0x1a0)](_0x4e6811=>Number(_0x4e6811)||0x0);for(const _0x2333ac of _0x51b20d){if(!$gameSwitches['value'](_0x2333ac))return!![];}return![];}if(_0x35b45b[_0x486cb5(0x310)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if('iFUGP'===_0x486cb5(0x2a5))_0x37cc5a[_0x486cb5(0x2a0)][_0x486cb5(0x182)][_0x486cb5(0x221)](this),this[_0x486cb5(0x38b)]();else{const _0x12d56c=RegExp['$1']['split'](',')[_0x486cb5(0x1a0)](_0x3325d1=>Number(_0x3325d1)||0x0);for(const _0xb04b81 of _0x12d56c){if(_0x486cb5(0x1f9)!==_0x486cb5(0x1f9)){const _0x41b344=this[_0x486cb5(0x235)](_0x52738a);if(_0x3a46a9[_0x486cb5(0x1a6)])this[_0x486cb5(0x2f5)](_0x41b344>0x0);}else{if(!$gameSwitches[_0x486cb5(0x209)](_0xb04b81))return!![];}}return![];}}if(_0x35b45b[_0x486cb5(0x310)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){if(_0x486cb5(0x38e)==='eiGzs'){const _0x3c10eb=RegExp['$1'][_0x486cb5(0x2df)](',')[_0x486cb5(0x1a0)](_0xdfd59c=>Number(_0xdfd59c)||0x0);for(const _0x3fe9f2 of _0x3c10eb){if(_0x486cb5(0x2b6)===_0x486cb5(0x2db)){const _0x18e304=_0x208594(_0x58f4f5['$1']);_0x18e304<_0x544edf?(_0x4a4f53(_0x486cb5(0x28b)[_0x486cb5(0x111)](_0x229c95,_0x18e304,_0x262458)),_0xcf3d47['exit']()):_0x2c7654=_0x3c98a0[_0x486cb5(0x155)](_0x18e304,_0x3fcf03);}else{if($gameSwitches['value'](_0x3fe9f2))return![];}}return!![];}else _0x28c392['x']-=_0x1c9182['startX']/0x2;}return!![];},Window_ChoiceList['prototype']['parseChoiceText']=function(_0x27aa79){const _0x2955ed=_0xa223dd;let _0x2dac7a=_0x27aa79;return _0x2dac7a=_0x2dac7a['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x2dac7a=_0x2dac7a[_0x2955ed(0x20c)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x2dac7a;},Window_ChoiceList['prototype'][_0xa223dd(0x215)]=function(_0x2c05d6){const _0x1b5fed=_0xa223dd;if(Imported['VisuMZ_1_EventsMoveCore'])$gameMessage[_0x1b5fed(0x3b9)]();if(_0x2c05d6[_0x1b5fed(0x310)](/<DISABLE>/i))return![];if(_0x2c05d6[_0x1b5fed(0x310)](/<ENABLE>/i))return!![];if(_0x2c05d6[_0x1b5fed(0x310)](/<ENABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x1b6c55=RegExp['$1']['split'](',')[_0x1b5fed(0x1a0)](_0x17757f=>Number(_0x17757f)||0x0);for(const _0x53e9cb of _0x1b6c55){if(_0x1b5fed(0x14b)===_0x1b5fed(0x304))_0x40ab75['eraseAllPictureTexts'](_0xdec935),_0x536aff[_0x1b5fed(0x301)](_0x4694bc);else{if(!$gameSwitches[_0x1b5fed(0x209)](_0x53e9cb))return![];}}return!![];}if(_0x2c05d6[_0x1b5fed(0x310)](/<ENABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x25b275=RegExp['$1']['split'](',')['map'](_0x35f6de=>Number(_0x35f6de)||0x0);for(const _0x53618e of _0x25b275){if(!$gameSwitches[_0x1b5fed(0x209)](_0x53618e))return![];}return!![];}if(_0x2c05d6[_0x1b5fed(0x310)](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if('NSMaS'!=='NSMaS'){this[_0x1b5fed(0x1d9)]=_0x501190,this[_0x1b5fed(0x187)]=_0x5a03a7,this['_moveTargetWidth']=_0x4dd412||this['width'],this[_0x1b5fed(0x31a)]=_0x4d725b||this['height'],this[_0x1b5fed(0x2ba)]=_0x11e86e||0x1;if(this[_0x1b5fed(0x2ba)]<=0x0)this[_0x1b5fed(0x2ba)]=0x1;this[_0x1b5fed(0x123)]=this[_0x1b5fed(0x2ba)],this[_0x1b5fed(0x31b)]=_0x207d8b||0x0;if(_0x29f52d<=0x0)this[_0x1b5fed(0x36e)]();}else{const _0x3c7529=RegExp['$1']['split'](',')[_0x1b5fed(0x1a0)](_0x2bbdf2=>Number(_0x2bbdf2)||0x0);for(const _0x30d2f0 of _0x3c7529){if($gameSwitches[_0x1b5fed(0x209)](_0x30d2f0))return!![];}return![];}}if(_0x2c05d6[_0x1b5fed(0x310)](/<DISABLE[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){if('vvpLs'!==_0x1b5fed(0x389)){const _0xaa5ac9=RegExp['$1']['split'](',')[_0x1b5fed(0x1a0)](_0x3ab9d7=>Number(_0x3ab9d7)||0x0);for(const _0x454953 of _0xaa5ac9){if('QjzGL'===_0x1b5fed(0x1db))this[_0x1b5fed(0x307)](...arguments);else{if(!$gameSwitches[_0x1b5fed(0x209)](_0x454953))return!![];}}return![];}else this[_0x1b5fed(0x27c)](this['_resetRect']['x'],this[_0x1b5fed(0x1ba)]['y'],this[_0x1b5fed(0x1ba)][_0x1b5fed(0x2e7)],this['_resetRect'][_0x1b5fed(0x167)],_0x190f6f,_0x585cda);}if(_0x2c05d6[_0x1b5fed(0x310)](/<DISABLE ALL[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x5a3604=RegExp['$1'][_0x1b5fed(0x2df)](',')[_0x1b5fed(0x1a0)](_0x1f03a5=>Number(_0x1f03a5)||0x0);for(const _0x3febf9 of _0x5a3604){if(_0x1b5fed(0x10e)===_0x1b5fed(0x30f))_0x142c4b['MessageCore'][_0x1b5fed(0x29f)]['call'](this),this[_0x1b5fed(0x259)]();else{if(!$gameSwitches[_0x1b5fed(0x209)](_0x3febf9))return!![];}}return![];}if(_0x2c05d6[_0x1b5fed(0x310)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x1b097a=RegExp['$1'][_0x1b5fed(0x2df)](',')[_0x1b5fed(0x1a0)](_0x5ec663=>Number(_0x5ec663)||0x0);for(const _0x51a637 of _0x1b097a){if(_0x1b5fed(0x270)!=='wzPcv'){if($gameSwitches[_0x1b5fed(0x209)](_0x51a637))return![];}else _0x4d8221=_0x24c86f[_0x1b5fed(0x20c)](/[\n\r]+/g,''),_0x4a8b2f=_0x14070b['replace'](/<(?:BR|LINEBREAK)>/gi,'\x0a');}return!![];}return!![];},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x330)]=Window_ChoiceList[_0xa223dd(0x2ed)][_0xa223dd(0x28a)],Window_ChoiceList['prototype'][_0xa223dd(0x28a)]=function(){const _0x2eecb9=_0xa223dd;VisuMZ[_0x2eecb9(0x2a0)]['Window_ChoiceList_updatePlacement'][_0x2eecb9(0x221)](this),this[_0x2eecb9(0x2dc)]();},Window_ChoiceList['prototype']['placeCancelButton']=function(){const _0x196775=_0xa223dd;if(!this['_cancelButton'])return;const _0x4473dc=0x8,_0x2b35eb=this[_0x196775(0x148)],_0x59abad=this['x']+this['width'],_0x5c2998=Math[_0x196775(0x276)]((Graphics['width']-Graphics[_0x196775(0x1ca)])/0x2);if(_0x59abad>=Graphics[_0x196775(0x1ca)]+_0x5c2998-_0x2b35eb[_0x196775(0x2e7)]+_0x4473dc){if(_0x196775(0x256)!==_0x196775(0x2c5))_0x2b35eb['x']=-_0x2b35eb[_0x196775(0x2e7)]-_0x4473dc;else{const _0x223f27=_0x22278e[_0x196775(0x2ed)]['processCommonEvent'][_0x196775(0x221)](this,_0x3bc66f);_0x54aaba[_0x196775(0x1a6)]&&this['launchMessageCommonEvent'](_0x223f27);}}else _0x2b35eb['x']=this[_0x196775(0x2e7)]+_0x4473dc;_0x2b35eb['y']=this[_0x196775(0x167)]/0x2-_0x2b35eb[_0x196775(0x167)]/0x2;},VisuMZ[_0xa223dd(0x2a0)][_0xa223dd(0x1fe)]=Window_ChoiceList[_0xa223dd(0x2ed)][_0xa223dd(0x14f)],Window_ChoiceList[_0xa223dd(0x2ed)][_0xa223dd(0x14f)]=function(){const _0x28a955=_0xa223dd;return this[_0x28a955(0x2ab)]?this['messageCoreWindowX']():VisuMZ[_0x28a955(0x2a0)][_0x28a955(0x1fe)][_0x28a955(0x221)](this);},Window_ChoiceList[_0xa223dd(0x2ed)]['messageCoreWindowX']=function(){const _0x211602=_0xa223dd,_0xb6b8a6=$gameMessage[_0x211602(0x1ab)]();if(_0xb6b8a6===0x1){if(_0x211602(0x299)===_0x211602(0x299))return(Graphics['boxWidth']-this[_0x211602(0x284)]())/0x2;else _0x541040[_0x211602(0x2a0)][_0x211602(0x330)][_0x211602(0x221)](this),this[_0x211602(0x2dc)]();}else return _0xb6b8a6===0x2?this[_0x211602(0x2ab)]['x']+this[_0x211602(0x2ab)][_0x211602(0x2e7)]-this['windowWidth']():'XZtXX'!=='uTaJp'?this['_messageWindow']['x']:_0x211602(0x303)[_0x211602(0x111)](_0x4df86f,_0x402a26);},Window_ChoiceList[_0xa223dd(0x2ed)][_0xa223dd(0x284)]=function(){const _0x16302b=_0xa223dd,_0xcff163=(this[_0x16302b(0x29e)]()+this[_0x16302b(0x174)]())*this[_0x16302b(0x305)]()+this[_0x16302b(0x320)]*0x2;return Math['min'](_0xcff163,Graphics[_0x16302b(0x2e7)]);},Window_ChoiceList[_0xa223dd(0x2ed)][_0xa223dd(0x2a1)]=function(){const _0xe4f827=_0xa223dd,_0x52bf8f=$gameMessage['choices']()['map'](_0x1eb982=>this[_0xe4f827(0xf8)](_0x1eb982))[_0xe4f827(0x11c)](_0x3c302e=>this[_0xe4f827(0x351)](_0x3c302e)),_0x24baca=Math['ceil'](_0x52bf8f[_0xe4f827(0x2bf)]/this[_0xe4f827(0x305)]());return Math['max'](0x1,Math[_0xe4f827(0x35a)](_0x24baca,this['maxLines']()));},Window_ChoiceList[_0xa223dd(0x2ed)][_0xa223dd(0x321)]=function(){const _0x4a2cd7=_0xa223dd,_0x5142a8=this['_messageWindow'],_0x2ea71c=_0x5142a8?_0x5142a8['y']:0x0,_0x59a37a=_0x5142a8?_0x5142a8['height']:0x0,_0x32b3bc=Graphics[_0x4a2cd7(0x3a3)]/0x2;if(_0x2ea71c<_0x32b3bc&&_0x2ea71c+_0x59a37a>_0x32b3bc)return _0x4a2cd7(0x2b2)===_0x4a2cd7(0x2b2)?0x4:!![];else{if(_0x4a2cd7(0x1fb)==='yYqlM'){let _0xe1edf1=_0x519658[_0x4a2cd7(0x2ed)][_0x4a2cd7(0x3be)]['call'](this);return _0xe1edf1-=this[_0x4a2cd7(0x26e)](),_0xe1edf1;}else return $gameSystem[_0x4a2cd7(0xfe)]();}},Window_ChoiceList[_0xa223dd(0x2ed)][_0xa223dd(0x29e)]=function(){const _0x326be4=_0xa223dd;let _0x3ffaa0=this[_0x326be4(0x322)]();for(const _0x5609bb of this['_list']){const _0x2f6938=_0x5609bb['name'],_0x56cee6=this[_0x326be4(0x343)](_0x2f6938),_0x4ed967=this['textSizeEx'](_0x2f6938)[_0x326be4(0x2e7)]+_0x56cee6,_0x837542=Math[_0x326be4(0x1c9)](_0x4ed967)+this[_0x326be4(0x264)]()*0x2;_0x3ffaa0=Math[_0x326be4(0x155)](_0x3ffaa0,_0x837542);}return _0x3ffaa0;},Window_ChoiceList[_0xa223dd(0x2ed)]['getStartingChoiceWidth']=function(){const _0x1eb751=_0xa223dd;let _0x370fa7=0x60;const _0x494513=$gameMessage[_0x1eb751(0x1fa)]();for(const _0x24a41a of _0x494513){if(_0x24a41a[_0x1eb751(0x310)](/<CHOICE WIDTH:[ ](\d+)>/gi)){if(_0x1eb751(0x269)===_0x1eb751(0x342)){if(this[_0x1eb751(0x246)]===_0x35277f)this[_0x1eb751(0x38a)]();if(this[_0x1eb751(0x246)][_0x1eb751(0x1a7)]===_0x5a4c52)this[_0x1eb751(0x38a)]();return this[_0x1eb751(0x246)][_0x1eb751(0x1a7)];}else _0x370fa7=Math['max'](_0x370fa7,Number(RegExp['$1']));}}return _0x370fa7;},Window_ChoiceList[_0xa223dd(0x2ed)][_0xa223dd(0x190)]=function(_0x52bf34){const _0x204040=_0xa223dd,_0xf6ef4e=this[_0x204040(0x2e0)](_0x52bf34),_0x3fe904=$gameSystem['getChoiceListTextAlign']()!=='default'?_0x204040(0x277)['format']($gameSystem['getChoiceListTextAlign']()):'',_0x171c11=_0x3fe904+this['commandName'](_0x52bf34);this[_0x204040(0x1c8)](this['isCommandEnabled'](_0x52bf34));const _0x993063=this[_0x204040(0x2cd)](_0x171c11)['height'],_0x469704=_0xf6ef4e['x']+this[_0x204040(0x343)](_0x171c11),_0x57e3cc=Math[_0x204040(0x155)](_0xf6ef4e['y'],_0xf6ef4e['y']+Math[_0x204040(0x30c)]((_0xf6ef4e[_0x204040(0x167)]-_0x993063)/0x2));this[_0x204040(0x1e0)](_0x171c11,_0x469704,_0x57e3cc,_0xf6ef4e['width']);},Window_ChoiceList['prototype'][_0xa223dd(0x343)]=function(_0x4e21cd){const _0xcbb4fb=_0xa223dd;let _0x5b26d2=0x0;return _0x4e21cd[_0xcbb4fb(0x310)](/<CHOICE INDENT:[ ](\d+)>/gi)&&(_0x5b26d2=Number(RegExp['$1'])),_0x5b26d2;},Window_ChoiceList[_0xa223dd(0x2ed)][_0xa223dd(0x114)]=function(){const _0x20e17b=_0xa223dd;$gameMessage[_0x20e17b(0x135)](this[_0x20e17b(0x285)]()),this[_0x20e17b(0x2ab)][_0x20e17b(0x2bb)](),this[_0x20e17b(0x159)]();};function _0x24e2(){const _0x4a4e73=['textWidth','_positionType','_colorLock','getPreservedFontSettings','Items','isChoiceVisible','choiceCols','rtl','FxVrT','OGIHh','_subject','updateBackground','(((','nyxGU','min','resetFontSettings','\x1bBOLD[1]','setChoiceListMaxColumns','fontFace','description','unshift','convertEscapeCharacters','trim','\x1bTEXTALIGNMENT[3]','isTriggered','preFlushTextState','ryllR','AddOption','_target','addWrapBreakAfterPunctuation','jBWFp','return\x20\x27','Game_Screen_erasePicture','Window_Message_updatePlacement','updateMove','processNewLine','setFaceImage','_forcedPosition','updateXyOffsets','innerHeight','EKwdf','updateAutoPosition','isHelpWindowWordWrap','AutoColorBypassList','ygmiD','substr','messageWidth','outputHeight','toUpperCase','processTextAlignmentX','choice','OffsetY','AutoColorRegExp','getPictureTextData','ULWGT','Jicft','setChoiceListLineHeight','lowerright','Window_Message_newPage','defaultColor','createTextState','rfOGE','initMessageCore','clearAllPictureTexts','rqzxD','Window_Base_changeTextColor','eiGzs','currencyUnit','isBreakShowTextCommands','textSizeExTextAlignment','messagePositionReset','TEXTALIGNMENT','resetWordWrap','actorName','updateOverlappingY','_pictureTextCache','TextStr','PictureIDs','createContents','MaxCols','WordWrap','NJEeV','registerActorNameAutoColorChanges','setPositionType','FontChangeValue','map\x20actor','substring','boxHeight','</RIGHT>','anchor','setupEvents','LKvRZ','NUM','push','makeFontSmaller','</CENTER>','<B>','_centerMessageWindow','CDEXX','YcEcf','isColorLocked','processMessageCoreEscapeActions','lineHeight','includes','addContinuousShowChoices','<LINE\x20BREAK>','JSON','_pictureTextHeight','ARRAYSTR','registerSelfEvent','setMessageWindowWidth','setupChoices','textSizeExWordWrap','isBusy','contentsHeight','_autoPositionTarget','LineBreakSpace','_dimmerSprite','Window_Base_processNewLine','battleTargetName','qeBYg','Settings','choiceRows','battleUserName','anyPictureTextChanges','\x1bi[%1]%2','<WORDWRAP>','RDukH','isMessageWindowWordWrap','_pictureId','prepareShowTextCommand','processAutoPosition','convertChoiceMacros','getMessageWindowXyOffsets','parseChoiceText','start','resetPositionX','drawBackPicture','getChoiceListMaxRows','obtainItem','textColor','NameBoxWindowOffsetX','ALL','clear','faceName','_relativePosition','refresh','ibDBv','cxLGp','RSBpL','4405064KMwESI','isRTL','setRelativePosition','updateDimensions','ZCMPR','Window_Options_isVolumeSymbol','startWait','format','zNrNf','code','callOkHandler','ANY','SortObjectByKeyLength','convertFontSettingsEscapeCharacters','MaxRows','BWaSU','applyMoveEasing','clearCommandList','filter','hbvAB','\x1bTEXTALIGNMENT[2]','indexOf','pYxhA','flushTextState','setSpeakerName','_wholeMoveDuration','PICTURE','_interpreter','ARRAYFUNC','Window_Options_statusText','ParseClassNotetags','databaseObjectName','isSceneBattle','_messagePositionReset','itemHeight','_messageOffsetY','processCommonEvent','OimMD','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_lastGainedItemData','addMessageCoreTextSpeedCommand','partyMemberName','1374468MAqqGM','onChoice','isAutoColorAffected','adjustShowChoiceExtension','ParseEnemyNotetags','nextEventCode','upperright','Game_Interpreter_setupChoices','bOmtO','mainFontFace','prepareShowTextFollowups','processActorNameAutoColorChanges','ParseItemNotetags','addCommand','maxFontSizeInLine','_moveTargetWidth','true','updateEvents','addMessageCommonEvent','processAllText','_cancelButton','update','FFzTY','vXJdF','test','open','\x1bWrapBreak[0]','windowX','iXwZt','TextCodeActions','Window_Base_processEscapeCharacter','6cOQWqz','placeCancelButton','max','TextJS','updateOffsetPosition','postConvertEscapeCharacters','close','zcRlT','_showFast','processFsTextCode','Window_Options_addGeneralOptions','Cltnx','CreateAutoColorRegExpListEntries','map\x20party','CommonEvent','SHOW','join','<COLORLOCK>','iconIndex','surprise','height','\x1bCOLORLOCK[0]','TextColor%1','drawPictureTextZone','Name','members','Type','map\x20player','ParseWeaponNotetags','victory','VRhOx','\x1bITALIC[0]','processDrawCenteredPicture','colSpacing','changeValue','General','ENABLE','AddAutoColor','parameters','ssBpA','clamp','setBackground','gehvl','follower','outlineColor','NameBoxWindowOffsetY','JFHXI','Game_Screen_clearPictures','isWordWrapEnabled','canMove','preemptive','textCodeResult','_moveTargetY','Window_Message_isTriggered','DOevi','isPressed','easeOut','_pictureTextSprite','processPreviousColor','maxCommands','adjustShowChoiceCancel','drawItem','_messageOffsetX','Window_Help_refresh','prepareWordWrapEscapeCharacters','name','setupItemChoice','MessageWindowProperties','convertMessageCoreEscapeReplacements','VisuMZ_0_CoreEngine','CreateAutoColorFor','selectDefault','_pictureTextBuffer','DefaultOutlineWidth','lastGainedObjectName','applyDatabaseAutoColor','_targets','map','setMessageWindowRows','GJmDC','wFMLO','States','226206ERAJTI','drawing','messageWordWrap','preConvertEscapeCharacters','SqeqV','returnPreservedFontSettings','choicePositionType','process_VisuMZ_MessageCore_TextMacros','setWaitMode','HelpWindow','levelUp','</COLORLOCK>','setTextDelay','addLoadListener','Instant','_textColorStack','updateTransform','ConfigManager_applyData','setWordWrap','_autoPosRegExp','processAutoColorWords','_resetRect','ConfigManager_makeData','registerResetRect','prepareForcedPositionEscapeCharacters','\x1bTEXTALIGNMENT','processControlCharacter','oVqrZ','easeIn','bitmap','ARRAYNUM','_autoSizeRegexp','addGeneralOptions','GCULV','statusText','changePaintOpacity','ceil','boxWidth','lBKDI','</B>','WORD_WRAP_PADDING','loadPicture','Armors','idBwc','_eventId','applyData','obtainGold','_pictureText','zCqrF','setLastGainedItemData','DISABLE','_autoSizeCheck','_moveTargetX','lastGainedObjectQuantity','XKqUs','VJeEJ','drawPictureText','convertVariableEscapeCharacters','TextColor','drawTextEx','ChoiceWindowLineHeight','currentCommand','NYOyO','_indent','helpWordWrap','realPictureId','registerCommand','Enemies','Game_System_initialize','ActionJS','</I>','isVolumeSymbol','IjsiV','activate','clearActorNameAutoColor','Match','type','createPictureText','onProcessCharacter','BwiAs','textSpeed','Game_Map_initialize','UjtzB','LmYtd','HKGQy','choices','DhTBf','onDatabaseLoaded','2530710LmlxGi','Window_ChoiceList_windowX','ChoiceWindowTextAlign','Game_Map_setupEvents','[0]','resetTextColor','updateBitmap','right','isWeapon','qcjyr','_autoColorActorNames','battle\x20enemy','value','calcMoveEasing','TrJyb','replace','newPage','vAUBr','changeOutlineColor','Actors','processTextAlignmentChange','ZwtAk','getConfigValue','FYTnD','isChoiceEnabled','obtainEscapeString','processStoredAutoColorChanges','choiceTextAlign','TextMacros','false','convertHardcodedEscapeReplacements','innerWidth','<CENTER>','convertShowChoiceEscapeCodes','down','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','call','Game_Map_updateEvents','messageWindowRect','convertBaseEscapeCharacters','outlineWidth','UqJNq','\x1bCOLORLOCK[1]','getMessageWindowWidth','MessageWindowXyOffsets','eraseAllPictureTexts','_wordWrap','crLUV','getChoiceListMaxColumns','version','updateNameBoxMove','ParseStateNotetags','oYlxk','actor','getMessageWindowRows','exit','obtainEscapeParam','kvTIr',')))','paintOpacity','MessageTextDelay','onNewPageMessageCore','Sprite_Picture_updateBitmap','glwtL','convertTextMacros','normalColor','textSpeedStatusText','contentsBack','isContinuePrepareShowTextCommands','ConvertParams','processFontChangeItalic','convertTextAlignmentEscapeCharacters','convertBackslashCharacters','_MessageCoreSettings','_data','_textDelayCount','eZVUo','startX','SWITCHES','guDoZ','Undefined','processWrapBreak','uymEW','battleActionName','\x1bTEXTALIGNMENT[1]','list','processPyTextCode','lowerleft','TextManager_message','qNbRY','clearPictures','processDrawPicture','updatePictureText','_nameBoxWindow','fontSize','setMessageWindowWordWrap','Padding','Width','blt','getPictureTextBuffer','getChoiceListLineHeight','Classes','followers','itemPadding','JsqvV','addContinuousShowTextCommands','ParseAddedText','default','IAWSW','SWITCH','Scene_Boot_onDatabaseLoaded','tSwru','KxKei','addedHeight','addExtraShowChoices','RwJZC','ARRAYSTRUCT','index','instantTextSpeed','makeCommandList','changeVolume','floor','<%1>','EHlYO','\x1bTEXTALIGNMENT[0]','updateAutoSizePosition','setPictureTextBuffer','moveTo','CENTERPICTURE','20091632EQDEhV','commandSymbol','VisuMZ_1_EventsMoveCore','textCodeCheck','LSSTR','addedWidth','windowWidth','currentExt','ChoiceWindowMaxCols','Window_NameBox_refresh','COLORLOCK','battle\x20actor','updatePlacement','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','TextCodeReplace','GcDrh','MessageWidth','isInputting','choiceLineHeight','rZVkB','isSceneMap','message','VIbxG','process_VisuMZ_MessageCore_AutoColor','process_VisuMZ_MessageCore_TextCodes_Replace','ARRAYJSON','LLoyu','bvQGr','424718CsRUxs','vdhvp','_pictureTextWindow','startY','maxChoiceWidth','Sprite_Picture_update','MessageCore','numVisibleRows','TextSpeed','makeData','dpNSV','SuxcI','changeTextSpeed','BOLD','slice','ParseArmorNotetags','sort','_messageWindow','addMessageCoreCommands','pzeyh','NameBoxWindowDefaultColor','getLastGainedItemData','remove','processColorLock','UcyGD','Window_Options_changeVolume','feuXw','getTextAlignment','ilqIK','adjustShowChoiceDefault','DrojX','processFontChangeBold','_moveDuration','terminateMessage','Window_Base_textSizeEx','processCharacter','LineHeight','length','Game_Party_gainItem','fontBold','defeat','attachPictureText','processPxTextCode','hyweK','outputWidth','_texts','Game_Party_initialize','<BR>','prepareAutoSizeEscapeCharacters','FastForwardKey','clearFlags','textSizeEx','makeFontBigger','Window_Message_terminateMessage','convertLockColorsEscapeCharacters','\x1bITALIC[1]','ChoiceWindowMaxRows','ChoiceWindowProperties','constructor','setChoiceListTextAlign','Yciip','changeTextColor','initTextAlignement','ARRAYEVAL','launchMessageCommonEvent','piErZ','clampPlacementPosition','left','7570591YERJFt','split','itemRectWithPadding','FontSmallerCap','convertMessageCoreEscapeActions','fontItalic','Window_Base_processAllText','Window_Base_update','map\x20event','width','processAutoSize','Window_Base_initialize','_list','WAIT','_index','prototype','postFlushTextState','COMMONEVENT','escapeStart','resizePictureText','return\x200','JiVAq','calcWindowHeight','setColorLock','bind','FUNC','TextAlign','upperleft','\x1bBOLD[0]','_textDelay','event','setHelpWindowWordWrap','erasePicture','_messageCommonEvents','setMessageWindowXyOffsets','erasePictureTextBuffer','setPictureText','\x1bC[%1]%2\x1bPREVCOLOR[0]','yMueR','maxCols','item','initialize','Zkmqe','_textAlignment','splice','contents','round','XDwKT','FontBiggerCap','hDVGC','match','updateMessageCommonEvents','Weapons','messageCoreTextSpeed','MsgWindowOffsetY','_macroBypassWordWrap','\x1bI[%1]','ConvertTextAutoColorRegExpFriendly','lrSFV','process_VisuMZ_MessageCore_TextCodes_Action','_moveTargetHeight','_moveEasingType','Scene_Options_maxCommands','parse','Rows','Vgjgd','padding','maxLines','getStartingChoiceWidth','messageRows','_scene','obtainExp','getPictureText','text','_pictureTextWidth','_spriteset','</WORDWRAP>','CreateAutoColorRegExpLists','stretchDimmerSprite','<LEFT>','makeDeepCopy','_commonEventId','Window_ChoiceList_updatePlacement','OffsetX','toLowerCase','HIDE','gainItem','setChoiceListMaxRows','ParseSkillNotetags','ncVtH','PictureTextChange','setTextAlignment','wOPTj','resetRect','center','Default','nylCo','_textMacroFound','none','ThuSW','IKeWR','getChoiceIndent','shift','AAbGH','refreshDimmerBitmap','processEscapeCharacter','rUXUZ','isItem','Skills','AutoColor'];_0x24e2=function(){return _0x4a4e73;};return _0x24e2();}